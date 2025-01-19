/**
 * @description A service to fetch and calculate various GitHub statistics for a repository
 */

import { Octokit } from "@octokit/rest";
import { getCacheItem, setCacheItem } from '@/services/cache.service';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

export interface GithubStats {
  totalCommits: number;
  firstCommitDate: string;
  firstCommitTimestamp: number;
  firstCommitYear: number;
  lastCommitDate: string;
  lastCommitTimestamp: number;
  averageCommitsPerDay: number;
  totalCommitsLastMonth: number;
  totalCommitsLastWeek: number;
  totalStars: number;
  totalBranchesCreated: number;
  totalPullRequestsCreatedMerged: number;
  totalLinesOfCodeWritten: string;
  totalCharsWritten: string;
  totalFilesAdded: number;
  dailyCommits: { [date: string]: number };
}

export async function getGithubStats(owner: string, repo: string): Promise<GithubStats> {
  const cacheKey = `github-stats-${owner}-${repo}`;
  const cachedStats = getCacheItem<GithubStats>(cacheKey);
  if (cachedStats) {
    return cachedStats;
  }

  const [
    commitStats,
    starCount,
    branchCount,
    pullRequestStats,
    codeStats,
    dailyCommits,
  ] = await Promise.all([
    getCommitStats(owner, repo),
    getStarCount(owner, repo),
    getBranchCount(owner, repo),
    getPullRequestStats(owner, repo),
    getCodeStats(owner, repo),
    getDailyCommits(owner, repo),
  ]);

  const stats = {
    ...commitStats,
    totalStars: starCount,
    totalBranchesCreated: branchCount,
    ...pullRequestStats,
    ...codeStats,
    dailyCommits,
  };

  setCacheItem(cacheKey, stats, { ttl: 300000 }); // Cache for 5 minutes
  return stats;
}

async function getCommitStats(owner: string, repo: string) {
  const cacheKey = `commit-stats-${owner}-${repo}`;
  const cachedStats = getCacheItem(cacheKey);
  if (cachedStats) {
    return cachedStats;
  }

  const commits = await fetchAllItems(octokit.repos.listCommits, { owner, repo });
  const firstCommit = commits[commits.length - 1];
  const lastCommit = commits[0];

  const totalCommits = commits.length;
  const firstCommitDate = new Date(firstCommit.commit.author?.date || "");
  const lastCommitDate = new Date(lastCommit.commit.author?.date || "");
  const daysSinceFirstCommit = Math.ceil((Date.now() - firstCommitDate.getTime()) / (1000 * 60 * 60 * 24));

  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const totalCommitsLastMonth = commits.filter(commit => new Date(commit.commit.author?.date || "") > monthAgo).length;
  const totalCommitsLastWeek = commits.filter(commit => new Date(commit.commit.author?.date || "") > weekAgo).length;

  const stats = {
    totalCommits,
    firstCommitDate: firstCommitDate.toISOString(),
    firstCommitTimestamp: firstCommitDate.getTime(),
    firstCommitYear: firstCommitDate.getFullYear(),
    lastCommitDate: lastCommitDate.toISOString(),
    lastCommitTimestamp: lastCommitDate.getTime(),
    averageCommitsPerDay: totalCommits / daysSinceFirstCommit,
    totalCommitsLastMonth,
    totalCommitsLastWeek,
  };

  setCacheItem(cacheKey, stats, { ttl: 300000 }); // Cache for 5 minutes
  return stats;
}

async function getStarCount(owner: string, repo: string): Promise<number> {
  const cacheKey = `star-count-${owner}-${repo}`;
  const cachedCount = getCacheItem<number>(cacheKey);
  if (cachedCount !== undefined) {
    return cachedCount;
  }

  const { data } = await octokit.repos.get({ owner, repo });
  const starCount = data.stargazers_count;

  setCacheItem(cacheKey, starCount, { ttl: 300000 }); // Cache for 5 minutes
  return starCount;
}

async function getBranchCount(owner: string, repo: string): Promise<number> {
  const cacheKey = `branch-count-${owner}-${repo}`;
  const cachedCount = getCacheItem<number>(cacheKey);
  if (cachedCount !== undefined) {
    return cachedCount;
  }

  const branches = await fetchAllItems(octokit.repos.listBranches, { owner, repo });
  const branchCount = branches.length;

  setCacheItem(cacheKey, branchCount, { ttl: 300000 }); // Cache for 5 minutes
  return branchCount;
}

async function getPullRequestStats(owner: string, repo: string) {
  const cacheKey = `pull-request-stats-${owner}-${repo}`;
  const cachedStats = getCacheItem(cacheKey);
  if (cachedStats) {
    return cachedStats;
  }

  const pullRequests = await fetchAllItems(octokit.pulls.list, { owner, repo, state: 'all' });
  const totalPullRequestsCreatedMerged = pullRequests.filter(pr => pr.merged_at !== null).length;

  const stats = {
    totalPullRequestsCreatedMerged,
  };

  setCacheItem(cacheKey, stats, { ttl: 300000 }); // Cache for 5 minutes
  return stats;
}

async function getCodeStats(owner: string, repo: string) {
  const cacheKey = `code-stats-${owner}-${repo}`;
  const cachedStats = getCacheItem(cacheKey);
  if (cachedStats) {
    return cachedStats;
  }

  const { data: languages } = await octokit.repos.listLanguages({ owner, repo });
  const totalLinesOfCodeWritten = Object.values(languages).reduce((a, b) => a + b, 0);
  const totalCharsWritten = totalLinesOfCodeWritten * 80;
  const { data: contents } = await octokit.repos.getContent({ owner, repo, path: '' });
  const totalFilesAdded = Array.isArray(contents) ? contents.length : 0;

  const stats = {
    totalLinesOfCodeWritten: totalLinesOfCodeWritten.toLocaleString(),
    totalCharsWritten: totalCharsWritten.toLocaleString(),
    totalFilesAdded,
  };

  setCacheItem(cacheKey, stats, { ttl: 300000 }); // Cache for 5 minutes
  return stats;
}

async function getDailyCommits(owner: string, repo: string): Promise<{ [date: string]: number }> {
  const cacheKey = `daily-commits-${owner}-${repo}`;
  const cachedCommits = getCacheItem<{ [date: string]: number }>(cacheKey);
  if (cachedCommits) {
    return cachedCommits;
  }

  const commits = await fetchAllItems(octokit.repos.listCommits, { owner, repo });
  const firstCommitDate = new Date(commits[commits.length - 1].commit.author?.date || "");
  const lastCommitDate = new Date(commits[0].commit.author?.date || "");

  const dailyCommits: { [date: string]: number } = {};
  const currentDate = new Date(firstCommitDate);

  while (currentDate <= lastCommitDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    dailyCommits[dateString] = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  for (const commit of commits) {
    const commitDate = new Date(commit.commit.author?.date || "").toISOString().split('T')[0];
    dailyCommits[commitDate] = (dailyCommits[commitDate] || 0) + 1;
  }

  setCacheItem(cacheKey, dailyCommits, { ttl: 300000 }); // Cache for 5 minutes
  return dailyCommits;
}

/**
 * Fetches all items from a paginated API endpoint
 * @param method The method to call for fetching items
 * @param params The parameters to pass to the method
 * @returns A promise that resolves to an array of all fetched items
 */
async function fetchAllItems<T>(
  method: (params: any) => Promise<{ data: T[] }>,
  params: Record<string, any>
): Promise<T[]> {
  let items: T[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await method({ ...params, page, per_page: 100 });
    items = items.concat(response.data);
    hasNextPage = response.data.length === 100;
    page++;
  }

  return items;
}
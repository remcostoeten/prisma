async function getGithubStars(owner: string, repo: string) {
	try {
		const response = await fetch(
			`https://api.github.com/repos/${owner}/${repo}`
		)
		const data = await response.json()
		return data.stargazers_count
	} catch (error) {
		console.error('Failed to fetch GitHub stars:', error)
		return 0
	}
}

export default getGithubStars

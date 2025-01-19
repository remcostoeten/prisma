import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import fuzzy from 'fuzzy';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = process.cwd();

async function findFiles(pattern) {
  return glob(pattern, { 
    cwd: rootDir,
    ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**'],
    dot: false
  });
}

function createFileTree(files) {
  const tree = {};
  files.forEach(file => {
    const parts = file.split(path.sep);
    let current = tree;
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? null : {};
      }
      current = current[part];
    });
  });
  return tree;
}

function flattenFileTree(tree, prefix = '') {
  return Object.entries(tree).flatMap(([key, value]) => {
    const fullPath = path.join(prefix, key);
    if (value === null) {
      return [fullPath];
    }
    return [fullPath, ...flattenFileTree(value, fullPath)];
  });
}

async function selectFile(files) {
  const fileTree = createFileTree(files);
  const choices = flattenFileTree(fileTree);

  const { selectedFile } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'selectedFile',
      message: 'Select a file to add docstring:',
      source: (answersSoFar, input = '') => {
        return new Promise((resolve) => {
          const fuzzyResult = fuzzy.filter(input, choices);
          resolve(fuzzyResult.map(el => el.original));
        });
      },
    },
  ]);
  return selectedFile;
}

async function getDescription() {
  const { description } = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Enter the component description:',
    },
  ]);
  return description;
}

async function addDocstring(filePath, description) {
  const content = await fs.readFile(filePath, 'utf8');
  const docstring = `/**
 * @author Remco Stoeten
 * @description ${description}
 */\n\n`;
  const updatedContent = docstring + content;
  await fs.writeFile(filePath, updatedContent);
}

async function main() {
  try {
    const args = process.argv.slice(2);
    let pattern = args[0] || '**/*.{ts,tsx}';

    if (pattern.startsWith('*')) {
      pattern = `**/${pattern}`;
    }

    const files = await findFiles(pattern);

    if (files.length === 0) {
      console.log('No matching files found.');
      return;
    }

    const selectedFile = await selectFile(files);
    const description = await getDescription();

    const filePath = path.join(rootDir, selectedFile);
    await addDocstring(filePath, description);

    console.log(`Successfully updated ${selectedFile} with the new docstring.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();

// Run the script
console.log("Starting the docstring CLI tool...");
main().then(() => console.log("Docstring CLI tool finished."));

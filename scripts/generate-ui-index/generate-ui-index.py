#!/usr/bin/env python3
"""
UI Import Generator Script

This script consolidates UI imports in TypeScript files across a project.
It can process single files, folders, or scan the entire project while
excluding common build and dependency directories.

@version: 1.0.0
@author: Remco Stoeten
"""

import argparse
import re
import sys
import os
import subprocess
from typing import List, Tuple, Optional
from multiprocessing import Pool, cpu_count
from difflib import get_close_matches

def print_help_menu() -> None:
    """Display the help menu with usage examples."""
    help_text = """
    UI Import Generator - Usage Examples:
    -----------------------------------
    1. Process all TypeScript files in project:
       python generate-ui-index.py --all
    
    2. Process single file:
       python generate-ui-index.py --file src/components/Button.tsx
    
    3. Process specific folder:
       python generate-ui-index.py --folder src/features
    
    Note: The script automatically excludes node_modules, .next, and other build directories.
    """
    print(help_text)

def get_tsx_files(directory: str) -> List[str]:
    """
    Recursively find all TypeScript files in a directory while excluding build directories.
    
    Args:
        directory: Root directory to start search from
        
    Returns:
        List of found TypeScript file paths
    """
    tsx_files = []
    excluded_dirs = {
        'node_modules', 
        '.next', 
        'dist', 
        'build',
        '.git',
        'coverage'
    }
    
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in excluded_dirs]
        tsx_files.extend([
            os.path.join(root, file) 
            for file in files 
            if file.endswith(('.tsx', '.ts')) and file != 'index.ts'
        ])
    return tsx_files

def process_content(content: str) -> Tuple[str, bool]:
    """
    Process file content to consolidate UI imports.
    
    Args:
        content: File content as string
        
    Returns:
        Tuple of (processed content, whether imports changed)
    """
    # Regular expression to match UI component imports
    ui_import_pattern = r'from\s+[\'"]@/components/ui/([^\'"\s]+)[\'"]'
    
    # Find all UI component imports
    ui_imports = re.findall(ui_import_pattern, content)
    
    if not ui_imports:
        return content, False
        
    # Remove existing UI imports
    content = re.sub(ui_import_pattern + r'.*?\n', '', content)
    
    # Create consolidated import statement
    consolidated_import = f'import {{ {", ".join(sorted(set(ui_imports)))} }} from "@/components/ui"\n'
    
    # Add consolidated import at the top of the file
    if 'use client' in content:
        # If 'use client' directive exists, add import after it
        content = re.sub(r'(\'use client\'.*?\n)', r'\1\n' + consolidated_import, content)
    else:
        # Otherwise add at the very top
        content = consolidated_import + content
        
    return content, True

def run_prettier(file_path: str) -> None:
    """
    Run prettier formatter on a file.
    
    Args:
        file_path: Path to file to format
    """
    try:
        subprocess.run(
            ['npx', 'prettier', '--write', file_path],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
    except subprocess.CalledProcessError:
        print(f"Warning: Prettier failed to format {file_path}")

def process_file(file_path: str) -> Optional[str]:
    """
    Process a single TypeScript file.
    
    Args:
        file_path: Path to file to process
        
    Returns:
        File path if file was updated, None otherwise
    """
    with open(file_path, 'r') as file:
        content = file.read()
    new_content, imports_changed = process_content(content)
    if new_content != content:
        with open(file_path, 'w') as file:
            file.write(new_content)
        if imports_changed:
            run_prettier(file_path)
            return file_path
    return None

def find_project_root() -> str:
    """
    Find the project root directory by looking for package.json.
    Starts from current working directory and moves up until root is found.
    Always returns absolute path to ensure consistency.
    
    Returns:
        Absolute path to project root
        
    Raises:
        Exception if project root cannot be found
    """
    # Start from the current working directory
    current_dir = os.path.abspath(os.getcwd())
    
    # Keep track of visited paths to avoid infinite loops
    visited = set()
    
    while current_dir not in visited:
        visited.add(current_dir)
        if os.path.exists(os.path.join(current_dir, 'package.json')):
            return current_dir
            
        parent = os.path.dirname(current_dir)
        if parent == current_dir:  # At root directory
            break
        current_dir = parent
    
    # If we get here, we couldn't find package.json
    raise Exception("Could not find project root (directory containing 'package.json'). Please run this script from within the project directory.")

def fuzzy_find_file(query: str, project_root: str) -> Optional[str]:
    """
    Find a file using fuzzy matching.
    
    Args:
        query: The search query
        project_root: Project root directory
        
    Returns:
        Best matching file path or None if no matches found
    """
    # Get all TypeScript files
    all_files = get_tsx_files(project_root)
    
    # Convert to relative paths for better matching
    relative_files = [os.path.relpath(f, project_root) for f in all_files]
    
    # Try exact match first
    if query in relative_files:
        return os.path.join(project_root, query)
        
    # Get closest matches
    matches = get_close_matches(query, relative_files, n=5, cutoff=0.4)
    
    if not matches:
        return None
        
    # If only one match, use it automatically
    if len(matches) == 1:
        return os.path.join(project_root, matches[0])
        
    # Let user choose from multiple matches
    print("\nMultiple files found. Please choose one:")
    for idx, match in enumerate(matches, 1):
        print(f"{idx}. {match}")
        
    while True:
        try:
            choice = input("\nEnter number (or 'q' to quit): ")
            if choice.lower() == 'q':
                sys.exit(0)
            choice_idx = int(choice) - 1
            if 0 <= choice_idx < len(matches):
                return os.path.join(project_root, matches[choice_idx])
            print("Invalid choice. Please try again.")
        except ValueError:
            print("Please enter a valid number.")

def main() -> None:
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(
        description="Consolidate UI imports in TypeScript files.",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--file", help="Path to a TypeScript file (supports fuzzy finding)")
    parser.add_argument("--all", action="store_true", help="Process all TypeScript files in project")
    parser.add_argument("--folder", help="Path to a folder to process recursively")
    parser.add_argument("--help-menu", action="store_true", help="Show detailed usage examples")
    
    args = parser.parse_args()
    
    if args.help_menu:
        print_help_menu()
        return
        
    try:
        # Find project root starting from current directory
        project_root = find_project_root()
        print(f"Using project root: {project_root}")
        os.chdir(project_root)  # Change to project root for consistent path handling
        
        if args.all:
            print("Scanning project for TypeScript files...")
            all_files = get_tsx_files(project_root)
        elif args.folder:
            full_path = os.path.join(project_root, args.folder)
            if os.path.exists(full_path):
                all_files = get_tsx_files(full_path)
            else:
                print(f"Error: Folder {full_path} not found")
                sys.exit(1)
        elif args.file:
            # Use fuzzy finding for file option
            matched_file = fuzzy_find_file(args.file, project_root)
            if not matched_file:
                print(f"Error: No matching files found for '{args.file}'")
                sys.exit(1)
            print(f"Found matching file: {os.path.relpath(matched_file, project_root)}")
            all_files = [matched_file]
        else:
            parser.print_help()
            sys.exit(1)
            
        with Pool(processes=cpu_count()) as pool:
            results = pool.map(process_file, all_files)
        
        updated_files = [f for f in results if f]
        for file in updated_files:
            print(f"Updated: {file}")
        print(f"Total files updated: {len(updated_files)}")
        
    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

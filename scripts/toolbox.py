#!/usr/bin/env python3

import os
import sys
import argparse
from typing import Dict, List, Callable
import subprocess
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.text import Text
from rich import box
from rich.prompt import Prompt, Confirm
import questionary
from questionary import Choice
import pkg_resources
from pkg_resources import DistributionNotFound, VersionConflict

console = Console()

class ScriptToolbox:
    def __init__(self):
        self.ensure_dependencies()
        self.scripts: Dict[str, dict] = {
            "webp": {
                "name": "Image to WebP Converter",
                "path": "scripts/compress-img-to-webp.py",
                "description": "Convert images to WebP format with compression",
                "category": "Media",
                "args": ["--input", "--quality"]
            },
            "turso": {
                "name": "Turso DB Secrets Generator",
                "path": "scripts/generate-turso-secrets.py",
                "description": "Generate Turso DB credentials and update env vars",
                "category": "Database",
                "args": ["--overwrite"]
            },
            "ui-index": {
                "name": "UI Import Consolidator",
                "path": "scripts/generate-ui-index.py",
                "description": "Consolidate UI component imports",
                "category": "Code",
                "args": ["--file", "--all", "--folder"]
            }
        }

    def ensure_dependencies(self) -> None:
        """Check and install required dependencies."""
        requirements = ["rich>=10.0.0", "questionary>=1.10.0"]
        
        try:
            pkg_resources.require(requirements)
        except (DistributionNotFound, VersionConflict):
            console.print("[yellow]Installing required dependencies...[/yellow]")
            try:
                for req in requirements:
                    subprocess.check_call([
                        sys.executable, 
                        "-m", 
                        "pip", 
                        "install", 
                        req
                    ])
                console.print("[green]Dependencies installed successfully![/green]")
                
                # Reload modules after installation
                import importlib
                importlib.reload(rich)
                importlib.reload(questionary)
                
            except subprocess.CalledProcessError as e:
                console.print(f"[red]Failed to install dependencies: {str(e)}[/red]")
                sys.exit(1)
        except Exception as e:
            console.print(f"[red]Error checking dependencies: {str(e)}[/red]")
            sys.exit(1)

    def print_header(self) -> None:
        header = """
╔════════════════════════════════════════════╗
║             Developer Toolbox              ║
║        Interactive Script Management       ║
╚════════════════════════════════════════════╝
        """
        console.print(Panel(header, style="bold blue", box=box.DOUBLE))

    def print_help_menu(self) -> None:
        self.print_header()
        
        # Command Overview
        console.print("\n[bold cyan]Available Commands:[/bold cyan]")
        commands_table = Table(show_header=True, header_style="bold magenta", box=box.ROUNDED)
        commands_table.add_column("Command", style="green")
        commands_table.add_column("Description", style="white")
        
        commands_table.add_row(
            "npm run toolbox",
            "Start interactive menu"
        )
        commands_table.add_row(
            "npm run toolbox -- --list",
            "Show all available scripts"
        )
        commands_table.add_row(
            "npm run toolbox -- --script <id>",
            "Run a specific script directly"
        )
        commands_table.add_row(
            "npm run toolbox -- --dry-run",
            "Show what would be executed without running"
        )
        commands_table.add_row(
            "npm run toolbox -- --help",
            "Show this help menu"
        )
        
        console.print(commands_table)

        # Script Details
        console.print("\n[bold cyan]Available Scripts:[/bold cyan]")
        for script_id, details in self.scripts.items():
            console.print(Panel(
                Text.assemble(
                    ("ID: ", "dim"),
                    (f"{script_id}\n", "green"),
                    ("Name: ", "dim"),
                    (f"{details['name']}\n", "white"),
                    ("Category: ", "dim"),
                    (f"{details['category']}\n", "blue"),
                    ("Description: ", "dim"),
                    (f"{details['description']}\n", "white"),
                    ("Arguments: ", "dim"),
                    (", ".join(details.get('args', ['None'])), "yellow"),
                ),
                title=f"[bold]{details['name']}[/bold]",
                box=box.ROUNDED
            ))

        # Examples
        console.print("\n[bold cyan]Examples:[/bold cyan]")
        examples = Panel("""
[green]Run interactively:[/green]
    npm run toolbox

[green]List all scripts:[/green]
    npm run toolbox -- --list

[green]Run specific script:[/green]
    npm run toolbox -- --script webp

[green]Dry run a script:[/green]
    npm run toolbox -- --script webp --dry-run
        """,
            title="Usage Examples",
            box=box.ROUNDED
        )
        console.print(examples)

    def print_script_table(self) -> None:
        table = Table(show_header=True, header_style="bold magenta", box=box.ROUNDED)
        table.add_column("ID", style="dim")
        table.add_column("Name", style="bold cyan")
        table.add_column("Category", style="green")
        table.add_column("Description")
        
        for script_id, details in self.scripts.items():
            table.add_row(
                script_id,
                details["name"],
                details["category"],
                details["description"]
            )
        
        console.print(table)

    def get_script_path(self, script_id: str) -> str:
        base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        return os.path.join(base_path, self.scripts[script_id]["path"])

    def run_script(self, script_id: str, dry_run: bool = False) -> None:
        script = self.scripts.get(script_id)
        if not script:
            console.print(f"[red]Error:[/red] Script '{script_id}' not found.")
            return

        script_path = self.get_script_path(script_id)
        
        if not os.path.exists(script_path):
            console.print(f"[red]Error:[/red] Script file not found at: {script_path}")
            return

        # Gather arguments if the script has any
        args = []
        if script.get("args"):
            console.print(f"\n[yellow]Script parameters for {script['name']}:[/yellow]")
            for arg in script["args"]:
                value = questionary.text(f"Enter value for {arg} (press Enter to skip):").ask()
                if value:
                    args.extend([arg, value])

        command = [sys.executable, script_path] + args

        if dry_run:
            console.print(f"\n[yellow]Dry run - Would execute:[/yellow]")
            console.print(f"[blue]$ {' '.join(command)}[/blue]")
            return

        try:
            console.print(f"\n[green]Executing {script['name']}...[/green]")
            result = subprocess.run(command, check=True, text=True)
            console.print(f"\n[green]✓ Script completed successfully![/green]")
        except subprocess.CalledProcessError as e:
            console.print(f"\n[red]✗ Script failed with error code {e.returncode}[/red]")
        except Exception as e:
            console.print(f"\n[red]✗ Error: {str(e)}[/red]")

    def interactive_menu(self) -> None:
        while True:
            self.print_header()
            
            choices = [
                Choice(
                    title=f"{details['name']} ({script_id})",
                    value=script_id
                ) for script_id, details in self.scripts.items()
            ]
            choices.append(Choice(title="Exit", value="exit"))

            script_id = questionary.select(
                "Select a script to run:",
                choices=choices,
            ).ask()

            if script_id == "exit":
                console.print("\n[yellow]Goodbye! 👋[/yellow]")
                break

            dry_run = questionary.confirm("Do you want to do a dry run?").ask()
            self.run_script(script_id, dry_run)
            
            if not questionary.confirm("\nWould you like to run another script?").ask():
                console.print("\n[yellow]Goodbye! 👋[/yellow]")
                break

def main():
    parser = argparse.ArgumentParser(
        description="Interactive Script Toolbox",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--list", action="store_true", help="List all available scripts")
    parser.add_argument("--script", help="Run a specific script directly")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be executed without running it")
    
    args = parser.parse_args()
    
    toolbox = ScriptToolbox()
    
    if args.list:
        toolbox.print_script_table()
    elif args.script:
        toolbox.run_script(args.script, args.dry_run)
    else:
        toolbox.interactive_menu()

if __name__ == "__main__":
    main()

 BLUE='\033[0;34m'
CYAN='\033[0;36m'
}

# Function to show spinner
show_spinner() {
    local pid=$1
    local delay=0.1
    local spinstr='|/-\'
    while [ "$(ps a  | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    doneuild
    printf "    \b\b\b\b"
}

# Function to check current implementation
check_current_implementation() {
    if [ -f "src/state/auth/zustand.ts" ]; then
        echo "zustand"
    else
        echo "context"
    fi
}

# Function to show help menu
show_help() {
    log "\nAuth Implementation Switcher" "$CYAN"
    log "=========================" "$CYAN"
    log "\nThis script helps you switch between React Context API and Zustand implementations"
    log "for authentication state management in your application.\n"
    
    log "Current Implementation: $(check_current_implementation)" "$YELLOW"
    
    log "\nUsage:" "$BLUE"
    log "  $0 [command] [options]"
    
    log "\nCommands:" "$BLUE"
    log "  zustand     Switch to Zustand implementation"
    log "  context     Switch to Context API implementation"
    log "  check       Check current implementation"
    log "  interactive Start interactive menu"
    
    log "\nOptions:" "$BLUE"
    log "  -h, --help  Show this help message"
    
    log "\nImplementations:" "$BLUE"
    log "  Context API:" "$YELLOW"
    log "    - Built-in React solution"
    log "    - No additional dependencies"
    log "    - Good for small to medium applications"
    log "    - Files: src/state/auth/context.tsx"
    
    log "\n  Zustand:" "$YELLOW"
    log "    - Lightweight state management"
    log "    - Includes persistence"
    log "    - Better for larger applications"
    log "    - Files: src/state/auth/zustand.ts"
    
    log "\nExamples:" "$BLUE"
    log "  $0 zustand          # Switch to Zustand"
    log "  $0 context          # Switch to Context API"
    log "  $0 check            # Check current implementation"
    log "  $0 interactive      # Start interactive menu"
    log "Creating Zustand implementation file..." "$YELLOW"
    log "Created: src/state/auth/zustand.ts" "$GREEN"
}

# Function to show interactive menu
show_interactive_menu() {
    while true; do
        clear
        log "\nAuth Implementation Switcher" "$CYAN"
        log "=========================" "$CYAN"
        log "\nCurrent Implementation: $(check_current_implementation)" "$YELLOW"
        
        log "\nOptions:" "$BLUE"
        log "1) Switch to Context API"
        log "2) Switch to Zustand"
        log "3) Show current implementation details"
        log "4) Show help"
        log "5) Exit"
        
        read -p "$(echo -e ${BLUE}"Select an option [1-5]: "${NC})" choice
        
        case $choice in
            1)
                switch_to_context
                read -p "Press Enter to continue..."
                ;;
            2)
                switch_to_zustand
                read -p "Press Enter to continue..."
                ;;
            3)
                current=$(check_current_implementation)
                log "\nCurrent Implementation: $current" "$YELLOW"
                if [ "$current" = "zustand" ]; then
                    log "- Using Zustand with persistence"
                    log "- Package installed: zustand"
                    log "- Implementation file: src/state/auth/zustand.ts"
                else
                    log "- Using React Context API"
                    log "- No additional dependencies"
                    log "- Implementation file: src/state/auth/context.tsx"
                fi
                read -p "Press Enter to continue..."
                ;;
            4)
                show_help
                read -p "Press Enter to continue..."
                ;;
            5)
                log "\nGoodbye!" "$GREEN"
                exit 0
                ;;
            *)
                log "\nInvalid option" "$RED"
                read -p "Press Enter to continue..."
                ;;
        esac
    done
    
    # Check if already using Zustand
    if [ "$(check_current_implementation)" = "zustand" ]; then
        log "Already using Zustand implementation" "$YELLOW"
        return
    fi

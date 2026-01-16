#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change to the repository directory
cd "$SCRIPT_DIR" || exit 1

# Prompt user for new scope name
read -p "Enter the new package scope name (without @): " SCOPE_NAME

if [ -z "$SCOPE_NAME" ]; then
  echo "Error: Scope name cannot be empty"
  exit 1
fi

# Replace @la with the new scope in all files
echo "Replacing @la with @$SCOPE_NAME in all files..."
find . -type f \( -name "*.json" -o -name "*.ts" -o -name "*.js" -o -name "*.md" -o -name "*.yaml" -o -name "*.yml" \) ! -path "./node_modules/*" ! -path "./.pnpm-store/*" ! -path "./.turbo/*" ! -path "./.git/*" -exec sed -i "s/@la/@$SCOPE_NAME/g" {} +

echo "Scope replacement complete!"

# Run install
echo "Running package installation..."
pnpm install

# Run manypkg to update package.json files
echo "Fixing package.json files with manypkg..."
pnpm manypkg fix

# Cleanup
rm -rf .git renovate.json LICENSE init.sh

#!/bin/bash

set -euo pipefail

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

if [[ ! "$SCOPE_NAME" =~ ^[a-z0-9][a-z0-9._-]*$ ]]; then
  echo "Error: Scope name must contain only lowercase letters, numbers, dots, underscores, or hyphens"
  exit 1
fi

# Replace @la with the new scope in all text files. BSD sed (used by macOS)
# requires an explicit backup suffix for -i, while GNU sed does not.
if [ "$(uname -s)" = "Darwin" ]; then
  SED_IN_PLACE_ARGS=(-i '')
else
  SED_IN_PLACE_ARGS=(-i)
fi

replace_scope() {
  local file

  while IFS= read -r -d '' file; do
    sed "${SED_IN_PLACE_ARGS[@]}" "s|@la|@$SCOPE_NAME|g" "$file"
  done < <(
    find . -type f \( \
      -name "*.json" -o \
      -name "*.ts" -o \
      -name "*.js" -o \
      -name "*.mjs" -o \
      -name "*.md" -o \
      -name "*.yaml" -o \
      -name "*.yml" \
    \) ! -path "./node_modules/*" ! -path "./.pnpm-store/*" ! -path "./.turbo/*" ! -path "./.git/*" -print0
  )
}

echo "Replacing @la with @$SCOPE_NAME in all files..."
replace_scope

echo "Scope replacement complete!"

# Run install
echo "Running package installation..."
pnpm install

# Run sherif to update package.json files
echo "Fixing package.json files with sherif..."
pnpm lint:ws --fix

# Cleanup
rm -rf .git renovate.json LICENSE init.sh

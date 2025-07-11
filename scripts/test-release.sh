#!/bin/bash

# Script pro lokální testování releases
# Tento script vytvoří lokální "release" pro testování auto-updater funkcionality

echo "🔧 Preparing local release test..."

# Zkontrolovat, že jsme v správném adresáři
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Získat aktuální verzi
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📦 Current version: $CURRENT_VERSION"

# Zvýšit patch verzi pro test
echo "⬆️ Bumping version for test..."
npm version patch --no-git-tag-version

NEW_VERSION=$(node -p "require('./package.json').version")
echo "🆕 New version: $NEW_VERSION"

# Build aplikace
echo "🏗️ Building application..."
npm run build:draft

# Vrátit původní verzi
echo "🔄 Reverting version..."
npm version $CURRENT_VERSION --no-git-tag-version

echo "✅ Local release test prepared!"
echo "📂 Check the release folder: release/$NEW_VERSION"
echo ""
echo "To test auto-updater:"
echo "1. Install the built version"
echo "2. Create a GitHub release with higher version"
echo "3. Run the installed app to test update"

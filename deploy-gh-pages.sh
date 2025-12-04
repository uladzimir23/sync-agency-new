#!/bin/bash
#./deploy-gh-pages.sh

set -e

echo "🚀 Starting gh-pages deployment..."

# Сохраняем текущую ветку
CURRENT_BRANCH=$(git branch --show-current)
echo "📋 Current branch: $CURRENT_BRANCH"

# Проверяем, что мы в git репозитории
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository!"
    exit 1
fi

# Переходим на main и обновляем
echo "🔄 Switching to main branch..."
git checkout main
git pull origin main

# Проверяем существование temp-deploy (ваша фактическая папка сборки)
BUILD_DIR="temp-deploy"
if [ ! -d "$BUILD_DIR" ]; then
    echo "📦 Installing dependencies and building project..."
    npm ci
    npm run build
    
    if [ ! -d "$BUILD_DIR" ]; then
        echo "❌ Error: $BUILD_DIR directory still doesn't exist after build!"
        exit 1
    fi
fi

# Проверяем содержимое temp-deploy
echo "📁 Contents of $BUILD_DIR:"
ls -la $BUILD_DIR/
FILE_COUNT=$(find $BUILD_DIR -type f | wc -l)
echo "📊 Files count in $BUILD_DIR: $FILE_COUNT"

if [ "$FILE_COUNT" -eq 0 ]; then
    echo "❌ Error: $BUILD_DIR directory is empty!"
    exit 1
fi

# Переключаемся на gh-pages
echo "🔄 Switching to gh-pages branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
    # Получаем последние изменения
    git fetch origin
    if git ls-remote --heads origin | grep -q "gh-pages"; then
        echo "📥 Pulling latest gh-pages..."
        git reset --hard origin/gh-pages
    fi
else
    git checkout --orphan gh-pages
    echo "🆕 Creating new gh-pages branch"
fi

# Очищаем ветку полностью (кроме .git)
echo "🧹 Cleaning branch..."
git rm -rf . --quiet > /dev/null 2>&1 || true
git clean -fd --quiet || true

# Копируем содержимое temp-deploy безопасно
echo "📤 Copying build files from $BUILD_DIR..."
cp -r $BUILD_DIR/* . > /dev/null 2>&1 || true

# Копируем скрытые файлы из temp-deploy (кроме . и ..)
if [ -d "$BUILD_DIR" ]; then
    find $BUILD_DIR -maxdepth 1 -name ".*" ! -name "." ! -name ".." -exec cp -r {} . \; > /dev/null 2>&1 || true
fi

# Создаем .nojekyll для GitHub Pages
touch .nojekyll

# Проверяем финальную структуру
echo "📁 Final structure in gh-pages:"
ls -la
FINAL_COUNT=$(find . -type f -not -path "./.git/*" | wc -l)
echo "📊 Files count: $FINAL_COUNT"

if [ "$FINAL_COUNT" -eq 0 ]; then
    echo "❌ Error: No files to deploy!"
    git checkout $CURRENT_BRANCH
    exit 1
fi

echo "📋 All files:"
find . -type f -not -path "./.git/*" | sort

# Коммитим и пушим
echo "💾 Committing changes..."
git add .
if git diff-index --quiet HEAD --; then
    echo "⚠️ No changes to deploy"
else
    git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin gh-pages --force
    echo "✅ Successfully deployed to gh-pages"
fi

# Возвращаемся на исходную ветку
git checkout $CURRENT_BRANCH

echo "🎉 Deployment process completed!"
echo "🌐 Your site will be available at: https://uladzimir23.github.io/sync-agency-new"
echo "🔄 It may take 1-5 minutes for changes to propagate."
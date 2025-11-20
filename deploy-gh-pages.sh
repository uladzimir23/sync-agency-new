#!/bin/bash

set -e

echo "🚀 Starting gh-pages deployment..."

# Сохраняем текущую ветку
CURRENT_BRANCH=$(git branch --show-current)
echo "📋 Current branch: $CURRENT_BRANCH"

# Переходим на main и обновляем
echo "🔄 Switching to main branch..."
git checkout main
git pull origin main

# Устанавливаем зависимости и собираем проект
echo "📦 Installing dependencies and building project..."
npm ci
npm run build

# Проверяем содержимое dist
echo "📁 Contents of dist:"
ls -la dist/
echo "📊 Files count in dist: $(find dist -type f | wc -l)"

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
git rm -rf . --quiet 2>/dev/null || true
git clean -fd --quiet || true

# Копируем ВСЕ содержимое dist в корень gh-pages
echo "📤 Copying build files..."
cp -r dist/* . 2>/dev/null || true
cp -r dist/.* . 2>/dev/null || true

# Создаем .nojekyll для GitHub Pages (важно для SPA!)
touch .nojekyll

# Проверяем финальную структуру
echo "📁 Final structure in gh-pages:"
ls -la
echo "📊 Files count: $(find . -type f -not -path "./.git/*" | wc -l)"
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
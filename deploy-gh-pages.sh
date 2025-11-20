#!/bin/bash

#./deploy-gh-pages.sh

set -e # Останавливаем скрипт при ошибках

echo "🚀 Starting gh-pages deployment..."

# Переходим на main и обновляем
git checkout main
git pull origin main

# Собираем проект
echo "📦 Building project..."
npm run build

# Создаем временную папку для билда
mkdir -p temp-deploy
cp -r dist/* temp-deploy/

# Переключаемся на gh-pages или создаем новую
git checkout gh-pages 2>/dev/null || git checkout -b gh-pages

# Получаем последние изменения с удаленного репозитория
git fetch origin
git reset --hard origin/gh-pages 2>/dev/null || echo "No remote gh-pages, starting fresh"

# Очищаем ветку полностью
git rm -rf . --quiet || echo "No files to remove"
git clean -fd --quiet || echo "No files to clean"

# Копируем билд файлы
cp -r temp-deploy/* .
rm -rf temp-deploy

# Коммитим и принудительно пушим
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty
git push origin gh-pages --force

# Возвращаемся на main
git checkout main

echo "✅ gh-pages deployment completed!"
echo "🌐 Your site will be available at: https://uladzimir23.github.io/sync-agency-new"
echo "🔄 It may take 1-5 minutes for changes to propagate."
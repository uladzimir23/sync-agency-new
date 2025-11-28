//копирование струкруты проекта 
tree -I 'node_modules|.git|dist|build' --dirsfirst -a > structure.txt


# Удалите старые файлы
rm -rf dist temp-deploy

# Соберите и проверьте
npm run build:check

# Сделайте скрипт исполняемым
chmod +x deploy-gh-pages.sh

# Запустите деплой
./deploy-gh-pages.sh

VITE_TELEGRAM_GROUP_CHAT_ID=-4688441662

@echo off
git init
git add .
git commit -m %1
git push
php -S localhost:3000
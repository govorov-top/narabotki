#### Установка последней версии
```
composer create-project laravel/laravel example-app
```

#### Установка конкретной версии:
```
composer create-project laravel/laravel="7.*" myFirstProject --prefer-dist
```

#### Установка всех npm пакетов:
```
npm install
```
Если необходимо обновить:
```
npm update
```
#### Установка всех composer зависимостей:
```
composer install
```
Если необходимо обновить:
```
composer update
```
#### Выполнение всех миграций и наполнение базы данных
```
php artisan migrate:fresh --seed
```

#### Выбираем вместо Vue.js React.js в Laravel
```
php artisan ui react
```
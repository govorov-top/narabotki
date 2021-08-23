## Подключаемся к git и скачиваем удаленный репозиторий

#### 1) Скачиваем и устанавливаем гит, после в терминале вводим:
```
git config --global user.email "roman@govorov.top"
git config --global user.name "govorov-top"
```
#### 2) Инициализируем Git репозиторий:
```
git init
```

#### 3) Подключаемся к удаленному репозиторию:
```
git remote add origin https://github.com/govorov-top/project.git
```
Проверяем где мы находимся: 
```
git remote -v
```
Чтобы сменить репозиторий пишем следующую команду:
```
git remote set-url origin https://github.com/govorov-top/project2.git
```
#### 4) Скачиваем удаленный репозиторий на локалку
```
git clone https://github.com/govorov-top/project
```
Если нужна определенная ветка, то скачиваем так:
```
git clone https://github.com/govorov-top/project --branch master
```

#### 5) По необходимости смотрим существующие ветки и выбираем нужную
Смотрим существующие удаленные ветки: 
```
git branch -r
```
Выбираем нужную удаленню ветку: 
```
git checkout name_branch
```
Проверяем где мы находимся локально: 
```
git branch
```

#### 6) Скачиваем с Git ветку в наш проект
```
git pull
```
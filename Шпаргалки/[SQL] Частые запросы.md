#### Вставить:
```
INSERT INTO 'table' ('id', 'col_1', 'col_2', 'col_3')
VALUES (NULL, 'значение_1', 'значение_2', 'значение_3');
```

#### Обновить:
```
UPDATE 'table'
SET 'col_1' = 'писька'
WHERE 'table'.'id' = 1;
```
#### Удалить:
```
DELETE FROM 'table'
WHERE 'table'.'id' = 2;
```

#### Найти и заменить:
```
UPDATE 'table'
SET 'col_1' = REPLACE('col_1', 'значение_1', 'жопка')
WHERE 'col_1' LIKE '%значение_1%' COLLATE utf8mb4_bin
```
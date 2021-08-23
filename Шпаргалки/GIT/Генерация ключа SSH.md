## Создание нового ключа SSH

- [Оригинал](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#about-ssh-key-generation)


### Проверка существующих ключей SSH
Прежде чем сгенерировать SSH-ключ, вы можете проверить, есть ли у вас какие-либо существующие SSH-ключи.

1. Откройте Git Bash.

2. Введите, `ls -al ~/.ssh` чтобы узнать, присутствуют ли существующие ключи SSH:
```shell
$ ls -al ~/.ssh
# Lists the files in your .ssh directory, if they exist
```

3. Проверьте список каталогов, чтобы узнать, есть ли у вас открытый ключ SSH. По умолчанию имена файлов открытых ключей одно из следующих:
```shell
id_rsa.pub
id_ecdsa.pub
id_ed25519.pub
```

Если у вас нет существующей пары открытого и закрытого ключей или вы не хотите использовать те, которые доступны для подключения к GitHub, сгенерируйте новый ключ SSH .

Если вы видите в списке существующую пару открытого и закрытого ключей (например, id_rsa.pub и id_rsa ), которую вы хотели бы использовать для подключения к GitHub, вы можете добавить свой SSH-ключ в ssh-agent .
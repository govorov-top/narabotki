#### Падаем в тему WordPRess и устанавливаем npm:
```
cd wp-content/themes/rstheme
npm init -y
```

#### Ставим всякую хрень
```
npm i -D webpack webpack-cli css-loader postcss-loader autoprefixer style-loader mini-css-extract-plugin

```
#### Создаём файл webpack.config.js и наполняем
```
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './index.js',
    context: path.resolve(__dirname, "js"),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, "assets/js")
    },
    watch: true,
    module: {
        rules: [
            {
              test: /\.css$/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: []
                        }
                    }
                ]
            },
        ]
    }
}
```
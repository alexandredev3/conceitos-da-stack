# Configurando Babel

$ yarn add react react-dom
  - react-dom: ele e a indegração do react com a dom.

* Babel: Converter (transpilar) código do React para um código que o browser entenda.

* Webpack: Para cada tipo de arquivo (.js, .css, .png) eu vou transpilar o código de uma maneira diferente.

  Obs: O Webpack não consegui entender arquivos em js, css ou imagens, para isso vamos usar 
  loaders.

  Loaders: babel-loader, css-loader, image-loader.

$ yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli

```js
  // Maneira onde o código javascript e transpilado.
  module.exports = {
    presets: [
      // conjuto de configurações criadas por terceiros:
      module.exports = {
        presets: [
          '@babel/preset-env',
            // Ele vai transpilar um código js moderno em um js mais antigo, baseado no ambiente que estamos.
            // Exemplo: Se estivermos no Browser, ele vai la no browser entende quais funcionalidades que esse browser entende, e vai transpilar o código baseado nisso. No valores "default" ele volta 2 ou 3 versões anteriores, podemos passar algumas configurações.

          '@babel/preset-react'
            // Ele vai adicionar as funcinalidades do react nessa transpilação.
        ],
      }
    ]
  }
```

$ yarn add @babel/cli
  - E a interface de linha de comando do Babel.

$ yarn babel src/index.js --out-file public/bundle.js
  - src/index.js diretorio do arquivo que você que transpilar

  - --out-file public/bundle.js: flag para indicar onde você quer jogar esse arquivo transpilato.

# Configurando Webpack

  ```js
      const { resolve } = require('path');

      module.exports = {
      // Automatização na hora da transpilação

      entry: resolve(__dirname, 'src', 'index.js'),
      // O arquivo de entrada, o arquivo que vai ser transpilado.

      output: {
        path: resolve(__dirname, 'build'),
        filename: 'bundle.js'
      },
      // O arquivo de saida, o arquivo que vai ser gerado com o código mais antigo

      module: {
        rules: [
          {
            test: /\.js$/,
            // *propriedade obrigatoria
            /* /\.js a barra invertida e para indicar que e um ponto mesmo,
              o sinal de dolar($) que dizer que "termina com .js(nesse caso)".
              Sem o sinal de dolar ele ia verificar se tem o .js no nome do arquivo
            */

            exclude: /node_modules/,
            /*
              para excluir o node_modules do processo do webpack, porque essa res-
              posabilidade e da propria depedencia.
            */

            use: {
              loader: 'babel-loader'
            }

            /*
              Resumindo tudo, para todos os arquivos que termina com .js que NÃO
              estão dentro da pasta node_modules, adicionar esse loader...
            */
          }
        ]
      }
    }
  ```
    $ yarn add babel-loader
    - E o loader do Babel.

    $ yarn webpack --mode development

    $ yarn add webpack-dev-server -D
      - Ele vai ficar monitorando o arquivos, e toda vez que rola uma mundaça 
      ele vai transpilar o código novamente.

    $ yarn webpack-dev-server --mode development
    
# Boas vindas ao repositório do projeto Extrato

## Descrição do projeto

Aplicação front-end onde é possível criar uma conta, realizar login pelo nome, visualizar extratos e criar extratos.

## Instalação do projeto localmente

Após cada um dos passos, haverá um exemplo do comando a ser digitado para fazer o que está sendo pedido.

Obs.: Esta aplicação necessita do back-end que está disponível no link abaixo para o seu funcionamento:
```javascript
  https://github.com/Humberto-Bonadiman/Extrato_Bancario
```

1. Abra o terminal e depois clone o projeto:
```javascript
  git clone git@github.com:Humberto-Bonadiman/extrato.git
```

2. Acesse o diretório do projeto e depois utilize o comando **npm i** para instalar todas as dependências necessárias:
```javascript
  cd extrato
  npm install
```

4. Por último, rode o comando **npm start** para rodar o projeto e acesse-ló via browser, no caminho `http://localhost:3000/`.
```javascript
  npm start
```

## Testes

Para rodar os tests utilizados no frontend é indicado abrir duas abas do terminal

1. Na primeira aba digitar os seguintes comandos a partir da pasta raiz do projeto:
```javascript
  npm run start
```

2. Na segunda aba digitar o seguinte comando a partir da pasta raiz do projeto:
```javascript
  npm run cy:run
```

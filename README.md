# dotenvencrypt
A package designed to help teams use secret enviroment variables together, without the security risk

## Install
```
npm install dotenvencrypt --save-dev
```

## Usage
```
const { decrypt } = require('dotenvencrypt');
decrypt(process.env.ENV_PASS);

require('dotenv').config(); // this will read the generated `.env` and populate process.env.* accordingly
```

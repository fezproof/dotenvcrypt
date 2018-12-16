# dotenvencrypt
A package designed to help teams use secret enviroment variables together, without the security risk

## Install
```
npm install dotenvencrypt --save-dev
```

## Usage
### Step 1
Generate the encryted env file on the command line with
```
npx dotenvencrypt MyPasswordString
```
This will generate your .env.enc file to push to version control

### Step 2
Add this snippet to your code
```
if (process.env.NODE_ENV === 'production') {
  const { decrypt } = require('dotenvencrypt');

  decrypt(process.env.ENV_PASS);

  require('dotenv').config(); // this will read the generated `.env` and populate process.env.* accordingly

}
```

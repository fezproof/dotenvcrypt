# dotenvcrypt
A package designed to help teams use secret enviroment variables together, without the security risk

## Install
```
npm install dotenvcrypt --save-dev
```

## Usage
### Step 1
Navigate to the root if your project
Generate the encryted env file on the command line with
```
npx dotenvcrypt MyPasswordString
```
This will generate your .env.enc file to push to version control

### Step 2
Add this snippet to your code
```
if (process.env.NODE_ENV === 'production') {
  const { decrypt } = require('dotenvcrypt');

  decrypt(process.env.ENV_PASS);

  require('dotenv').config(); // this will read the generated `.env`

}
```
NOTE: dotenv is a requirement for this package to be of any use

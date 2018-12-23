[![](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/dotenvcrypt)

# dotenvcrypt
A package designed to help teams use secret enviroment variables together, without the security risk

## Install
```
npm install dotenvcrypt --save
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
```javascript
const { decrypt } = require('dotenvcrypt');

decrypt(process.env.YOUR_ENV_KEY);
```

> NOTE: dotenv is not required for the variables to be loaded

### Step 3
Share the password with your team
They then save it inside there personal .bashrc/.bash_profile using
```bash
export YOUR_ENV_KEY="MyPasswordString"
```
Which can now be accessed from the node instance, which will now decode and read the env variables into the app

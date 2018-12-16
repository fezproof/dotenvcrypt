const crypto = require('crypto');
const fs = require('fs');

const IV_LENGTH = 16; // For AES, this is always 16

const ENCRYPTED_FILE = '.env.enc';
const DECRYPTED_FILE = '.env';

const LENGTH_ERR = new Error(`
Password must be a 32 character string
This is due to encryption safety standards for aes-256
`);

function encrypt(password) {
  if (password.length !== 32) {
    throw LENGTH_ERR;
  }

  const text = fs.readFileSync(DECRYPTED_FILE);

  const iv = crypto.randomBytes(IV_LENGTH);

  const key = crypto.scryptSync(password, 'salt', 32);

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  fs.writeFileSync(ENCRYPTED_FILE, `${iv.toString('hex')}:${encrypted.toString('hex')}`);
}

function decrypt(password) {
  if (password.length !== 32) {
    throw LENGTH_ERR;
  }

  const text = fs.readFileSync(ENCRYPTED_FILE).toString();

  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const key = crypto.scryptSync(password, 'salt', 32);

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  fs.writeFileSync(DECRYPTED_FILE, decrypted.toString());
}

module.exports = { decrypt, encrypt };

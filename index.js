const crypto = require('crypto');
const fs = require('fs');

const IV_LENGTH = 16; // For AES, this is always 16

const ENCRYPTED_FILE = '.env.enc';
const DECRYPTED_FILE = '.env';

const { Transform } = require('stream');

class AppendInitVect extends Transform {
  constructor(initVect, opts) {
    super(opts);
    this.initVect = initVect;
    this.appended = false;
  }

  _transform(chunk, encoding, cb) {
    if (!this.appended) {
      this.push(this.initVect);
      this.appended = true;
    }
    this.push(chunk);
    cb();
  }
}

function encrypt(password) {
  const iv = crypto.randomBytes(IV_LENGTH);

  const key = crypto.scryptSync(password, 'salt', 32);

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  const readStream = fs.createReadStream(DECRYPTED_FILE);
  const appendIV = new AppendInitVect(iv);
  const writeSteam = fs.createWriteStream(ENCRYPTED_FILE);

  readStream.pipe(cipher).pipe(appendIV).pipe(writeSteam);
}

function decrypt(password) {
  const readInitVect = fs.createReadStream(ENCRYPTED_FILE, { end: 15 });

  let iv;
  readInitVect.on('data', (chunk) => {
    iv = chunk;
  });

  readInitVect.on('close', () => {
    const key = crypto.scryptSync(password, 'salt', 32);
    const readStream = fs.createReadStream(ENCRYPTED_FILE, { start: 16 });
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const writeStream = fs.createWriteStream(DECRYPTED_FILE);

    readStream
      .pipe(decipher)
      .pipe(writeStream);
  });
}

module.exports = { decrypt, encrypt };

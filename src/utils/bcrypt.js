const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, 1);
  } catch (err) {
    throw new Error(err);
  }
}

async function checkPasswords(hashedPassword, userPassword) {
  try {
    const chekedPasswords = await bcrypt.compare(hashedPassword, userPassword);
    return chekedPasswords;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  hashPassword,
  checkPasswords,
};

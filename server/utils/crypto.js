const crypto = require('crypto');

//SHA256 encryption
sha256 = (data) => {
    let hash = crypto.createHash('sha256');
    return hash.update(data, 'utf-8').digest('hex');
}

// create diffie hellman credentials



module.exports = { sha256 };
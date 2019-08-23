const crypto = require("crypto");

function generateHash(algorithm, digest) {
    return (string) => (
        crypto.createHash(algorithm).update(string).digest(digest)
    );
}

module.exports.sha256 = generateHash("sha256", "hex");
module.exports.sha512 = generateHash("sha512", "hex");
module.exports.sha1 = generateHash("sha1", "hex");
module.exports.md5 = generateHash("md5", "hex");
module.exports.generateHash = (algorithm) => generateHash(algorithm, "hex");

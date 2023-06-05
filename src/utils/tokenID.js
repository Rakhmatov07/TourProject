const jwt = require("jsonwebtoken");

class TokenId{
    constructor(secretKey){
        this.secretKey = secretKey;
    };

    async getToken(id) {
        const token = jwt.sign({id: id}, this.secretKey, { expiresIn: "20s"});
        return token;
    };

    async getId(req) {
        const token = req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, this.secretKey);
        return id;

    };
};

module.exports = TokenId;
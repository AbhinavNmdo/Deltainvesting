const jwt = require('jsonwebtoken');
const JWT_SECRET = "this$is$the$sec$string";

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(400).json({error: "Token not Found"})
    }
    else{
        try {
            const data = jwt.verify(token, JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(500).json({error: "Internal Server Error"});
        }
    }
};

module.exports = fetchuser;
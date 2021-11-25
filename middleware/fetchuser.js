const jwt = require('jsonwebtoken');
const JWT_SECRET = "this$is$the$sec$string";

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(400).json({success: false, error: "token not found"})
    }
    else{
        try {
            const data = jwt.verify(token, JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(500).json({success: false, error: "internal error"});
        }
    }
};

module.exports = fetchuser;
const jwt = require('jsonwebtoken');

const fetchAdmin = (req, res, next)=>{
    const token  = req.header('admin_auth_token');
    if(!token){
        res.status(400).json({success: false, error: "not an admin"});
    }
    else{
        try {
            const admin = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = admin.admin;
            next();
        } catch (error) {
            res.status(400).json({success: false, error: "internal error"});
        }
    }
};

module.exports = fetchAdmin;
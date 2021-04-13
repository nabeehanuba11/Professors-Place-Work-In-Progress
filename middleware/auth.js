const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req,res,next){
    /**Get Token */
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json({msg:'No Token Found'})
    }
    try {
        const decodetoken= jwt.verify(token, config.get('SecretKey'))
        req.user = decodetoken.user
        next();
    } catch (err) { 
        res.status(401).json({msg: 'Token is invalid'})
    }
}
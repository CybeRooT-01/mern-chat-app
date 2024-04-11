import User from "../model/user.model.js"
import jwt from "jsonwebtoken"
export const protectRoute = async ( req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            res.status(401).json({error: "unothorize - No token provided"})
        }
        const tokendecoder = jwt.verify(token, process.env.JWT_SECRET)
        if(!tokendecoder){
            res.status(401).json({error: "unothorize - Invalid Token"})
        }
        const user = await User.findById(tokendecoder.userId).select("-password") //quand on signais le token (dans generateToken.js) on a utiliser userId 

        if(!user){
            res.status(404).json({error: "utilisateur Introuvable"})
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
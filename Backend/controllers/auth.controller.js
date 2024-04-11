import User from "../model/user.model.js" 
import bcryptjs from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"
export const register = async (req, res) => {
    try {
        const {nomComplet, pseudo,password,confirmPassword,genre} =  req.body
       //verifier si il a donné deux mot de passe coehrents
        if(password !== confirmPassword){
            return res.status(400).json({error : "mot de passe de correspondent pas"})
        }
        //verifier si le pseudo est n'a pas ete prispar un autre user
        const user = await User.findOne({pseudo})
        if(user){
            return res.status(400).json({error : "le pseudo est deja pris"})
        }
        //hash le mot de passe
        const salt = await bcryptjs.genSalt(10)
        const hashedPass = await bcryptjs.hash(password, salt)
        const photoDeProfilGar = `https://avatar.iran.liara.run/public/boy?username=${pseudo}`
        const photoDeProfilFille = `https://avatar.iran.liara.run/public/girl?username=${pseudo}`
        //sauvegarder le user dnas notre collection
        const newUser = new User({
            nomComplet:nomComplet,
            pseudo:pseudo,
            genre:genre,
            password:hashedPass,
            photo: genre === "homme" ? photoDeProfilGar : photoDeProfilFille
        })
        if(newUser){
        //generer un token
        generateTokenAndSetCookie(newUser._id, res)
        await newUser.save()
        res.status(201).json({
            _id: newUser._id,
            nomComplet: newUser.nomComplet,
            pseudo:newUser.pseudo,
            photo:newUser.photo
        })
    }else{
        return res.status(400).json({error : "erreur lors de la traitement des donnée"})
    }
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
export const login = async (req, res) => {
    const {pseudo,password} =  req.body
    try {
        const user = await User.findOne({pseudo})
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "")
        if(!user || !isPasswordCorrect){
            res.status(400).json({error: "login ou mot de passe incorrect"})
        }
        generateTokenAndSetCookie(user._id, res)
        return res.status(200).json({
            _id:user._id,
            nomComplet:user.nomComplet,
            pseudo:user.pseudo,
            photo:user.photo
        })

    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
}
export const logout = async(req, res) => {
    try {
        res.cookie("jwt", "",{maxAge:0})
        res.status(200).json({message: "Deconnexion Reussi"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}



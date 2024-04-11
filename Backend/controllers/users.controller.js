import User from "../model/user.model.js" 

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filtredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password") //recuperer tout les users sauf celui qui a l'id loggenInUserId (on va pas s'afficher dans la liste de fil de discussion) et on kick leurs password d ela selection
        
        return res.status(200).json(filtredUsers)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
import Conversation from "../model/conversation.model.js"
import Message from "../model/message.model.js"

export const  sendMessage = async (req, res) => {
    // console.log("sent ",req.params.id) on recupere la queryparam comme satisfies. Si on avais fais /userID sur la router, on allais mettre req.params.userID
    try {
        const {message} = req.body
        const {id:receiverId} = req.params //la meme chose que req.params.id, juste destructurer le truc et on le renomme en receiverId
        const senderId = req.user._id //vu que dans notre protectRoute on a ajouter le user dans la requete donc on peut acceder aux propriétes de l'objet user
        
        let conversation = await Conversation.findOne({
            participants:{$all: [senderId, receiverId]} // tout les conversations dont les participants incluent senderId et receriverId
        })
        console.log(conversation);
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        //socker.io
        // await conversation.save()
        // await newMessage.save()

        await Promise.all([conversation.save(),await newMessage.save()])
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getMessages = async (req, res)=> {
    try {
        const {id:usersToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants:{$all: [senderId, usersToChatId]}
        }).populate("messages")
        if(!conversation){
            res.status(200).json([])
        }
        const messages = conversation.messages
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
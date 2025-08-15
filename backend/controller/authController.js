import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import userModel from "../model/userModel.js"

export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await userModel.findOne({username})

        if(!user) return res.status(401).json({message:"Credenciais invalidas"})

        const valid = await bcrypt.compare(password, user.password)
            
        if(!valid) return res.status(401).json({message:"Senha Inválida"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.json({token})

    } catch (error) {
        console.error(error)
     res.status(500).json({message:"Erro no servidor"})   
    }
}

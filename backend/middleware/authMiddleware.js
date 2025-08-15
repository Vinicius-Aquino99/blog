import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
    const auth = req.headers.authorization

    if(!auth|| !auth.startsWith("Bearer ")) {
        return res.status(401).json({message: "Não autorizado"})
    }

    const token = auth.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).json({message:'token invalido'})
    }
}
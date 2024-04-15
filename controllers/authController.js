const ApiError = require('../error/ApiError')
const { User, Note, Catalog } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const SECRET_KEY = process.env.SECRET_KEY

const generateJwt = (id, name) => {
    const payload = { id, name }
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
}

class authController {
    registration = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(ApiError.badRequest('Incorrect email or password', errors))

            const { name, password } = req.body
            const candidate = await User.findOne({where: { name }})
            if (candidate) return next(ApiError.badRequest('User with the same username is already existing'))
            const hashedPassword = bcrypt.hashSync(password, 3)
            const user = await User.create({ name, password: hashedPassword })
            await Catalog.create({ userId: user.id, name: "Without catalog" })
            return res.json({message: 'User successfully registered'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    deleteAccount = async(req, res, next) => {
        try {
            const id = req.params.id.slice(1)
            const password = req.params.password.slice(1)
            const user = await User.findOne({where: {id}})
            if (!user) return next(ApiError.badRequest('There is no such user'))
            const isPassword = bcrypt.compareSync(password, user.password)
            if (!isPassword) return next(ApiError.badRequest('You entered the wrong password'))
            await Note.destroy({where: {userId: id}})
            await User.destroy({where: {id}})
            return res.json({message: 'Your account successfully deleted'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    login = async (req, res, next) => {
        try {
            const { name, password } = req.body
            const user = await User.findOne({where: { name }})
            if (!user) return next(ApiError.internal('Wrong username or password'))
            const isPassword = bcrypt.compareSync(password, user.password)
            if (!isPassword) return next(ApiError.internal('Wrong username or password'))
            const token = generateJwt(user.id, user.name)
            const mainCatalog = await Catalog.findOne({
                where: {
                    name: "Without catalog",
                    userId: user.id
                }
            })
            return res.json({
                userId: user.id,
                token,
                mainCatalogId: mainCatalog.id
            })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    getIsAuth = async (req, res, next) => {
        try {
            const token = generateJwt(req.user.id, req.user.name)
            const mainCatalog = await Catalog.findOne({
                where: {
                    name: "Without catalog",
                    userId: req.user.id
                }
            })
            return res.json({
                userId: req.user.id,
                token,
                mainCatalogId: mainCatalog.id
            })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new authController()
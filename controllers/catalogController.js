const { Catalog } = require("../models")
const ApiError = require('../error/ApiError')

class noteController {
    getAll = async (req, res, next) => {
        try {
            const userId = req.user.id
            
            const response = await Catalog.findAndCountAll({
                where: {userId},
                order: [['updatedAt', 'DESC'] ]
            })
            return res.send(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    addCatalog = async (req, res, next) => {
        try {
            const userId = req.user.id
 
            let { name } = req.body
            if (!name) return next(ApiError.badRequest('There is no name'))

            const mayBeExisting = await Catalog.findOne({where: {userId, name}})
            if (mayBeExisting)
                return next(ApiError.badRequest('Names have to be unique'))
            const catalogId = await Catalog.create({ userId, name })
            return res.json(catalogId)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    deleteCatalog = async (req, res, next) => {
        try {
            const userId = req.user.id
            const id = req.params.id.slice(1)
            const catalog = await Catalog.findOne({where: {userId, id}})
            if (!catalog) return next(ApiError.badRequest('There is no such catalog'))
            await Catalog.destroy({where: {id, userId }});
            return res.json({message: 'Catalog successfully deleted'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    editCatalogName = async (req, res, next) => {
        try {
            const userId = req.user.id
            let { id, name } = req.body
            if (!name)
                return next(ApiError.badRequest("You didn't specify the name of the catalog"))
            if (name == "Without catalog")
                return next(ApiError.badRequest("You can't call the catalog that way"))

            const mayBeExisting = await Catalog.findOne({where: {userId, name}})
            if (mayBeExisting)
                return next(ApiError.badRequest('Names have to be unique'))

            await Catalog.update({name}, {where: {id, userId}})
            const catalogId = await Catalog.findOne({where: {id, userId}})
            return res.json(catalogId)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new noteController()
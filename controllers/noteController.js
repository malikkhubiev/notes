const { Note, Catalog } = require("../models")
const ApiError = require('../error/ApiError')

class noteController {
    getAll = async (req, res, next) => {
        try {
            let { limit, offset } = req.params

            const userId = req.user.id
            limit = limit.slice(1)
            offset = offset.slice(1)
            
            const response = await Note.findAndCountAll({
                offset, limit,
                where: {userId},
                order: [['lastDate', 'DESC'] ],
                include: Catalog
            })
            return res.send(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    getOne = async (req, res, next) => {
        try {
            let { id } = req.params
            const userId = req.user.id
            id = id.slice(1)
            
            const response = await Note.findOne({where: {id, userId}})
            return res.send(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    // getByCatalog = async (req, res, next) => {
    //     try {
    //         let { catalogId, limit, offset } = req.params

    //         const userId = req.user.id
    //         catalogId = catalogId.slice(1)
    //         limit = limit.slice(1)
    //         offset = offset.slice(1)
            
    //         const response = await Note.findAndCountAll({
    //             offset, limit,
    //             where: {
    //                 userId,
    //                 catalogId
    //             },
    //             order: [['lastDate', 'DESC'] ]
    //         })
    //         return res.send(response)
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message))
    //     }
    // }
    addNote = async (req, res, next) => {
        try {
            const userId = req.user.id
            let { header, body, date, lastDate, catalogId, color } = req.body
            if (!header) return next(ApiError.badRequest('There is no header'))
            if (!date || !lastDate || !userId) return next(ApiError.badRequest('You are not allowed to add notes'))
            if (!body) body = ''
            if (!catalogId) {
                const catalog = await Catalog.findOne({where: {
                    name: "Without catalog",
                    userId
                }})
                catalogId = catalog.id
            } 

            const note = await Note.create({ header, body, date, lastDate, catalogId, color, userId })
            return res.json(note)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    deleteNote = async (req, res, next) => {
        try {
            const userId = req.user.id
            const id = req.params.id.slice(1)
            const note = await Note.findOne({where: {userId, id}})
            if (!note) return next(ApiError.badRequest('There is no such note'))
            await Note.destroy({where: {id}});
            return res.json({message: 'Note successfully deleted'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    editNote = async (req, res, next) => {
        try {
            const userId = req.user.id
            let { id, header, body, lastDate, color } = req.body
            if (!id) return next(ApiError.badRequest('There is no such note'))
            if (!header) return next(ApiError.badRequest('There is no header'))
            if (!lastDate) return next(ApiError.badRequest('You are not allowed to edit notes'))

            const toUpdate = {header, body, lastDate}
            if (color) toUpdate.color = color;
            
            await Note.update(toUpdate, {where: {id, userId}})
            const note = await Note.findOne({where: {id, userId}})
            return res.json(note)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    sendNote = async (req, res, next) => {
        try {
            const userId = req.user.id
            let { id, catalogId } = req.body

            if (!id) return next(ApiError.badRequest('There is no such note'))
            if (!catalogId) catalogId = null

            await Note.update({catalogId}, {where: {id, userId}})
            const note = await Note.findOne({where: {id, userId}, include: Catalog})
            return res.json(note)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new noteController()
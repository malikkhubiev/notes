const { Note } = require("../models")
const ApiError = require('../error/ApiError')

class noteController {
    getAll = async (req, res, next) => {
        try {
            let { userId, limit, offset } = req.params
            userId = userId.slice(1)
            limit = limit.slice(1)
            offset = offset.slice(1)
            
            const response = await Note.findAndCountAll({offset, limit, where: {userid: userId}, order: [['lastDate', 'DESC'] ]})
            return res.send(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    addNote = async (req, res, next) => {
        try {
            let { header, body, date, lastDate, userId } = req.body
            if (!header) return next(ApiError.badRequest('There is no header'))
            if (!date || !lastDate || !userId) return next(ApiError.badRequest('You are not allowed to add notes'))
            if (!body) body = ''
            const note = await Note.create({ header, body, date, lastDate, userId })
            return res.json(note)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    deleteNote = async (req, res, next) => {
        try {
            const id = req.params.id.slice(1)
            const note = await Note.findOne({where: {id}})
            if (!note) return next(ApiError.badRequest('There is no such note'))
            await Note.destroy({where: {id}});
            return res.json({message: 'Note successfully deleted'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    editNote = async (req, res, next) => {
        try {
            let { id, header, body, lastDate } = req.body
            if (!id) return next(ApiError.badRequest('There is no such note'))
            if (!header) return next(ApiError.badRequest('There is no header'))
            if (!lastDate) return next(ApiError.badRequest('You are not allowed to edit notes'))
            await Note.update({header, body, lastDate}, {where: {id}})
            const note = await Note.findOne({where: {id}})
            return res.json(note)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new noteController()
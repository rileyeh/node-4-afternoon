const users = require('../models/users')
let id = 1

module.exports = {
    login: (req, res) => {
        const { username, password } = req.body 

        const user = users.find( user => user.username === username && user.password === password )

        if (user) {
            req.session.user.username = user.username
            res.status(200).send(req.session.user)
        } else {
            res.status(500).send('not allowed')
        }
    },

    register: (req, res) => {
        const { username, password } = req.body

        users.push({ id, username, password })
        id++

        req.session.user.username = username 

        res.status(200).send(req.session.user)
    },

    signout: (req, res) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },

    getUser: (req, res) => {
        const user = req.session.user.username
        res.status(200).send(user)
    }
}
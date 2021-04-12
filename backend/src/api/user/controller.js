const {success, notFound} = require('../../services/response/')
const User = require('./model').model
const {sign} = require('../../services/jwt')
const _ = require('lodash')
const catchDuplicateEmail = require("../../helpers/helpers").catchDuplicateEmail;
const validationHelpers = require("../../helpers/helpers");


const index = (req, res, next) =>
    User.find()
        .then((users) => users.map((user) => user.view()))
        .then(success(res))
        .catch(next)

const show = ({params}, res, next) =>
    User.findById(params.id)
        .then(notFound(res))
        .then((user) => user ? user.view(true) : null)
        .then(success(res))
        .catch(next)

const showMe = ({user}, res) =>
    res.json(user.view(true))


const create = ({body}, res, next) => {
    body.role = body.role[0];
    User.create(body)
        .then(user => {
            sign(user)
                .then((token) => ({token, user: user.view(true)}))
                .then(success(res, 201))
        })
    .catch((err) => validationHelpers.customValidation(res, err, next))
    // .catch((err) => catchDuplicateEmail(res, err, next))
}

const auth = (req, res, next) => {
    // na typ etapie mamy dostep do uzytkownika w polu req.user
    // Haslo dziala tylko przy logowaniu, wiec dalsza komunikacja jest z tokenem
    // Tworzymy i odsylamy nowy token
    const {user} = req
    sign(user)
        .then((token) => ({token, user: user.view(true)}))
        .then(success(res, 201))
        .catch(next)
}

const update = ({body, user}, res, next) =>
    User.findById(user.id)
        .then(notFound(res))
        .then((user) => user ? Object.assign(user, _.pickBy(body, _.identity)).save() : null)
        .then((user) => user ? user.view(true) : null)
        .then(success(res))
        .catch((err) => catchDuplicateEmail(res, err, next))

const destroy = ({params}, res, next) =>
    User.findById(params.id)
        .then(notFound(res))
        .then((user) => user ? user.remove() : null)
        .then(success(res, 204))
        .catch(next)

module.exports = {
    create, index, show, update, destroy, showMe, auth
}


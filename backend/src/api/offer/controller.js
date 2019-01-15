const { success, notFound } = require('../../services/response/')
const validationHelpers = require('../../helpers/helpers');
const Offer = require('./model').model

const create = ({ body }, res, next) => {
    Offer.create(body)
        .then((offer) => offer.view(true))
        .then(success(res, 201))
        .catch((err) => validationHelpers.customValidation(res, err, next))
}

const index = ({ query }, res, next) =>
  Offer.find()
    .then((offers) => offers.map((offer) => offer.view()))
    .then(success(res))
    .catch(next)

const show = ({params}, res, next) => {
    Offer.findById(params.id)
        .then(notFound(res))
        .then((offer) => offer ? offer.view(true) : null)
        .then(success(res))
        .catch(next)
}

const userListOffers = ({params}, res, next) => {
    Offer.find({ user: {"_id": params.id}})
        .then(notFound(res))
        .then((offer) => offer ? offer.view(true) : null)
        .then(success(res))
        .catch(next)
}


const update = ({ body, params }, res, next) =>
  Offer.findById(params.id)
    .then(notFound(res))
    .then((offer) => offer ? Object.assign(offer, body).save() : null)
    .then((offer) => offer ? offer.view(true) : null)
    .then(success(res))
    .catch(next)

const destroy = ({ params }, res, next) =>
  Offer.findById(params.id)
    .then(notFound(res))
    .then((offer) => offer ? offer.remove() : null)
    .then(success(res, 204))
    .catch(next)

module.exports = {
    create, index, show, update, destroy, userListOffers
}

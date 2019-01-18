const { success, notFound } = require('../../services/response/');
const validationHelpers = require('../../helpers/helpers');
const Comment = require('./model').model;

const create = ({ body }, res, next) => {
    Comment.create(body)
        .then((comment) => comment.view(true))
        .then(success(res, 201))
        .catch((err) => validationHelpers.customValidation(res, err, next))
};

const index = ({ query }, res, next) =>
  Comment.find()
    .then((comments) => comments.map((comment) => comment.view()))
    .then(success(res))
    .catch(next);

const singleComment = ({params}, res, next) => {
    Comment.findById(params.id)
        .then(notFound(res))
        .then((comment) => comment ? comment.view(true) : null)
        .then(success(res))
        .catch(next)
};


const show = ({params}, res, next) => {
    Comment.find({"offer.id": params.id})
        .then((comments) => comments.map((comment) => comment.view()))
        .then(success(res))
        .catch(next)
};

const update = ({ body, params }, res, next) =>
  Comment.findById(params.id)
    .then(notFound(res))
    .then((comment) => comment? Object.assign(comment, body).save() : null)
    .then((comment) => comment ? comment.view(true) : null)
    .then(success(res))
    .catch(next);

const destroy = ({ params }, res, next) =>
  Comment.findById(params.id)
    .then(notFound(res))
    .then((comment) => comment ? comment.remove() : null)
    .then(success(res, 204))
    .catch(next);

module.exports = {
    create, index, show, update, destroy, singleComment
};

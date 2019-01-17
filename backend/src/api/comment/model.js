const mongoose = require('mongoose')
const {Schema} = require('mongoose')

// https://mongoosejs.com/docs/schematypes.html
const commentSchema = new Schema({
    content: {
        type: String
    },
    offer: {
        type: mongoose.Schema.Types.Object, ref: 'Offer'
    },
    user: {
        type: mongoose.Schema.Types.Object, ref: 'User'
    }
}, {
    timestamps: true,
})


commentSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            content: this.content,
            offer: this.offer,
            user: this.user
        }

        return full ? {
            ...view,
            user: this.user,
            offer: this.offer,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

const model = mongoose.model('Comment', commentSchema)

module.exports = {model, commentSchema}


const mongoose = require('mongoose')
const {Schema} = require('mongoose')

// https://mongoosejs.com/docs/schematypes.html
const offerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

offerSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            name: this.name,
            location: this.location,
            description: this.description
        }

        return full ? {
            ...view,
            name: this.name,
            location: this.location,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

const model = mongoose.model('Offer', offerSchema)

module.exports = {model, offerSchema}


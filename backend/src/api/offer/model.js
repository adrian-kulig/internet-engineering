const mongoose = require('mongoose')
const {Schema} = require('mongoose')

// https://mongoosejs.com/docs/schematypes.html
const offerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Nazwa oferty jest wymagana."],
    },
    location: {
        type: String,
        required: [true, "Lokalizacja oferty jest wymagana."],
    },
    description: {
        type: String,
        required: [true, "Opis oferty jest wymagany."],
    },
    user: {
        type: mongoose.Schema.Types.Object, ref: 'User'
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
            description: this.description,
            user: this.user
        }

        return full ? {
            ...view,
            name: this.name,
            location: this.location,
            description: this.description,
            user: this.user,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

const model = mongoose.model('Offer', offerSchema)

module.exports = {model, offerSchema}


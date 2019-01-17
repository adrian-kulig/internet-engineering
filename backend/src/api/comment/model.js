const mongoose = require('mongoose');
const {Schema} = require('mongoose');

// https://mongoosejs.com/docs/schematypes.html
const commentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Komentarz nie może być pusty']
    },
    offer: {
        type: mongoose.Schema.Types.Object, ref: 'Offer',
        required: [true, 'Musi być przypisana oferta']
    },
    user: {
        type: mongoose.Schema.Types.Object, ref: 'User',
        required: [true, 'Musi być przypisany user']
    }
}, {
    timestamps: true,
});


commentSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            content: this.content,
            offer: this.offer,
            user: this.user
        };

        return full ? {
            ...view,
            user: this.user,
            offer: this.offer,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
};

const model = mongoose.model('Comment', commentSchema);

module.exports = {model, commentSchema};


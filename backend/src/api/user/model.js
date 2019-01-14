const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const roles = ['user', 'admin']

const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: [true, "Email jest wymagany<br>"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Hasło jest wymagane<br>"],
    minlength: [6, "Hasło wymaga minimum 6 znaków"]
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Nazwa użytkownika jest wymagana<br>"],
    minlength: [4, "Nazwa użytkownika wymaga minimum 4 znaków"]
  },
  offers: [{
    type: Schema.Types.ObjectId, ref: 'Offer'
  }],
  role: {
    type: String,
    enum: roles,
    default: 'user'
  }
}, {
  timestamps: true
})




userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  const rounds = 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view (full) {
    let view = {}
    let fields = ['id', 'name', 'email', 'offers', 'role']

    if (full) {
      fields = [...fields, 'role', 'email']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }
}

userSchema.statics = {
  roles
}

const model = mongoose.model('User', userSchema)

module.exports = {model, userSchema}

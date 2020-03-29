import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  
  createdAt: {
    type: Number,
    default: Date.now()
  },

  role: {
    type: String,
    required: true
  },

  login: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  blocked: {
    type: Boolean,
    default: false
  },

  departmentId: {
    type: mongoose.Schema.Types.ObjectId
  }
  
})

// Indexes
UserSchema.index({ login: 1})
UserSchema.index({ departmentId: 1})
// Indexes

// Methods
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash

  next()
})

UserSchema.methods.ComparePassword = function(password) {
  return bcrypt.compare(password, this.password)
}
// Methods

export default mongoose.model('User', UserSchema)

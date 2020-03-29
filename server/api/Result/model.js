import mongoose from 'mongoose'

const ResultSchema = new mongoose.Schema({

  createdAt: {
    type: Date,
    default: Date.now()
  },

  complete: {
    type: Boolean
  },

  points: {
    type: Number,
    required: true
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  testId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }

})

export default mongoose.model('Result', ResultSchema)

import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },

  img: {
    type: String
  },

  type: {
    type: String
  },

  category: {
    type: String
  },

  testId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

export default mongoose.model('Question', QuestionSchema)

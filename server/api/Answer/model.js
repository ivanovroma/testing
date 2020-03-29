import mongoose from 'mongoose'

const AnswerSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    testId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    resultId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    optionAnswerIds: {
        type: Array,
        required: true
    },

    category: {
      type: String
    },

    optionTrueIds: {
        type: Array,
        required: true
    }
  
})

export default mongoose.model('Answer', AnswerSchema)

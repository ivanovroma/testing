import mongoose from 'mongoose'

const OptionSchema = new mongoose.Schema({

    label: {
        type: String,
        required: true
    },

    correct: {
        type: Boolean,
        required: true
    },

    testId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
  
})

export default mongoose.model('Option', OptionSchema)

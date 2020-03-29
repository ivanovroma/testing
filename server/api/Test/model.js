import mongoose from 'mongoose'

const TestSchema = new mongoose.Schema({

    label: {
        type: String,
        required: true
    }
  
})

export default mongoose.model('Test', TestSchema)

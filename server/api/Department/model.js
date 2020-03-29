import mongoose from 'mongoose'

const DepartmentSchema = new mongoose.Schema({

    label: {
        type: String,
        required: true
    }
  
})

export default mongoose.model('Department', DepartmentSchema)

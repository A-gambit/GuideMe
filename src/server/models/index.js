import mongoose from 'mongoose'

const uri = 'mongodb://localhost/web_lab'

mongoose.connect(uri)

export default mongoose
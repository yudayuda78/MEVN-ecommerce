import mongoose, { mongo } from "mongoose"

const settingSchema = new mongoose.Schema({
    key: {type: String, required: true, unique: true},
    value: {type: String, required: true}
})

module.exports = mongoose.model('Setting', settingSchema)
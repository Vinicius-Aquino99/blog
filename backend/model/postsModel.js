import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    summary: {type: String, required: true},
    summaryContent: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

export default mongoose.model('Posts', postsSchema)
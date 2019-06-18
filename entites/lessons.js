const mongoose = require('mongoose');
const lessonsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: Number,
        required:true
    },
    name: {
        type: String,
        required:true
    }
},{
    collection: "lessons",
    versionKey: false
});

lessonsSchema.pre('save', function(next) {
    if(this._id===null||this._id===undefined)
    this._id = new mongoose.Types.ObjectId();
    next();
});

module.exports = mongoose.model('lessons', lessonsSchema);
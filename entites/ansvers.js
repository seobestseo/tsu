const mongoose = require('mongoose');
const ansversSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quest: {
        type: String,
        required:true
    },
    text: {
        type: String,
        required:true
    },
    predmetId: {
        type: Number,
        required:true
    }
},{
    collection: "ansvers",
    versionKey: false
});

ansversSchema.pre('save', function(next) {
    if(this._id===null||this._id===undefined)
    this._id = new mongoose.Types.ObjectId();
    next();
});

module.exports = mongoose.model('ansvers', ansversSchema);
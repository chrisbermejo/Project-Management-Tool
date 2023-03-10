const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    projectid: { 
        type: Number, required: true 
    },
    title: { 
        type: String, required: true 
    },
    description: { 
        type: String, required: true 
    },
    status: { 
        type: String, required: true 
    },
    projectedDate: { 
        type: String, required: true 
    },
    createdAt: { 
        type: Date, default: Date.now 
    }
  });
  

module.exports = mongoose.model('projects', UserSchema);


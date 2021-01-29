const mongoose = require('mongoose');
const Schema = mongoose.Schema

User = mongoose.model(
        "user", Schema( {
                username: {
                    type: String,
                    required: true,
                    min: 6,
                    max: 225
                },                
               
                password: {
                    type: String,
                    required: true,
                    min: 6,
                    max: 225
                },
              
            },
            {timestamps: true}
        )
    );
module.exports = User;

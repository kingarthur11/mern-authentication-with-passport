module.exports = mongoose => {
    const User = mongoose.model(
        "user", 
        mongoose.Schema(
            {
                userName: {
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
    return User;
}
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
});

const Food = mongoose.models.Foods || mongoose.model('Foods', foodSchema);

const connectDb = async (DATABASE_URL) => {
    try {
        
        await mongoose.connect(DATABASE_URL, {
            dbName: 'apna',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to DB");

        const data = await Food.find({});

        const foodCategory = await mongoose.connection.db.collection('foodCategory').find({}).toArray();

        global.Foods = data;
        global.foodCategory = foodCategory;

       




        

    } catch (error) {
        console.error("Database connection error:", error.message);
    }
};

module.exports = connectDb;

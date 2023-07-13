const mongoose = require("mongoose");

//Function to create Database connection
const dbConnection = async () => {
    try {
        const connectionOptions = {
            dbName: "blogsite",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        const connection = await mongoose.connect(process.env.DB_URL + "/blogsite", connectionOptions);
    } catch (error) {
        console.log("DB CONNECTION ERROR : ", error)
        return error;
    }
}

module.exports = {
    dbConnection
};

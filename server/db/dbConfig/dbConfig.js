const mongoose = require("mongoose");

const dbConnection = async () => {
    try {

        const connectionOptions = {
            dbName: "blogsite",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        const connection = await mongoose.connect(process.env.DB_URL + "/blogsite", connectionOptions);
        console.log("___Connected With DB___");
    } catch (error) {
        console.log("DB CONNECTION ERROR : ", error)
        return;
    }
}

module.exports = {
    dbConnection
};

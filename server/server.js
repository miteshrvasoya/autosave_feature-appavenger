const express = require("express");
const app = express();
const cors = require("cors");

const blogRoute = require("./routes/blogRoute");
const {dbConnection} = require("./db/dbConfig/dbConfig");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.SERVER_PORT || 7878;

//Create connection with the Database
dbConnection();

app.use("/blog", blogRoute);


//Listen the server on PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
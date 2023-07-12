const express = require("express");
const app = express();

const blogRoute = require("./routes/blogRoute");
const {dbConnection} = require("./db/dbConfig/dbConfig");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.SERVER_PORT || 7878;

dbConnection();

app.use("/blog", blogRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
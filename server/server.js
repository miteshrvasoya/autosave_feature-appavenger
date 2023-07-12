const express = require("express");
const app = express();


require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.SERVER_PORT || 7878;

app.use("/blog");

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
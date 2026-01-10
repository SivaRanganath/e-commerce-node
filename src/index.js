const express = require("express");
const {connectDatabase} = require("./config/data-config");
const cookieparser = require("cookie-parser");
const mainRouter = require("./routes/router");
const cors = require("cors");
const portNumber = 3000;

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));

app.use("/", mainRouter);




connectDatabase().then(() => {
    app.listen(portNumber, () => {
        console.log(`Server is running on port ${portNumber}`);
    });
}).catch((err) => {
    console.log("Database connection failed", err);
});

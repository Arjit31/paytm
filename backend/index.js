const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rootRouter = require("./routes/index");


const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1", rootRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

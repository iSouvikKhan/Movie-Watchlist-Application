const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

app.use("/api/v1", mainRouter);

app.listen(port, function(err){
    if(err){
        console.log("error listening", err);
    }else{
        console.log(`Listening at port ${port}`);
    }
})
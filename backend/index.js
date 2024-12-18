const express = require("express");
const rootRouter = require("./routes/index.js");
const cors = require("cors");
// const userRouter = require("./routes/user.js")

const app = express();

app.use(cors());
app.use(express.json());

//app.use-> act as middleware but also helps in routing the page 
// depending upon arguments passing init , middleware(when single arg passed)
app.use("/api/v1/", rootRouter);
// app.use('/api/v1/user', userRouter); it will work too

app.listen(3000);
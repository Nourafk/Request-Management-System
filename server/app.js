require("dotenv").config({ path: "config.env" });
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");



// middleware 

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/Request"));

// server config
const PORT = process.env.PORT || 2000;
app.listen(PORT, async () => {
  try {
    connectDB();
    
  } catch (e) {
    console.error(e);
  }
  console.log(`server listening on port: ${PORT}`);
});



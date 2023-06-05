require("dotenv/config");
const express = require("express");
const route = require("./routes");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api", route);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} port.`);
})




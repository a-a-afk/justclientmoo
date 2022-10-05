const express = require("express");
const app = express();

const port = 3e3;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/JustClient.es.js");
});

app.listen(port, () => {
    console.log(`JS file served on http://localhost:${port}/`);
});
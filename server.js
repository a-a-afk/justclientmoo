const express = require("express");
const app = express();
const fs = require("fs");

const port = 3e3;

app.get("/", (req, res) => {
    const jc = fs.readFileSync("./dist/JustClient.es.js", "utf-8");
    res.send(jc);
    // res.sendFile("/dist/JustClient.es.js");
});

app.listen(port, () => {
    console.log(`JS file served on http://localhost:${port}/`);
});
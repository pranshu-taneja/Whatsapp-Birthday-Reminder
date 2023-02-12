const express = require("express");
const app = express();
const port = 3000;

//------------------- ical code -------------------
const fs = require("fs");
const ical = require("cal-parser");

const myCalendarString = fs.readFileSync("./file.ics", "utf-8");

const parsed = ical.parseString(myCalendarString);
//------------------- ical code -------------------

app.get("/", async (req, res) => {
  parsed.events.forEach((birthday) => {
    let da = new Date(birthday.dtend.value);
    console.log(da.getUTCMonth() + "-" + da.getUTCDate() + "-" + da.getUTCFullYear() + " -----> " + birthday.summary.value);
  });
  res.send("Hello World from the server!!");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));



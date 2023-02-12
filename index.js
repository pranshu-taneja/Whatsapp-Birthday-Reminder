const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});


//------------------- cal parser library code -------------------
const fs = require("fs");
const ical = require("cal-parser");

const myCalendarString = fs.readFileSync("./file.ics", "utf-8");

const parsed = ical.parseString(myCalendarString);

//------------------- cal parser library code -------------------



client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    client.sendMessage(message.from, ("Total of "+ parsed.events.length + " data is available!!"))


    let da = new Date(parsed.events[message.body].dtend.value);
    client.sendMessage(message.from, da.getUTCMonth() + "-" + da.getUTCDate() + "-" + da.getUTCFullYear() + " -----> " + parsed.events[message.body].summary.value);

    // client.sendMessage(message.from, parsed.events[message.body].description.value);

}); 

client.initialize();
 
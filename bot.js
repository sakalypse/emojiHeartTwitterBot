const twit = require('twit');
const config = require('./config.js');
const request = require('request');
const dotenv = require('dotenv');
const Papa = require('papaparse');
const fs = require('fs');
dotenv.config();

let Twitter = new twit(config);

async function post(){

    let emojiData = await getRandomEmoji();
    let emoji = emojiData.character;
    let emojiName = emojiData.slug;

    let name;
    do{
        name = ""+await getRandomName();
    }while(name.length<=0 || name.length>15);
    name="Ramin"
    let spaceToAdd = (15-name.length);
    let nameToWrite = emoji;
    for(let i=0; i<spaceToAdd; i++){
        nameToWrite += " ";
    }
    nameToWrite += name;
    for(let i=0; i<spaceToAdd; i++){
        nameToWrite += " ";
    }
    nameToWrite += emoji;
    
    Twitter.post('statuses/update',
                {
                    status: 
                    "❤️   "+emoji+emoji+"     "+emoji+emoji+"\n"+
                    "   "+emoji+emoji+emoji+emoji+emoji+emoji+emoji+"\n"+
                    emoji+emoji+emoji+emoji+emoji+emoji+emoji+emoji+"\n"+
                    nameToWrite+"\n"+
                    "   "+emoji+emoji+emoji+emoji+emoji+emoji+emoji+"\n"+
                    "        "+emoji+emoji+emoji+emoji+emoji+"\n"+
                    "             "+emoji+emoji+emoji+"\n"+
                    "                 "+emoji

                });

    console.log("Posted");
}

function getRandomEmoji(){
    return new Promise ((resolve) => {
        request(`https://emoji-api.com/emojis?access_key=${process.env.keyEmojiAPI}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let listEmojis = JSON.parse(body);
                let numRandom = getRandomInt(listEmojis.length-1);
                resolve(listEmojis[numRandom]);
            }
        })
    });
}

function getRandomName(){
    const file = fs.createReadStream('firstname.csv',"latin1");
    return new Promise ((resolve) => {
        Papa.parse(file, {
            complete: function(names) {
                resolve(names.data[getRandomInt(2543)]);
            }
        });
    });
}

function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

setInterval(post, 5000);
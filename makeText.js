/** Command-line tool to generate Markov text. */

const markov = require("./markov")
const process = require("process");
const fs = require("fs")
const axios = require("axios");

function genText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path){
    fs.readFile(path, "utf8", (err, data) => {
        if(err){
            console.error(`Error: ${err}`);
            process.exit(1);
        }
        else{
            genText(data);
        }
    });
}

async function makeTextURL(url){
    let resp;
    try{
        resp = await axios.get(url);
    }
    catch(err){
        console.error(`Error: ${err}`);
        process.exit(1);
    }
    genText(resp.data);
}

let [method, path] = process.argv.slice(2);

if(method === "file"){
    makeText(path);
}
else if(method === "url"){
    makeTextURL(path);
}
else{
    console.error(`Error with method: ${method}`)
}
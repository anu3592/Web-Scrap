const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const url = 'https://rategain.com/blog';

let json = [];
async function call(){   
    const result = await  axios.get(url)
    let $ = cheerio.load(result.data);
    $('.wrap').each(async function(el, index){
        let imgUrl = $(this).find('a').attr('href');
        const title = $(this).find('div.content h6 a').text();
        //const st = $(this)
        let date = $(this).find('div.content .blog-detail .bd-item');
        date = date.find('span').text().toString();
        //date = date.substr(0, date.length-4);
        let temp = date.split("B");
        date = temp[0];
        let likes = $(this).find('div.content .zilla-likes span').text().toString();
        likes = likes.substring(0,likes.length-11);
        const jsonData = {
            img:imgUrl,
            title:title,
            date:date,
            likes:likes
        };
        json.push(jsonData);
    })
    
    const json2csvParser =  new Json2csvParser({ header: true });
    const csvData = json2csvParser.parse(json);

    fs.writeFile("Data.csv", csvData, "utf-8", function(error) {
    if (error) throw error.message;
    console.log("Write to Data.csv successfully!");
    });
}

call();
// 1 - Install cheerio package it returns dom content (npm i cheerio)
// 2 - Install axios it use in fetching the url where we want data (npm i axios)
// 3 - For converting or exporting data from mongoDB to csv file use json2csv for this Install (npm i json2csv) package.

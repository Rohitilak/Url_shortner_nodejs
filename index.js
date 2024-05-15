import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { nanoid } from "nanoid";

const mapping = {};


const port = 3009;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root : path.dirname("")});
})

app.post('/shorten', (req, res) => {
    //shorten the url
    const data = req.body;
    const longUrl = data.url;
    const shortUrl = nanoid(5);
    mapping[shortUrl] =longUrl;
    res.send(`The short url is : http://localhost:${port}/${shortUrl} `)
})

app.get('/:shortUrl', (req, res)=>{
    const shortUrl = req.params.shortUrl
    if(mapping[shortUrl]){
        res.redirect(mapping[shortUrl])
        
    }else{
        res.status(404).send("the short url is not exists")
    }
})

app.listen(3009, ()=>{
    console.log("your server is running on port 3009");
})
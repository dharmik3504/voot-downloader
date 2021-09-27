const express = require('express')
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const router = require("express-promise-router")();


const app = express()

app.use(bodyParser.json({limit: '500mb'}));
app.use(express.json());
app.use(express.urlencoded( {extended: false}));

app.use(cors({origin: '*'}));


const getAllDataVideQuality = require('./getAllDataVideQuality');
const m3u8ToMp4_online= require('./m3u8ToMp4_online');
const m3u8ToMp4_offline= require('./m3u8ToMp4_offline');
const getSeason= require('./getSeason');
const getEpisodeBySeason= require('./getEpisodesbySeson');



const port = 3000

app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, "index.html"))
})
app.get('/season', (req, res) => {
    var {URL}=req.query;
    
    var splitURL = URL.split('/')
    var Id = splitURL[splitURL.length - 1];
    getSeason.get_season(Id)
        .then((res1)=>{
            res.send(res1);
    }).catch((error)=>{
        res.send(error)
    })
    
  
    
})
app.get('/EpisodeBySeason', (req, res) => {
    var {id}=req.query;
     getEpisodeBySeason.get_EpisodeBySeason(id)
            .then((res1)=>{
                res.send(res1);
        }).catch((error)=>{
            res.send(error)
        })
})
app.post('/getAllDataVideQuality', (req, res) => {
    
    var {
        getAllVideQualityArray,
        qualityType,
        watchVideoIn
    } = req.body;
    
   var result= getAllDataVideQuality.post_getAllDataVideQuality(getAllVideQualityArray,qualityType);
    res.send(result);
})
app.post('/m3u8ToMp4', (req, res) => {
    var {
        folderName,
        m3u8Data,
        type
    } = req.body;
    if(type =="online")
    {
            
        var result=m3u8ToMp4_online.post_m3u8ToMp4_online(folderName, m3u8Data,res);
    }
    else if(type=="offline")
    {
        m3u8ToMp4_offline.post_m3u8ToMp4(folderName, m3u8Data);
    }
    

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



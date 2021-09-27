const https = require('https')
const axios = require('axios');
const { response } = require('express');

var totalSeasonCount=0;
var StoreNoOfSeasonArray=[];
vootSubIdUrl="https://psapi.voot.com/jio/voot/v1/voot-web/content/generic/season-by-show";
var obj={
    sort:"season:desc",
    responseType:"common",
    page:1
  }
const  testfun=(Id)=> {
    obj.id=Id;
    
    var cnt=0
    var tempArray=[];
     return new Promise((resolve, reject) => {
    
        axios.get(vootSubIdUrl, {
            params:obj
          })
          .then(function (respone) {
            seasonDetail=respone.data;
            totalSeasonCount = seasonDetail.totalAsset;
            for (var i = 0; i < seasonDetail.result.length; i++) {
                var {
                    fullTitle,
                    id,
                    season,
                    showName
                } = seasonDetail.result[i];
                StoreNoOfSeasonArray.push({fullTitle, id, season, showName})
            }
            // resolve(tempArray);
            if (StoreNoOfSeasonArray.length<totalSeasonCount && StoreNoOfSeasonArray.length != totalSeasonCount && seasonDetail.result.length!=0) {
                obj.page+=1;
                resolve(testfun(Id))
                // tempArray=StoreNoOfSeasonArray;
                
            }
            else{
                
                 resolve(StoreNoOfSeasonArray);
                //  return StoreNoOfSeasonArray;
            }
          })
          .catch(function (error) {
            reject(error);
          })
    })
    }


    async function fetchSeason(Id){
        totalSeasonCount=0;
        StoreNoOfSeasonArray=[];
        obj.page=1;
        const SesonArray=await testfun(Id);
        return SesonArray
        
    }
    
    
    
    
   

    
    module.exports.get_season=fetchSeason;
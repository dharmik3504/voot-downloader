const axios = require('axios');
var totalSeasonCount=0;
var StoreNoOfSeasonArray=[];
const getAllVideoQuality= require('./getAllVideoQuality');

url="https://psapi.voot.com/jio/voot/v1/voot-web/content/generic/series-wise-episode";


var obj={
    sort:"episode:desc",
    responseType:"common",
    page:1
  }
const  testfun=(id)=> {
    console.log(id)
     obj.id=id;
    
    var cnt=0
    var tempArray=[];
     return new Promise((resolve, reject) => {
    
        axios.get(url, {
            params:obj
          })
          .then(function (respone) {
            responeArray=respone.data;
            // responeArray responeArray
            totalSeasonCount = responeArray.totalAsset;
            for (var i = 0; i < responeArray.result.length; i++) {
                var {
                    title,
                    urlStructure
                } = responeArray.result[i].seo
                var {
                    season,
                    fullTitle,
                    episode
                } = responeArray.result[i]
                var spliturlStructure = urlStructure.split("/");
                var episodeId = spliturlStructure[spliturlStructure.length - 1];
                var tempEpisodeTitle = "S" + season + " E" + episode + " ." + fullTitle
                var videoLink="https://apiv2.voot.com/wsv_2_3/playBack.json?mediaId="+episodeId;
                StoreNoOfSeasonArray.push({tempEpisodeTitle,videoLink})
            }
            // resolve(tempArray);
            if (StoreNoOfSeasonArray.length<totalSeasonCount && StoreNoOfSeasonArray.length != totalSeasonCount && responeArray.result.length!=0) {
                obj.page+=1;
                resolve(testfun(id))
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


    async function fetchEpisodeBySeason(id){
        totalSeasonCount=0;
        StoreNoOfSeasonArray=[];
        obj.page=1;
    const allEpsoideBySeason=await testfun(id);
        return allEpsoideBySeason
        
    }
    async function abc(id){
        return new Promise((resovle,reject)=>{

            fetchEpisodeBySeason(id).then((res)=>{
                getAllVideoQuality.get_AllVideoQuality(res)
                 .then((result)=>{
                    var combineArray=[];
                    for(var i=0;i<result.length;i++){
                        // console.log(result[i])
                        var abc={...result[i],...res[i]}
                        combineArray.push(abc)
                    }
                    resovle (combineArray)
                 })
                 .catch((e)=>{
                     reject(e);
                 })
                
            })
        })
    }
    



    module.exports.get_EpisodeBySeason=abc; 
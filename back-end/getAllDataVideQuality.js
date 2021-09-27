const getAllDataVideQuality=(getAllVideQuality,quality)=>{
    // var abc=getAllVideQuality[0].assets[0]
    var VideQualityDataArray=[];
      for(var i=0;i<getAllVideQuality.length;i++){
        var VideQualityData=getAllVideQuality[i].assets[0].assets[0].items[0].files
        var VideTitleData=getAllVideQuality[i].assets[0].assets[0].items[0];
        if(VideTitleData!=null && VideTitleData!=undefined){

            var {title,episodeNo,season,entryId}=VideTitleData;
            var tempEpisodeTitle="S"+season+" E"+episodeNo+" ."+title
            var videolinkofAllEpsoide=getVideoArrayBasedonQuality(VideQualityData,tempEpisodeTitle,quality,entryId)
            if(videolinkofAllEpsoide && videolinkofAllEpsoide.length>0){

                var {Format,URL,episodeTitle,entryId}=videolinkofAllEpsoide[0];
                VideQualityDataArray.push({Format,URL,episodeTitle,entryId,episodeNo})
            }
            else{
                console.log("Something went wrong: in videolinkofAllEpsoide")

            }
        }
        else{
            console.log("Something went wrong: in VideTitleData")
        }
        
      }

      return VideQualityDataArray;
  }
  const getVideoArrayBasedonQuality=(VideQualityData,episodeTitle,quality,entryId)=>{
    var videolinkofAllEpsoide=[];
    for(var i=0;i<VideQualityData.length;i++){
       if(VideQualityData[i].Format==quality){
         videolinkofAllEpsoide.push(VideQualityData[i]);
         VideQualityData[i].episodeTitle=episodeTitle;
         VideQualityData[i].entryId=entryId;
         break; 
       } 
    }
    return videolinkofAllEpsoide;  
  }

module.exports.post_getAllDataVideQuality=getAllDataVideQuality;
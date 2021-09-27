const https = require('https')
const fs = require('fs')

const common_FunCreateFolder= require("./common");

const downloadOnlineFile=(folderName, m3u8Data,res)=> {
   
    console.log("m3u8Data LENgth: "+m3u8Data.length)
    
    const downloadFolderPath = folderName
    console.log(process.env.USERPROFILE)
    var pathName="\\Downloads\\";
    var cnt=0
    const downloadFile = obj => {
       
        try{
            return new Promise((resolve, reject) => {
                https.get(obj.URL, res => {
                  if (res.statusCode === 200) {
                      cnt+=1;
                    //   console.log(cnt);
                    const splitUrl = obj.URL.split('/')
                    // const filename = obj.episodeTitle+".m3u8" 
                    const filename= (common_FunCreateFolder.returnValidFileName(obj.episodeTitle))+".m3u8"
                    const outputPath =  process.env.USERPROFILE+pathName+(`${downloadFolderPath}\\${filename}`)
                    // app.locals.basedir = (outputPath)
                    const file = fs.createWriteStream(outputPath)     
                    res.pipe(file).on('close', resolve)
                  } else {
                      
                    reject(res.statusCode)
                  } 
                })
              })
        }
        catch(error){
            console.log(error);
        }
        
    }   
    
    common_FunCreateFolder.createFolder(process.env.USERPROFILE+pathName+(`${downloadFolderPath}`))
    for(var i=0;i<m3u8Data.length;i++){
        for(var j=i+1;j<m3u8Data.length;j++){
            if(m3u8Data[i].URL === m3u8Data[j].length){
               console.log("same link which is not possible check array m3u8Data index :"+ i+" and " + " j") 
               
            }
        }
    }
    
    let downloadedFiles = 0
    m3u8Data.forEach(async obj => {
      await downloadFile(obj)
      downloadedFiles++
      console.log(" " +`${downloadedFiles}/${m3u8Data.length} downloaded`)
    })
    return ;
    }

    module.exports.post_m3u8ToMp4_online=downloadOnlineFile;
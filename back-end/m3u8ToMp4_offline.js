var m3u8ToMp4 = require("m3u8-to-mp4");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const common_FunCreateFolder= require("./common");

const m3u8ToMp41= (folderName, m3u8Data)=> {
    console.log(m3u8Data)
    const downloadFolderPath = folderName
    var pathName="\\Downloads\\";
    var rootPathName=process.env.USERPROFILE+pathName+(`${downloadFolderPath}`);
    var subRootPathName=rootPathName+"\\offline";
    common_FunCreateFolder.createFolder(rootPathName)
    common_FunCreateFolder.createFolder(subRootPathName)

    const downloadFile = obj => {
   
        try{
            return new Promise((resolve, reject) => {
                try{
                      var {
                          Format,
                          URL,
                          episodeTitle
                      } = obj;
                      var converter = new m3u8ToMp4();
                    const filename= (common_FunCreateFolder.returnValidFileName(episodeTitle))+".mp4"
                    const outputPath =   subRootPathName+"\\"+filename;
                    //   console.log(cnt);
                    ffmpeg.setFfmpegPath(ffmpegPath);
                    resolve(converter.setInputFile(URL).setOutputFile(outputPath).start());
                  } catch(err) {
                      
                    console.log(err)
                  } 
                
              })
        }
        catch(error){
            console.log(error);
        }
        
    }
    


    let downloadedFiles = 0
    m3u8Data.forEach(async obj => {
      await downloadFile(obj)
      downloadedFiles++
      console.log(" " +`${downloadedFiles}/${m3u8Data.length} downloaded`)
      
    })
}

module.exports.post_m3u8ToMp4=m3u8ToMp41;
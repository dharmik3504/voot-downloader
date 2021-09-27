const fs = require('fs')
const FunCreateFolder=(folderName) =>{


    // const folderName = folderName
    console.log(folderName)
    try {
        if (! fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
        return true;
    } catch (err) {
        console.error(err)
        return false;
    }

}
const validFilename= (filename) =>
 {
    if(filename.includes("\\") ) 
    {
        console.log(filename.replace("\\",""))
        return filename.replace("\\","");
    }
    else if(filename.includes("/")){
        console.log(filename.replace("/",""))
        return filename.replace("/","");
    }
    else if(filename.includes(":")){
        console.log(filename.replace(":",""))
        return filename.replace(":","");
    }
    else if(filename.includes("*")){
        console.log(filename.replace("*",""))
        return filename.replace("*","");
    }
    else if(filename.includes("?")){
        console.log(filename.replace("?",""))
        return filename.replace("?","");
    }
    else if(filename.includes('"')){
        console.log(filename.replace('"',""))
        return filename.replace('"',"");
    }
    else if(filename.includes("<")){
        console.log(filename.replace("<",""))
        return filename.replace("<","");
    }
    else if(filename.includes(">")){
        console.log(filename.replace(">",""))
        return filename.replace(">","");
    }
    else if(filename.includes("|")){
        console.log(filename.replace("|",""))
        return filename.replace("|","");
    }
    else{
        return filename;
    }

}

module.exports.createFolder=FunCreateFolder;
module.exports.returnValidFileName=validFilename;
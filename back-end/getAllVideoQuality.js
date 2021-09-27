const https = require('https');
const axios = require('axios');
var allVideoQualityArray=[];

const fetchAllVideoQuality=(allEpsoideBySeason,res)=> {
   return new Promise((res1,rej)=>{

       const downloadFile = obj => {
          
           try{
               return new Promise((resolve, reject) => {
                   axios.get(obj.videoLink)
                     .then(function (respone) {
                       responeArray=respone.data;
                            resolve(responeArray);
                      
                     })
                  
                 })
           }
           catch(error){
               console.log(error);
           }
           
       }
       
       allEpsoideBySeason.forEach(async obj => {
        let abc=await downloadFile(obj)
        allVideoQualityArray.push(abc)
        if(allVideoQualityArray.length ==allEpsoideBySeason.length){
                     
                    res1(allVideoQualityArray) 
                  }
        
         
        })
   })

   
   
    // allEpsoideBySeason.forEach(async obj => {
    // let abc=await downloadFile(obj)
    // allVideoQualityArray.push(abc)
    // if(allVideoQualityArray.length ==allEpsoideBySeason.length){
                 
    //             res1(allVideoQualityArray) 
    //           }
    
     
    // })
    
    
    }
    async function pppp(allEpsoideBySeason){
        allVideoQualityArray=[];
        const jhfhfhhf=await fetchAllVideoQuality(allEpsoideBySeason)
        return jhfhfhhf
      }

    module.exports.get_AllVideoQuality=pppp; 

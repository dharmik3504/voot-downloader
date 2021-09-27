import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { Observable, Subject, throwError } from "rxjs";
import { Vootdata } from './vootdata.model';
import { SpinnerService } from './spinner/spinner.service';
@Injectable({
  providedIn: 'root'
})
export class VootServiceService {
url="https://psapi.voot.com/jio/voot/v1/voot-web/content/generic/series-wise-episode";
vootShowNameUrl="https://psapi.voot.com/jio/voot/v1/voot-web/view/my-voot";
videoUrl="https://apiv2.voot.com/wsv_2_3/playBack.json?mediaId=#videoId#"
backEndUrl="http://localhost:3000"
vootShowDetailUrl="https://psapi.voot.com/jio/voot/v1/voot-web/content/specific/editorial"
vootSubIdUrl="https://psapi.voot.com/jio/voot/v1/voot-web/content/generic/season-by-show";


totalNoEpisode=0;
episodeIdArry=[];
VideQualityDataArray:any=[];
vootVideoUrlLink:any=[];
httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}
vootData:any;
  constructor(private http: HttpClient,private spinnerService:SpinnerService) { }

  
  getAllDataVideQuality(dataParams:any):Observable<any>{
    return this.http.post<any>(this.backEndUrl+"/getAllDataVideQuality",dataParams,this.httpOptions).pipe(map((data)=>{
     return data
    }))
  }
  abc(){
    console.log("inside service")
  }
  // fetchPosts(obj:any) {
    
  
    
  //   return this.http
  //     .get(this.url, {
  //       params: obj,
  //     })
  //     .pipe(
  //       map((responseData) => {
  //         return responseData;
          
  //       }),
  //       catchError((errorRes) => {
  //         return throwError(errorRes);
  //       })
  //     );
  // }
  fetchPosts(obj:any) {
    
  
    
    return this.http
      .get(this.backEndUrl+"/EpisodeBySeason", {
        params: obj,
      })
      .pipe(
        map((responseData) => {
          return responseData;
          
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
  // generateVideoUrl(vootLinkUrl:any){
  //   for(var i=0;i<vootLinkUrl.length;i++){
  //     var {title,episodeId}=vootLinkUrl[i];
  //     // vootVideoUrlLink
  //     var videoLink=this.videoUrl.replace("#videoId#", episodeId);
  //     this.vootVideoUrlLink.push({title,videoLink})
      
  //   }
  //  return this.vootVideoUrlLink;
  //   // for(var i=0;i<vootLinkUrl.length;i++){
  //   //   console.log(vootLinkUrl)
  //   // }
  // }
  getAllVideQuality(url:any) {
    
  
    // let searchParams = new HttpParams();
    // searchParams = searchParams.append("print", "pretty");
    // searchParams = searchParams.append("custom", "key");
   
    return this.http
      .get(url, {
        // headers: new HttpHeaders({ "Custom-Header": "hello" }),
        // params: obj,
      })
      .pipe(
        map((responseData) => {
          
          return responseData;
          
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
  

  getVideoArrayBasedonQuality(VideQualityData:any,episodeTitle:any,quality:string){
    var videolinkofAllEpsoide=[];
    for(var i=0;i<VideQualityData.length;i++){
       if(VideQualityData[i].Format==quality){
         videolinkofAllEpsoide.push(VideQualityData[i]);
         VideQualityData[i].episodeTitle=episodeTitle;
         break; 
       } 
    }
    return videolinkofAllEpsoide;  
  }

  // createFolder(){
  //   // http://localhost:3000/createFolder
  // }
  createFolder(folderName:any) {
    
  
    // let searchParams = new HttpParams();
    // searchParams = searchParams.append("print", "pretty");
    // searchParams = searchParams.append("custom", "key");
   
    return this.http
      .get(this.backEndUrl+"/createFolder", {
        // headers: new HttpHeaders({ "Custom-Header": "hello" }),
         params: {folderName:folderName},
      })
      .pipe(
        map((responseData) => {
          
          return responseData;
          
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
  // m3u8ToMp4(folderName:any,m3u8Data:any,type:string) {
  //   var stringifiedData: any;  
  //   stringifiedData = JSON.stringify(m3u8Data);  
  //   // let searchParams = new HttpParams();
  //   // searchParams = searchParams.append("print", "pretty");
  //   // searchParams = searchParams.append("custom", "key");
   
  //   return this.http
  //     .get(this.backEndUrl+"/m3u8ToMp4", {
  //       // headers: new HttpHeaders({ "Custom-Header": "hello" }),
  //        params: {folderName:folderName,m3u8Data:m3u8Data,type:type},
  //     })
  //     .pipe(
  //       map((responseData) => {
          
  //         return responseData;
          
  //       }),
  //       catchError((errorRes) => {
  //         return throwError(errorRes);
  //       })
  //     );
  // }

  // m3u8ToMp4(folderName:any,m3u8Data:any,type:string) {
  //   var stringifiedData: any;  
  //   stringifiedData = JSON.stringify(m3u8Data);  
  //   // let searchParams = new HttpParams();
  //   // searchParams = searchParams.append("print", "pretty");
  //   // searchParams = searchParams.append("custom", "key");
   
  //   return this.http
  //     .get(this.backEndUrl+"/m3u8ToMp4", {
  //       // headers: new HttpHeaders({ "Custom-Header": "hello" }),
  //        params: {folderName:folderName,m3u8Data:m3u8Data,type:type},
  //     })
  //     .pipe(
  //       map((responseData) => {
          
  //         return responseData;
          
  //       }),
  //       catchError((errorRes) => {
  //         return throwError(errorRes);
  //       })
  //     );
  // }
  m3u8ToMp4(folderName:any,m3u8Data:any,type:string):Observable<any>{
    return this.http.post<any>(this.backEndUrl+"/m3u8ToMp4",{folderName:folderName,m3u8Data:m3u8Data,type:type},this.httpOptions).pipe(map((data)=>{
     return data
    }))
  }

  
  
  
  fetchShowName() {
    var obj={
      page:7,
      premiumTrays:"false"
    }
  
    
    return this.http
      .get(this.vootShowNameUrl, {
        params: obj,
      })
      .pipe(
        map((responseData:any) => {
          return responseData.trays;
          
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
  fetchShowDetail(obj:any) {
    
    // ?query=include%3A3ebe53b9d9183b672c1d4dc24e92860a&responseType=common";
  
    
    return this.http
      .get(this.vootShowDetailUrl, {
        params: obj,
      })
      .pipe(
        map((responseData:any) => {
          return responseData;
          
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
  fetchSubIdFromId(id:any,page:any) {
    var obj={
      sort:"season:desc",
      id:id,
      responseType:"common",
      page:page
    }
   // ?sort=season%3Adesc&id=142574&responseType=common"
  
    
    return this.http
      .get(this.vootSubIdUrl, {
        params: obj,
      })
      .pipe(
        map((responseData:any) => {
          return responseData;
          
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
  downloadURI(uri:any, name:any) {
    
    var link = document.createElement("a");
    
    // link.download = name;
    // link.href = uri;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // delete link;

    
  }

  
  convertM3u8fileToDownloadableFile(URL:any) {
    
  
  
  const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http
      .get(URL, {
        headers, responseType: 'text'
        // params: obj,
        
      })
      .pipe(
        map((responseData:any) => {
          // let matches1 = responseData.match(/(["'])(?:(?=(\\?))\2.)*?\1/gm)
          let matches1 = responseData.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)
          return matches1[matches1.length-2];
          
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }


  createAndStorePost(getAllDataVideQuality:any,qualityType:any) {
   
    
    this.http
      .post(this.backEndUrl+"/getAllDataVideQuality", {getAllDataVideQuality,qualityType}, {
        observe: "response",
      })
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          // this.error.next(error.message);
          console.log(error);
        }
      );
  }

  fetchSeason(URL:any) {
    
   // ?sort=season%3Adesc&id=142574&responseType=common"
  
    
    return this.http
      .get(this.backEndUrl+"/season", {
        params: {URL},
      })
      .pipe(
        map((responseData:any) => {
          return responseData;
          
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
  
  
}

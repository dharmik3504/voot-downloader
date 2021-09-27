import {Component, OnInit} from '@angular/core';
import {VootServiceService} from './voot-service.service';
import {Vootdata} from './vootdata.model';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {seasonDetail} from './Model/SeasonDetail';
import {CommanModel} from './Model/CommanModel';
import { SpinnerService } from './spinner/spinner.service';
import { range } from 'rxjs';


// import { link } from 'fs';


@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {


    constructor(private vootServiceService : VootServiceService,private spinnerService:SpinnerService) {}


    folderName = '';
    loadedPosts : any;
    totalNoEpisode : number = 0;
    watchVideoIn : string = "";
    episodeIdArry : any = [];
    vootVideoUrlLink : any = [];
    getAllVideQualityArray : any = [];
    isEpisodeNameEqualToOne?: boolean;
    EpisodeDetails : any = [];
    m3u8Link : any = []
    submitted = false;
    qualityType : string = "";
    onlineURLLinkArray : any = [];
    StoreNoOfSeasonArray : seasonDetail[]=[];
    totalSeasonCount?: number;
    obj = {
        sort: "episode:desc",
        id: 1010752,
        responseType: "common",
        page: 1
    }
    obj1 = {
        query: "include:3256cc76b7e2841f3a4b15916b288784",
        responseType: "common",
        page: 1
    }
    vootShowNameArray : any = [];

    ngOnInit() {
        // this.fetchShowName();

        // this.ferchShowDetail();


    }

    qualityArray : any = [
        {
            name: '720p',
            value: 'TV Main'
        }, {
            name: '360p',
            value: '360_Main'
        }, {
            name: '144p',
            value: 'SBR256'
        }, {
            name: 'mp3',
            value: 'audio_only'
        }
    ]

    typeArray : any = [
        {
            name: 'online',
            value: 'online'
        }, {
            name: 'offline',
            value: 'offline'
        },
    ]

    form = new FormGroup({
        website: new FormControl('', Validators.required),
        quality: new FormControl({}),
        seasonName: new FormControl({}),
        Range: new FormControl(''),
        type: new FormControl({}),
    });
    get f() {
        return this.form.controls;
    }
    // submit() {
    //     this.submitted = true;


    //     this.EpisodeDetails = [];
    //     // this.loadedPosts=[];
    //     this.episodeIdArry = [];
    //     this.vootVideoUrlLink = [];
    //     this.obj.page = 1;

    //     var {
    //         id,
    //         fullTitle,
    //         season
    //     } = this.form.value.website
    //     this.folderName = fullTitle;
    //     this.qualityType = this.form.value.quality.value
    //     this.obj.id = id;
    //     this.getData()
    // }
    getData() {

        this.spinnerService.requestStarted();
        
        this.vootServiceService.fetchPosts(this.obj).subscribe((data : any) => {
            // this.getabc(data);
            // this.getVideoUrl(data);
            this.getAllVideQualityArray=data;
            this.spinnerService.requestEnded();
        });

    }

    // getabc(data : any) {
    //     this.totalNoEpisode = data.totalAsset;
    //     for (var i = 0; i < data.result.length; i++) {
    //         var {
    //             title,
    //             urlStructure
    //         } = data.result[i].seo
    //         var {
    //             season,
    //             fullTitle,
    //             episode
    //         } = data.result[i]
    //         var spliturlStructure = urlStructure.split("/");
    //         var episodeId = spliturlStructure[spliturlStructure.length - 1];
    //         var tempEpisodeTitle = "S" + season + " E" + episode + " ." + fullTitle
    //         this.EpisodeDetails.push({tempEpisodeTitle});

    //         this.episodeIdArry.push({title, episodeId});

    //     }

    //     data.result.length == 0 ? this.isEpisodeNameEqualToOne = true : this.isEpisodeNameEqualToOne = this.checkForEpisodeName(this.episodeIdArry);
    //     if (!this.isEpisodeNameEqualToOne) { // this.loadedPosts=[];
    //         this.obj.page += 1;
    //         this.getData();

    //     } else {
    //         this.getVideoUrl();
    //         return;
    //     }

    // }

    checkForEpisodeName(episodeIdArry : any) {

        var episodeName = "episode 1 ";

        for (var i = 0; i < episodeIdArry.length; i++) {
            var abc = episodeIdArry[i].title.toLowerCase();
            var pqr = episodeIdArry[i].title.toLowerCase().includes(episodeName);

            if (episodeIdArry[i].title.toLowerCase().includes(episodeName)) {
                return true;
            }
            // else{
            //     return false;
            // }
        }
        return false;
    }
    // getVideoUrl(vootVideoUrlLink:any) {
    //     // this.vootVideoUrlLink = this.vootServiceService.generateVideoUrl(this.episodeIdArry);
    //     this.vootVideoUrlLink=vootVideoUrlLink
    //     this.getAllVideQuality();
    // }
    // getAllVideQuality() {
    //     this.spinnerService.requestStarted();
        
    //     for (var i = 0; i < this.vootVideoUrlLink.length; i++) {
    //         this.vootServiceService.getAllVideQuality(this.vootVideoUrlLink[i].videoLink).subscribe((data) => {
    //             this.getAllVideQualityArray.push(data)
    //             this.spinnerService.requestEnded();
    //         });

    //     }


    // }

    getAllVideQualityObj() {
        var VideQualityDataArray: any = [];
        var {seasonName,quality,type,Range}=this.form.value;
            var isValidObj=this.checkForValidationOnClickDownload(seasonName,quality,type,Range);
            if(isValidObj.valid){

                this.spinnerService.requestStarted();
               
                this.vootServiceService.getAllDataVideQuality({getAllVideQualityArray: this.getAllVideQualityArray, qualityType: this.qualityType, watchVideoIn: this.watchVideoIn}).subscribe(data => {
                    
                    if(data!=null && data!=undefined){
                        this.getURLData(data,Range)
                        console.log("end")
                        
                    }
                    else{
                           alert("something end wrong.....")
                           console.log("something end wrong.....:getAllVideQualityObj()")
                           return; 
                    }
                    this.spinnerService.requestEnded();
        
        
                    
                });
            }
       
            else{
                alert(isValidObj.msg);
                return isValidObj.valid;
            }

       

    }

    getURLData(VideQualityDataArray : any,range:any) {
        this.onlineURLLinkArray = [];
        if (this.watchVideoIn == "online") {
            for (var i = 0; i < VideQualityDataArray.length; i++) {
                // this.spinnerService.requestStarted();
        
                this.vootServiceService.convertM3u8fileToDownloadableFile(VideQualityDataArray[i].URL).subscribe((data : any) => {
                    this.onlineURLLinkArray.push(data)
                    if (VideQualityDataArray.length == this.onlineURLLinkArray.length) {
                        this.getAllLinkForOnline(VideQualityDataArray, this.onlineURLLinkArray,range);
                    }
                    
                })
            }


        } else if (this.watchVideoIn == "offline") {
            this.spinnerService.requestStarted();
            if(range.length!==1 && range!=="*"){

                VideQualityDataArray= this.rangeOfEpisiode(VideQualityDataArray,range);
            }
            this.vootServiceService.m3u8ToMp4(this.folderName, VideQualityDataArray, this.watchVideoIn).subscribe((data)=>{
                this.spinnerService.requestEnded();
            })
        }
    }
    getAllLinkForOnline(VideQualityDataArrayLength : any, onlineURLLinkArray : any,range:any) {

        console.log(VideQualityDataArrayLength);
        console.log(onlineURLLinkArray)
        for (var i = 0; i < VideQualityDataArrayLength.length; i++) {
            var {
                Format,
                URL,
                entryId,
                episodeTitle
            } = VideQualityDataArrayLength[i];
            for (var j = 0; j < onlineURLLinkArray.length; j++) {
                if (onlineURLLinkArray[j].includes(entryId)) {
                    VideQualityDataArrayLength[i].URL = onlineURLLinkArray[j];
                }
            }
        }
        //     for(var i=0;i<VideQualityDataArrayLength.length;i++){
        //     VideQualityDataArrayLength[i].DownloadURL=onlineURLLinkArray[i];
        //    }
        if(range.length!==1 && range!=="*"){

            VideQualityDataArrayLength=this.rangeOfEpisiode(VideQualityDataArrayLength,range);
        }
        this.vootServiceService.m3u8ToMp4(this.folderName, VideQualityDataArrayLength, this.watchVideoIn).subscribe((data)=>{
        
        })
        
    }
    // fetchShowName() {
    //     this.spinnerService.requestStarted();
      
    //     this.vootServiceService.fetchShowName().subscribe((data) => {
    //         this.spinnerService.requestEnded();
    //     })
    // }

    

    downloadURI(VideQualityDataArray : any) {

        var links = [];
        for (var i = 0; i < VideQualityDataArray.length; i++) {
            links.push(VideQualityDataArray[i].URL)
        }


        for (var i = 0; i < links.length; i++) {
            var link = document.createElement('a');

            link.setAttribute('download', "");
            link.style.display = 'none';

            link.setAttribute('href', links[i]);
            if (true) {

                link.click();
                document.body.removeChild(link);


            }


        }


    }
    downloadAll(URL : string, link : any) {


        link.setAttribute('href', URL);
        return link;
    }

    submit1() {
        this.onClickSubmit();
    }

    // StoreNoOfSeason(Id : any, page : any) {
    //     this.spinnerService.requestStarted();
        
    //     this.vootServiceService.fetchSubIdFromId(Id, page).subscribe((seasonDetail : CommanModel) => {
    //         this.totalSeasonCount = seasonDetail.totalAsset;
    //         for (var i = 0; i < seasonDetail.result.length; i++) {
    //             var {
    //                 fullTitle,
    //                 id,
    //                 season,
    //                 showName
    //             } = seasonDetail.result[i];
    //             this.StoreNoOfSeasonArray.push({fullTitle, id, season, showName})
    //         }
    //         if (this.StoreNoOfSeasonArray.length != this.totalSeasonCount) {
    //             this.StoreNoOfSeason(Id, this.obj.page += 1);
    //         }
    //         this.spinnerService.requestEnded();        
    //     })
    // }
    StoreNoOfSeason(URL : any) {
        this.spinnerService.requestStarted();
        this.vootServiceService.fetchSeason(URL).subscribe((seasonDetail : any)=>{
            this.StoreNoOfSeasonArray=seasonDetail;
            this.spinnerService.requestEnded();        

        })
    }

    changeWebsite(event : any) {
        this.EpisodeDetails = [];
        // this.loadedPosts=[];
        this.episodeIdArry = [];
        this.vootVideoUrlLink = [];
        this.obj.page = 1;

        var {
            id,
            fullTitle,
            season
        } = this.form.value.seasonName
        this.folderName = fullTitle;

        this.obj.id = id;
        this.getData()
    }
    changeQuality(e : any) {
        this.qualityType = this.form.value.quality.value
    }
    onClickSubmit() {
        // this.form.value.website="https://www.voot.com/shows/splitsvilla/100286";
        // "https://www.voot.com/shows/supermodel-of-the-year/142574";
        // "https://www.voot.com/shows/splitsvilla/100286";
        var URL = this.form.value.website;
        // var splitURL = URL.split('/')
        // var Id = splitURL[splitURL.length - 1];
        this.StoreNoOfSeason(URL);
    }

    rangeOfEpisiode(VideQualityDataArray:any,range:any){
        // range="10-11";
        var rangeOfEpisiodeArray=[];
        VideQualityDataArray.sort((a:any, b:any)=>{return +a.episodeNo - +b.episodeNo});
        
        // if(range.length===1 && range==="*"){
        //     return VideQualityDataArray;
        // }
         if(range.length ===1){
            rangeOfEpisiodeArray.push(VideQualityDataArray[+range-1]);
            return rangeOfEpisiodeArray;
        }

        range.includes("*")?range=range.replace("*",VideQualityDataArray.length):range;
    var rangeSplit=range.split(",");
    for(var i=0;i<rangeSplit.length;i++){
        var getRange=rangeSplit[i].split("-");
        for(var j=getRange[0]-1;j<getRange[1];j++){
            var {Format,URL,episodeTitle}=VideQualityDataArray[j];
            rangeOfEpisiodeArray.push({Format,URL,episodeTitle})
        }
    }

    // console.log(rangeOfEpisiodeArray);
    return rangeOfEpisiodeArray
    }

    checkForValidationOnClickDownload(seasonDD:any,qualityDD:any ,downloadTypeDD:any,rangeOfEpisodeIF:any){
        
        var invalidObj:any={};
        var isSeasonDDValid=this.checkInputValid(seasonDD) && 
                            this.checkInputValid(seasonDD.fullTitle) && 
                            this.checkInputValid(seasonDD.id) && 
                            this.checkInputValid(seasonDD.season) && 
                            this.checkInputValid(seasonDD.showName);
        
        var isQualityDDValid=this.checkInputValid(qualityDD) && 
                            this.checkInputValid(qualityDD.name) && 
                            this.checkInputValid(qualityDD.value);
        
        var isdownloadTypeDDValid=this.checkInputValid(downloadTypeDD) && 
                                this.checkInputValid(downloadTypeDD.name) && 
                                this.checkInputValid(downloadTypeDD.value);
        
        var isRangeOfEpisodeIFValid=this.checkInputValid(rangeOfEpisodeIF);
        
        if(!isSeasonDDValid){
            invalidObj.msg="Please select Seasons Dropdown"; 
            invalidObj.valid=false; 
            return invalidObj;
        }
        else if(!isQualityDDValid){
            invalidObj.msg="Please select Quality Dropdown"; 
            invalidObj.valid=false; 
            return invalidObj;
        }
        else if(!isdownloadTypeDDValid){
            invalidObj.msg="Please select Type Dropdown"; 
            invalidObj.valid=false;
            return invalidObj;
        }
        else if(!isRangeOfEpisodeIFValid){
            invalidObj.msg="Please enter Range Of Episode Text Filed"; 
            invalidObj.valid=false;
            return invalidObj;
        }
        else{
            invalidObj.msg="All Input are valid"; 
            invalidObj.valid=true;
            return invalidObj;
        }

        

    }
    checkInputValid(filedValue:any){
        if(filedValue!=null && filedValue!=undefined && filedValue!=""){
            return true;
        }
        else{
            return false;
        }
    }
    resetAll(){
        this.spinnerService.requestStarted();
        this.episodeIdArry =[];
        this.vootVideoUrlLink= [];
        this.getAllVideQualityArray = [];
    	this.EpisodeDetails= [];	
	    this.onlineURLLinkArray= [];
        this.StoreNoOfSeasonArray = [];
	    this.vootShowNameArray  = [];
	    var {website,seasonName,quality,type,Range}=this.form.value;
        website='';
        seasonName={};
        quality={};
        type={};
        Range=''

        this.spinnerService.requestEnded ();
    }
    changeType(e:any){
        this.watchVideoIn=this.form.value.type.value;
    }
    

}

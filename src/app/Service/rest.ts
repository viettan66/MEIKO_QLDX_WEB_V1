
import { Injectable, Type } from '@angular/core';
import * as Global from '../Service/global'
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import * as XLSX from 'xlsx'; 
import { ToastrService } from 'ngx-toastr';
declare var XDomainRequest

@Injectable({
  providedIn: 'root'
})
export class RESTService {
  constructor(private http:HttpClient,public toast:ToastrService) { }
  public GetDataFromAPI<Type>( uri:string) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.get<Type>(Global.APIUrl+uri,{headers:headers});
  }
  public Get207<Type>( uri:string) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.get<Type>(uri, {headers:headers});
  }
  public Get<Type>( uri:string) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.get<Type>(uri,{headers:headers});
  }
  public Post<Type>(post, uri:string) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.post<Type>(uri,post, {headers: headers });
  }
  PostDataToAPI<Type> (post,uri) {
    let data=JSON.stringify(post)
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.post<Type>(Global.APIUrl+uri,post, {headers: headers});
  }
  PutDataToAPI<Type> (post,uri) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.put<Type>(Global.APIUrl+uri,post, {headers: headers});
  }
  ExportTOExcel(TABLE,namefile?,title?,hide?:boolean) {  
    //////////////console.log(hide)
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(TABLE,{display:hide?true:false});  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, (namefile!=null?namefile:"no_name_file")+'.xlsx');  
  } 
    postFile(fileToUpload: File) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    const endpoint = window.location.hostname+'/'+'assets/image';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http .post<boolean>(endpoint, formData, { headers: headers }).toPromise()
}
   createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
      xhr = null;
    }
    return xhr;
  }
 async ReadExcelFile<Type>(fileName:File){
  return new Promise<any>((resolve, reject) =>{
    let arrayBuffer:any;
      let fileReader = new FileReader();
      fileReader.onload =  ( e) => {
        arrayBuffer = fileReader.result;
        var data = new Uint8Array(arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        resolve(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      }
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer( fileName);
    })
  }
  async ChooseFileExcel<Type>(){
    return new Promise<Type>((resolve, reject) =>{
      var input = document.createElement('input');
      input.type = 'file';
      input.onchange = async e => {
      resolve(await this.ReadExcelFile<Type>(input.files[0])) 
      }
      input.click();
    })
  }
  
  ExportTOExcelFromJson(datalist,namefile?,title?) {  
    let ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(datalist,)

    let wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, (namefile!=null?namefile:"no_name_file")+'.xlsx');  
  } 
  DownloadFile(uri: string,fileName: string) {  
      const params = new HttpParams()
      .set('filename', fileName)
    return this.http.get(Global.APIUrl+uri,{ responseType: "blob",params });
      
  } 
  getUser(NameVariableLocalStore: string) {  
    return JSON.parse(localStorage.getItem(NameVariableLocalStore)) 
      
  } 
   chunkArray(myArray, chunk_size){
    var results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    return results;
}
  Toast_Success(content?,title?,option?){
    this.toast.success(content,title,option)
  }
  Toast_Error(content?,title?,option?){
    this.toast.error(content,title,option)
  }
  Toast_Warning(content?,title?,option?){
    this.toast.warning(content,title,option)
  }
  Toast_Info(content?,title?,option?){
    this.toast.info(content,title,option)
  }
  Toast_Success2(content?,title?,timeout=5000,closebutton=true,positionClass='toast-bottom-right'){
    this.toast.success(content,title,{timeOut:timeout,closeButton:closebutton,positionClass})
  }
  Toast_Error2(content?,title?,timeout=5000,closebutton=true,positionClass='toast-bottom-right'){
    this.toast.error(content,title,{timeOut:timeout,closeButton:closebutton,positionClass})
  }
  Toast_Warning2(content?,title?,timeout=5000,closebutton=true,positionClass='toast-bottom-right'){
    this.toast.warning(content,title,{timeOut:timeout,closeButton:closebutton,positionClass})
  }
  Toast_Info2(content?,title?,timeout=5000,closebutton=true,positionClass='toast-bottom-right'){
    this.toast.info(content,title,{timeOut:timeout,closeButton:closebutton,positionClass})
  }
 mangso = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
 dochangchuc(so,daydu)
{
 var chuoi = "";
 var chuc = Math.floor(so/10);
 var donvi = so%10;
 if (chuc>1) {
  chuoi = " " + this.mangso[chuc] + " mươi";
  if (donvi==1) {
   chuoi += " mốt";
  }
 } else if (chuc==1) {
  chuoi = " mười";
  if (donvi==1) {
   chuoi += " một";
  }
 } else if (daydu && donvi>0) {
  chuoi = " lẻ";
 }
 if (donvi==5 && chuc>1) {
  chuoi += " lăm";
 } else if (donvi>1||(donvi==1&&chuc==0)) {
  chuoi += " " + this.mangso[ donvi ];
 }
 return chuoi;
}
 docblock(so,daydu)
{
 var chuoi = "";
 var tram = Math.floor(so/100);
 so = so%100;
 if (daydu || tram>0) {
  chuoi = " " + this.mangso[tram] + " trăm";
  chuoi += this.dochangchuc(so,true);
 } else {
  chuoi = this.dochangchuc(so,false);
 }
 return chuoi;
}
 dochangtrieu(so,daydu)
{
 var chuoi = "";
 var trieu = Math.floor(so/1000000);
 so = so%1000000;
 if (trieu>0) {
  chuoi = this.docblock(trieu,daydu) + " triệu";
  daydu = true;
 }
 var nghin = Math.floor(so/1000);
 so = so%1000;
 if (nghin>0) {
  chuoi += this.docblock(nghin,daydu) + " nghìn";
  daydu = true;
 }
 if (so>0) {
  chuoi += this.docblock(so,daydu);
 }
 return chuoi;
}
 docso(so)
{
        if (so==0) return this.mangso[0];
 var chuoi = "", hauto = "";
 do {
  var ty = so%1000000000;
  so = Math.floor(so/1000000000);
  if (so>0) {
   chuoi = this.dochangtrieu(ty,true) + hauto + chuoi;
  } else {
   chuoi = this.dochangtrieu(ty,false) + hauto + chuoi;
  }
  hauto = " tỷ";
 } while (so>0);
 return chuoi;
}
getmenu(menu_cha){
  let json=JSON.parse(localStorage.getItem('MenuList')) 
  let data=json.filter(f=>f.IDCha===menu_cha)
  return data
}
}

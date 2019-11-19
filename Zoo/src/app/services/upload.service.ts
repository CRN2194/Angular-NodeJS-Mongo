import {Injectable} from '@angular/core';
import{HttpClient , HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/map';
import{Observable} from 'rxjs/Observable';
import {Global} from './global';

@Injectable() //sirve para crear el servicio
export class UploadService{
    public url: string;
    constructor(private _http: HttpClient){
        this.url = Global.url;
    }
    //Realizar peticion
    makeFileRequest(url: string,params:Array<string>, files:Array<File>,token: string,name:string){
        return new Promise(function(resolve, reject){
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            //recorrer los archivos
            for(var i=0; i< files.length; i++){
                formData.append(name,files[i],files[i].name)
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST',url,true);
            xhr.setRequestHeader('Authorization',token);
            xhr.send(formData);
        });
    }
}
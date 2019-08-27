import { Injectable } from "@angular/core";
import { Language } from "../models/language";
import { Headers, Http } from "@angular/http";

import "rxjs/add/operator/toPromise";

@Injectable()
export class LanguagesService {
    private Url = "api/langs.php";
    private Url2= "api/defaultLang.php";
    private headers = new Headers({ "Content-Type" : "application/json" });
    constructor(private http : Http) {}

    getLangs () : Promise<Language[]> {
        return this.http.get(this.Url)
            .toPromise()
            .then(response => response.json().data as Language[])
            .catch(this.handleError);
    }
        getLangById(id : number) : Promise<Language> {
      const url = `${this.Url}/${id}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Language)
          .catch(this.handleError);
    }
      deleteLanguage(id : number) : Promise<void> {
      const url = `${this.Url}/${id}`;
      return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }
        addLanguage(langId : number, langName : string, tag : string) : Promise<Language> {
        return this.http
            .post(this.Url, JSON.stringify({
              langId : langId,
              langName : langName,
              tag : tag
              }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    updateLanguage(langId : number, langName : string, tag : string) : Promise<Language> {
        return this.http
            .put(this.Url, JSON.stringify({
              id : langId,
              langName : langName,
              tag : tag
            }), { headers : this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);

    }
    updateDefaultLanguage(langId : number) : Promise<Language> {
          const url = `${this.Url2}/${langId}`;
        return this.http
            .put(url, JSON.stringify({
              id : langId
            }), { headers : this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);

    }
      getDefaultLangs() : Promise<Language> {
     return this.http.get(this.Url2)
            .toPromise()
            .then(response => response.json().data[0] as Language)
            .catch(this.handleError);
    }



    handleError(error : any) : Promise<any> {
        console.error("An error occurred", error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

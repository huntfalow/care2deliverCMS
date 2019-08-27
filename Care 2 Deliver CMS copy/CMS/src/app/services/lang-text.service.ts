import { Injectable } from "@angular/core";
import { LangText } from "../models/langText";
import { Headers, Http } from "@angular/http";

import "rxjs/add/operator/toPromise";

@Injectable()
export class LangTextService {
    private Url = "api/langText.php";

    constructor(private http : Http) {}
    private headers = new Headers({ "Content-Type": "application/json" });
    getLangTexts () : Promise<LangText[]> {
        return this.http.get(this.Url)
            .toPromise()
            .then(response => response.json().data as LangText[])
            .catch(this.handleError);
    }
    addLangText(langId : number, categoryId : number, text : string) : Promise<LangText> {
        return this.http
            .post(this.Url, JSON.stringify({
              langId : langId,
              categoryId : categoryId,
              text : text
              }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    updateLangText(langId : number, categoryId : number, text : string, titel : string) : Promise<LangText> {
        return this.http
            .put(this.Url, JSON.stringify({
              langId : langId,
              categoryId : categoryId,
              text : text,
              titel : titel,
            }), { headers : this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);

    }
    getLangTextsByCatId(CategoryId : number) : Promise<LangText[]> {
      const url = `${this.Url}/${CategoryId}`;
      return this.http.get(url)
    .toPromise()
    .then(response => response.json().data as LangText[])
    .catch(this.handleError);
    }
    handleError(error : any) : Promise<any> {
        console.error("An error occurred", error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

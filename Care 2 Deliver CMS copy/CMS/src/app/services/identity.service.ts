import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
// services

// classes
import { PageLayout } from "../models/pageLayout";
import { GeneratedSection } from "../models/generatedSection";
import { ValueKey } from "../models/valueKey";
import { Language } from "../models/language";
import {LangPageLayout } from "../models/LangPageLayout";

import "rxjs/add/operator/toPromise";

@Injectable()
export class IdentityService {
    private headers = new Headers({ "Content-Type" : "application/json" });
       constructor(
        private http : Http,
    ) { }
    getLayoutFromIdentity(identity : string,IdentityUrl : string) : Promise<PageLayout> {
      const url = `${IdentityUrl}/${identity}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as PageLayout)
          .catch(this.handleError);
    }
    getLangPageLayouts(Url : string,identity : string) : Promise<LangPageLayout[]> {
        const url = `${Url}/${identity}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as LangPageLayout[])
            .catch(this.handleError);
    }
   
    saveLangPageLayouts(Url : string,identity : string,langPageLayouts : LangPageLayout[]) : Promise<LangPageLayout[]> {
        const url = `${Url}/${identity}`;
        return this.http
            .put(url, JSON.stringify(langPageLayouts), { headers : this.headers })
            .toPromise()
            .then(res => res.json().data as LangPageLayout[])
            .catch(this.handleError);

    }

    handleError(error : any) : Promise<any> {
        console.error("An error occurred", error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

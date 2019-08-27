import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
// services
import { LangTextService } from "./lang-text.service";
import { LanguagesService } from "./languages.service";
// classes
import { Category } from "../models/category";
import { LangText } from "../models/langText";
import { Language } from "../models/language";

import "rxjs/add/operator/toPromise";

@Injectable()
export class CategoriesService {
    private Url = "api/category.php";
    private headers = new Headers({ "Content-Type" : "application/json" });
    constructor(
        private http : Http,
        private langTextService : LangTextService,
        private languagesService : LanguagesService
    ) { }

    getCategories() : Promise<Category[]> {
        return this.http.get(this.Url)
            .toPromise()
            .then(response => response.json().data as Category[])
            .catch(this.handleError);
    }
    AddCategory(CategoryName : string, FaName : string, HeadCat : number) : Promise<Category> {
        return this.http
            .post(this.Url, JSON.stringify({
                headCatId : HeadCat,
                name : CategoryName,
                faName : FaName
            }), { headers : this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);

    }
    EditCategory(CategoryName : string, FaName : string, HeadCat : number , id : number) : Promise<Category> {
        return this.http
            .put(this.Url, JSON.stringify({
                headCatId : HeadCat,
                name : CategoryName,
                faName : FaName,
                id : id,
            }), { headers : this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);

    }
    getCategoryById(id : number) : Promise<Category> {
      const url = `${this.Url}/${id}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Category)
          .catch(this.handleError);
    }
    deleteCategory(id : number) : Promise<void> {
      const url = `${this.Url}/${id}`;
      return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    handleError(error : any) : Promise<any> {
        console.error("An error occurred", error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

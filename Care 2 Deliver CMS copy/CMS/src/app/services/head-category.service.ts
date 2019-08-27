import { Injectable } from "@angular/core";
import { HeadCategory } from "../models/head-category";
import { Headers, Http } from "@angular/http";

import "rxjs/add/operator/toPromise";

@Injectable()
export class HeadCategoriesService {
    private Url = "api/headCategory.php";

    constructor(private http : Http) {}

    getHeadCategories () : Promise<HeadCategory[]> {
        return this.http.get(this.Url)
            .toPromise()
            .then(response => response.json().data as HeadCategory[])
            .catch(this.handleError);
    }

    handleError(error : any) : Promise<any> {
        console.error("An error occurred", error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

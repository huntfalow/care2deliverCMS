import { Component, OnInit } from "@angular/core";

import { Category } from "../../models/category";
import { HeadCategory } from "../../models/head-category";

import { CategoriesService } from "../../services/categories.service";
import { HeadCategoriesService } from "../../services/head-category.service";

@Component({
    selector: "category-manager",
    templateUrl: "./category-manager.component.html",
    styleUrls: ["./category-manager.component.scss"]
})
export class CategoryManager implements OnInit {
    constructor(
        private categoriesService : CategoriesService,
        private headCategoriesService : HeadCategoriesService,
    ) {}
    title = "CategoryManager";
    Categories : Category[];
    HeadCategories : HeadCategory[];
    SelectedHeadCategory : HeadCategory;
    getCategories() : void {
        this.categoriesService.getCategories().then(Categories => this.Categories = Categories);

    }
    getHeadCategories() : void {
      this.headCategoriesService.getHeadCategories().then(headCategories => this.setHeadCategories(headCategories));

    }
    setHeadCategories(headCats : HeadCategory[]) : void{
        this.HeadCategories = headCats;
        this.SelectedHeadCategory = this.HeadCategories[0];
    }

    ngOnInit() {
      this.getHeadCategories();
      this.getCategories();
    }
    clickHandler(shc : HeadCategory ) : void {
      this.SelectedHeadCategory = shc;
    }

}

import { Component, OnInit, Input } from "@angular/core";

import { Category } from "../../models/category";
import { HeadCategory } from "../../models/head-category";

import { CategoriesService } from "../../services/categories.service";
import { HeadCategoriesService } from "../../services/head-category.service";

@Component({
    selector: "category-List",
    templateUrl: "./category-list.component.html",
    styleUrls: ["./category-list.component.scss"]
})
export class CategoryList implements OnInit {
    constructor(
        private categoriesService : CategoriesService,
        private headCategoriesService : HeadCategoriesService,
    ) {}
    @Input("headCategory")
    headCategory : HeadCategory;
    Categories : Category[];
    addPath = "/category-add";
    editTextPath = "/langText-edit";
    editCategoryPath = "/category-edit";
    getCategories() : void {
        this.categoriesService.getCategories().then(Categories => this.Categories = Categories);
    }
    deleteCat(category : Category) : void {
      let confirmed = confirm("Ben je zeker dat je dit wil verwijderen?");
      if (confirmed === true) {
          this.categoriesService.deleteCategory(category.id).then(affRows => this.reloadCats());
        }

    }
    reloadCats() : void {
      this.Categories = [];
      this.getCategories();
    }
    ngOnInit() {
      this.getCategories();
    }

}

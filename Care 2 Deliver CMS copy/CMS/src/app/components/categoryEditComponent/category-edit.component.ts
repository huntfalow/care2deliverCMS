import { Component, OnInit } from "@angular/core";
import { Router }   from "@angular/router";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Category } from "../../models/category";
import { HeadCategory } from "../../models/head-category";

import { CategoriesService } from "../../services/categories.service";
import { HeadCategoriesService } from "../../services/head-category.service";

@Component({
    selector: "category-Edit",
    templateUrl: "./category-edit.component.html",
    styleUrls: ["./category-edit.component.scss"]
})
export class CategoryEdit implements OnInit {
    constructor(
        private categoriesService : CategoriesService,
        private headCategoriesService : HeadCategoriesService,
        private router : Router,
        private location : Location,
        private route : ActivatedRoute,
    ) {}
    Category : Category;
    HeadCategories : HeadCategory[];
    errorMessages : string[];
    CategoryNameCorrect() : boolean {
      if (this.Category.name === "" || this.Category.name === undefined) {
        return false;
      }
      return true;
    }
    FaNameCorrect() : boolean {
      if (this.Category.faName === "" || this.Category.faName === undefined) {
        return false;
      }
      return true;
    }
    SelectedCategoryCorrect() : boolean {
      if (this.Category.headCategoryId === 0 || this.Category.headCategoryId === undefined) {
        return false;
      }
      return true;
    }
    checkInput() : boolean {
      this.errorMessages = [];
      let state = true;
      console.log(this.CategoryNameCorrect());
      if (!this.CategoryNameCorrect()) {
        this.errorMessages.push("Categorie naam is niet correct ingevuld.");
        state = false;
      }
      if (!this.FaNameCorrect()) {
        this.errorMessages.push("Icon name is niet correct ingevuld.");
        state = false;
      }
      if (!this.SelectedCategoryCorrect()) {
        this.errorMessages.push("Hoofdcategorie is niet correct ingevuld.");
        state = false;
      }
      return state;
    }
    goBack() : void {
      this.router.navigate(["category-manager"]);
    }
    submitForm() : void {
      let Correct = this.checkInput();
      if (Correct) {
        this.categoriesService.EditCategory(this.Category.name , this.Category.faName , this.Category.headCategoryId, this.Category.id);
        this.goBack();
      }
    }
    getHeadCategories() : void {
      this.headCategoriesService.getHeadCategories().then(headCategories => this.HeadCategories = headCategories);
    }
    ngOnInit() {
      this.getHeadCategories();
      this.route.params.subscribe((params : Params) => {
       let userId = params["id"];
       this.categoriesService.getCategoryById( +params["id"]).then(cat => this.Category = cat[0]);
     });
    }

}

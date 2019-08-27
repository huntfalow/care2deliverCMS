import { Component, OnInit, Input} from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Params } from "@angular/router";
import { Router }   from "@angular/router";

import { Category } from "../../models/category";
import { HeadCategory } from "../../models/head-category";
import { LangText } from "../../models/langText";
import { Language } from "../../models/language";

import { CategoriesService } from "../../services/categories.service";
import { LangTextService } from "../../services/lang-text.service";
import { LanguagesService } from  "../../services/languages.service";

import "rxjs/add/operator/switchMap";


@Component({
    selector: "LangText-edit",
    templateUrl: "./langText-edit.component.html",
    styleUrls: ["./langText-edit.component.scss"]
})
export class LangTextEdit implements OnInit {
    constructor(
        private categoriesService : CategoriesService,
        private langTextService : LangTextService,
        private languagesService : LanguagesService,
        private location : Location,
        private route : ActivatedRoute,
        private router : Router,
    ) {}

    goBack() : void {
      this.router.navigate(["category-manager"]);
    }
    langTexts : LangText[];
    SelectedCat : Category;
    SelectedLang : Language;
    langs : Language[];
    SelectedLangText : LangText;
    ckeditorContent : string;
    titleContent : string;
    onReady(event : any) : void {
      console.log("ready");
    }
    onChange(event : any) : void {
      console.log("changed");
    }
    onBlur(event : any) : void {
      console.log("blurred");
    }
    onFocus(event : any) : void {
      console.log("focussed");
    }
    saveLangTexts(event : any) : void {
      this.updateArrayOfLangTextsFromView();
      console.log(this.langTexts);
      for (let langText of this.langTexts){
        this.langTextService.updateLangText(langText.langId , langText.categoryId , langText.text, langText.titel);
        this.goBack();
      }
    }
    updateArrayOfLangTextsFromView() : void {
      let oldSelectedLang = this.SelectedLang;

        if (oldSelectedLang !== undefined) {
          for (let i in this.langTexts) {
            if (oldSelectedLang.id === this.langTexts[i].langId) {
                  this.langTexts[i].titel = this.titleContent;
                  this.langTexts[i].text = this.ckeditorContent;
            }
          }
      }
    }
    langSelected(lang : Language) : void {
      this.updateArrayOfLangTextsFromView();
      this.SelectedLang = lang;
      this.SelectedLangText = this.getLangTextByLangId(lang.id);
      this.ckeditorContent =  this.SelectedLangText.text;
      this.titleContent = this.SelectedLangText.titel;
    };
    getLangTextByLangId(langId : number) : LangText {
      let langTextSelected : LangText;
      this.langTexts.forEach(function(langText){
        if (langText.langId === langId) {
          langTextSelected = langText;
        }
      });
      return langTextSelected;
    }
    ngOnInit() {
      /*this.route.params
          .switchMap((params : Params) => this.categoriesService.getCategoryById( +params["id"]))
          .subscribe(cat => this.SelectedCat = cat);
      this.route.params
          .switchMap((params : Params) => this.langTextService.getLangTextsByCatId( +params["id"]))
          .subscribe(langTexts => this.langTexts = langTexts);*/
      this.route.params.subscribe((params : Params) => {
       let userId = params["id"];
       this.categoriesService.getCategoryById( +params["id"]).then(cat => this.SelectedCat = cat[0]);
       this.langTextService.getLangTextsByCatId( +params["id"]).then(langtexts => this.langTexts = langtexts);
       this.languagesService.getLangs().then(langs => this.onLangsRecieved(langs) );
     });
    }
    onLangsRecieved(langs : Language[]){
      this.langs = langs;
      this.langSelected(this.langs[0]);
    }

}

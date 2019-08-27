import { Component, OnInit } from "@angular/core";

import { Language } from "../../models/language";

import { LanguagesService } from "../../services/languages.service";

@Component({
    selector: "language-manager",
    templateUrl: "./language-manager.component.html",
    styleUrls: ["./language-manager.component.scss"]
})
export class LanguageManager implements OnInit {
    constructor(
        private languageService : LanguagesService,

        ) {}
    title = "LanguageManager";
    Languages : Language[];
    currentDefaultLanguage : Language;
    editLanguagePath = "/language-edit";
    addPath = "/language-add";
    boolloaded = false;

    getLanguages() : void {
        this.languageService.getLangs().then(Languages => this.Languages = Languages);

    }
     getDefaultLanguages() : void {
        this.languageService.getDefaultLangs().then(DefaultLanguages =>this.defaultLanguagloaded(DefaultLanguages));

    }
      deleteLang(language : Language) : void {
      let confirmed = confirm("Ben je zeker dat je dit wil verwijderen?");
      if (confirmed === true) {
          this.languageService.deleteLanguage(language.id).then(affRows => this.reloadCats());
        }
    }

    handleClick(id : number) : void {
      this.languageService.updateDefaultLanguage(id);
      }
    defaultLanguagloaded(DefaultLanguages : Language):void{

        this.currentDefaultLanguage = DefaultLanguages;
        this.boolloaded = true;
        this.getLanguages();
    }

      reloadCats() : void {
      this.Languages = [];
      this.getLanguages();
    }
         ngOnInit() {
                   this.getLanguages();
           this.getDefaultLanguages();

        }
}

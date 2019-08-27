import { Component, OnInit } from "@angular/core";

import { Language } from "../../models/language";

import { LanguagesService } from "../../services/languages.service";
import { Router }   from "@angular/router";

@Component({
    selector: "language-add",
    templateUrl: "./language-add.component.html",
    styleUrls: ["./language-add.component.scss"]
})

export class LanguageAdd implements OnInit{
    constructor(
        private router : Router,
        private languageService : LanguagesService,
        ) {}
    title = "LanguageAdd";
    Languages : Language[];
    LanguageName : string;
    LanguageTagName : string;
    errorMessages : string[];


        LanguageNameCorrect() : boolean {
      if (this.LanguageName === "" || this.LanguageName === undefined) {
        return false;
      }
      return true;
    }
          TagNameCorrect() : boolean {
      if (this.LanguageTagName === "" || this.LanguageTagName === undefined) {
        return false;
      }
      return true;
    }

   checkInput() : boolean {
      this.errorMessages = [];
      let state = true;

      if (!this.LanguageNameCorrect()) {
        this.errorMessages.push("Language naam is niet correct ingevuld.");
        state = false;
      }

        if (!this.TagNameCorrect()) {
        this.errorMessages.push("Tag naam is niet correct ingevuld.");
        state = false;
      }
      return state;
    }

        goBack() : void {
      this.router.navigate(["language-manager"]);
    }
    submitForm() : void {
      let Correct = this.checkInput();
      console.log(this.Languages.length);
      if (true) {
        this.languageService.addLanguage(this.Languages.length, this.LanguageName , this.LanguageTagName);
        this.goBack();
      }
    }
      getLanguages() : void {
      this.languageService.getLangs().then(languages => this.Languages = languages);
    }
      ngOnInit() {
      this.getLanguages();
    }


}
import { Component, OnInit } from "@angular/core";
import { Router }   from "@angular/router";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Language } from "../../models/language";

import { LanguagesService } from "../../services/languages.service";

@Component({
    selector: "language-Edit",
    templateUrl: "./language-edit.component.html",
    styleUrls: ["./language-edit.component.scss"]
})
export class LanguageEdit implements OnInit {
    constructor(
        private languagesService : LanguagesService,
        private router : Router,
        private location : Location,
        private route : ActivatedRoute,
    ) {}
    Language : Language;
    Languages : Language[];
    errorMessages : string[];
    LanguageNameCorrect() : boolean {
      if (this.Language.langName === "" || this.Language.langName === undefined) {
        return false;
      }
      return true;
    }
    TagNameCorrect() : boolean {
      if (this.Language.tag === "" || this.Language.tag === undefined) {
        return false;
      }
      return true;
    }
    checkInput() : boolean {
      this.errorMessages = [];
      let state = true;
      if (!this.LanguageNameCorrect()) {
        this.errorMessages.push("Language name is niet correct ingevuld.");
        state = false;
      }
      if (!this.TagNameCorrect()) {
        this.errorMessages.push("Tag name is niet correct ingevuld.");
        state = false;
      }
      return state;
    }
    goBack() : void {
      this.router.navigate(["language-manager"]);
    }

    submitForm() : void {
      let Correct = this.checkInput();
      if (Correct) {
        this.languagesService.updateLanguage(this.Language.id , this.Language.langName , this.Language.tag);
        this.goBack();
      }
    }

    ngOnInit() {
      this.route.params.subscribe((params : Params) => {
      this.languagesService.getLangById( +params["id"]).then(lang => this.Language = lang[0]);
     });
    }

}

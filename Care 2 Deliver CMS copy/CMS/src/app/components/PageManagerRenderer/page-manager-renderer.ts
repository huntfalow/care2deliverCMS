import { Component, OnInit, Input} from "@angular/core";

//models
import { PageLayout } from "../../models/pageLayout";
import { GeneratedSection } from "../../models/generatedSection";
import { ValueKey } from "../../models/valueKey";
import { Language } from "../../models/language";
import { LangPageLayout } from "../../models/LangPageLayout";

//services
import { IdentityService } from "../../services/identity.service";
import { LanguagesService } from  "../../services/languages.service";

//lib imports
let cloneDeep = require('lodash/cloneDeep');



@Component({
    selector: "page-manager-renderer",
    templateUrl: "./page-manager-renderer.html",
    styleUrls: ["./page-manager-renderer.scss"]
})
export class PageManagerRenderer implements OnInit {
    constructor(
        private languagesService : LanguagesService,
        private identityService : IdentityService,
    ) {}
    pageLayoutSource : PageLayout;
    @Input("Identity")
    Identity : string;
    @Input("IdentityUrl")
    IdentityUrl : string;
    langPageLayouts : LangPageLayout[];
    SelectedLang : Language;
    langs : Language[];
    langLoaded=false;
    identityLoaded=false
    langpageLayoutsloaded=false;
    showSave=false;
    ngOnInit() {
        this.langPageLayouts=[];
         this.identityService.getLayoutFromIdentity(this.Identity,this.IdentityUrl).then(pageLayout => this.sourceRecieved(pageLayout));
        this.languagesService.getLangs().then(langs => this.onLangsRecieved(langs));
    }

    sourceRecieved(pageLayout:PageLayout):void{
        this.pageLayoutSource=pageLayout;
        this.getPageContent(); 
        this.identityLoaded=true;
        this.identityService.getLangPageLayouts(pageLayout.ApiUrl,this.Identity).then(langPageLayouts => this.langPageLayoutsRecieved(langPageLayouts));
        this.setup();
    }
    langPageLayoutsRecieved(langPageLayouts : LangPageLayout[]):void{
        this.langPageLayouts=langPageLayouts;
    }
    getPageContent():void{
    }
    onLangsRecieved(langs : Language[]){
        this.langs=langs;
        this.langLoaded=true;
        this.setup();
    }
    setup() : void{
        if (this.langLoaded && this.identityLoaded){

            
            this.langSelected(this.langs[0]);
                    
        }
    }
    langSelected(lang : Language) : void {
        let oldLang = this.SelectedLang;
        this.SelectedLang = lang;
    }
    save() : void {
        this.identityService.saveLangPageLayouts(this.pageLayoutSource.ApiUrl,this.Identity,this.langPageLayouts).then(langPageLayouts => this.langPageLayoutsRecieved(langPageLayouts));
        this.showSavedMessage();
    }
    showSavedMessage():void{
        this.showSave=true;
        setTimeout(function(){
            this.showSave=false;
        }.bind(this),5000);
    }
/*    onChange(value : any,key : String,generatedSection : GeneratedSection) : void{
      console.log(key,generatedSection,value);
        for(let i=0;i<=this.currentLayoutLoaded.GeneratedSections.length-1;i++){
            if (this.currentLayoutLoaded.GeneratedSections[i]===generatedSection){
                for(let i2=0;i2<=this.currentLayoutLoaded.GeneratedSections[i].ValueKeys.length-1;i2++){
                    if (this.currentLayoutLoaded.GeneratedSections[i].ValueKeys[i2].Key===key){
                        this.currentLayoutLoaded.GeneratedSections[i].ValueKeys[i2].Value=value;
                    }
                }
            }
        }       
    }*/
}

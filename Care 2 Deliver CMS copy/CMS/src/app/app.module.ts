// core angular packages
import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule }   from "@angular/router";
import { HttpModule }    from "@angular/http";
import { FormsModule } from "@angular/forms";

// extra angular packages
import { InMemoryWebApiModule } from "angular-in-memory-web-api";

// inmemory data services
import { InMemoryData }  from "./in memory data services/in-memory-data";

// services
import { CategoriesService } from "./services/categories.service";
import { LangTextService } from "./services/lang-text.service";
import { LanguagesService } from "./services/languages.service";
import { HeadCategoriesService } from "./services/head-category.service";
import { IdentityService } from "./services/identity.service";

// components
import { AppComponent }  from "./app.component";
import { NavigatorComponent } from "./components/navigator/navigator.component";
import { CategoryManager } from "./components/categoryManagerComponent/category-manager.component";
import { CategoryList} from "./components/categoryList/category-list.component";
import { CategoryAdd } from "./components/categoryAddComponent/category-add.component";
import { LangTextEdit } from "./components/langTextEdit/langText-edit.component";
import { CategoryEdit } from "./components/categoryEditComponent/category-edit.component";
import { PageManagerRenderer } from "./components/PageManagerRenderer/page-manager-renderer";
import {HomeComponent} from "./components/homePageComponent/home.component";
import {HeaderAndFooterComponent} from "./components/headerAndFooterManagerComponent/header-and-footer.component";
import {LuchthavenComponent} from "./components/lucthavenPageComponent/luchthaven.component";
import {ContactComponent} from "./components/contactPageComponent/contact.component";
import {PersonenComponent} from "./components/personenPageComponent/personen.component";
import {WagenComponent} from "./components/wagenPageComponent/wagen.component";
import{FooterComponent} from "./components/footerPageComponent/footer.component";
import {LanguageManager} from "./components/languageManagerComponent/language-manager.component";
import {LanguageEdit} from "./components/languageEditComponent/language-edit.component";
import {LanguageAdd} from"./components/languageAddComponent/language-add.component";



// external components
import { CKEditorModule } from "ng2-ckeditor";

// Routing

import { AppRoutingModule }     from "./app-routing.module";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        CKEditorModule,
    ],
    declarations: [
        AppComponent,
        NavigatorComponent,
        CategoryManager,
        LanguageManager,
        CategoryList,
        CategoryAdd,
        CategoryEdit,
        LangTextEdit,
        PageManagerRenderer,
        HomeComponent,
        HeaderAndFooterComponent,
        LuchthavenComponent,
        PersonenComponent,
        WagenComponent,
        ContactComponent,
        FooterComponent,
        LanguageEdit,
        LanguageAdd
    ],
    providers: [ CategoriesService, LangTextService, LanguagesService , HeadCategoriesService ,IdentityService],
    bootstrap: [AppComponent]
})
export class AppModule {

}


import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { CategoryEdit } from "./components/categoryEditComponent/category-edit.component";
import { LangTextEdit } from "./components/langTextEdit/langText-edit.component";
import { CategoryAdd } from "./components/categoryAddComponent/category-add.component";
import { CategoryManager } from "./components/categoryManagerComponent/category-manager.component";
import {HomeComponent} from "./components/homePageComponent/home.component";
import {HeaderAndFooterComponent} from "./components/headerAndFooterManagerComponent/header-and-footer.component";
import{LuchthavenComponent} from "./components/lucthavenPageComponent/luchthaven.component";
import {ContactComponent} from "./components/contactPageComponent/contact.component";
import {PersonenComponent} from "./components/personenPageComponent/personen.component";
import {WagenComponent} from "./components/wagenPageComponent/wagen.component";
import {FooterComponent} from "./components/footerPageComponent/footer.component";
import {LanguageManager} from "./components/languageManagerComponent/language-manager.component";
import {LanguageEdit} from "./components/languageEditComponent/language-edit.component";
import {LanguageAdd} from "./components/languageAddComponent/language-add.component";




const routes: Routes = [
{path: "home",component: HomeComponent },
{path: "luchthaven",component: LuchthavenComponent },
{path: "contact",component: ContactComponent },
{path: "wagen",component: WagenComponent },
{path: "footer",component: FooterComponent },
{path: "personen",component: PersonenComponent },
{path: "headerManager",component : HeaderAndFooterComponent},
{path: "", redirectTo: "/home",pathMatch: "full"},
{path: "", redirectTo: "/home",pathMatch: "full"},
{path: "language-manager",component: LanguageManager},
{path: "category-manager",component: CategoryManager},
{path: "category-add/:id",component : CategoryAdd},
{path: "langText-edit/:id",component : LangTextEdit},
{path: "category-edit/:id",component : CategoryEdit},
{path: "language-edit/:id",component : LanguageEdit},
{path: "language-add",component : LanguageAdd},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
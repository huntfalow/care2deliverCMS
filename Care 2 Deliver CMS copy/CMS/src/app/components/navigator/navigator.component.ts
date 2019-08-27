import {Component} from "@angular/core";


@Component({
    selector: "navigator",
    templateUrl: "./navigator.component.html",
    styleUrls: ["./navigator.component.scss"]
})
export class NavigatorComponent {
    links = [
        {
            label: "Header",
            path:"/headerManager"
        },
        {
            label: "Home",
            path: "/home"
        },
        {
            label:"Luchthavenvervoer",
            path:"/luchthaven"
        },
          {
            label:"Personenvervoer",
            path:"/personen"
        },  {
            label:"Wagen",
            path:"/wagen"
        },
         {
            label:"Contact",
            path:"/contact"
        },
        {
            label:"Footer",
            path:"/footer"
        },
                   {
          label : "Categorie manager",
          path : "/category-manager"
        },    {
          label : "Language manager",
          path : "/language-manager"
        },
        
    ];
}

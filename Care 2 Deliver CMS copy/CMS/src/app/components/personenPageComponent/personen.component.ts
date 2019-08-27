import {Component, OnInit} from "@angular/core";

import { PageLayout } from "../../models/pageLayout";
import { GeneratedSection } from "../../models/generatedSection";
import { ValueKey } from "../../models/valueKey";



@Component({
    selector: "personen",
    templateUrl: "./personen.component.html",
    styleUrls: ["./personen.component.scss"]
})
export class PersonenComponent {
    //eigenlijk nutteloos maar laat het staan want dit is het dashboard en dient voorlopig enkel om te tonene hoe je met mijn renderer werkt
    // deze component wordt dus een dashboard
    title = "Personen";
    //voor renderer
    Identity="personenIdentity";
    IdentityUrl="/api/identityApi.php";

}

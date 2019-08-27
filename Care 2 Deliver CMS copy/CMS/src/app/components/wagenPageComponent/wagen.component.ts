import {Component, OnInit} from "@angular/core";

import { PageLayout } from "../../models/pageLayout";
import { GeneratedSection } from "../../models/generatedSection";
import { ValueKey } from "../../models/valueKey";



@Component({
    selector: "wagen",
    templateUrl: "./wagen.component.html",
    styleUrls: ["./wagen.component.scss"]
})
export class WagenComponent {
    //eigenlijk nutteloos maar laat het staan want dit is het dashboard en dient voorlopig enkel om te tonene hoe je met mijn renderer werkt
    // deze component wordt dus een dashboard
    title = "Wagen";
    //voor renderer
    Identity="wagenIdentity";
    IdentityUrl="/api/identityApi.php";

}

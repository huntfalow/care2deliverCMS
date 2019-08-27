import {Component, OnInit} from "@angular/core";

import { PageLayout } from "../../models/pageLayout";
import { GeneratedSection } from "../../models/generatedSection";
import { ValueKey } from "../../models/valueKey";



@Component({
    selector: "luchthaven",
    templateUrl: "./luchthaven.component.html",
    styleUrls: ["./luchthaven.component.scss"]
})
export class LuchthavenComponent {
    //eigenlijk nutteloos maar laat het staan want dit is het dashboard en dient voorlopig enkel om te tonene hoe je met mijn renderer werkt
    // deze component wordt dus een dashboard
    title = "Lucthaven";
    //voor renderer
    Identity="luchthavenIdentity";
    IdentityUrl="/api/identityApi.php";

}

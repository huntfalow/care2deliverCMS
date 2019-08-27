import {Component, OnInit} from "@angular/core";

import { PageLayout } from "../../models/pageLayout";
import { GeneratedSection } from "../../models/generatedSection";
import { ValueKey } from "../../models/valueKey";



@Component({
    selector: "contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"]
})
export class ContactComponent {
    //eigenlijk nutteloos maar laat het staan want dit is het dashboard en dient voorlopig enkel om te tonene hoe je met mijn renderer werkt
    // deze component wordt dus een dashboard
    title = "Contact";
    //voor renderer
    Identity="contactIdentity";
    IdentityUrl="/api/identityApi.php";

}

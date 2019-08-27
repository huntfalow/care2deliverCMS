import {Component, OnInit} from "@angular/core";

import { PageLayout } from "../../models/pageLayout";
import { GeneratedSection } from "../../models/generatedSection";
import { ValueKey } from "../../models/valueKey";



@Component({
    selector: "footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {
    //eigenlijk nutteloos maar laat het staan want dit is het dashboard en dient voorlopig enkel om te tonene hoe je met mijn renderer werkt
    // deze component wordt dus een dashboard
    title = "Footer";
    //voor renderer
    Identity="footerIdentity";
    IdentityUrl="/api/identityApi.php";

}

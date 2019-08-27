import {Component, OnInit} from "@angular/core";

import { PageLayout } from "../../models/pageLayout";
import { GeneratedSection } from "../../models/generatedSection";
import { ValueKey } from "../../models/valueKey";



@Component({
    selector: "header-and-footer",
    templateUrl: "./header-and-footer.component.html",
    styleUrls: ["./header-and-footer.component.scss"]
})
export class HeaderAndFooterComponent {
    Identity= "headerIdentity";
    IdentityUrl= "/api/identityApi.php";
}

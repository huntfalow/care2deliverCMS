import { InMemoryDbService } from "angular-in-memory-web-api";
export class InMemoryData implements InMemoryDbService {
    createDb() {
        let categories = [
            { id: 1, headCategoryId: 1, name: "testname", faName: ""},
            { id: 2, headCategoryId: 2, name: "testname2", faName: "" },
            { id: 3, headCategoryId: 1, name: "testname3", faName: "" },
            { id: 4, headCategoryId: 2, name: "testname4", faName: "" }
        ];
        let headCategory = [
            { id: 1 , name: "personen" },
            {id: 2 , name: "goederen"}
        ];
        let langText = [
            { langId: 1 , categoryId: 1, text: "testnl" },
            { langId: 2 , categoryId: 1, text: "testfr" },
            { langId: 1 , categoryId: 2, text: "testnl2" },
            { langId: 2 , categoryId: 2, text: "testfr2" },
            { langId: 1 , categoryId: 3, text: "testnl3" },
            { langId: 2 , categoryId: 3, text: "testfr3" },
            { langId: 1 , categoryId: 4, text: "testnl4" },
            { langId: 2 , categoryId: 4, text: "testfr4" },
        ];
        let langs = [
            { id: 1, langName: "Nederlands" , tag : "NL" },
            { id: 2, langName: "Frans", tag : "FR" }
        ];
        return { categories , headCategory , langText , langs };
    }
}

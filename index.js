import { kepMegjelenites } from "./fomenu.js";

import Tema from "./Tema.js";
import { kvizAdatok } from "./kerdesAdatok.js";

//főoldalhoz
if (document.querySelector("#tanulo_kartya")) {
    kepMegjelenites();
}


//téma választóhoz

if (document.getElementById("php")) {

    const temak = kvizAdatok.map(adat =>
        new Tema(adat.nev, adat.kerdesek)
    );

    const phpElem = document.getElementById("php");
    const jsElem = document.getElementById("js");
    const javaElem = document.getElementById("java");

    const phpTema = temak.find(t => t.getNev() === "PHP");
    const jsTema = temak.find(t => t.getNev() === "JavaScript");
    const javaTema = temak.find(t => t.getNev() === "Java");

    phpTema?.megjelenit(phpElem);
    jsTema?.megjelenit(jsElem);
    javaTema?.megjelenit(javaElem);
}


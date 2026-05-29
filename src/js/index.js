import { kepMegjelenites } from "./fomenu.js";
import Tema from "./Tema.js";
import Kviz from "./Kviz.js";
//import { kvizAdatok } from "./kerdesAdatok.js";
import Services from "./Services.js";

const API_URL = "https://api.sheety.co/eedc1acbb8d9a1e6ad17df8efb7d9425/névtelenTáblázat/munkalap1";
let kviz = null;

// főoldalhoz
if (document.querySelector("#tanulo_kartya")) {
  kepMegjelenites();
}

// téma választóhoz
if (document.getElementById("php")) {
  const service = new Services();

  const phpElem = document.getElementById("php");
  const jsElem = document.getElementById("js");
  const javaElem = document.getElementById("java");

  service.getAdat(API_URL, (data) => { 
    const adatok = data.munkalap1;
    const temak = atalakitSheety(adatok);

    const phpTema = temak.find((t) => t.getNev() === "PHP");
    const jsTema = temak.find((t) => t.getNev() === "JavaScript");
    const javaTema = temak.find((t) => t.getNev() === "Java");

    phpTema?.megjelenit(phpElem);
    jsTema?.megjelenit(jsElem);
    javaTema?.megjelenit(javaElem);
  });

  phpElem.addEventListener("click", () => {
    localStorage.setItem("tema", "PHP");
    window.location.href = "kviz.html";
  });

  jsElem.addEventListener("click", () => {
    localStorage.setItem("tema", "JavaScript");
    window.location.href = "kviz.html";
  });

  javaElem.addEventListener("click", () => {
    localStorage.setItem("tema", "Java");
    window.location.href = "kviz.html";
  });
}

//sheety adat átalakítása
function atalakitSheety(adatok) {
    const temak = {};

    adatok.forEach(sor => {

        if (!temak[sor.nev]) {
            temak[sor.nev] = {
                nev: sor.nev,
                kerdesek: []
            };
        }

        temak[sor.nev].kerdesek.push({
            kerdesSzoveg: sor.kerdesszoveg,
            valaszok: [              
              { szoveg: sor.valasz1, helyes: true },
              { szoveg: sor.valasz2, helyes: false },
              { szoveg: sor.valasz3, helyes: false },
              { szoveg: sor.valasz4, helyes: false }

            ]
        });

    });

    return Object.values(temak);
}

//kerdes
// szülő DOM elem beállítása
const kerdesekElem = document.getElementById("kerdes");


/*if (kerdesekElem) {
  const temaNev = localStorage.getItem("tema");

  const adat = kvizAdatok.find((t) => t.nev === temaNev);

  if (adat) {
    kviz = new Kviz(adat.kerdesek, kerdesekElem);
  }

  
}

const kovBtn = document.getElementById("kovetkezo");

if (kovBtn) {
  kovBtn.addEventListener("click", () => {
    if (kviz) {
      kviz.kovetkezoKerdes();
    }
  });
}*/

if (kerdesekElem) {

    const service = new Services();
    const temaNev = localStorage.getItem("tema");

    service.getAdat(API_URL, (data) => {

        const adatok = data.munkalap1;
        const temak = atalakitSheety(adatok);

        const adat = temak.find(t => t.nev === temaNev);

        if (adat) {
            kviz = new Kviz(adat.kerdesek, kerdesekElem);
        } else {
            kerdesekElem.innerHTML = "<h3>Nincs ilyen téma!</h3>";
        }
    });
}

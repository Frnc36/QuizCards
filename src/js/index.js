import { kepMegjelenites } from "./fomenu.js";
import Tema from "./Tema.js";
import Kviz from "./Kviz.js";
import { kvizAdatok } from "./kvizAdatok.js";


let kviz = null;

// főoldalhoz
if (document.querySelector("#tanulo_kartya")) {
  kepMegjelenites();
}

// téma választóhoz
if (document.getElementById("php")) {
  const temak = kvizAdatok.map((adat) => new Tema(adat.nev, adat.kerdesek));

  const phpElem = document.getElementById("php");
  const jsElem = document.getElementById("js");
  const javaElem = document.getElementById("java");

  const phpTema = temak.find((t) => t.getNev() === "PHP");
  const jsTema = temak.find((t) => t.getNev() === "JavaScript");
  const javaTema = temak.find((t) => t.getNev() === "Java");

  phpTema?.megjelenit(phpElem);
  jsTema?.megjelenit(jsElem);
  javaTema?.megjelenit(javaElem);

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

//kerdes
// szülő DOM elem beállítása
const kerdesekElem = document.getElementById("kerdes");

//kviz = new Kviz(kvizAdatok[0].kerdesek, kerdesekElem);

if (kerdesekElem) {
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
}
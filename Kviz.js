import Kerdes from "./Kerdes.js";

export default class Kviz {
  #kerdesek = [];
  #aktualisIndex;
  #pontszam;

  constructor(kerdesAdatok = [], szuloElem) {
    this.#kerdesek = kerdesAdatok;
    this.#aktualisIndex = 0;
    this.#pontszam = 0;
    this.szuloElem = szuloElem;

    this.aktualisKerdesObj = null;

    this.#kerdesekLetrehozasa();
  }

  #kerdesekLetrehozasa() {
    this.szuloElem.innerHTML = "";

    console.log("kvíz");

    /*this.#kerdesek.forEach((egyKerdes) => {
      console.log(egyKerdes)
      console.log(egyKerdes.kerdesSzoveg)
      const kerdes = new Kerdes(egyKerdes.kerdesSzoveg, egyKerdes.valaszok, this.szuloElem);
    });*/

    const adat = this.getAktualisKerdes();
    
    this.aktualisKerdesObj = new Kerdes(
          adat.kerdesSzoveg,
          adat.valaszok,
          this.szuloElem,
          this
        );
  }

  

  /* Getter */
  getPontszam() {
    return this.#pontszam;
  }

  getKerdesekSzama() {
    return this.#kerdesek.length;
  }
  getAktualisKerdes() {
    return this.#kerdesek[this.#aktualisIndex];
  }

  /* Saját */
  valaszEllenorzese(valasz) {
    const helyes = this.aktualisKerdesObj.helyesValaszE(valasz);

    if (helyes) {
      this.#pontszam++;
    }

    return helyes;
  }

  kovetkezoKerdes() {
    this.#aktualisIndex++;

    if (!this.vegeVanE()) {
          this.#kerdesekLetrehozasa();
        } else {
          this.szuloElem.innerHTML = `<h2>${this.eredmenySzoveg()}</h2>`;
        }
  }

  vegeVanE() {
    return this.#aktualisIndex >= this.#kerdesek.length;
  }

  ujraindit() {
    this.#aktualisIndex = 0;
    this.#pontszam = 0;
    this.#kerdesekLetrehozasa();
  }

  eredmenySzoveg() {
    return `Eredmény: ${this.#pontszam} / ${this.#kerdesek.length}`;
  }
}

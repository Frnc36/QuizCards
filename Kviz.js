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
    this.#kerdesekLetrehozasa();
  }

  #kerdesekLetrehozasa() {
    console.log("kvíz");
    this.#kerdesek.forEach((egyKerdes) => {
      console.log(egyKerdes)
      console.log(egyKerdes.kerdesSzoveg)
      const kerdes = new Kerdes(egyKerdes.kerdesSzoveg, egyKerdes.valaszok, this.szuloElem);
    });
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
    const aktualisKerdes = this.getAktualisKerdes();
    const helyes = aktualisKerdes.helyesValaszE(valasz);

    if (helyes) {
      this.#pontszam = this.#pontszam + 1;
    }

    return helyes;
  }

  kovetkezoKerdes() {
    this.#aktualisIndex = this.#aktualisIndex + 1;
  }

  vegeVanE() {
    if (this.#aktualisIndex >= this.#kerdesek.length) {
      return true;
    }

    return false;
  }

  ujraindit() {
    this.#aktualisIndex = 0;
    this.#pontszam = 0;
  }

  eredmenySzoveg() {
    return "Eredmény: " + this.#pontszam + " / " + this.#kerdesek.length;
  }
}

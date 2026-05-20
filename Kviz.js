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

    this.#ujKerdes();
  }

  #ujKerdes() {
    if (this.vegeVanE()) {
      this.szuloElem.innerHTML = `
        <h2>Eredmény: ${this.#pontszam} / ${this.#kerdesek.length}</h2>
      `;
      return;
    }

    this.szuloElem.innerHTML="";

    const adat = this.#kerdesek[this.#aktualisIndex];
    this.aktualisKerdesObj = new Kerdes(
      adat.kerdesSzoveg,
      adat.valaszok,
      this.szuloElem,
      this,
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

  valaszKattintva(valasz) {
    if (this.aktualisKerdesObj.helyesValaszE(valasz)) {
      this.#pontszam++;
    }
    this.#aktualisIndex++;
    this.#ujKerdes();
  }

  vegeVanE() {
    return this.#aktualisIndex >= this.#kerdesek.length;
  }
}

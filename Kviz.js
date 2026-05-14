export default class Kviz {
  #kerdesek;
  #aktualisIndex;
  #pontszam;

  constructor(kerdesAdatok) {
    this.#kerdesek = [];
    this.#aktualisIndex = 0;
    this.#pontszam = 0;

    this.#kerdesekLetrehozasa(kerdesAdatok);
  }

  #kerdesekLetrehozasa(kerdesAdatok) {
    kerdesAdatok.forEach((kerdesAdat) => {
      const kerdes = new Kerdes(kerdesAdat.kerdesSzoveg, kerdesAdat.valaszok);

      this.#kerdesek.push(kerdes);
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

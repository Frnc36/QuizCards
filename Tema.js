export default class Tema {
  #nev;
  #kerdesAdatok;

  constructor(nev, kerdesAdatok) {
    this.#nev = nev;
    this.#kerdesAdatok = kerdesAdatok;
  }

  getNev() {
    return this.#nev;
  }

  kvizLetrehozasa() {
    return new Kviz(this.#kerdesAdatok);
  }
}

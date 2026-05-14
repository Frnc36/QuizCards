export default class Kerdes {
  #kerdesSzoveg;
  #valaszok;

  constructor(kerdesSzoveg, valaszAdatok) {
    this.#kerdesSzoveg = kerdesSzoveg;
    this.#valaszok = [];

    this.#valaszokLetrehozasa(valaszAdatok);
  }

  getKerdesSzoveg() {
    return this.#kerdesSzoveg;
  }

  getValaszok() {
    return this.#valaszok;
  }

  helyesValaszE(valasz) {
    return valasz.helyesE();
  }

  #valaszokLetrehozasa(valaszAdatok) {
    valaszAdatok.forEach((valaszAdat) => {
      const valasz = new Valasz(valaszAdat.szoveg, valaszAdat.helyes);
      this.#valaszok.push(valasz);
    });
  }
}

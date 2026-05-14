export default class Valasz {
  #szoveg;
  #helyes;

  constructor(szoveg, helyes) {
    this.#szoveg = szoveg;
    this.#helyes = helyes;
  }

  getSzoveg() {
    return this.#szoveg;
  }

  helyesE() {
    return this.#helyes;
  }
}

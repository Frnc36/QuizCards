export default class Valasz {
  /* Adattagok */
  #szoveg;
  #helyes;

  constructor(szoveg, helyes) {
    this.#szoveg = szoveg;
    this.#helyes = helyes;
  }
  
  /* Getterek */
  getSzoveg() {
    return this.#szoveg;
  }

  ishelyesE() {
    return this.#helyes;
  }
}

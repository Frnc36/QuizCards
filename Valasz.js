export default class Valasz {
  /* Adattagok */
  #szoveg;
  #helyes;

  constructor(szoveg, helyes, onClick) {
    this.#szoveg = szoveg;
    this.#helyes = helyes;
    this.onClick = onClick;
    
  }

  /* Getterek */
  getSzoveg() {
    return this.#szoveg;
  }

  ishelyesE() {
    return this.#helyes;
  }

  megjelenit(szuloElem) {
    const p = document.createElement("p");
    p.textContent = this.#szoveg;
    

    p.addEventListener("click", () => {
      this.onClick(this);
    });

    szuloElem.appendChild(p);
  }
}

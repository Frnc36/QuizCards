
export default class Valasz {
  #szoveg;
  #helyes;

  constructor(szoveg, helyes, onClick) {
    this.#szoveg = szoveg;
    this.#helyes = helyes;
    this.onClick = onClick;
  }

  getSzoveg() {
    return this.#szoveg;
  }

  isHelyesE() {
    return this.#helyes;
  }

  megjelenit(szuloElem) {
    const p = document.createElement("p");
    p.textContent = this.#szoveg;

    // fontos a CSS-ed miatt
    p.classList.add("valasz");

    p.addEventListener("click", () => {
      // színezés
      if (this.#helyes) {
        p.classList.add("helyes");
      } else {
        p.classList.add("helytelen");
      }

      // ne lehessen újra kattintani
      p.style.pointerEvents = "none";

      // jelez a Kvíznek
      this.onClick(this);
    });

    szuloElem.appendChild(p);
  }
}


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

    
    p.addEventListener("click", () => { 
      const osszes = szuloElem.querySelectorAll("p");
      osszes.forEach(elem => {
        elem.style.pointerEvents = "none";
      });

      const helyes = this.ishelyesE();
      if (helyes) {
        p.classList.add("helyes");
      } else {
        p.classList.add("rossz");
      }

      setTimeout(() => {
        this.onClick(this);
      }, 1000);
    });


    szuloElem.appendChild(p);
  }
}

/**
 * @class Valasz
 * @classdesc Egy kérdéshez tartozó válasz objektum,
 * amely kezeli a megjelenítést és a kattintási eseményt.
 */
export default class Valasz {
  /**
   * @private
   * @type {string}
   * @description A válasz szövege.
   */
  #szoveg;

  /**
   * @private
   * @type {boolean}
   * @description Megadja, hogy a válasz helyes-e.
   */
  #helyes;

  /**
   * @constructor
   * @param {string} szoveg - A válasz szövege.
   * @param {boolean} helyes - Igaz, ha a válasz helyes.
   * @param {Function} onClick - Callback kattintás esetén.
   */
  constructor(szoveg, helyes, onClick) {
    this.#szoveg = szoveg;
    this.#helyes = helyes;
    this.onClick = onClick;
  }

  /**
   * @method getSzoveg
   * @returns {string}
   * @description A válasz szövegének visszaadása.
   */
  getSzoveg() {
    return this.#szoveg;
  }

  /**
   * @method ishelyesE
   * @returns {boolean}
   * @description Megmondja, hogy a válasz helyes-e.
   */
  ishelyesE() {
    return this.#helyes;
  }

  /**
   * @method megjelenit
   * @param {HTMLElement} szuloElem - A szülő DOM elem.
   * @returns {void}
   * @description A válasz megjelenítése és kattintás kezelése.
   */
  megjelenit(szuloElem) {
    const p = document.createElement("p");
    p.textContent = this.#szoveg;

    p.addEventListener("click", () => {
      const osszes = szuloElem.querySelectorAll("p");
      osszes.forEach((elem) => {
        elem.style.pointerEvents = "none";
      });

      const resetGomb = document.querySelector(".reset-gomb");
      if (resetGomb) {
        resetGomb.style.pointerEvents = "none";
        resetGomb.style.opacity = "0.5";
      }

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

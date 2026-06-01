import Valasz from "./Valasz.js";

/**
 * @class Kerdes
 * @classdesc Egy kvíz kérdést és a hozzá tartozó válaszokat kezelő osztály.
 */
export default class Kerdes {
  /**
   * @private
   * @type {string}
   * @description A kérdés szövege.
   */
  #kerdesSzoveg;

  /**
   * @private
   * @type {Array<Object>}
   * @description A válaszokat tartalmazó lista.
   */
  #valaszok = [];

  /**
   * @constructor
   * @param {string} kerdesSzoveg - A kérdés szövege.
   * @param {Array<Object>} valaszAdatok - A válaszok adatai.
   * @param {HTMLElement} szuloElem - A szülő DOM elem.
   * @param {Object} kviz - A kvíz vezérlő objektum (callback kezeléshez).
   */
  constructor(kerdesSzoveg, valaszAdatok, szuloElem, kviz) {
    this.#kerdesSzoveg = kerdesSzoveg;
    this.#valaszok = valaszAdatok;
    this.szuloElem = szuloElem;
    this.kviz = kviz;
    this.#kever(this.#valaszok);

    this.megjelenit();
  }

  /**
   * @method getKerdesSzoveg
   * @returns {string}
   * @description A kérdés szövegének visszaadása.
   */
  getKerdesSzoveg() {
    return this.#kerdesSzoveg;
  }

  /**
   * @method getValaszok
   * @returns {Array<Object>}
   * @description A válaszlista visszaadása.
   */
  getValaszok() {
    return this.#valaszok;
  }

  /**
   * @method megjelenit
   * @description A kérdés és a hozzá tartozó válaszok megjelenítése.
   * A válaszok példányosítása a Valasz osztállyal történik.
   */
  megjelenit() {
    /* Ezt kiegészíteném a válaszok számára egy divvel */
    /* megfognám a valasz div-et 
      /*  végigmegyek a listán és 
      példűányosítanám a kerdes osztáűlyt a lista elemeive
      a szülőelem a z utolsó valasz div. */
    let kod = `
          <div class="kerdes">
            <h2>${this.#kerdesSzoveg}</h2>
          </div>
          <div class="valaszok"></div>`;

    this.szuloElem.insertAdjacentHTML("beforeend", kod);

    const valaszElem = this.szuloElem.querySelector(".valaszok:last-of-type");

    this.#valaszok.forEach((adat) => {
      const valasz = new Valasz(adat.szoveg, adat.helyes, (valaszObj) =>
        this.kviz.valaszKattintva(valaszObj),
      );
      valasz.megjelenit(valaszElem);
    });
  }

  /**
   * @private
   * @method kever
   * @param {Array} tomb - A válaszok tömbje.
   * @description A válaszok sorrendjének véletlenszerű keverése.
   */
  #kever(tomb) {
    for (let i = tomb.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tomb[i], tomb[j]] = [tomb[j], tomb[i]];
    }
  }

  /**
   * @method helyesValaszE
   * @param {Object} valasz - Egy válasz objektum.
   * @returns {boolean}
   * @description Megállapítja, hogy a válasz helyes-e.
   */
  helyesValaszE(valasz) {
    return valasz.ishelyesE();
  }
}

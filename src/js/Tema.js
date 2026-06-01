/**
 * @class Tema
 * @classdesc Egy kvíz témáját reprezentáló osztály,
 * amely kérdéseket és nevét tartalmazza.
 */
export default class Tema {
  /**
   * @private
   * @type {string}
   * @description A téma neve.
   */
  #nev;

  /**
   * @private
   * @type {Array<Object>}
   * @description A témához tartozó kérdések adatai.
   */
  #kerdesAdatok;

  /**
   * @constructor
   * @param {string} nev - A téma neve.
   * @param {Array<Object>} kerdesAdatok - A kérdések adatai.
   */
  constructor(nev, kerdesAdatok) {
    this.#nev = nev;
    this.#kerdesAdatok = kerdesAdatok;
  }

  /**
   * @method getNev
   * @returns {string}
   * @description A téma nevének visszaadása.
   */
  getNev() {
    return this.#nev;
  }

  /**
   * @method kvizLetrehozasa
   * @returns {Object}
   * @description Létrehoz egy új Kviz példányt a témához tartozó kérdésekkel.
   */
  kvizLetrehozasa() {
    return new Kviz(this.#kerdesAdatok);
  }

  /**
   * @method megjelenit
   * @param {HTMLElement} elem - A cél DOM elem.
   * @returns {void}
   * @description A téma megjelenítése kattintható formában.
   */
  megjelenit(elem) {
    if (!elem) return;

    elem.innerHTML = `
          <a href="kviz.html">
              <div class="kartya_szoveg">
                  <h1>Kattints a ${this.getNev()} kvízhez</h1>
              </div>
          </a>
      `;
  }
}

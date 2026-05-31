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
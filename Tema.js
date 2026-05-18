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
          <a href="${this.getNev()}.html">
              <div class="kartya_szoveg">
                  <h1>${this.getNev()}</h1>
                  <p>Kattints a ${this.getNev()} kvízhez</p>
              </div>
          </a>
      `;
  }
}

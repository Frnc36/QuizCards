export default class Kerdes {
  #kerdesSzoveg;
  #valaszok = [];

  constructor(kerdesSzoveg, valaszAdatok, szuloElem) {
    this.#kerdesSzoveg = kerdesSzoveg;
    this.#valaszok = valaszAdatok;
    this.szuloElem = szuloElem;

    this.megjelenit();
  }

  /* Getter */
  getKerdesSzoveg() {
    return this.#kerdesSzoveg;
  }

  getValaszok() {
    return this.#valaszok;
  }

  megjelenit() {
    let kod = `<h2>${this.#kerdesSzoveg}</h2>`;
    /* Ezt kiegészíteném a válaszok számára egy divvel */
    this.szuloElem.insertAdjacentHTML("beforeend", kod);
    /* megfognám a valasz div-et 
    /*  végigmegyek a listán és 
    példűányosítanám a kerdes osztáűlyt a lista elemeive
    a szülőelem a z utolsó valasz div. */
  }

  /* Saját */
  helyesValaszE(valasz) {
    return valasz.helyesE();
  }
}

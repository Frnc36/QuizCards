import Valasz from "./Valasz.js";

export default class Kerdes {
  #kerdesSzoveg;
  #valaszok = [];

  constructor(kerdesSzoveg, valaszAdatok, szuloElem, kviz) {
    this.#kerdesSzoveg = kerdesSzoveg;
    this.#valaszok = valaszAdatok;
    this.szuloElem = szuloElem;
    this.kviz = kviz;

    this.megjelenit();
  }

  /* Getter */
  getKerdesSzoveg() {
    return this.#kerdesSzoveg;
  }

  getValaszok() {
    return this.#valaszok;
  }

  /* Ezt kiegészíteném a válaszok számára egy divvel */
  /* megfognám a valasz div-et 
      /*  végigmegyek a listán és 
      példűányosítanám a kerdes osztáűlyt a lista elemeive
      a szülőelem a z utolsó valasz div. */
  megjelenit() {
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

  /* Saját */
  helyesValaszE(valasz) {
    return valasz.ishelyesE();
  }
}

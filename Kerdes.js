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

  megjelenit() { 
    let kod = `
          <div class="kerdes">
            <h2>${this.#kerdesSzoveg}</h2>
          </div>
          <div class="valaszok"></div>`;

    /* Ezt kiegészíteném a válaszok számára egy divvel */

    this.szuloElem.insertAdjacentHTML("beforeend", kod);

    /* megfognám a valasz div-et 
    /*  végigmegyek a listán és 
    példűányosítanám a kerdes osztáűlyt a lista elemeive
    a szülőelem a z utolsó valasz div. */

    const valaszElem = this.szuloElem.querySelector(".valaszok:last-of-type");

    this.#valaszok.forEach((adat) => {
      const valaszObj = new Valasz(adat.szoveg, adat.helyes);  
      const p = document.createElement("p");
      p.textContent = valaszObj.getSzoveg();
      p.dataset.helyes = valaszObj.ishelyesE();
      
      p.addEventListener("click", () => {
        const helyes = this.kviz.valaszEllenorzese(valaszObj);

        if (helyes) {
          p.style.backgroundColor = "green";
        } else {
          p.style.backgroundColor = "red";
        }

        setTimeout(() => {
          this.kviz.kovetkezoKerdes();
        }, 1000);
      });


      valaszElem.appendChild(p);
    });
  }


  /* Saját */
  helyesValaszE(valasz) {
    return valasz.ishelyesE();
  }
}


import Kerdes from "./Kerdes.js";

export default class Kviz {
  #kerdesek = [];
  #aktualisIndex;
  #pontszam;

  constructor(kerdesAdatok = [], szuloElem) {
    this.#kerdesek = kerdesAdatok;
    this.#aktualisIndex = 0;
    this.#pontszam = 0;
    this.szuloElem = szuloElem;

    this.#kever(this.#kerdesek);
    this.#ujKerdes();
  }

  #kever(tomb) {
    for (let i = tomb.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tomb[i], tomb[j]] = [tomb[j], tomb[i]];
    }
  }

  #ujKerdes() {
    this.szuloElem.innerHTML = "";

    if (this.vegeVanE()) {
      this.eredmenyKiir();

      const resetGomb = document.createElement("button");
      resetGomb.textContent = "Újraindítás";
      resetGomb.classList.add("reset-gomb");
      resetGomb.addEventListener("click", () => this.reset());
      this.szuloElem.appendChild(resetGomb);
      return;
    }

    const info = document.createElement("p");
    info.classList.add("melyik");
    info.textContent = `⚡ ${this.#aktualisIndex + 1} / ${this.#kerdesek.length} kérdés ⚡`;
    this.szuloElem.appendChild(info);

    const adat = this.#kerdesek[this.#aktualisIndex];
    this.aktualisKerdesObj = new Kerdes(
      adat.kerdesSzoveg,
      adat.valaszok,
      this.szuloElem,
      this
    );

    const resetGomb = document.createElement("button");
    resetGomb.textContent = "Újraindítás";
    resetGomb.classList.add("reset-gomb");
    resetGomb.addEventListener("click", () => this.reset());
    this.szuloElem.appendChild(resetGomb);
  }

  reset() {
    this.#aktualisIndex = 0;
    this.#pontszam = 0;
    this.#kever(this.#kerdesek);
    this.#ujKerdes();
  }

  /* ===== PONTSZÁM ===== */

  novelPontszam() {
    this.#pontszam++;
  }

  eredmenyKiir() {
    const eredmeny = document.createElement("h3");
    eredmeny.textContent = `Eredmény: ${this.#pontszam} / ${this.#kerdesek.length}`;
    this.szuloElem.appendChild(eredmeny);
  }

  /* ===== VEZÉRLÉS ===== */

  valaszKattintva(valasz) {
    if (valasz.isHelyesE()) {
      this.novelPontszam();
    }
    
    setTimeout(() => {
      this.#aktualisIndex++;
      this.#ujKerdes();
    }, 1000);

  }

  vegeVanE() {
    return this.#aktualisIndex >= this.#kerdesek.length;
  }
}

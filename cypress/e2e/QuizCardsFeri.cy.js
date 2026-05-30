const OLDAL = "https://frnc36.github.io/QuizCards/kvizTema.html";

// Külön függvény a kviz oldal megnyitásához
function navigalKvizOldalra() {
  cy.visit(OLDAL);

  cy.get("article").should("be.visible").first().click();
  cy.url().should("include", "kviz.html");
}

describe("QuizCards Teszt", () => {
  it("Létezik-e az oldal?", () => {
    // Csak az oldal elérhetőségét ellenőrizzük
    cy.visit(OLDAL);
    cy.get("body").should("exist");
    cy.url().should("include", "kvizTema.html");
  });

  it("TemaOldalrolKvizre", () => {
    // Navigáció article elemre kattintással
    cy.visit(OLDAL);
    cy.get("article").should("be.visible").first().click();
    cy.url().should("include", "kviz.html");
  });

  it("válaszra kattintva a következő kérdésre ugrik", () => {
    // Először navigáljunk a kviz oldalra
    navigalKvizOldalra();

    cy.get("div.kerdes h2")
      .invoke("text")
      .then((elsoKerdes) => {
        cy.get("div.valaszok p").first().click();

        cy.get("div.kerdes h2").invoke("text").should("not.eq", elsoKerdes);
      });
  });

  it("Minden téma kártya (PHP, JS, Java) megjelenik a témaválasztón", () => {
    cy.visit(OLDAL);
    cy.get("article").should("have.length", 3);
    cy.get("#php").should("exist");
    cy.get("#js").should("exist");
    cy.get("#java").should("exist");
  });

  /*   it("Kattintás előtt hover-re megjelenik a szöveg a kártyán", () => {
    cy.visit(OLDAL);
    cy.get("#php").trigger("mouseenter");
    cy.get("#php .kartya_szoveg").should("be.visible");
    cy.get("#php .kartya_szoveg h1").should(
      "contain",
      "Kattints a PHP kvízhez",
    );
  }); */

  it("Kvíz oldalon megjelenik a kérdés és a válaszlehetőségek", () => {
    navigalKvizOldalra();

    // Kérdés létezik
    cy.get("div.kerdes h2").should("be.visible");

    // Válaszok léteznek (általában 4)
    cy.get("div.valaszok p").should("have.length.at.least", 2);

    // Kérdés számláló látszik
    cy.get(".melyik").should("be.visible");
  });

  /*   it("Helyes válaszra zöld színosztályt kap ('helyes')", () => {
    navigalKvizOldalra();

    // Az első válasz általában a helyes a tesztadatokban
    cy.get("div.valaszok p").first().click();
    cy.get("div.valaszok p").first().should("have.class", "helyes");
  });

  it("Rossz válaszra piros színosztályt kap ('rossz')", () => {
    navigalKvizOldalra();

    // A második válaszra kattintva (valószínűleg rossz)
    cy.get("div.valaszok p").eq(1).click();
    cy.get("div.valaszok p").eq(1).should("have.class", "rossz");
  }); */

  it("Válaszadás után a többi válasz nem kattintható", () => {
    navigalKvizOldalra();

    cy.get("div.valaszok p").first().click();

    // Ellenőrizzük, hogy az összes válasz elem le van tiltva
    cy.get("div.valaszok p").each(($p) => {
      cy.wrap($p).should("have.css", "pointer-events", "none");
    });
  });

  it("Reset gomb megjelenik és megnyitja a modal ablakot", () => {
    navigalKvizOldalra();

    // Válaszolunk egyet, hogy a reset gomb ne legyen letiltva
    cy.get("div.valaszok p").first().click();
    cy.wait(1200); // Várunk, amíg a következő kérdés betölt

    cy.get(".reset-gomb").should("be.visible").click();
    cy.get("#modal").should("be.visible");
    cy.get(".modal-content p").should(
      "contain",
      "Biztosan újra akarod indítani?",
    );
  });

  it("Modalban a 'Mégse' gomb bezárja az ablakot", () => {
    navigalKvizOldalra();
    cy.get("div.valaszok p").first().click();
    cy.wait(1200);

    cy.get(".reset-gomb").click();
    cy.get("#modal").should("be.visible");

    cy.get("#nem").click();
    cy.get("#modal").should("have.class", "hidden");
    // Az aktuális kérdés ugyanaz marad (nem frissül a számláló)
    cy.get(".melyik").should("exist");
  });

/*   it("Modalban az 'Igen' gomb újraindítja a kvízt", () => {
    navigalKvizOldalra();

    // Megjegyezzük az első kérdés szövegét
    cy.get("div.kerdes h2")
      .invoke("text")
      .then((elsoKerdes) => {
        // Válaszolunk, hogy eljussunk a 2. kérdésre
        cy.get("div.valaszok p").first().click();
        cy.wait(1200);

        // Ellenőrizzük, hogy már a 2-nél járunk
        cy.get(".melyik").should("contain", "2 /");

        // Reset gomb + Igen
        cy.get(".reset-gomb").click();
        cy.get("#igen").click();

        // Várjuk az újraindulást
        cy.get("#modal").should("have.class", "hidden");

        // Ellenőrizzük, hogy visszaállt az 1. kérdés
        cy.get(".melyik").should("contain", "1 /");
        cy.get("div.kerdes h2").invoke("text").should("eq", elsoKerdes);
      });
  }); */

/*   it("Az összes kérdés megválaszolása után megjelenik az eredmény", () => {
    navigalKvizOldalra();

    // Rekurzív függvény az összes kérdés végigkattintásához
    function valaszoljMindegyikre() {
      cy.get("body").then(($body) => {
        // Ha van még választható elem, kattints
        if ($body.find("div.valaszok p").length > 0) {
          cy.get("div.valaszok p").first().click();
          cy.wait(1200);
          valaszoljMindegyikre();
        }
      });
    }

    valaszoljMindegyikre();

    // Ellenőrizzük az eredmény szövegét
    cy.get("h3").should("contain", "Eredmény:");
    cy.get(".reset-gomb").should("exist");
  }); */

  it("Eredmény után a reset gomb szintén működik", () => {
    navigalKvizOldalra();

    // Gyorsan végigmegyünk az összes kérdésen
    function vegigmegy() {
      cy.get("body").then(($body) => {
        if ($body.find("div.valaszok p").length > 0) {
          cy.get("div.valaszok p").first().click();
          cy.wait(1200);
          vegigmegy();
        }
      });
    }

    vegigmegy();

    // Eredmény után reset
    cy.get(".reset-gomb").click();
    cy.get("#igen").click();

    // Újra az első kérdésnél kell lennünk
    cy.get(".melyik").should("contain", "1 /");
  });

  it("A localStorage tárolja a kiválasztott témát", () => {
    cy.visit(OLDAL);

    // Kattintsunk a PHP kártyára
    cy.get("#php").click();

    // Ellenőrizzük a localStorage értéket
    cy.window().then((win) => {
      const tema = win.localStorage.getItem("tema");
      expect(tema).to.equal("PHP");
    });

    cy.url().should("include", "kviz.html");
  });

  it("Másik témára (pl. Java) kattintva más localStorage érték lesz", () => {
    cy.visit(OLDAL);

    cy.get("#java").click();

    cy.window().then((win) => {
      const tema = win.localStorage.getItem("tema");
      expect(tema).to.equal("Java");
    });
  });
});

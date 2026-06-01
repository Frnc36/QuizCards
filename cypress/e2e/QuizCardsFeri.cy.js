const OLDAL = "https://frnc36.github.io/QuizCards/kvizTema.html";


/**
 * Kvíz oldalra navigál az első (PHP) témára kattintva
 */
function navigalKvizOldalra() {
  cy.visit(OLDAL);
  cy.get("article").should("be.visible").first().click();
  cy.url().should("include", "kviz.html");
}

// ============================================================
// TESZTESETEK CSOPORTOSÍTVA
// ============================================================

describe("QuizCards Teszt", () => {
  // ==========================================================
  // 1. CSOPORT: OLDAL ELÉRHETŐSÉGI TESZTEK
  // ==========================================================
  describe("1. Oldal elérhetőségi tesztek", () => {
    it("1.1 - Témaválasztó oldal létezik és betöltődik", () => {
      cy.visit(OLDAL);
      cy.get("body").should("exist");
      cy.url().should("include", "kvizTema.html");
    });

    it("1.2 - Főoldal címe helyes", () => {
      cy.visit("/");
      cy.title().should("eq", "QuizCards");
    });

    it("1.3 - Főoldalon minden kép betölt és látszik", () => {
      cy.visit("/");
      cy.get("img").each(($img) => {
        cy.wrap($img).should("be.visible");
      });
    });

    it("1.4 - Footer szöveg látszik a főoldalon", () => {
      cy.visit("/");
      cy.get("footer p").should("contain", "Molnár Beatrix");
    });

    it("1.5 - Header kép látszik a főoldalon", () => {
      cy.visit("/");
      cy.get("header").should("be.visible");
    });

    it("1.6 - Headerre kattintva vissza lehet navigálni a főoldalra", () => {
      cy.visit(OLDAL);
      cy.get("header a").click();
      cy.url().should("include", "/QuizCards/");
    });
  });

  // ==========================================================
  // 2. CSOPORT: TÉMAVÁLASZTÓ KÁRTYÁK TESZTEK
  // ==========================================================
  describe("2. Témaválasztó kártyák tesztek", () => {
    beforeEach(() => {
      cy.visit(OLDAL);
    });

    it("2.1 - Pontosan 3 kártya található a témaválasztón", () => {
      cy.get("article").should("have.length", 3);
    });

    it("2.2 - PHP kártya létezik", () => {
      cy.get("#php").should("exist");
    });

    it("2.3 - JavaScript kártya létezik", () => {
      cy.get("#js").should("exist");
    });

    it("2.4 - Java kártya létezik", () => {
      cy.get("#java").should("exist");
    });

    it("2.5 - Témaválasztóról kvíz oldalra navigálás működik", () => {
      cy.get("article").should("be.visible").first().click();
      cy.url().should("include", "kviz.html");
    });
  });

  // ==========================================================
  // 3. CSOPORT: KVIZ OLDAL ALAP MŰKÖDÉSEI
  // ==========================================================
  describe("3. Kvíz oldal alap működései", () => {
    beforeEach(() => {
      navigalKvizOldalra();
    });

    it("3.1 - Kérdés megjelenik a kvíz oldalon", () => {
      cy.get(".kerdes h2").should("be.visible");
    });

    it("3.2 - Válaszlehetőségek megjelennek", () => {
      cy.get(".valaszok p").should("have.length.at.least", 4);
    });

    it("3.3 - Kérdés számláló látszik", () => {
      cy.get(".melyik").should("be.visible");
    });

    it("3.4 - Reset gomb látszik a kvíz oldalon", () => {
      cy.get(".reset-gomb").should("exist");
    });

    it("3.5 - Válaszok kattinthatóak", () => {
      cy.get(".valaszok p").first().click();
      cy.log("Sikeresen kattintottam a válaszra");
    });
  });

  // ==========================================================
  // 4. CSOPORT: VÁLASZADÁSI MECHANIZMUS TESZTEK
  // ==========================================================
  describe("4. Válaszadási mechanizmus tesztek", () => {
    beforeEach(() => {
      navigalKvizOldalra();
    });

    it("4.1 - Válaszra kattintva a következő kérdésre ugrik", () => {
      cy.get(".melyik")
        .invoke("text")
        .then((elsoSzamlalo) => {
          cy.get(".valaszok p").first().click();
          cy.wait(1200);
          cy.get(".melyik").invoke("text").should("not.eq", elsoSzamlalo);
        });
    });

    it("4.2 - Válaszra kattintva a kérdés szövege megváltozik", () => {
      cy.get("div.kerdes h2")
        .invoke("text")
        .then((elsoKerdes) => {
          cy.get("div.valaszok p").first().click();
          cy.get("div.kerdes h2", { timeout: 3000 })
            .invoke("text")
            .should("not.eq", elsoKerdes);
        });
    });
  });

  // ==========================================================
  // 5. CSOPORT: KÉPEK ÉS VIZUÁLIS ELEMEK TESZTEK
  // ==========================================================
  describe("5. Képek és vizuális elemek tesztek", () => {
    it("5.1 - Minden kép betölt a főoldalon", () => {
      cy.visit("/");
      cy.get("img").each(($img) => {
        cy.wrap($img).should("be.visible");
      });
    });

    it("5.2 - Header kép látszik a témaválasztón", () => {
      cy.visit(OLDAL);
      cy.get("header").should("be.visible");
    });

    it("5.3 - Footer minden oldalon megjelenik", () => {
      cy.visit(OLDAL);
      cy.get("footer").should("be.visible");

      navigalKvizOldalra();
      cy.get("footer").should("be.visible");
    });
  });
});

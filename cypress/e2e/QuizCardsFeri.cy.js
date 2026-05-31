// cypress/e2e/quiz-static.cy.js
const OLDAL = "https://frnc36.github.io/QuizCards/kvizTema.html";

// Külön függvény a kviz oldal megnyitásához (PHP témával)
function navigalKvizOldalraPHP() {
  cy.visit(OLDAL);
  cy.get("#php").should("be.visible").click();
  cy.url().should("include", "kviz.html");
  cy.get(".kerdes h2", { timeout: 10000 }).should("be.visible");
}

// Külön függvény JavaScript témával
function navigalKvizOldalraJS() {
  cy.visit(OLDAL);
  cy.get("#js").should("be.visible").click();
  cy.url().should("include", "kviz.html");
  cy.get(".kerdes h2", { timeout: 10000 }).should("be.visible");
}

// Külön függvény Java témával
function navigalKvizOldalraJava() {
  cy.visit(OLDAL);
  cy.get("#java").should("be.visible").click();
  cy.url().should("include", "kviz.html");
  cy.get(".kerdes h2", { timeout: 10000 }).should("be.visible");
}

describe("Témaválasztó oldal", () => {
  beforeEach(() => {
    cy.visit(OLDAL);
  });

  it("1 - A három téma kártya helyes id-val rendelkezik", () => {
    cy.get("#php").should("have.attr", "id", "php");
    cy.get("#js").should("have.attr", "id", "js");
    cy.get("#java").should("have.attr", "id", "java");
  });

  it("2 - Minden kártyán belül van 'kartya_szoveg' div", () => {
    cy.get("#php .kartya_szoveg").should("exist");
    cy.get("#js .kartya_szoveg").should("exist");
    cy.get("#java .kartya_szoveg").should("exist");
  });

  it("3 - A kártyák hover hatásra megjelenítik a szöveget", () => {
    cy.get("#php").trigger("mouseenter");
    cy.get("#php .kartya_szoveg").should("be.visible");
    cy.get("#php .kartya_szoveg h1").should("contain", "PHP");
  });
}); //describe vége

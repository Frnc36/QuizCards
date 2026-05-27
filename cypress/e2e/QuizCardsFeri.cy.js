/* describe("QuizCards Teszt", () => {

}); */
const OLDAL = "https://frnc36.github.io/QuizCards/kvizTema.html";

function megnyitKvizOldalt() {
  cy.visit(OLDAL);
  cy.get("article a").first().click();
  cy.url().should("include", "kviz.html");
}

describe("QuizCards Teszt", () => {
  
  beforeEach(() => {
    megnyitKvizOldalt();
  });

  it("Létezik-e az oldal?", () => {
    cy.visit(OLDAL);
  });

/*   it("TemaOldarolKvizre", () => {
    cy.visit(OLDAL);

    cy.get("article a").first().click();

    cy.url().should("include", "kviz.html");
  }); */

  it("válaszra kattintva a következő kérdésre ugrik", () => {
  /*   cy.visit(OLDAL);
    cy.get("article a").first().click();
    cy.url().should("include", "kviz.html"); */
    cy.get("div.kerdes h2")
      .invoke("text")
      .then((elsoKerdes) => {
        cy.get("div.valaszok p").first().click();

        cy.get("div.kerdes h2").invoke("text").should("not.eq", elsoKerdes);
      });
  });
});

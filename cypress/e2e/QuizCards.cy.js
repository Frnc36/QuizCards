describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://frnc36.github.io/QuizCards/')
    cy.get('#kviz').trigger('mouseenter')
    
    cy.get('#kviz a').should('have.attr', 'href')
    cy.get('#kviz a').click({ force: true })
    cy.url().should('include', 'kvizTema.html')
    
  });

  it('vissza a fooldalra', function() {
    cy.visit('https://frnc36.github.io/QuizCards/kvizTema.html')
    
    cy.get('.home-link').click()
    cy.url().should('include', 'index.html')
    
  });

  it('tema kattintas', function() {
    cy.visit('https://frnc36.github.io/QuizCards/kvizTema.html')
    cy.get('#php').click()
    cy.url().should('include', 'kviz.html')
    
    cy.visit('https://frnc36.github.io/QuizCards/kvizTema.html')
    cy.get('#js').click()
    cy.url().should('include', 'kviz.html')
    
    cy.visit('https://frnc36.github.io/QuizCards/kvizTema.html')
    cy.get('#java').click()
    cy.url().should('include', 'kviz.html')
    
  });
})
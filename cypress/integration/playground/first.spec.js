/// <reference types="Cypress" />
describe('My First Test', () => {
  it('Visitis the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
    cy.pause()
    cy.url().should('include', '/commands/actions')
    cy.get('.action-email')
    .type('fake@email.com')
    .should('have.value', 'fake@email.com')
  })
})
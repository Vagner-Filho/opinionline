/// <reference types="Cypress" />

describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/') // baseUrl set in cypress.json, so its the standard path for cy.visit() and cy.request()
  })
})
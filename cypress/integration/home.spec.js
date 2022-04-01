/// <reference types="Cypress" />

describe('Home Page', () => {
  it('Page loads', () => {
    // baseUrl set in cypress.json, so its the standard path for cy.visit() and cy.request()
    // cy.visit('/') 
    // expect(cy.get('#app')).to.exist
    // the above lines represent a behavior driven development aproach
    cy.get('nav').should('not.exist')
    cy.visit('/')
    cy.get('nav').should('exist')
  })
  it('Navigates between most actual and most read', () => {
    cy.get('#change-view-type').should('have.text', 'Mais atuais')
    cy.get('#change-view-type').click()
    cy.get('#change-view-type').should('have.text', 'Mais lidos')
  })
  it('Goes to expanded article', () => {
    cy.get('#article-card0').click()
    cy.get('#article-card0').should('not.exist')
    cy.get('.expanded-article').should('exist')
  })
  it('Returns to home', () => {
    cy.get('nav').find('button#home').click()
    cy.get('.expanded-article').should('not.exist')
    cy.get('#article-card0').should('exist')
  })
})
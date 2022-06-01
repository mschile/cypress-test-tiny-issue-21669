/// <reference types="cypress" />
describe('page', () => {
  it('works', () => {
    let continueResponse
    cy.intercept(/example.json/, (req) => {
      req.continue(() => {
        return new Promise((resolve) => {
          continueResponse = resolve
        })
      })
    })

    cy.visit('cypress/fixtures/index.html')
    cy.get('#button').click()
    cy.get('#loading').should('be.visible').then(() => {
      continueResponse()
    })
    cy.get('#loading').should('not.be.visible')
  })
})

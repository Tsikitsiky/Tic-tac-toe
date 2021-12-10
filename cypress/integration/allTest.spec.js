/// <reference types="cypress" />


describe('test choose first player', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
        cy.contains('Tic Tac Toe')
    });

    it('should display choose player by default', () => {
        cy.get("[data-cy='player-choice']").should('have.text', 'Choose the first player')
    })

    it('should display two options', () => {
        cy.get("[data-cy='button-wrapper']").children('button')
    })
    it('Options should be X or O', () => {
        cy.get("[data-cy='button-wrapper']").find('button').contains(/X|O/g)
    })

    it('should choose X as a first player and should display the board', () => {
        cy.get("[data-cy='player-1']").should('have.text', 'X').click().then(() => {
            cy.get('[data-cy="board"]').should('exist')
        })
    })

})

describe('test game', () => {
    it("should show turn text", () => {
        cy.get("[data-cy='game-status']").should('be.visible')
    });

    it('board should be populated', () => {
        cy.get('[data-cy="board"]').children('button')
        cy.get("[data-cy='square']").should('have.length', 9)
    })

    it('click on the squares', () => {
        cy.get("[data-cy='square']").eq(0).click()
        cy.get("[data-cy='square']").eq(1).click()
        cy.get("[data-cy='square']").eq(3).click()
        cy.get("[data-cy='square']").eq(4).click()
        cy.get("[data-cy='square']").eq(6).click()
    })

    it("should show winner text", () => {
        cy.get("[data-cy='game-status']").contains('X won')
    });

    it('Replay button', () => {
        cy.get("[data-cy='playAgainBtn']").click().then(() => {
            cy.get("[data-cy='square']").should('have.text', '')
        })
    })
})


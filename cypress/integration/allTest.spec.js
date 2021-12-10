/// <reference types="cypress" />

// Fake player choosing
const selectPlayer = (playerChoice) => {
    const playerId = playerChoice === 'X' ? 1 : 2;
    cy.get(`[data-cy='player-${playerId}']`).should('have.text', playerChoice).click().then(() => {
        cy.get('[data-cy="board"]').should('exist')
    })
}

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

    it('should choose X as a first player and should display the board and remove choose player header', () => {
        cy.get("[data-cy='player-1']").should('have.text', 'X').click().then(() => {
            cy.get('[data-cy="board"]').should('exist')
            cy.get("[data-cy='player-choice']").should('not.exist')
        })
    })

})

describe('should be able to choose first player', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })

    it('should be able to choose O', () => {
        selectPlayer('O');
    })

    it('should be able to choose X', () => {
        selectPlayer('X');
    })
})

describe('Duplicate clicks should not change square text', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
    })

    it('click on a square twice do not change the text', () => {
        selectPlayer('O');
        // Click on square 2
        cy.get("[data-cy='square']").eq(1).click().should('have.text', 'O')
        // Click on square 2 for the second time but the square text does not change
        cy.get("[data-cy='square']").eq(1).click().should('have.text', 'O')
    })
})

describe('test game', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
    });

    it('should be able to choose first player', () => {
        selectPlayer('X');
    })

    it("should show game status", () => {
        cy.get("[data-cy='game-status']").should('be.visible')
    });

    it('board should be populated', () => {
        cy.get('[data-cy="board"]').children('button')
        cy.get("[data-cy='square']").should('have.length', 9)
    })

    it('click a square should change turn text', () => {
        cy.get("[data-cy='game-status']")
        .invoke('text')
        .then((text1) => {
            cy.get("[data-cy='square']").eq(0).click()
            cy.get("[data-cy='game-status']")
            .invoke('text')
            .should((text2) => {
                expect(text1).not.to.eq(text2)
            })
        })

    })


    // Click squares until there is a winner
    it('should be allowed to click on squares until there is a winner', () => {
        cy.get("[data-cy='square']").eq(1).click()
        cy.get("[data-cy='square']").eq(3).click()
        cy.get("[data-cy='square']").eq(4).click()
        cy.get("[data-cy='square']").eq(6).click()
    })

    it("should show winner text if there is a winner", () => {
        cy.get("[data-cy='game-status']").contains('X won')
    });

    it('Replay button', () => {
        cy.get("[data-cy='playAgainBtn']").click().then(() => {
            cy.get("[data-cy='square']").should('have.text', '')
        })
    })

    // Click until all squares are filled but there is no winner
    it('should allow click until all squares are filled and no one won ', () => {
        cy.get("[data-cy='square']").eq(0).click()
        cy.get("[data-cy='square']").eq(1).click()
        cy.get("[data-cy='square']").eq(2).click()
        cy.get("[data-cy='square']").eq(5).click()
        cy.get("[data-cy='square']").eq(3).click()
        cy.get("[data-cy='square']").eq(4).click()
        cy.get("[data-cy='square']").eq(8).click()
        cy.get("[data-cy='square']").eq(6).click()
        cy.get("[data-cy='square']").eq(7).click()
    })

    it("should show tie text if no one won", () => {
        cy.get("[data-cy='game-is-tie']").should('exist')
    });
})


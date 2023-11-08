describe("Fibonacci", () => {
    beforeEach(() => {
        cy.visit('/fibonacci');
    });

    it('If input field is empty, button should be disabled', () => {
        cy.get("input").should('be.empty');
        cy.get("button[type='submit']").should('be.disabled');
    });

    it('If input field is not empty, button should be enabled', () => {
        cy.get("input").type('5');
        cy.get("button[type='submit']").should('be.enabled');
    });

    it('Should get correct fibonacci numbers sequence', () => {
        cy.get("input").type('6');
        cy.get("button[type='submit']").click();
        cy.clock();
        cy.get("div[class*='circle_content']").as('content');
        cy.get("div[class*='circle_circle']").as('content_text');
        cy.get("p[class*='circle_index']").as('content_index');
        cy.get('@content').should('have.length', 1);
        cy.get('@content_text').should('have.text', '1');
        cy.get('@content_index').should('have.text', '0');
        cy.tick(500);
        cy.get('@content').should('have.length', 2);
        cy.get('@content_text').should('have.text', '11');
        cy.get('@content_index').should('have.text', '01');
        cy.tick(500);
        cy.get('@content').should('have.length', 3);
        cy.get('@content_text').should('have.text', '112');
        cy.get('@content_index').should('have.text', '012');
        cy.tick(500);
        cy.get('@content').should('have.length', 4);
        cy.get('@content_text').should('have.text', '1123');
        cy.get('@content_index').should('have.text', '0123');
        cy.tick(500);
        cy.get('@content').should('have.length', 5);
        cy.get('@content_text').should('have.text', '11235');
        cy.get('@content_index').should('have.text', '01234');
        cy.tick(500);
        cy.get('@content').should('have.length', 6);
        cy.get('@content_text').should('have.text', '112358');
        cy.get('@content_index').should('have.text', '012345');
    });
})
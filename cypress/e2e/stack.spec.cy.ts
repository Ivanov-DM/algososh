describe('Stack', () => {
    beforeEach(() => {
        cy.visit('/stack');
    });

    it('If input field is empty, button should be disabled', () => {
        cy.get("input").should('be.empty');
        cy.get("button[type='submit']").should('be.disabled');
    });

    it('If input field is not empty, button should be enabled', () => {
        cy.get("input").type('5');
        cy.get("button[type='submit']").should('be.enabled');
    });

    it('Element should be correctly added into the stack', () => {
        cy.clock();
        cy.get("input").type('5');
        cy.get("button[type='submit']").click();
        cy.get("div[class*='circle_circle']").should($div => {
            expect($div).to.have.length(1);
            expect($div.eq(0)).to.contain('5');
            expect($div.eq(0)).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(0).prev('div')).to.contain('top');
            expect($div.eq(0).next('p')).to.contain('0');
        });
        cy.tick(500);
        cy.get("div[class*='circle_circle']").should($div => {
            expect($div).to.have.length(1);
            expect($div.eq(0)).to.contain('5');
            expect($div.eq(0)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(0).prev('div')).to.contain('top');
            expect($div.eq(0).next('p')).to.contain('0');
        });
    });

    it('Element should be correctly removed from the stack', () => {
        cy.clock();
        cy.get("input").type('5');
        cy.get("button[type='submit']").click();
        cy.tick(500);
        cy.get("input").type('7');
        cy.get("button[type='submit']").click();
        cy.tick(500);
        cy.get("button[class*='stack_deleteBtn']").click();
        cy.get("div[class*='circle_circle']").should($div => {
            expect($div).to.have.length(2);
            expect($div.eq(0)).to.contain('5');
            expect($div.eq(0)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(0).next('p')).to.contain('0');
            expect($div.eq(1)).to.contain('7');
            expect($div.eq(1)).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(1).prev('div')).to.contain('top');
            expect($div.eq(1).next('p')).to.contain('1');
        });
        cy.tick(500);
        cy.get("div[class*='circle_circle']").should($div => {
            expect($div).to.have.length(1);
            expect($div.eq(0)).to.contain('5');
            expect($div.eq(0)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(0).prev('div')).to.contain('top');
            expect($div.eq(0).next('p')).to.contain('0');
        });
    });

    it('The stack should be correctly cleared', () => {
        cy.clock();
        cy.get("input").type('5');
        cy.get("button[type='submit']").click();
        cy.tick(500);
        cy.get("input").type('7');
        cy.get("button[type='submit']").click();
        cy.tick(500);
        cy.get("button[type='reset']").click();
        cy.tick(500);
        cy.get("div[class*='circle_circle']").should('not.exist');
    });
})
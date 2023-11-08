describe('Queue', () => {
    beforeEach(() => {
        cy.visit('/queue');
    });

    it('If input field is empty, button should be disabled', () => {
        cy.get("input").should('be.empty');
        cy.get("button[type='submit']").should('be.disabled');
    });

    it('If input field is not empty, button should be enabled', () => {
        cy.get("input").type('5');
        cy.get("button[type='submit']").should('be.enabled');
    });

    it('Element should be correctly added into the queue', () => {
        cy.clock();
        cy.get("input").type('5');
        cy.get("button[type='submit']").click();
        cy.get("div[class*='circle_circle']").should($div => {
            expect($div).to.have.length(7);
            expect($div.eq(0)).to.contain('5');
            expect($div.eq(0)).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(0).prev('div')).to.contain('head');
            expect($div.eq(0).next('p')).to.contain('0');
            expect($div.eq(0).next().next("div")).to.contain('tail');
        });
        cy.tick(500);
        cy.get("div[class*='circle_circle']").should($div => {
            expect($div).to.have.length(7);
            expect($div.eq(0)).to.contain('5');
            expect($div.eq(0)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(0).prev('div')).to.contain('head');
            expect($div.eq(0).next('p')).to.contain('0');
            expect($div.eq(0).next().next("div")).to.contain('tail');
        });
    });

    it('Element should be correctly removed from the queue', () => {
        cy.clock();
        cy.get("input").type('A');
        cy.get("button[type='submit']").click();
        cy.tick(500);
        cy.get("input").type('B');
        cy.get("button[type='submit']").click();
        cy.tick(500);
        cy.get("button[class*='queue_deleteBtn']").click();
        cy.get("div[class*='circle_circle']").should($div => {
            expect($div).to.have.length(7);
            expect($div.eq(0)).to.contain('A');
            expect($div.eq(0)).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(0).prev('div')).to.contain('head');
            expect($div.eq(0).next('p')).to.contain('0');
            expect($div.eq(0).next().next("div")).to.contain('');
            expect($div.eq(1)).to.contain('B');
            expect($div.eq(1)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(1).prev('div')).to.contain('');
            expect($div.eq(1).next('p')).to.contain('1');
            expect($div.eq(1).next().next("div")).to.contain('tail');
        });
        cy.tick(500);
        cy.get("div[class*='circle_circle']").should($div => {
            expect($div).to.have.length(7);
            expect($div.eq(0)).to.contain('');
            expect($div.eq(0)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(0).prev('div')).to.contain('');
            expect($div.eq(0).next('p')).to.contain('0');
            expect($div.eq(0).next().next("div")).to.contain('');
            expect($div.eq(1)).to.contain('B');
            expect($div.eq(1)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(1).prev('div')).to.contain('head');
            expect($div.eq(1).next('p')).to.contain('1');
            expect($div.eq(1).next().next("div")).to.contain('tail');
        });
    });

    it('The queue should be correctly cleared', () => {
        cy.clock();
        cy.get("input").type('5');
        cy.get("button[type='submit']").click();
        cy.tick(500);
        cy.get("input").type('7');
        cy.get("button[type='submit']").click();
        cy.tick(500);
        cy.get("button[type='reset']").click();
        cy.tick(500);
        cy.get("div[class*='circle_circle']").should('have.text', '');
    });
});
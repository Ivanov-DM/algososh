import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('String', function () {
    beforeEach(function() {
        cy.visit('/recursion');
        cy.get("button[type='submit']").as("button");
    })

    it('If input field is empty, button should be disabled', () => {
        cy.get("input").should('be.empty');
        cy.get("@button").should('be.disabled');
    })

    it('If input field is not empty, button should be enabled', () => {
        cy.get("input").type('test');
        cy.get("@button").should('be.enabled');
    })

    it('Should be reversed correctly', () => {
        cy.get("input").type('test');
        cy.get("@button").click();
        cy.clock();
        cy.getCircleItem().should($div => {
            expect($div).to.have.length(4);
            expect($div[0].textContent).to.eq('t');
            expect($div[0].className).to.match(/circle_changing/);
            expect($div[1].textContent).to.eq('e');
            expect($div[1].className).to.match(/circle_default/);
            expect($div[2].textContent).to.eq('s');
            expect($div[2].className).to.match(/circle_default/);
            expect($div[3].textContent).to.eq('t');
            expect($div[3].className).to.match(/circle_changing/);
        });
        cy.tick(SHORT_DELAY_IN_MS);
        cy.getCircleItem().should($div => {
            expect($div).to.have.length(4);
            expect($div[0].textContent).to.eq('t');
            expect($div[0].className).to.match(/circle_modified/);
            expect($div[1].textContent).to.eq('e');
            expect($div[1].className).to.match(/circle_changing/);
            expect($div[2].textContent).to.eq('s');
            expect($div[2].className).to.match(/circle_changing/);
            expect($div[3].textContent).to.eq('t');
            expect($div[3].className).to.match(/circle_modified/);
        });
        cy.tick(SHORT_DELAY_IN_MS);
        cy.getCircleItem().should($div => {
            expect($div).to.have.length(4);
            expect($div[0].textContent).to.eq('t');
            expect($div[0].className).to.match(/circle_modified/);
            expect($div[1].textContent).to.eq('s');
            expect($div[1].className).to.match(/circle_modified/);
            expect($div[2].textContent).to.eq('e');
            expect($div[2].className).to.match(/circle_modified/);
            expect($div[3].textContent).to.eq('t');
            expect($div[3].className).to.match(/circle_modified/);
        });
    });
});

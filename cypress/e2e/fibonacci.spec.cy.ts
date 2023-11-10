import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe("Fibonacci", () => {
    const CIRCLE_ITEM_SELECTOR = '[class*=circle_circle]';
    const CIRCLE_INDEX_SELECTOR = '[class*=circle_index]';
    const CIRCLE_CONTENT_SELECTOR = '[class*=circle_content]';

    beforeEach(() => {
        cy.visit('/fibonacci');
        cy.get("button[type='submit']").as('button');
    });

    it('If input field is empty, button should be disabled', () => {
        cy.get("input").should('be.empty');
        cy.get("@button").should('be.disabled');
    });

    it('If input field is not empty, button should be enabled', () => {
        cy.get("input").type('5');
        cy.get("@button").should('be.enabled');
    });

    it('Should get correct fibonacci numbers sequence', () => {
        cy.get("input").type('6');
        cy.get("@button").click();
        cy.clock();
        cy.get(CIRCLE_CONTENT_SELECTOR).as('item');
        cy.get(CIRCLE_ITEM_SELECTOR).as('item_text');
        cy.get(CIRCLE_INDEX_SELECTOR).as('item_index');
        cy.get('@item').should('have.length', 1);
        cy.get('@item_text').should('have.text', '1');
        cy.get('@item_index').should('have.text', '0');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@item').should('have.length', 2);
        cy.get('@item_text').should('have.text', '11');
        cy.get('@item_index').should('have.text', '01');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@item').should('have.length', 3);
        cy.get('@item_text').should('have.text', '112');
        cy.get('@item_index').should('have.text', '012');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@item').should('have.length', 4);
        cy.get('@item_text').should('have.text', '1123');
        cy.get('@item_index').should('have.text', '0123');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@item').should('have.length', 5);
        cy.get('@item_text').should('have.text', '11235');
        cy.get('@item_index').should('have.text', '01234');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@item').should('have.length', 6);
        cy.get('@item_text').should('have.text', '112358');
        cy.get('@item_index').should('have.text', '012345');
    });
})
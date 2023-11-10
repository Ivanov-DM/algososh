import { DELAY_IN_MS } from "../../src/constants/delays";

describe('List', () => {
    const CIRCLE_ITEM_SELECTOR = '[class*=circle_circle]';
    const CIRCLE_TAIL_SELECTOR = '[class*=circle_tail]';
    const CIRCLE_HEAD_SELECTOR = '[class*=circle_head]';
    const CIRCLE_CONTENT_SELECTOR = '[class*=circle_content]';

    beforeEach(() => {
        cy.visit('/list');
        cy.get("button[value='addByHeadBtn']").as('addByHeadButton');
        cy.get("button[value='addByTailBtn']").as('addByTailButton');
        cy.get("button[value='addByIndexBtn']").as('addByIndexButton');
        cy.get("button[value='deleteByIndexBtn']").as('deleteByIndexButton');
        cy.get("button[value='deleteByHeadBtn']").as('deleteByHeadButton');
        cy.get("button[value='deleteByTailBtn']").as('deleteByTailButton');
        cy.get("input[name='listValue']").as('listValue');
        cy.get("input[name='indexValue']").as('indexValue');
        cy.get("div[class*='list_animation']").as('itemContainer');
    });

    it('If input field of value is empty, add buttons should be disabled', () => {
        cy.get("@listValue").should('be.empty');
        cy.get("@addByHeadButton").should('be.disabled');
        cy.get("@addByTailButton").should('be.disabled');
        cy.get("@addByIndexButton").should('be.disabled');
    });

    it('If input field of value is not empty, add buttons should be enabled', () => {
        cy.get("@listValue").type('test');
        cy.get("@addByHeadButton").should('be.enabled');
        cy.get("@addByTailButton").should('be.enabled');
        cy.get("@addByIndexButton").should('be.disabled');
    });

    it('If input field of index is empty, add and delete buttons by index should be disabled', () => {
        cy.get("@indexValue").should('be.empty');
        cy.get("@addByIndexButton").should('be.disabled');
        cy.get("@deleteByIndexButton").should('be.disabled');
    });

    it('If input field of index is not empty, delete buttons by index should be enabled', () => {
        cy.get("@indexValue").type('2');
        cy.get("@addByIndexButton").should('be.disabled');
        cy.get("@deleteByIndexButton").should('be.enabled');
    });

    it('If input fields are not empty, add and delete buttons should be enabled', () => {
        cy.get("@listValue").type('test');
        cy.get("@indexValue").type('2');
        cy.get("@addByHeadButton").should('be.enabled');
        cy.get("@addByTailButton").should('be.enabled');
        cy.get("@addByIndexButton").should('be.enabled');
        cy.get("@deleteByIndexButton").should('be.enabled');
    });

    it('Default list should be rendered correctly', () => {
        cy.get("@itemContainer").children().should($div => {
            expect($div).not.be.empty;
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq($div.length - 1).children(CIRCLE_TAIL_SELECTOR)).to.contain('tail');
            for (let i = 0; i < $div.length; i++) {
                expect($div.eq(i).children(CIRCLE_ITEM_SELECTOR)).not.be.empty;
                expect($div.eq(i).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
            }
        });
    });

    it('Element should be correctly added into head of list', () => {
        cy.clock();
        cy.get("@listValue").type('test');
        cy.get("@addByHeadButton").click();
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('test');
            expect($div.eq(0)
                .children(CIRCLE_HEAD_SELECTOR)
                .children(CIRCLE_CONTENT_SELECTOR)
                .children(CIRCLE_ITEM_SELECTOR)
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.contain('test');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_modified/);
        });
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.contain('test');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
        });
    });

    it('Element should be correctly added into tail of list', () => {
        cy.clock();
        cy.get("@listValue").type('test');
        cy.get("@addByTailButton").click();
        cy.get("@itemContainer").children().should($div => {
            const tailIndex = $div.length - 1;
            expect($div.eq(tailIndex).children(CIRCLE_TAIL_SELECTOR)).to.contain('test');
            expect($div.eq(tailIndex)
                .children(CIRCLE_TAIL_SELECTOR)
                .children(CIRCLE_CONTENT_SELECTOR)
                .children(CIRCLE_ITEM_SELECTOR)
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            const tailIndex = $div.length - 1;
            expect($div.eq(tailIndex).children(CIRCLE_TAIL_SELECTOR)).to.contain('tail');
            expect($div.eq(tailIndex).children(CIRCLE_ITEM_SELECTOR)).to.contain('test');
            expect($div.eq(tailIndex).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_modified/);
        });
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            const tailIndex = $div.length - 1;
            expect($div.eq(tailIndex).children(CIRCLE_TAIL_SELECTOR)).to.contain('tail');
            expect($div.eq(tailIndex).children(CIRCLE_ITEM_SELECTOR)).to.contain('test');
            expect($div.eq(tailIndex).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
        });
    });

    it('Element should be correctly added into list by index', () => {
        cy.clock();
        cy.get("@listValue").type('test');
        cy.get("@indexValue").type('2');
        cy.get("@addByIndexButton").click();
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('test');
            expect($div.eq(0)
                .children(CIRCLE_HEAD_SELECTOR)
                .children(CIRCLE_CONTENT_SELECTOR)
                .children(CIRCLE_ITEM_SELECTOR)
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(DELAY_IN_MS);
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(1).children(CIRCLE_HEAD_SELECTOR)).to.contain('test');
            expect($div.eq(1)
                .children(CIRCLE_HEAD_SELECTOR)
                .children(CIRCLE_CONTENT_SELECTOR)
                .children(CIRCLE_ITEM_SELECTOR)
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(1).children(CIRCLE_HEAD_SELECTOR)).to.contain('');
            expect($div.eq(1).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(2).children(CIRCLE_HEAD_SELECTOR)).to.contain('test');
            expect($div.eq(2)
                .children(CIRCLE_HEAD_SELECTOR)
                .children(CIRCLE_CONTENT_SELECTOR)
                .children(CIRCLE_ITEM_SELECTOR)
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(1).children(CIRCLE_HEAD_SELECTOR)).to.contain('');
            expect($div.eq(1).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(2).children(CIRCLE_ITEM_SELECTOR)).to.contain('test');
            expect($div.eq(2).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_modified/);
        });
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(1).children(CIRCLE_HEAD_SELECTOR)).to.contain('');
            expect($div.eq(1).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(2).children(CIRCLE_ITEM_SELECTOR)).to.contain('test');
            expect($div.eq(2).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
        });
    });

    it('Element should be correctly removed from head of the list', () => {
        cy.clock();
        cy.get("@deleteByHeadButton").should('be.enabled').click();
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).not.be.empty;
            expect($div.eq(0)
                .children(CIRCLE_HEAD_SELECTOR)
                .children(CIRCLE_CONTENT_SELECTOR)
                .children(CIRCLE_ITEM_SELECTOR)
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).not.be.empty;
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
        });
    });

    it('Element should be correctly removed from tail of the list', () => {
        cy.clock();
        cy.get("@deleteByTailButton").should('be.enabled').click();
        cy.get("@itemContainer").children().should($div => {
            const tailIndex = $div.length - 1;
            expect($div.eq(tailIndex).children(CIRCLE_TAIL_SELECTOR)).not.be.empty;
            expect($div.eq(tailIndex)
                .children(CIRCLE_TAIL_SELECTOR)
                .children(CIRCLE_CONTENT_SELECTOR)
                .children(CIRCLE_ITEM_SELECTOR)
            ).to.have.attr('class').match(/circle_changing/);

        });
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            const tailIndex = $div.length - 1;
            expect($div.eq(tailIndex).children(CIRCLE_TAIL_SELECTOR)).to.contain('tail');
            expect($div.eq(tailIndex).children(CIRCLE_ITEM_SELECTOR)).not.be.empty;
            expect($div.eq(tailIndex).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
        });
    });

    it('Element should be correctly removed from the list by index', () => {
        cy.clock();
        cy.get("@indexValue").type('1');
        cy.get("@deleteByIndexButton").click();
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(DELAY_IN_MS);
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(1).children(CIRCLE_TAIL_SELECTOR)).not.be.empty;
            expect($div.eq(1)
                .children(CIRCLE_TAIL_SELECTOR)
                .children(CIRCLE_CONTENT_SELECTOR)
                .children(CIRCLE_ITEM_SELECTOR)
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(DELAY_IN_MS);
        cy.get("@itemContainer").children().should($div => {
            expect($div.eq(0).children(CIRCLE_HEAD_SELECTOR)).to.contain('head');
            expect($div.eq(0).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
            expect($div.eq(1).children(CIRCLE_TAIL_SELECTOR)).be.empty;
            expect($div.eq(1).children(CIRCLE_ITEM_SELECTOR)).to.have.attr('class').match(/circle_default/);
        });
    });
});
describe('List', () => {
    beforeEach(() => {
        cy.visit('/list');
    });

    it('If input field of value is empty, add buttons should be disabled', () => {
        cy.get("input[name='listValue']").should('be.empty');
        cy.get("button[value='addByHeadBtn']").should('be.disabled');
        cy.get("button[value='addByTailBtn']").should('be.disabled');
        cy.get("button[value='addByIndexBtn']").should('be.disabled');
    });

    it('If input field of value is not empty, add buttons should be enabled', () => {
        cy.get("input[name='listValue']").type('test');
        cy.get("button[value='addByHeadBtn']").should('be.enabled');
        cy.get("button[value='addByTailBtn']").should('be.enabled');
        cy.get("button[value='addByIndexBtn']").should('be.disabled');
    });

    it('If input field of index is empty, add and delete buttons by index should be disabled', () => {
        cy.get("input[name='indexValue']").should('be.empty');
        cy.get("button[value='addByIndexBtn']").should('be.disabled');
        cy.get("button[value='deleteByIndexBtn']").should('be.disabled');
    });

    it('If input field of index is not empty, delete buttons by index should be enabled', () => {
        cy.get("input[name='indexValue']").type('2');
        cy.get("button[value='addByIndexBtn']").should('be.disabled');
        cy.get("button[value='deleteByIndexBtn']").should('be.enabled');
    });

    it('If input fields are not empty, add and delete buttons should be enabled', () => {
        cy.get("input[name='listValue']").type('test');
        cy.get("input[name='indexValue']").type('2');
        cy.get("button[value='addByHeadBtn']").should('be.enabled');
        cy.get("button[value='addByTailBtn']").should('be.enabled');
        cy.get("button[value='addByIndexBtn']").should('be.enabled');
        cy.get("button[value='deleteByIndexBtn']").should('be.enabled');
    });

    it('Default list should be rendered correctly', () => {
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div).not.be.empty;
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq($div.length - 1).children('[class*=circle_tail]')).to.contain('tail');
            for (let i = 0; i < $div.length; i++) {
                expect($div.eq(i).children('[class*=circle_circle]')).not.be.empty;
                expect($div.eq(i).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
            }
        });
    });

    it('Element should be correctly added into head of list', () => {
        cy.clock();
        cy.get("input[name='listValue']").type('test');
        cy.get("button[value='addByHeadBtn']").click();
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('test');
            expect($div.eq(0)
                .children('[class*=circle_head]')
                .children('[class*=circle_content]')
                .children('[class*=circle_circle]')
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq(0).children('[class*=circle_circle]')).to.contain('test');
            expect($div.eq(0).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_modified/);
        });
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq(0).children('[class*=circle_circle]')).to.contain('test');
            expect($div.eq(0).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
        });
    });

    it('Element should be correctly added into tail of list', () => {
        cy.clock();
        cy.get("input[name='listValue']").type('test');
        cy.get("button[value='addByTailBtn']").click();
        cy.get("div[class*='list_animation']").children().should($div => {
            const tailIndex = $div.length - 1;
            expect($div.eq(tailIndex).children('[class*=circle_tail]')).to.contain('test');
            expect($div.eq(tailIndex)
                .children('[class*=circle_tail]')
                .children('[class*=circle_content]')
                .children('[class*=circle_circle]')
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            const tailIndex = $div.length - 1;
            expect($div.eq(tailIndex).children('[class*=circle_tail]')).to.contain('tail');
            expect($div.eq(tailIndex).children('[class*=circle_circle]')).to.contain('test');
            expect($div.eq(tailIndex).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_modified/);
        });
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            const tailIndex = $div.length - 1;
            expect($div.eq(tailIndex).children('[class*=circle_tail]')).to.contain('tail');
            expect($div.eq(tailIndex).children('[class*=circle_circle]')).to.contain('test');
            expect($div.eq(tailIndex).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
        });
    });

    it('Element should be correctly added into list by index', () => {
        cy.clock();
        cy.get("input[name='listValue']").type('test');
        cy.get("input[name='indexValue']").type('2');
        cy.get("button[value='addByIndexBtn']").click();
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('test');
            expect($div.eq(0)
                .children('[class*=circle_head]')
                .children('[class*=circle_content]')
                .children('[class*=circle_circle]')
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(1000);
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq(0).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(1).children('[class*=circle_head]')).to.contain('test');
            expect($div.eq(1)
                .children('[class*=circle_head]')
                .children('[class*=circle_content]')
                .children('[class*=circle_circle]')
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq(0).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(1).children('[class*=circle_head]')).to.contain('');
            expect($div.eq(1).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(2).children('[class*=circle_head]')).to.contain('test');
            expect($div.eq(2)
                .children('[class*=circle_head]')
                .children('[class*=circle_content]')
                .children('[class*=circle_circle]')
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            // expect($div.length).to.eq(elCount + 1);
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq(0).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
            expect($div.eq(1).children('[class*=circle_head]')).to.contain('');
            expect($div.eq(1).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
            expect($div.eq(2).children('[class*=circle_circle]')).to.contain('test');
            expect($div.eq(2).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_modified/);
        });
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq(0).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
            expect($div.eq(1).children('[class*=circle_head]')).to.contain('');
            expect($div.eq(1).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
            expect($div.eq(2).children('[class*=circle_circle]')).to.contain('test');
            expect($div.eq(2).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
        });
    });

    it('Element should be correctly removed from head of the list', () => {
        cy.clock();
        cy.get("button[value='deleteByHeadBtn']").should('be.enabled').click();
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).not.be.empty;
            expect($div.eq(0)
                .children('[class*=circle_head]')
                .children('[class*=circle_content]')
                .children('[class*=circle_circle]')
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq(0).children('[class*=circle_circle]')).not.be.empty;
            expect($div.eq(0).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
        });
    });

    it('Element should be correctly removed from tail of the list', () => {
        cy.clock();
        cy.get("button[value='deleteByTailBtn']").should('be.enabled').click();
        cy.get("div[class*='list_animation']").children().should($div => {
            const tailIndex = $div.length - 1;
            expect($div.eq(tailIndex).children('[class*=circle_tail]')).not.be.empty;
            expect($div.eq(tailIndex)
                .children('[class*=circle_tail]')
                .children('[class*=circle_content]')
                .children('[class*=circle_circle]')
            ).to.have.attr('class').match(/circle_changing/);

        });
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            const tailIndex = $div.length - 1;
            expect($div.eq(tailIndex).children('[class*=circle_tail]')).to.contain('tail');
            expect($div.eq(tailIndex).children('[class*=circle_circle]')).not.be.empty;
            expect($div.eq(tailIndex).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
        });
    });

    it('Element should be correctly removed from the list by index', () => {
        cy.clock();
        cy.get("input[name='indexValue']").type('1');
        cy.get("button[value='deleteByIndexBtn']").click();
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq(0).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(1000);
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq(0).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_changing/);
            expect($div.eq(1).children('[class*=circle_tail]')).not.be.empty;
            expect($div.eq(1)
                .children('[class*=circle_tail]')
                .children('[class*=circle_content]')
                .children('[class*=circle_circle]')
            ).to.have.attr('class').match(/circle_changing/);
        });
        cy.tick(1000);
        cy.get("div[class*='list_animation']").children().should($div => {
            expect($div.eq(0).children('[class*=circle_head]')).to.contain('head');
            expect($div.eq(0).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
            expect($div.eq(1).children('[class*=circle_tail]')).be.empty;
            expect($div.eq(1).children('[class*=circle_circle]')).to.have.attr('class').match(/circle_default/);
        });
    });
});
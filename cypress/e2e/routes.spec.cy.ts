describe('app works correctly with routes', function() {
    beforeEach(function() {
        cy.visit('/');
    });

    it('should open string page after continue link click', function() {
        cy.get('a[href*="recursion"]').click();
        cy.location('pathname').should('eq', '/recursion');
        cy.get('button').contains('К оглавлению').click();
    });

    it('should open fibonacci page after continue link click', function() {
        cy.get('a[href*="fibonacci"]').click();
        cy.location('pathname').should('eq', '/fibonacci');
        cy.get('button').contains('К оглавлению').click();
    });

    it('should open sorting page after continue link click', function() {
        cy.get('a[href*="sorting"]').click();
        cy.location('pathname').should('eq', '/sorting');
        cy.get('button').contains('К оглавлению').click();
    });

    it('should open stack page after continue link click', function() {
        cy.get('a[href*="stack"]').click();
        cy.location('pathname').should('eq', '/stack');
        cy.get('button').contains('К оглавлению').click();
    });

    it('should open queue page after continue link click', function() {
        cy.get('a[href*="queue"]').click();
        cy.location('pathname').should('eq', '/queue');
        cy.get('button').contains('К оглавлению').click();
    });

    it('should open list page after continue link click', function() {
        cy.get('a[href*="list"]').click();
        cy.location('pathname').should('eq', '/list');
        cy.get('button').contains('К оглавлению').click();
    });
});
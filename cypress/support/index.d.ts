declare namespace Cypress {
    interface Chainable<Subject> {
        getCircleItem(): Chainable<any>
    }
}
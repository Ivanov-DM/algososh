Cypress.Commands.add("getCircleItem", () => {
    return cy.get("div[class*='circle_circle']")
})
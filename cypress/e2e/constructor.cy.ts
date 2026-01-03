/// <reference types="cypress" />
import {deleteCookie, setCookie, getCookie} from '../../src/utils/cookie';

beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'});

    cy.visit('/');
});

describe('Test burger constructor', () => {

    afterEach(() => {
        cy.clearCookie('accessToken');
        cy.clearLocalStorage();
    })

    it('add ingredients in constructor', () => {
        cy.get('[data-testid=ingredient]').first().find('button').click();
        cy.get('[data-testid=ingredient]').last().find('button').click();

        cy.get('[data-testid=constructor-bun-1]').should('exist').and('contain', 'булка')
        cy.get('[data-testid=constructor-bun-2]').should('exist').and('contain', 'булка')
        cy.get('[data-testid=constructor-filling]').should('exist').and('contain', 'Соус');
    })
})

describe('Ingredient modal', () => {
    it('open modal', () => {
        cy.get('[data-testid=ingredient]').first().click();
        cy.get('[data-testid=modal]').should('be.visible').and('contain', 'булка');
    })

    it('close modal (button)', () => {
        cy.get('[data-testid=ingredient]').first().click();
        cy.get('[data-testid=modal-close]').click();
        cy.get('[data-testid-modal]').should('not.exist');
    })

    it('close modal (click on overlay)', () => {
        cy.get('[data-testid=ingredient]').first().click();
        cy.get('[data-testid=modal-overlay]').click({force: true});
        cy.get('[data-testid=modal').should('not.exist');
    })
})

describe('place order', () => {
    it('must successfuly place order', () => {
        window.localStorage.setItem('refreshToken', 'test-refresh-token');
        cy.setCookie('accessToken', 'test-access-token');

        cy.get('[data-testid=ingredient]').first().find('button').click();
        cy.get('[data-testid=ingredient]').last().find('button').click();

        cy.get('button').contains('Оформить заказ').click();
        cy.get('[data-testid=modal]').should('be.visible');
        cy.get('[data-testid=order-number]').should('contain', '98311');

        cy.get('[data-testid=modal-close]').click();
        cy.get('[data-testid-modal]').should('not.exist');
        cy.get('[data-testid=constructor-filling]').should('contain', 'Выберите начинку');
    })
})

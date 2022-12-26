/// <reference types="cypress" />

import login from '../fixtures/login.json';
import extratos from '../fixtures/extratos.json';

const NUMBER = 8081;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;

const url = `http://localhost:${PORT}/conta?nomeResponsavel=Jo%C3%A3o%20da%20Silva%20Souza`;
const extratosUrl = `http://localhost:${PORT}/transferencia/id-conta/2`;

describe('Testa a página de extrato', () => {
  it('se a tabela contém 6 dados de extratos', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="login__label-id-conta"]').type('João da Silva Souza');
    
    cy.fixture('login').then(function() {
      cy.intercept('GET', url, {
        statusCode: 200,
        body: login
      }).as('login');
      cy.get('[data-testid="login__button-login"]').click();
      cy.url().should('include', 'http://localhost:3000/extrato');
      cy.intercept('GET', extratosUrl, {
        statusCode: 200,
        body: extratos
      }).as('extratos');
      cy.wait('@extratos');
      cy.get('[data-testid="table-valor-1"]').should('have.text', '3000');
      cy.get('[data-testid="table-valor-2"]').should('have.text', '-300');
      cy.get('[data-testid="table-valor-3"]').should('have.text', '3000');
    });
  })
})
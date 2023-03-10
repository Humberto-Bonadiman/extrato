/// <reference types="cypress" />

import login from '../fixtures/login.json';
import extratos from '../fixtures/extratos.json';
import extratoNome from '../fixtures/extratoNome.json';
import extratoPeriodo from '../fixtures/extratoPeriodo.json';
import extratoFiltroCompleto from '../fixtures/extratoFiltroCompleto.json';

const NUMBER = 8081;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;

const url = `http://localhost:${PORT}/conta?nomeResponsavel=Jo%C3%A3o%20da%20Silva%20Souza`;
const extratosUrl = `http://localhost:${PORT}/transferencia/id-conta/2`;
const extratoUrlNome = `http://localhost:${PORT}/transferencia/operador`;
const extratoUrlPeriodo = `http://localhost:${PORT}/transferencia/periodo`;
const extratoUrlFiltro = `http://localhost:${PORT}/transferencia/operador/periodo`;

describe('Testa a página de extrato', () => {
  it('se contêm os dados corretos', () => {
    cy.visit('http://localhost:3000/extrato');
    cy.get('[data-testid="transaction__label-inicio"]').should('have.text', 'Data de início');
    cy.get('[data-testid="transaction__label-fim"]').should('have.text', 'Data de fim');
    cy.get('[data-testid="transaction__label-nome"]').should('have.text', 'Nome Operador Transacionado');
    cy.get('[data-testid="extrato__button-search"]').should('have.text', 'Pesquisar');
    cy.get('[data-testid="extrato__button-navigate"]').should('have.text', 'Realizar Transferência');
  });

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
      cy.get('[data-testid="transaction__nome"]').type('Maria Costa Souza');
      cy.intercept('POST', extratoUrlNome, {
        statusCode: 200,
        body: extratoNome
      });
      cy.get('[data-testid="extrato__button-search"]').click();
      cy.get('[data-testid="table-valor-1"]').should('have.text', '-300');
      cy.get('[data-testid="transaction__nome"]').clear();
      cy.get('[data-testid="transaction__inicio"]').type('2022-10-01');
      cy.get('[data-testid="transaction__fim"]').type('2022-12-31');
      cy.intercept('POST', extratoUrlPeriodo, {
        statusCode: 200,
        body: extratoPeriodo
      });
      cy.get('[data-testid="extrato__button-search"]').click();
      cy.get('[data-testid="table-valor-1"]').should('have.text', '3000');
      cy.get('[data-testid="table-valor-2"]').should('have.text', '-300');
      cy.get('[data-testid="transaction__nome"]').type('Maria Costa Souza');
      cy.intercept('POST', extratoUrlFiltro, {
        statusCode: 200,
        body: extratoFiltroCompleto
      });
      cy.get('[data-testid="extrato__button-search"]').click();
      cy.get('[data-testid="table-valor-1"]').should('have.text', '-300');
    });
  });

  
})
import login from '../fixtures/login.json';

const NUMBER = 8081;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

const url = `http://${URL}:${PORT}/conta?nomeResponsavel=Jo%C3%A3o%20da%20Silva%20Souza`;

describe('Testa a página inicial', () => {
  it('se ela contêm as informações corretas', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="login__label-id-conta"]').should('have.text', 'Nome Responsável da Conta');
    cy.get('[data-testid="login__button-login"]').should('have.text', 'Entrar');
    cy.get('[data-testid="login__button-register"]').should('have.text', 'Ainda não possuo uma conta');
  });

  it('deve ir para a página "/registro"', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="login__button-register"]').click();
    cy.url().should('include', 'http://localhost:3000/registro');
  });


  it('should go to "/account" page with correct data', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="login__label-id-conta"]').type('João da Silva Souza');
    
    cy.fixture('login').then(function() {
      cy.intercept('GET', url, {
        statusCode: 200,
        body: login
      }).as('login');
      cy.get('[data-testid="login__button-login"]').click();
      cy.url().should('include', 'http://localhost:3000/extrato');
    });
  });
})
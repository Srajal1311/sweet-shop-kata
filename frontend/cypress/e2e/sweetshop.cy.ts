describe('Sweet Shop E2E Flow', () => {
  
  before(() => {
    // 1. Ensure 'testadmin' exists (Using backend port 5000)
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/auth/register', 
      body: {
        username: 'testadmin',
        password: 'password123'
      },
      failOnStatusCode: false
    });
  });

  beforeEach(() => {
    
    cy.visit('http://127.0.0.1:3000/login');
  });

  it('should successfully login as Admin and see Admin controls', () => {
    cy.contains('Welcome Back');

    cy.get('input[placeholder="Enter your username"]').type('testadmin');
    cy.get('input[placeholder="••••••••"]').type('password123');
    cy.get('button').contains('Sign In').click();

    
    cy.url({ timeout: 10000 }).should('eq', 'http://127.0.0.1:3000/');
    
    // Check for Admin UI
    cy.contains('+ Add New Sweet').should('be.visible');
    cy.contains(/Hi, (admin|testadmin)/).should('be.visible');
  });

  it('should show error for bad credentials', () => {
    cy.get('input[placeholder="Enter your username"]').type('wronguser');
    cy.get('input[placeholder="••••••••"]').type('wrongpass');
    cy.get('button').contains('Sign In').click();

    cy.url().should('include', '/login');
    cy.contains('Invalid credentials').should('be.visible');
  });
});
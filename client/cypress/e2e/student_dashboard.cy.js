describe('Student Dashboard E2E', () => {
  it('should log in and display the student dashboard', () => {
    // Visit login page
    cy.visit('http://localhost:5173/login');

    // Fill in login form (adjust selectors and credentials as needed)
    cy.get('input[name="email"]').type('student@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Should redirect to dashboard and show dashboard content
    cy.url().should('include', '/dashboard');
    cy.contains('Student Dashboard');
    cy.contains('My Profile');
    cy.contains('My Lessons');
    cy.contains('My Progress');
  });
}); 
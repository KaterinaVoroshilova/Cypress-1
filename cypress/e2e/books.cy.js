describe("login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login with valid email and password", () => {
    cy.viewport(1366, 768);
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("Should not be able to login with empty email", () => {
    cy.visit("/");
    cy.login(null, "123"); 
    cy.get('#mail').then($el => cy.log($el));
    cy.get('#mail').then($el => $el[0].checkValidity()).should('be.false'); 
    cy.get('#mail').then(($el) => $el[0].validationMessage)
    .should('be.equal', 'Заполните это поле.');
  });

  it("Should not be able to login with empty password", () => {
    cy.visit("/");
    cy.login("bropet@mail.ru", null); 
    cy.get('#pass').then($el => cy.log($el));
    cy.get('#pass').then($el => $el[0].checkValidity()).should('be.false');
    cy.get('#pass').then(($el) => $el[0].validationMessage)
    .should('be.equal', 'Заполните это поле.');
  });

  it("Should be possible to add a book to favorites when adding", () => { 
    cy.visit('/');
    cy.login("bropet@mail.ru", "123");
    cy.addBook("Гордость и предубеждение", 
    "Главной темой произведения является любовь, которая способна кардинально изменить взгляды и поведение любого человека. ",
     "Джейн Остин");
    cy.get('h4').click(); 
    cy.contains("Гордость и предубеждение"); 
  });

  it("Should be possible to remove a book from favorites while on the start page", () => { 
    cy.visit('/');
    cy.login("bropet@mail.ru", "123");
    cy.addBook("Гордость и предубеждение", 
    "Главной темой произведения является любовь, которая способна кардинально изменить взгляды и поведение любого человека.", 
    "Джейн Остин");
    cy.contains('Favorites').click(); 
    cy.contains('Delete from favorite').click(); 
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible");
  });

  it("should book add not title on page", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBook(
      "",
      "Главной темой произведения является любовь, которая способна кардинально изменить взгляды и поведение любого человека. ",
      "Джейн Остин"
    );
    cy.get('#title').then($el => cy.log($el));
    cy.get('#title').then($el => $el[0].checkValidity()).should('be.false'); 
  })
});
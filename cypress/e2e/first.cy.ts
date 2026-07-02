describe('Validar Login', () => {
   
  it('login valido', () => { 
    cy.visit('/login')
    cy.get('#email_input').type("arthur2006.teixeira@gmail.com")
    cy.get('#pass_input').type("arthur123")
    cy.get('.btn_entrar').click() 
    cy.url().should("include","/perfis")
  })


  it('login invalido', () => { 
    cy.visit('/login')
    cy.get('#email_input').type("12hj4iuo12hb5uio1b23uib1d@gmail.com")
    cy.get('#pass_input').type("125poj12ioehio12")
    cy.get('.btn_entrar').click()
    cy.url().should("include","/login")
  })

})
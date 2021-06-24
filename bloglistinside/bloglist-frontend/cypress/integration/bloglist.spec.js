describe('bloglist', function () {

    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    it('log in form is shown', function () {
        cy.contains('Log in to application')
    })


    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input:first').type('enni')
            cy.get('input:last').type('enni')
            cy.contains('log in').click()

            cy.contains('blogs')
        })

        it('fails with wrong credentials', function () {
            cy.get('input:first').type('enni')
            cy.get('input:last').type('enni123')
            cy.contains('log in').click()
            cy.contains('Invalid username or password')
        })
    })


    describe('logged in tests', function () {
        it('Creating a blog', function () {
            cy.get('input:first').type('enni')
            cy.get('input:last').type('enni')
            cy.contains('log in').click()
    
            cy.contains('create blog').click()
            cy.get('input:first').type('cypress')
            cy.get('#author').type('cypress2')
            cy.get('input:last').type('cypress')
            cy.contains('create').click()
        })


        it('a blog can be liked', function(){
            cy.get('input:first').type('enni')
            cy.get('input:last').type('enni')
            cy.contains('log in').click()

            cy.contains('view').click()
            cy.contains('like').click()

        })

        it('own blog can be deleted', function() {
            cy.get('input:first').type('enni')
            cy.get('input:last').type('enni')
            cy.contains('log in').click()

            cy.get('#auth miikan stream qew').click()
            cy.get('#auth miikan stream qew remove').click()
        })




    })
    

})
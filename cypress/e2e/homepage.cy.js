describe("Functionality tests - App User", () => {
    let baseUrl;
    let username;
    let password;
    let skipAddingCookies = true;
    let delay;

    beforeEach(() => {
        cy.fixture("maintenance.json").then((data) => {
          baseUrl = data.baseUrl;
          password = data.password;
          username = data.username;
          delay = data.delay;
          cy.visit(baseUrl);
          
        });
    });

    // if (skipAddingCookies) {
    //     return;
    //   } else {
    //     cy.readFile("cypress/fixtures/cookies.json").then((cookies) => {
    //       cookies.forEach((cookie) => {
    //         cy.setCookie(cookie.name, cookie.value, {
    //           domain: cookie.domain,
    //           path: cookie.path,
    //           secure: cookie.secure,
    //           httpOnly: cookie.httpOnly,
    //           expiry: cookie.expiry,
    //         });
    //       });
    //     });
    // }

    it("Adding cookies data to cookies.json.", () => {

        cy.then(() => {
          cy.getCookies().then((cookies) => {
            cy.writeFile("cypress/fixtures/cookies.json", JSON.stringify(cookies));
            skipAddingCookies = false;
          });
        });
    });

    it("Find Nowe Produkty on homepage.", () => {
      cy.get(".products")
    });

    // it.only("When expected length is known", () => {
    //   cy.wait(delay);

    //   cy.get(".products").each(() => {
    //     cy.get('.card')
    //     // .should(($card) => {
    //     // expect($card).to.have.length(18)
    //     // });
    //   })
    // });

    it("When expected length is known", () => {
      cy.get('.featured-products.clearfix.mt-3.ps_newproducts').within(() => {
        cy.get('.product-miniature').should('have.length', 12)
      })
    });

    it.only("As a user, you won't be able to log in.", () => {
      // skipAddingCookies = true;
      cy.visit(baseUrl + "login?back=my-account")
      cy.contains("Logowanie");
      // cy.login(login, passwd);
      cy.get(".form-group-email").type(username)
      cy.get(".form-group-password").type(password)
      cy.get(".form-control-submit").click()

      // cy.get(".input-wrapper__message").should("be.visible");
      // cy.get(".input-wrapper__message").should(
      //   "contain",
      //   "Your email or password is incorrect."
      // );

      
      // cy.get(".form-control js-child-focus js-visible-password").type(password)
      // cy.get(".btn btn-primary form-control-submit btn-block btn-big")
      // .should("Zaloguj się")
      // .click()
  
      // cy.then(() => {
      //   cy.getCookies().then((cookies) => {
      //     cy.writeFile("cypress/fixtures/cookies.json", JSON.stringify(cookies));
      //     skipAddingCookies = false;
      //   });
      // });
    });

});
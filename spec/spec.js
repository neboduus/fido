var request = require("request");
var base_url = "http://localhost:5000/"

describe("Test GET /", function() {
    
    it("returns status code 200", function(done) {
        request.get(base_url, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    
});

describe("Test GET /categories/", function() {
    
    it("returns status code 200", function(done) {
        request.get(base_url+"categories/", function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    
});

describe("Test GET /university/", function() {
    
    it("returns status code 200", function(done) {
        request.get(base_url+"university/", function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe("Test GET /city/", function() {
    
    it("returns status code 200", function(done) {
        request.get(base_url+"city/", function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    
});

describe("Test GET /login/", function() {
    
    it("returns status code 201 - not logged in", function(done) {
        request.get(base_url+"login/", function(error, response, body) {
            expect(response.statusCode).toBe(201);
            done();
        });
    });

    //non riesco a modificare la request per fare delle richieste personalizzate per il testing
    /*  
    it("returns status code 200 - already logged in", function(done) {
	request.session.username = "nepotu";
        request.get(base_url+"login/", function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    */
    
});

describe("Test POST /login/", function() {
    
    it("returns status code 201 ", function(done) {
        request.get(base_url+"login/", function(error, response, body) {
            expect(response.statusCode).toBe(201);
            done();
        });
    });

    //qui nemmeno
    /*
  it("returns status code 404 - admin does not exist", function(done) {
    request.body.user = "XxXxXNothingXxXxX";
    request.body.psw = "XxXxXNothingXxXxX";
        request.get(base_url+"login/", function(error, response, body) {
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    it("returns status code 200 - admin OK", function(done) {
    request.body.user = "nepotu";
    request.body.psw = "calculator";
        request.get(base_url+"login/", function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    */

});

/*
describe("Test POST /search/", function() {
    
    it("returns status code 400", function(done) {
        request.get(base_url+"search/", function(error, response, body) {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    it("returns status code 200", function(done) {
	request.body.placesearch = "Biblio";
        request.get(base_url+"search/", function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it("typeof body should be []", function(done) {
	request.body.placesearch = "Biblio";
        request.get(base_url+"search/", function(error, response, body) {
            expect(typeof body).toEqual([]);
            done();
        });
    });
    

    it("returns status code 404", function(done) {
	request.body.placesearch = "XxXxXNothingXxXxX";
        request.get(base_url+"search/", function(error, response, body) {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
    
});
*/





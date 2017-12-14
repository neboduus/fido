//db connection library
var pg = require('pg');
//string that allows connection to DB
var connectionString = process.env.DATABASE_URL || 'postgres://mario:calculator@localhost/discoverdb';
//library that let simultaneous queries on the same connection
var pgp = require('pg-promise')();
var db = pgp(connectionString);


/*
 * after user choose a category, this funct returns a page with all places of that category
 */
var renderPlaceByType = function(type, res){
    var check = "0";
    var message = "";
    
    //check for what page is the error msg
    switch(type){
        case 0: 
            message= "There are no department in ours archieves! Turn back later when we will upload more places!";
            break;
        case 1:
            message= "There are no libraries in ours archieves! Turn back later when we will upload more places!";
            break;
        case 2:
            message= "There are no squares in ours archieves! Turn back later when we will upload more places!";
            break;
        case 3:
            message= "There are no monuments in ours archieves! Turn back later when we will upload more places!";
            break;    
        }
    //open connection
    pg.connect(
        //specify the connection for DB
        connectionString,
        //callback function
        function(err, client, done){
            client.query('SELECT * FROM place WHERE type=$1', [type], function(err, result){
                //release client
                done();

                //manage errors
                if (err){
                    check = "-1";               
                    console.error("DB " + err); //communicate error to server
                }else{
                    //get places found only if there is a result
                    if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                        check = "1";
                    }else{
                        check = "0";
                    }
                }
                //response here 
                if (check == "1"){
                    //there is a result after query
                    res.set('Content-Type', 'text/html');
                    res.status(200).render('places.ejs',{
                        libraries: result.rows
                        });
                    console.log("sent Data");
                }else if (check =="0"){
                    
                    //there are no rows after query
                    res.set('Content-Type', 'text/html');
                    res.status(404).render('error.ejs',{
                        message: message
                    });
                }else{
                    //DB error
                    res.status(500).render('error.ejs',{
                        message: "We have some problems with the server! Turn Back later to see if problems will be fixed!"
                    });
                }
            });
        }
    );
};

/**
* gets all the rows of a table and binds them on a page that shows them
*/

var renderByTable = function(table, res){
    var r = "0";
    var message = "";
    var query = 'SELECT';
    
    switch (table){
        case 'news':
            message = "There are no news in ours archieves! Turn back later when we will upload more places!";
            query = 'SELECT * FROM news';
            break;
        case 'event':
            message = "There are no events in ours archieves! Turn back later when we will upload more places!";
            query = 'SELECT * FROM event';
            break;
        }
    
    pg.connect(
    connectionString,
    function(err, client, done){
        client.query(query, function(err, result){
            //release client
            done();
            
            //manage errors
            if (err){
                console.error("DB " + err); 
            }else{
                //get the objects
                if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                    r = "1";
                }else{
                    r = "-1";
                }
            }
            
            res.set('Content-Type', 'text/html');
            //response here to avoid sending req error
            switch (r){
                case "1":
                    //show the page passing data
                    res.status(200).render(table + '.ejs',{
                        elements: result.rows
                    });
                    console.log("sent Data");
                    break;
                case "-1":
                    //there are no rows after query
                    res.status(404).render('error.ejs',{
                        message: message
                    });
                    break;
                case "0":
                    //there are no rows after query
                    res.status(500).render('error.ejs',{
                        message: "We have some problems with the server! Turn Back later to see if problems will be fixed!"
                    });
                    break;
            }
        });
    });
};

/*
 *  get all the place info and redirect on a personalized place for that place
 */
var renderPlaceById = function(req, res){
    var placeId;
    var check = "";
    if (typeof req.body != 'undefined' && req.body){
        if(typeof req.body.placeId != 'undefined' && req.body.placeId){
            placeId = parseInt(req.body.placeId);
            //query DB for info
            pg.connect(
            connectionString,
            function(err, client, done){
                client.query('SELECT * FROM place WHERE id=$1', [placeId], function(err, result){
                    //release client
                    done();

                    //manage errors
                    if (err){
                        check = "-1";
                        console.error("DB " + err); 
                    }else{
                        //get the objects
                        if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                            check = "1";                            
                        }else{
                            check = "0";
                        }
                    }
                    
                    res.set('Content-Type', 'text/html');
                    //response here to avoid sending req error
                    switch (check){
                        case "1":
                            //show the page passing data
                            res.status(200).render('place.ejs',{
                                place: result.rows[0]
                            });
                            console.log("sent Data");
                            break;
                        case "-1":
                            //there are no rows after query
                            res.status(404).render('error.ejs',{
                                message: "We apologize but the place that you selected does not exist!"
                            });
                            break;
                        case "0":
                            //there are no rows after query
                            res.status(500).render('error.ejs',{
                                message: "We have some problems with the server! Turn Back later to see if problems will be fixed!"
                            });
                            break;
                    }
                });
            });
            
        }else{
            // 400 - bad request status
            res.status(400).render('error.ejs',{
                message: "We apologize but the server recieved no Data! Maybe there is an intern problem. try again Later"
            });
        }
    }else{
        res.status(400).render('error.ejs',{
            message: "We apologize but the server recieved no Data! Maybe there is an intern problem. try again Later"
        });
    }
};


//export functions
//exports.renderHome = renderHome;
exports.renderPlaceById = renderPlaceById;
exports.renderPlaceByType = renderPlaceByType;
exports.renderByTable = renderByTable;
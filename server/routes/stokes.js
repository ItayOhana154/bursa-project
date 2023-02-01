var express = require('express');
var router = express.Router();
var con = require('../connection');

router.get('/main', function (req, res) {
    console.log("req.body:", req.body);
    let sql = `SELECT * FROM stokes`
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

router.get('/main/stoke/:id', function (req, res) {
    console.log("req.params.id:", req.params.id);
    let sql = `SELECT * FROM stokes
    WHERE id=${req.params.id}`
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});



// MarketPlace///////////////////////////////////////////////

// Set buy offer function:
router.post('/buy', function (req, res) {
    queryForBuyOrSell(req.body, res)
    console.log("req.body:", req.body);
});
// Set sell offer function:
router.post('/sell', function (req, res) {
    queryForBuyOrSell(req.body, res)
});

function queryForBuyOrSell(params, res) {
    deleteIfQuantityIsZero()
    let sql = `INSERT INTO offers ( price, Quantity, stoke_id, type, person_id, stoke_name)  
    VALUES (${params.itemPrice}, ${params.itemQuantity},
        ${params.itemId}, ${params.type},
        ${params.personId}, '${params.stoke_name}')`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return (0);
        } else {
            checkForMatch(params, res)
        }
    })
}

router.get('/getImage', function (req, res) {
    const { random } = req.query;
    res.sendFile(`/home/hilma/Desktop/mainProjects/bursa-project/server/public/images/stuke${random}.png`)
})



// get into offers tables and check if any offer match:
function checkForMatch(params, res) {
    console.log("params:", params);
    let stokesToSeller;
    let stokesToBuyer;
    let sql;
    // selling
    if (params.type === 0) {
        sql = `SELECT * FROM offers
        WHERE type = 1 
        AND stoke_id = ${params.itemId} 
        AND price >= ${params.itemPrice}
        ORDER BY offer_id LIMIT 1`
        con.query(sql, function (err, result) {
            if (err) {
                res.send({ ans: 0 });
            } else {
                if (result.length === 0) {
                    // everything is ok but there is no much
                    res.send({ ans: 1 });
                }
                if (result.length > 0) {
                    let mysql = `SELECT user_name FROM users
                    WHERE id = ${Number(result[0].person_id)};`
                    let nameOfTrader;
                    con.query(mysql, function (err, user) {
                        if (err) {
                            console.log("errrrrrrr:", err);
                        }
                        nameOfTrader = user[0].user_name
                        if (params.itemQuantity >= result[0].Quantity) {
                            stokesToBuyer = result[0].Quantity;
                            insertValueBackToOffersTable(result[0].offer_id, 0);
                            insertValueBackToStoke_historyTable(result[0].stoke_name, nameOfTrader, stokesToBuyer, 0)
                            // לעדכן את הצעת הקניה ל0, ולעדכן את הכמות בטבלה של המניות
                            stokesToSeller = params.itemQuantity - result[0].Quantity;
                            insertValueBackToOffersTable(params.itemId, stokesToSeller);
                            insertValueBackToStoke_historyTable(result[0].stoke_name, params.person_name, result[0].Quantity, 1)
                            // להחזיר לטבלה של המכירות את הכמות שנשארה למוכר למכור ולעדכן את כמות המניות בטבלה של המניות
                            console.log("3");
                        }
                        if (params.itemQuantity < result[0].Quantity) {
                            stokesToBuyer = params.itemQuantity;
                            insertValueBackToOffersTable(result[0].offer_id, result[0].Quantity - stokesToBuyer);
                            insertValueBackToStoke_historyTable(result[0].stoke_name, nameOfTrader, stokesToBuyer, 0);
                            // לעדכן את הצעת הקניה, ולעדכן את הטבלה של המניות
                            stokesToSeller = 0;
                            insertValueBackToOffersTable(params.itemId, 0);
                            insertValueBackToStoke_historyTable(result[0].stoke_name, params.person_name, params.itemQuantity, 1)
                            // לעדכן את הצעת המכירה ל0, ולעדכן את הכמות בטבלה של המניות
                            console.log("3");
                        }
                        res.send({ ans: 2 });
                    })
                }
            }
        })


    }
    // buying:
    if (params.type === 1) {
        sql = `SELECT * FROM offers
        WHERE type = 0 
        AND stoke_id = ${params.itemId} 
        AND price <= ${params.itemPrice};`
        con.query(sql, function (err, result) {
            let nameOfTrader;
            console.log("result[0]:", result[0]);
            if (err) {
                console.log(err)
                res.send({ ans: 0 });
            } else {
                if (result.length === 0) {
                    res.send({ ans: 1 });
                }
                if (result.length > 0) {
                    let mysql = `SELECT user_name FROM users
                    WHERE id = ${Number(result[0].person_id)}`
                    con.query(mysql, function (err, user) {
                        if (err) {
                            console.log(err);
                            res.send({ ans: 0 });
                        }
                        nameOfTrader = user[0].user_name
                        if (params.itemQuantity <= result[0].Quantity) {
                            stokesToBuyer = params.itemQuantity
                            insertValueBackToOffersTable(params.itemId, 0);
                            console.log("params.person_name:", params.person_name);
                            insertValueBackToStoke_historyTable(result[0].stoke_name, params.person_name, params.itemQuantity, 0)
                            // לעדכן את ההצעה ל0, ולעדכן את הטבלה של המניות
                            stokesToSeller = result[0].Quantity - params.itemQuantity
                            insertValueBackToOffersTable(result[0].offer_id, stokesToSeller);
                            console.log("nameOfTrader:", nameOfTrader);
                            insertValueBackToStoke_historyTable(result[0].stoke_name, nameOfTrader, params.itemQuantity, 1)
                            // לעדכן את הצעת הקניה , ולעדכן את טבלת המניות
                            console.log("3");
                            changePriceOfStokeInStokeTable(result[0].stoke_id, result[0].price);
                        }
                        if (params.itemQuantity > result[0].Quantity) {
                            stokesToBuyer = result[0].Quantity;
                            insertValueBackToOffersTable(params.itemId, params.itemQuantity - result[0].Quantity);
                            console.log("params.person_name:", params.person_name);
                            insertValueBackToStoke_historyTable(result[0].stoke_name, params.person_name, stokesToBuyer, 0)
                            // לעדכן את ההצעה של הקניה להצעה פחות המניות שקניתי, ולעדכן את טבלת המניות
                            stokesToSeller = 0;
                            insertValueBackToOffersTable(result[0].offer_id, 0);
                            console.log("nameOfTrader:", nameOfTrader);
                            insertValueBackToStoke_historyTable(result[0].stoke_name, nameOfTrader, result[0].Quantity, 1)
                            // לעדכן את הצעת המכירה ל0, ולעדכן את טבלת המניות
                            console.log("3");
                            changePriceOfStokeInStokeTable(result[0].stoke_id, result[0].price)
                        }
                        res.send({ ans: 2 });
                    })
                }
            }
        })
    }
}

function insertValueBackToOffersTable(idOfOffer, stokeQuantity) {
    let sql = `UPDATE offers
    SET Quantity = ${stokeQuantity}
    WHERE offer_id = ${idOfOffer};`
    console.log("1");
    console.log("sql offers:", sql);
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return (err);
        }
    })
}
// result[0].price
// result[0].stoke_id
function changePriceOfStokeInStokeTable(stokeId, price) {
    let sql = `UPDATE stokes
            SET stoke_price = ${price}
            WHERE id = ${stokeId};`
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return (err);
        }
    })
}

function insertValueBackToStoke_historyTable(stokeName, ownerName, quantity, operator) {
    let sql;
    sql = `SELECT * FROM stoke_history
    WHERE owner = '${ownerName}'
    AND stoke_name = '${stokeName}';`
    con.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        }
        if (res.length === 0) {
            // complite that tommorow!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            sql = `INSERT INTO stoke_history (stoke_name, owner, Quantity_purchased)
            VALUES ('${stokeName}', '${ownerName}', ${quantity});`
        } else {
            if (operator === 0) {
                sql = `UPDATE stoke_history
                    SET Quantity_purchased = Quantity_purchased + ${quantity}
                    WHERE owner = '${ownerName}'
                    AND stoke_name = '${stokeName}';`
            } else {
                sql = `UPDATE stoke_history
                    SET Quantity_purchased = Quantity_purchased - ${quantity}
                    WHERE owner = '${ownerName}'
                    AND stoke_name = '${stokeName}';`
            }
        }
        console.log("2");
        console.log("sql history:", sql);
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                return (err);
            }
        })
    })
}

function deleteIfQuantityIsZero() {
    let sql = `DELETE FROM offers 
    WHERE Quantity = 0;`
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return (err);
        }
    })
}

module.exports = router;


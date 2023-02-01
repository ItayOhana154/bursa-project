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
    queryForBuyOrSell(req.body)
});
// Set sell offer function:
router.post('/sell', function (req, res) {
    queryForBuyOrSell(req.body)
});

function queryForBuyOrSell(params) {
    deleteIfQuantityIsZero()
    console.log(params);
    let sql = `INSERT INTO offers ( price, Quantity, stoke_id, type, person_id, stoke_name)  
    VALUES (${params.itemPrice}, ${params.itemQuantity},
        ${params.itemId}, ${params.type},
        ${params.personId}, '${params.stoke_name}')`
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log("result:", result);
            checkForMatch(params)
        }
    })
}

router.get('/getImage', function (req, res) {
    const { random } = req.query;
    res.sendFile(`/home/hilma/Desktop/mainProjects/bursa-project/server/public/images/stuke${random}.png`)
})



// get into offers tables and check if any offer match:
function checkForMatch(params) {
    let stokesToSeller;
    let stokesToBuyer;
    let sql;
    
    if (params.type === 0) {
        sql = `SELECT * FROM offers
        WHERE type = 1 
        AND stoke_id = ${params.itemId} 
        AND price >= ${params.itemPrice}
        ORDER BY offer_id LIMIT 1`
        con.query(sql, function (err, result) {
            console.log("result.length:", result.length);
            if (err) {
                console.log(err)
                return (0)
            } else {
                if (result.length === 0) {
                    // everything is ok but there is no much
                    return (1)
                }
                if (result.length > 0) {
                    if (params.itemQuantity >= result[0].Quantity) {
                        console.log("bigger");
                        stokesToBuyer = result[0].Quantity;
                        insertValueBackToOffersTable(result[0].person_id, 0);
                        // לעדכן את הצעת הקניה ל0, ולעדכן את הכמות בטבלה של המניות
                        stokesToSeller = params.itemQuantity - result[0].Quantity;
                        insertValueBackToOffersTable(params.personId, stokesToSeller);
                        // להחזיר לטבלה של המכירות את הכמות שנשארה למוכר למכור ולעדכן את כמות המניות בטבלה של המניות
                    }
                    if (params.itemQuantity < result[0].Quantity) {
                        stokesToBuyer = params.itemQuantity;
                        insertValueBackToOffersTable(result[0].person_id, result[0].Quantity - stokesToBuyer);
                        // לעדכן את הצעת הקניה, ולעדכן את הטבלה של המניות
                        stokesToSeller = 0;
                        insertValueBackToOffersTable(params.personId, 0);
                        // לעדכן את הצעת המכירה ל0, ולעדכן את הכמות בטבלה של המניות
                    }
                    // insert the value back to tables
                    return (2)
                }
            }
        })


    }
    // buying:
    if (params.type === 1) {
        sql = `SELECT * FROM offers
        WHERE type = 0 
        AND stoke_id = ${params.itemId} 
        AND price <= ${params.itemPrice}`
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                return (0)
            } else {
                if (result.length === 0) {
                    return (1)
                }
                if (result.length > 0) {
                    if (params.itemQuantity <= result[0].Quantity) {
                        stokesToBuyer = params.itemQuantity
                        insertValueBackToOffersTable(params.personId, 0);
                        // לעדכן את ההצעה ל0, ולעדכן את הטבלה של המניות
                        stokesToSeller = result[0].Quantity - params.itemQuantity
                        insertValueBackToOffersTable(result[0].person_id, stokesToSeller);
                        // לעדכן את הצעת הקניה , ולעדכן את טבלת המניות
                    }
                    if (params.itemQuantity > result[0].Quantity) {
                        stokesToBuyer = result[0].Quantity;
                        insertValueBackToOffersTable(params.personId, params.itemQuantity - result[0].Quantity);
                        // לעדכן את ההצעה של הקניה להצעה פחות המניות שקניתי, ולעדכן את טבלת המניות
                        stokesToSeller = 0;
                        insertValueBackToOffersTable(result[0].person_id, 0);
                        // לעדכן את הצעת המכירה ל0, ולעדכן את טבלת המניות
                    }
                    return (2)
                }
            }
        })
    }
    else {
        return ("error")
    }
}

function insertValueBackToOffersTable(idOfOffer, stokeQuantity) {
    let sql = `UPDATE offers
    SET Quantity = ${stokeQuantity}
    WHERE offer_id = ${idOfOffer};`
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return (err);
        } else {
            return (result);
        }
    })
}

function insertValueBackToStoke_historyTable(stokeName, ownerName, quantity, operator) {
    let sql;
    if (operator === 0) {
        sql = `UPDATE stoke_name
            SET Quantity_purchased = Quantity_purchased + ${quantity}
            WHERE owner = '${ownerName}'
            AND stoke_name = '${stokeName}';`
    } else {
        sql = `UPDATE stoke_name
            SET Quantity_purchased = Quantity_purchased - ${quantity}
            WHERE owner = '${ownerName}'
            AND stoke_name = '${stokeName}';`
    }
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return (err);
        } else {
            return (result);
        }
    })
}



function deleteIfQuantityIsZero() {
    let sql = `DELETE FROM offers 
    WHERE Quantity = 0;`
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = router;

// function shortWayToInsertBuyerAndSeller(stokesQuantity, personInfo, sellerInfo) {
//     let sql = `INSERT INTO stoke_history ( id, stoke_name, owner, Quantity_purchased)  
//         VALUES (${personInfo}, '${sellerInfo.stoke_name}', '${sellerInfo.person_name}',
//         ${stokesQuantity})`
//     con.query(sql, function (err, result) {
//         if (err) {
//             console.log(err)
//             return (err);
//         } else {
//             return (result);
//         }
//     })
// }

// function insertValueBackSeller(sellerInfo, buyerInfo, stokesToSeller, stokesToBuyer) {
//     let seller = sellerInfo.personId;
//     let buyer = buyerInfo.person_id;
//     shortWayToInsertBuyerAndSeller(stokesToSeller, seller, sellerInfo)
//     shortWayToInsertBuyerAndSeller(stokesToBuyer, buyer, sellerInfo)
// }

// function insertValueBackBuyer(sellerInfo, buyerInfo, stokesToSeller, stokesToBuyer) {
//     let seller = buyerInfo.person_id;
//     let buyer = sellerInfo.personId;
//     shortWayToInsertBuyerAndSeller(stokesToSeller, seller, sellerInfo)
//     shortWayToInsertBuyerAndSeller(stokesToBuyer, buyer, sellerInfo)
// }


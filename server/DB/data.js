function readAndCreate(fileName) {
    console.log(fileName)
    fs.readFile(`./${fileName}.json`, (err, data) => {
        if (err) console.log(err);
        console.log(data);
    });
}
readAndCreate("JSON");
// function readAndCreate1(fileName) {
//     console.log(fileName)
//     fs.readFile(`./entities/${fileName}.json`, (err, data) => {
//         if (err) console.log(err);
//         let myData = JSON.parse(data.toString())
//         con.connect(function (err) {
//             if (err) throw err;
//             let sqlTableName = `ALTER TABLE ${myData.tableName} ADD `;
//             for (let i = 0; i < myData.fields.length; i++) {
//                 let sqlCommand = ` ${myData.fields[i].name + " " + myData.fields[i].type}`
//                 con.query(sqlTableName + "(" + sqlCommand + ")", function (err, result) {
//                     if (err) console.log(err);
//                     console.log(result)
//                 });
//             }
//         })
//     });
// }
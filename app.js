var fs = require('fs');
var markdownIt = require('markdown-it')
const HtmlTableToJson = require('html-table-to-json');
let { column1, column2, column3, column4 } = require("./colNames")


fs.readFile('data.md', "utf8", function (err, data) {
    if (err) {
        return console.error(err);
    }
    let md = new markdownIt();
    const dataHtml = md.render(data)
    HtmlToArrayOfObjects(dataHtml)
});

function HtmlToArrayOfObjects(dataHtml) {
    const tables = HtmlTableToJson.parse(dataHtml)
    // console.log(tables.results);
    let extractedTable;

    tables.results.forEach((table) => {
        // if (validTable(table)) console.log(table);
        tempTable = isValidTableOrNot(table)

        if (tempTable) {
            extractedTable = tempTable 
            console.log(JSON.stringify(extractedTable));
            return;
        }

    });

    return extractedTable
}

function isValidTableOrNot(table) {

    if (!table.length) {
        // console.log("not found");
        return null;
    }

    let keys = Object.keys(table[0]);
    // Removing Extra Spaces from keys 

    keys.forEach((key, index, theArray) => {
        theArray[index] = key.replace(/\s{2,}/g, ' ').trim();
    });

    // checking is all 4 are avail in array or not
    if (keys.length != 4) {
        // console.log("not found");
        return null;
    }
    if (keys.includes(column1) && keys.includes(column2) && keys.includes(column3) && keys.includes(column4)) {
        // console.log("found ->");
    }
    else {
        // console.log("not found");
        return null;
    }
    for (let i = 0; i < table.length; i++) {

        let obj = table[i];
        let newObj = {
            [column1]: "",
            [column2]: "",
            [column3]: 1,
            [column4]: 10.0
        }

        // Task Name
        let Task_Name = obj[column1];
        if (Task_Name === Number(Task_Name)) {
            // console.log("not found");
            return null
        }
        newObj[column1] = Task_Name



        // Task Description 
        let Task_Description = obj[column1];
        newObj[column2] = Task_Description



        // QTY
        let QTY = Number(obj[column3]);
        if (!QTY || !Number.isInteger(QTY) || QTY <= 0) {
            // console.log("not found");
            return null
        }
        newObj[column3] = parseInt(QTY)


        // Price
        let Price = Number(obj[column4]);
        if (!Price || QTY <= 0) {
            // console.log("not found");
            return null
        }

        newObj[column4] = Price
        newObj.Total = Price * QTY

        // console.log(newObj);
        table[i] = newObj
    };
    return table;

}



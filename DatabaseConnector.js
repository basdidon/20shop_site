const mysql = require('mysql')
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'shop_database'
});
const {RowDataPacket} = require("mysql/lib/protocol/packets");

class DatabaseConnector {
    constructor(){}

    GetData(cb){
        let result;

        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!

            // Use the connection
            connection.query('SELECT * FROM products', function (error, results, fields) {
                result = JSON.parse(JSON.stringify(results))
                console.log(result);
                // When done with the connection, release it.
                connection.release();
                cb(null,result)

                // Handle error after the release.
                if (error) throw error;

                // Don't use the connection here, it has been returned to the pool.
            });
        });
    }

    GetProduct(barcode,cb) {
        let result;

        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!

            // Use the connection
            connection.query("SELECT * FROM products WHERE product_id= '"+barcode+"'", function (error, results, fields) {
                result = JSON.parse(JSON.stringify(results))
                console.log(result);
                // When done with the connection, release it.
                connection.release();
                cb(null,result)

                // Handle error after the release.
                if (error) throw error;

                // Don't use the connection here, it has been returned to the pool.
            });
        });
    }
}

module.exports = {DatabaseConnector};
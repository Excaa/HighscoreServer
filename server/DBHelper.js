/**
* DB helper. Opens single connection for database and does pretty much nothing else.
*/

var config = require("../config");

var MongoClient = require('mongodb').MongoClient,
assert = require('assert');

exports.Init = function()
{
	// Connection URL
	var url = config.DBString;
	// Use connect method to connect to the Server
	MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
		if(err)
		{
			console.log(err);
		}
		else
		{
			//Export the db. Use single shared connection with all db updates instead of connection per request.
			exports.DB = db.db();
		}
	});
}

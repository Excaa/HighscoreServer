/**
* Handles submit request.
*/

var config = require("../config");
var db = require("./DBHelper");

exports.Handle = function(request,response)
{
	if(!request.body.score || !request.body.user || !request.body.game)
	{
		response.send({error:"No score value was submitted"});
		return;
	}
	var score = parseInt(request.body.score);	
	var col = db.DB.collection("scores");
	
	col.insertOne(
		{
			score:score,
			user:request.body.user,
			game:request.body.game
		},
	function(err,r)
	{
		if(err)
		{
			console.log("Failed to insert score: " + err);
			response.status(500).send({error:true,message:"Failed to insert score"});
			return;
		}
		response.send({success:true});
	});
}
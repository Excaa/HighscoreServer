/**
* Handles list-request.
*/

var config = require("../config");
var db = require("./DBHelper");

exports.Handle = function(request,response)
{
	//Gameid is required.
	if(!request.params.gameid)
	{
		response.send({error:"No score value was submitted"});
		return;
	}
	
	var limit = parseInt(request.params.limit);
	var page = parseInt(request.params.page);
	var sorting = parseInt(request.params.sorting);
	
	//Default limit, page & sorting values.
	if(isNaN(limit)) limit = 10;
	if(isNaN(page)) page = 0;
	if(isNaN(sorting)) sorting = -1;
	
	var col = db.DB.collection("scores");
	col.countDocuments().then((t)=>{
		var total=t;
		col.find(
			{
				game:request.params.gameid
			}).sort({score:sorting}).limit(limit).skip(limit*page).toArray((err, result)=>
			{
				if(err)
				{
					//Something went wrong.
					console.log("Failed to list scores: " + err);
					response.status(500).send({error:"score listing failed."});
					return;
				}
				//Send the results.
				response.send( {
					scores:result,
					game:request.body.game,
					page:page,
					totalPages: Math.ceil(total/limit)
				});
			}
		);
	}).catch( (e)=>{
		//Something went wrong.
		console.log("Failed to list scores: " + e);
		response.status(500).send({error:true, message:"score listing failed."});
	});
}
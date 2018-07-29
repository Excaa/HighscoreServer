/**
 * ...
 * @author Henri Sarasvirta
 */

(function() {
	window.jam = {};
	window.jam.HighScore = function(gameId)
	{
		const host = "http://localhost:3000/";
		
		this.submit = function(user, score)
		{
			return fetch(host+"submit", {
				method: "POST", 
				mode: "cors", 
				cache: "no-cache", 
				credentials: "same-origin", 
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				redirect: "follow",
				referrer: "no-referrer",
				body: JSON.stringify({user:user, score:score,game:gameId}),
			})
			.then(response => response.json()) // parses response to JSON
			.catch(error => console.error(`Fetch Error =\n`, error));
		};
		
		this.list = function(sorting,limit,page)
		{
			sorting=sorting||-1;
			limit=limit||10;
			page=page||0;
			
			return fetch(host+"list/"+gameId+"/"+sorting+"/"+limit+"/"+page, {
				method: "GET", 
				mode: "cors", 
				cache: "no-cache", 
				credentials: "same-origin", 
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				redirect: "follow",
				referrer: "no-referrer"
			})
			.then(response => response.json()) // parses response to JSON
			.catch(error => console.error(`Fetch Error =\n`, error));
		};
	}
	
	
})();
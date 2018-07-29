package highscore;
import haxe.Http;
import haxe.Json;

/**
 * ...
 * @author Henri Sarasvirta
 */
class HighScore 
{
	public static var host:String = "http://localhost:3000/";
	public var gameId:String = "gameId";
	
	public function new(gameId:String) 
	{
		this.gameId = gameId;
	}
	
	public function submit(user:String, score:Int,?cb:Void->Void, ?err:String->Void)
	{
		var req:Http = new Http(host + "submit/");
		req.onData = function(data:String){
			if(cb !=null)
				cb();
		}
		req.setHeader("Content-Type", "application/json");
		req.setPostData(Json.stringify({user:user, score:score, game:gameId}));
		req.request(true);
	}
	
	public function list(?cb:HighScores->Void,?sort:Int, ?limit:Int, ?page:Int):Void
	{
		sort = sort == null ? -1 : sort;
		limit = limit == null ? 10 : limit;
		page = page == null ? 0 : page;
		var req:Http = new Http(host + "list/" + gameId + "/" + sort + "/" + limit + "/" + page);
		req.onData = function(data:String){
			var hs:HighScores = cast Json.parse(data);
			trace(hs);
			if(cb !=null)
				cb(hs);
		}
		req.request(false);
		
		
	}
}

typedef HighScores = {
	public var scores:Array<Score>;
	public var totalPages:Int;
	public var page:Int;
}

typedef Score = {
	public var score:Int;
	public var user:String;
}
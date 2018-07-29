package;
import highscore.HighScore;
import js.jquery.Event;
import js.jquery.JQuery;

/**
 * ...
 * @author Henri Sarasvirta
 */
class Main 
{
	public static var instance:Main;
	public static function main()
	{
		new JQuery().ready(function ()
		{
			instance = new Main();
		});
		
	}
	
	private var highscore:HighScore;

	public function new() 
	{
		highscore = new HighScore("gameId");
		new JQuery("#listUpdate").click(function(e:Event):Void{
			highscore.list(updateList);
		});
		new JQuery("#submitScore").click(function (e:Event):Void
		{
			highscore.submit( new JQuery("#userName").val(),
			                  new JQuery("#userScore").val(),
							  function ()
							  {
								 trace("Submit ok");
								 highscore.list(updateList);
							  });
		});
	}
	
	private function updateList(hs:HighScores):Void
	{
		var ol = new JQuery("#scores");
		ol.children().remove();
		for ( score in hs.scores)
		{
			ol.append("<li>" + score.user + ":" + score.score+"</li>");
		}
	}
	
}
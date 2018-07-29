/**
 * Simple jquery based controller for actions in control panel.
 * @author 
 */

(function() {
	$().ready(function(){
		$("#listUpdate").click(()=>{
			$("#scores li").remove();
			$.get("/list/"+$("#listGameName").val()+"/-1/10/0", function(data){
				console.log(data);
				var list = "";
				for(var i = 0; i < data.scores.length; i++)
				{
					var e = data.scores[i];
					list += "<li>"+e.user+":"+e.score+"</li>";
				}
				$("#scores").append(list);
			}).fail( ()=>{
				console.log("Submit failed.");
			});
		});
	});
})();
/**
 * Simple jquery based controller for actions in control panel.
 * @author 
 */

(function() {
	$().ready(function(){
		$("#submitScore").click(()=>{
			$.post("/submit", {
				score:parseInt($("#userScore").val()),
				user:$("#userName").val(),
				game:$("#gameId").val()
			}, function(data){
				$("#submitLog").text("Submit ok");
			}).fail( ()=>{
				$("#submitLog").text("Submit failed.");
				console.log("Submit failed.");
			});
		});
	});
})();
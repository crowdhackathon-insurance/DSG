function login(){
	
	var username=$("#username").val();
	if (!username){
		
		$("#errors").text("Άδειο πεδίο");
	}else{

	var url='http://dsg-hackathon.cloudapp.net/api/v1/users/'+username+'/month/2/rank';
	     $.ajax({
    type        : 'GET',
    url         : url,
	jsonp: true,
	timeout: 5000,
	crossDomain: true,
	encoding:"UTF-8",
	success: function (data) {
            // do something with server response data
			var sdata = $.parseJSON(JSON.stringify(data));
			
			if(sdata.rank.username==null){
			$("#errors").text("Δεν υπάρχει ο χρήστης");
			}else{			
			 
			$("#errors").text('');
			
			$('#dashboardText').html("<h3>Γειά σου <b>"+sdata.rank.username+"</b></h3>");
			
			localStorage.setItem("username", sdata.rank.username);
			localStorage.setItem("gen_score", sdata.rank.gen_score);
			localStorage.setItem("placeholder1", sdata.rank.placeholder1);
			localStorage.setItem("placeholder2", sdata.rank.placeholder2);
			localStorage.setItem("placeholder3", sdata.rank.placeholder3);
			localStorage.setItem("rank", sdata.rank.rank);
			localStorage.setItem("users", sdata.rank.users);
			localStorage.setItem("scoreUp", sdata.rank.scoreUp);
			localStorage.setItem("scoreChange", sdata.rank.scoreChange);
			
			//edw tha ginei h alagh
			$.mobile.pageContainer.pagecontainer("change", "#dashboard",{reload: false,changeHash: false,reverse: false});

			}
        },
        error: function (err,textStatus) {
            // handle your error logic here
			alert("No Connection");
        }
    });
	
	}
}
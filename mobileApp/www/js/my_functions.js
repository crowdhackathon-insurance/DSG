function login(){
	
	var username=$("#username").val();
	if (!username){
		
		$("#errors").text("Άδειο πεδίο");
	}else{

	var url='http://dsg-hackathon.cloudapp.net/api/v1/users/'+username+'/month/6/rank';
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
			localStorage.setItem("stability", sdata.rank.stability);
			localStorage.setItem("score", sdata.rank.score);
			localStorage.setItem("active_time", sdata.rank.active_time);
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

function logout(){
	
	window.localStorage.clear();
$.mobile.pageContainer.pagecontainer("change", "#login",{reload: false,changeHash: false,reverse: false});
	
}

function rewards(){
	
		var url='http://dsg-hackathon.cloudapp.net/api/v1/rewards';
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
			
			String.prototype.stripSlashes = function(){
				return this.replace(/\\(.)/mg, "$1");
			}
			
			
		//alert(sdata.rewards.length);
			
			var getRewards='',j=0;
			for(var i=0; i<sdata.rewards.length;i++){

				if(sdata.rewards[i].rank==localStorage.getItem("rank")){
				getRewards+= '<li style="text-align:center"><h3>'+sdata.rewards[i].name+'</h3><img src="'+sdata.rewards[i].thumb.stripSlashes()+'" style="width:110px;height:110px;border: 1px solid #343434;border-radius:5px"><button class="ui-shadow ui-btn ui-corner-all">Το θέλω</button></li>';
				
				j++;
				}
			}
			$(".ui-li-count").text(j);
			if(j==0){
				$("#getRewards").html('<p>Δεν υπάρχει κανένα reward</p>');
			}else{
				
				//getRewards='<ul data-role="listview">'+getRewards+'</ul>';
				$("#getRewards").html(getRewards);
			}

			
        },
        error: function (err,textStatus) {
            // handle your error logic here
			alert("No Connection");
        }
    });
	
}

function epikinonia(){
navigator.notification.alert("Θα σε καλέσουμε άμεσα");
}
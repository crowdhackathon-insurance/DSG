var app = (function(){
	
	var _appWrapper = $('#app-wrapper'),
		settings = {
			apiUrl: 'http://dsg-hackathon.cloudapp.net/api/v1'
		};
	
	function trigger(evt, data){
		switch(evt){
			case 'login-submit':
				showApp();
				break;
			case 'dashboard-visible':
				api.getAllScores();
				break;
			case 'scores-returned':
				_renderScores(data);
				break;
		}
	}
	
	function init(){
		var apiOptions = {
			
			mediator: app.trigger,
			apiUrl: settings.apiUrl
		};
		api.init(apiOptions);
		
		_eventListeners();
	}

	function _eventListeners(){
		$('#btn_login').on('click', function(){
			trigger('login-submit');
		});
	}
	
	function showApp(){
		$('#login').fadeOut(function(){
			$('#main').fadeIn(function(){
				trigger('dashboard-visible');
			});
		});
	}
	
	function _renderScores(data){
		var tr = '',
			tbody = $('#userlist tbody'),
			// currentMonth = new Date().getMonth()+1;
			currentMonth = 2;	//static till we get actual data in the database
			
		tbody.html('');
		
		for( var i=0,n = data[currentMonth].length; i<n; i++ ){
			tr = 
				'<tr data-score-index="'+i+'">\
					<td class="'+(i<3?'text-bold':'')+'">'+getTextPlace(i+1)+'</td>\
					<td>'+data[currentMonth][i].username+'</td>\
					<td>'+data[currentMonth][i].gen_score+'%</td>\
					<td class="action">\
						<button type="button" class="btn-anal btn btn-default btn-block" data-toggle="modal" data-target="#mdl_anal">Details</button>\
					</td>\
				</tr>';
			
			tbody.append(tr);
		}
	}
	
	function getTextPlace(n){
		if(n==1){
			return n+'st';
		} else if(n==2){
			return n+'nd';
		} else if(n==3){
			return n+'rd';
		} else {
			return n+'th';
		}
	}
	
	return {
		trigger: trigger,
		init: init
	};
})();

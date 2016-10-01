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
					<td>'+data[currentMonth][i].username+'</td>\
					<td>'+data[currentMonth][i].gen_score+'%</td>\
					<td class="action">\
						<button type="button" class="btn-anal btn btn-primary btn-block" data-toggle="modal" data-target="#mdl_anal">Details</button>\
					</td>\
				</tr>';
			
			tbody.append(tr);
		}
	}
	
	return {
		trigger: trigger,
		init: init
	};
})();

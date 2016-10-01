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
			$('#main').fadeIn();
		});
	}
	
	return {
		trigger: trigger,
		init: init
	};
})();

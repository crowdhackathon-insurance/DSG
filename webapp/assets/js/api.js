var api = (function(){
	var _trigger,
		_apiUrl;
	
	function init(options){
		_trigger = options.mediator;
		_apiUrl = options.apiUrl;
	}

	return {
		init: init
	};
})();
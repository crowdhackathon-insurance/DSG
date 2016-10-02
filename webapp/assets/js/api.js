var api = (function(){
	var _trigger,
		_apiUrl;
	
	function init(options){
		_trigger = options.mediator;
		_apiUrl = options.apiUrl;
	}
	
	function getAllScores(){
		$.ajax({
			type: 'GET',
			url: _apiUrl+"/scores/",
			headers: {
				"Accept":"application/json"
			},
			success: function (response){
				_trigger('scores-returned', response.scores);
			},
			error: function (response){
				console.log('getAllScores request failed :(');
			}
		});
	}
	
	function getRewards(){
		$.ajax({
			type: 'GET',
			url: _apiUrl+"/rewards/",
			headers: {
				"Accept":"application/json"
			},
			success: function (response){
				_trigger('rewards-returned', response.rewards);
			},
			error: function (response){
				console.log('getRewards request failed :(');
			}
		});
	}

	return {
		init: init,
		getAllScores: getAllScores,
		getRewards: getRewards
	};
})();
var app = (function(){
	
	var _appWrapper = $('#app-wrapper'),
		settings = {
			apiUrl: 'http://dsg-hackathon.cloudapp.net/api/v1'
		},
		allScoreData;
	
	function trigger(evt, data){
		switch(evt){
			case 'login-submit':
				showApp();
				break;
			case 'dashboard-visible':
				api.getAllScores();
				break;
			case 'scores-returned':
				_saveScores(data);
				_renderScoresForMonth(_getSelectedMonthNum());
				break;
			case 'month_selection_changed':
				_renderScoresForMonth(_getSelectedMonthNum());
				break;
			case 'user-detail-modal-show':
				_renderUserDetailModal(data);
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
		trigger('login-submit');	//temp login override
	}

	function _eventListeners(){
		$('#btn_login').on('click', function(){
			trigger('login-submit');
		});
		
		$('#mdl_anal').on('show.bs.modal', function(e){
			var data = {
				username: $(e.relatedTarget).closest('tr').data('score-user')
			};
			
			trigger('user-detail-modal-show', data);
		});
		
		$('#time_period select.select-month').on('change', function(){
			trigger('month_selection_changed');
		});
	}
	
	function showApp(){
		$('#login').fadeOut(function(){
			$('#main').fadeIn(function(){
				trigger('dashboard-visible');
			});
		});
	}
	
	function _renderScoresForMonth(month){
		var tr = '',
			tbody = $('#userlist tbody'),
			// currentMonth = new Date().getMonth()+1;
			currentMonth = 2;	//static till we get actual data in the database
			
		
		tbody.hide();
		if(allScoreData[month]){
			tbody.html('');
			for( var i=0,n = allScoreData[month].length; i<n; i++ ){
				tr = 
					'<tr data-score-user="'+allScoreData[month][i].username+'">\
						<td class="'+(i<3?'text-bold':'')+'">'+getTextPlace(i+1)+'</td>\
						<td>'+allScoreData[month][i].username+'</td>\
						<td>'+allScoreData[month][i].gen_score+'%</td>\
						<td class="action">\
							<button type="button" class="btn-anal btn btn-default btn-block" data-toggle="modal" data-target="#mdl_anal">Details</button>\
						</td>\
					</tr>';
				
				tbody.append(tr);
			}
		} else {
			tbody.html('<tr><td  colspan=4 class="text-center">No records for this month :(</td></tr>');
		}
		tbody.fadeIn(666);
	}
	
	function _renderUserDetailModal(data){
		var userScores = [],
			tbody = $('#mdl_anal tbody');
			
		for( var i in allScoreData){
		   if (allScoreData.hasOwnProperty(i)) {
				for( var j=0; j<allScoreData[i].length; j++ ){
					if(allScoreData[i][j].username == data.username)
						userScores.push(allScoreData[i][j]);
				}
		   }
		}
		
		tbody.html('');
		
		for( var i=userScores.length-1; i>-1; i-- ){
			var up, tr;
			if(i!=0){
				up = userScores[i-1].gen_score-userScores[i].gen_score<0?true:false;
				tr =
					'<tr class="status-'+(up?'improved':'declined')+'">\
						<td>'+userScores[i].month+'</td>\
						<td>'+userScores[i].stability+'</td>\
						<td>'+userScores[i].score_range+'</td>\
						<td>'+userScores[i].active_time+'</td>\
						<td class="text-bold">'+userScores[i].gen_score+'%</td>\
						<td><i class="fa fa-sort-'+(up?'asc':'desc')+'" aria-hidden="true"></i></td>\
					  </tr>';
			} else {
				tr =
					'<tr>\
						<td>'+userScores[i].month+'</td>\
						<td>'+userScores[i].stability+'</td>\
						<td>'+userScores[i].score_range+'</td>\
						<td>'+userScores[i].active_time+'</td>\
						<td class="text-bold">'+userScores[i].gen_score+'%</td>\
						<td><i class="fa fa-minus" aria-hidden="true"></i></td>\
					  </tr>';
			}
			tbody.append(tr);
		}
	}
	
	function _saveScores(data){
		allScoreData = data;
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
	
	var _monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];
	
	function _monthToNumber(month){
		return _monthNames.indexOf(month)+1;
	}
	
	function _numberToMonth(num){
		
		return _monthNames[num-1];
	}
	
	function _getCurrentMonthNum(){
		return (new Date().getMonth()+1);
	}
	
	function _getSelectedMonthNum(){
		var mo = $('#time_period').find('select.select-month option:selected').val();
		return _monthToNumber(mo);
	}
	
	return {
		trigger: trigger,
		init: init
	};
})();

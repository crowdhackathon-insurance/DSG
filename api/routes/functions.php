<?php
	function getUserRankObject($db, $username, $month){
		$stmt = $db->prepare("SELECT `username`, `gen_score`,`stability`,`score_range`,`active_time`, `score` FROM `raw_scores` WHERE month=? AND `username`=?");
		$stmt->bind_param('is', $month, $username);
		$stmt->execute();		
		$stmt->bind_result($score_username, $score_gen_score, $score_stability, $score_score_range, $score_active_time, $score_score );
		$stmt->fetch();
		
		$rankObj = array();
		$rankObj['username'] = $score_username;
		$rankObj['gen_score'] = $score_gen_score;
		$rankObj['stability'] = $score_stability;
		$rankObj['score_range'] = $score_score_range;
		$rankObj['active_time'] = $score_active_time;
		$rankObj['score'] = $score_score;
		
		$stmt->close();
		
		$stmt = $db->prepare("SELECT `username`, `gen_score` FROM `raw_scores` WHERE month=? ORDER BY `gen_score` DESC");
		$stmt->bind_param('i', $month);
		$stmt->execute();		
		$stmt->bind_result($score_username, $score_gen_score);
		
		$all_scores = array();
		
		while($stmt->fetch()){
			$score = array();
			
			$score['username'] = $score_username;
			$score['gen_score'] = $score_gen_score;
			
			$all_scores[] = $score;
		}
		$stmt->close();
		
		$rankObj['rank'] = array_search($username, array_column($all_scores, 'username')) + 1;
		$rankObj['users'] = count($all_scores);
		
		return $rankObj;
	}
	
	function sortByScore($a, $b) {
		return $a['gen_score'] < $b['gen_score'];
	}
?>
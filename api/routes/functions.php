<?php
	function getUserRankObject($db, $username, $month){
		$stmt = $db->prepare("SELECT `username`, `gen_score`,`placeholder1`,`placeholder2`,`placeholder3` FROM `raw_scores` WHERE month=? AND `username`=?");
		$stmt->bind_param('is', $month, $username);
		$stmt->execute();		
		$stmt->bind_result($score_username, $score_gen_score, $score_placeholder1, $score_placeholder2, $score_placeholder3);
		$stmt->fetch();
		
		$rankObj = array();
		$rankObj['username'] = $score_username;
		$rankObj['gen_score'] = $score_gen_score;
		$rankObj['placeholder1'] = $score_placeholder1;
		$rankObj['placeholder2'] = $score_placeholder2;
		$rankObj['placeholder3'] = $score_placeholder3;
		
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
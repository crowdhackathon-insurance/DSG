<?php
	function getUserRankObject($db, $username, $month){
		$stmt = $db->prepare("SELECT `username`, `gen_score`,`placeholder1`,`placeholder2`,`placeholder3` FROM `raw_scores` WHERE month=?");
		$stmt->bind_param('i', $month);
		$stmt->execute();		
		$stmt->bind_result($score_username, $score_gen_score, $score_placeholder1, $score_placeholder2, $score_placeholder3);
		
		$rankObj = array();
		$all_scores = array();
		
		while($stmt->fetch()){
			$score = array();
			
			$score['username'] = $score_username;
			$score['gen_score'] = $score_gen_score;
			$score['placeholder1'] = $score_placeholder1;
			$score['placeholder2'] = $score_placeholder2;
			$score['placeholder3'] = $score_placeholder3;
			
			$all_scores[] = $score;
			if($username == $score_username)
				$rankObj = $score;
		}
		$stmt->close();

		usort($all_scores, 'sortByScore');
		
		$rankObj['rank'] = array_search($username, array_column($all_scores, 'username')) + 1;
		$rankObj['users'] = count($all_scores);
		
		return $rankObj;
	}
			
	function sortByScore($a, $b) {
		return $a['gen_score'] < $b['gen_score'];
	}
?>
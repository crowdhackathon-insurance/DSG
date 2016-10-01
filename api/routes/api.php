<?php
	/**
	*	GET ALL SCORES
	**/
	$app->get('/api/v1/scores', function () use ($app, $db){
		$stmt = $db->prepare("SELECT `id`,`username`,`year`,`month`,`gen_score`,`placeholder1`,`placeholder2`,`placeholder3` FROM `raw_scores` WHERE 1");
		$stmt->execute();
		
		$stmt->bind_result($score_id, $score_username, $score_year, $score_month, $score_gen_score, $score_placeholder1, $score_placeholder2, $score_placeholder3);
		
		
		$response = array();
		$response['scores'] = array();
		while($stmt->fetch()){
			$score = array();	//reinit the array just in case
			
			$score['id'] = $score_id;
			$score['username'] = $score_username;
			$score['year'] = $score_year;
			$score['month'] = $score_month;
			$score['gen_score'] = $score_gen_score;
			$score['placeholder1'] = $score_placeholder1;
			$score['placeholder2'] = $score_placeholder2;
			$score['placeholder3'] = $score_placeholder3;
			
			$response['scores'][] = $score;
		}
		$stmt->close();
		
		$app->response->setStatus(200);
		$response['success'] = true;
		$response = json_encode($response, JSON_UNESCAPED_UNICODE);
		$app->response->setBody($response);
	});
?>
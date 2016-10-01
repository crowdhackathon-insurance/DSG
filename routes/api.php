<?php
	$app->get('/api/v1/test', function () use ($app, $db){
		echo "It's alive!";
	});
?>
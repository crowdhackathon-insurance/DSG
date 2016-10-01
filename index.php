<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	
	require 'vendor/autoload.php';
	require 'vendor/palanik/corsslim/CorsSlim.php';
	
	$app = new \Slim\Slim();
	
	$corsOptions = array(
		"origin" => "*",
		"exposeHeaders" => array("token"),
		"maxAge" => 86400,
		"allowMethods" => array("POST, GET, OPTIONS")
	);
	$app->add(new \CorsSlim\CorsSlim());
	
	$app->response->headers->set('Content-Type', 'application/json;charset=utf-8');
	
	// Database Connection	
	$configs = require ('/var/config/config.php');
	$db = new mysqli($configs['db_host'], $configs['db_username'], $configs['db_password'], $configs['db_name']);
	$db->set_charset("utf8");
	
	//API routing
	require 'routes/api.php';
	
	$app->get('/', function () use ($app){
		$app->redirect('/webapp');
	});
	
	$app->run();
?>
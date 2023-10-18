<?php
header('Content-Type: application/json');

$spaceXApiUrl = 'https://api.spacexdata.com/v3/rockets';

$ch = curl_init($spaceXApiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

if ($response === false) {
    echo json_encode(['error' => 'Failed to fetch data']);
} else {
    echo $response;
}

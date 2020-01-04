<?php

$db = include('../map_config/config.php');
$dbhost = $db['host'];
$dbname = $db['name'];
$dbuser = $db['user'];
$dbpass = $db['password'];
$charset = 'utf8_general_ci';

$dsn = "mysql:host=$dbhost;dbname=$dbname;$charset";
$conn = new PDO($dsn,$dbuser,$dbpass);
$conn->exec('SET CHARACTER SET utf8');

$sql = 'SELECT * FROM bbr_layer_areas';

$rs = $conn->query($sql);
if (!$rs) {
    echo 'SQL FEHLER!\n';
    exit;
}

$geojson = array(
   'type'      => 'FeatureCollection',
   'features'  => array()
);

while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {

  # Alle Leerzeichen entfernen, und Koordinaten-String mit strtok() in zwei Tokens beim Komma trennen
  $coords = str_replace(' ', '',$row['coordinates']);
  $y = strtok($coords,',');
  $x = strtok(',');

  $feature = array(
	'type' => 'Feature',
        'geometry' => array(
	     	'type' => 'Point',
	     	'coordinates' => array((float)$x, (float)$y),
	),
	'properties' => array(
		'name' => $row['name'],
		'area' => $row['area_size']
	)
	);
  array_push($geojson['features'], $feature);
}

header('Content-type: application/json');
echo json_encode($geojson, JSON_NUMERIC_CHECK);

$conn = NULL;
?>

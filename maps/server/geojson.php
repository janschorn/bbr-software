
<?php

# Connect to MySQL database
$conn = new PDO('mysql:host=localhost;dbname=mydatabase','myusername','mypassword');

# Build SQL select to get the data
$sql = 'SELECT * FROM `bbr_flowered_areas`';

# Try query or error
$rs = $conn->query($sql);
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}

# Build GeoJSON feature collection array
$geojson = array(
   'type'      => 'FeatureCollection',
   'features'  => array()
);

# Loop through rows to build feature arrays
while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
    $properties = $row;
    # Remove wkb and geometry fields from properties
    unset($properties['coordinates']);
    $feature = array(
         'type' => 'Feature',
         'geometry' => $row['coordinates'])), //hier die Geometrie X,Y berechnen
         'properties' => $properties
    );
    # Add feature arrays to feature collection array
    array_push($geojson['features'], $feature);
}

header('Content-type: application/json');
echo json_encode($geojson, JSON_NUMERIC_CHECK);

$conn = NULL;
?>

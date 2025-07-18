export const LANGUAGES: string[] = [
  'C#',
  'C++',
  'CSS',
  'Go',
  'HTML',
  'Java',
  'JavaScript',
  'Kotlin',
  'PHP',
  'Python',
  'React (JSX)',
  'Ruby',
  'Rust',
  'Swift',
  'TypeScript'
].sort();

export const PHP_EXAMPLES = [
  {
    name: "Database Query",
    code: `<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, firstname, lastname FROM Guests";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>`
  },
  {
    name: "File Handling",
    code: `<?php
$myfile = fopen("webdictionary.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("webdictionary.txt"));
fclose($myfile);
?>`
  },
  {
    name: "JSON Encode",
    code: `<?php
$age = array("Peter"=>35, "Ben"=>37, "Joe"=>43);
header('Content-Type: application/json');
echo json_encode($age);
?>`
  },
  {
    name: "Simple Class",
    code: `<?php
class Car {
  public $color;
  public $model;
  public function __construct($color, $model) {
    $this->color = $color;
    $this->model = $model;
  }
  public function message() {
    return "My car is a " . $this->color . " " . $this->model . "!";
  }
}

$myCar = new Car("black", "Volvo");
echo $myCar -> message();
?>`
  }
];
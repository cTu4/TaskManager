<?php
class DB{

    const USER = "root";
    const PASS = '1111';
    const HOST = "localhost";
    const DB   = "phone_book";

    public static function connToDB() {

        $user = self::USER;
        $pass = self::PASS;
        $host = self::HOST;
        $db   = self::DB;

        $conn = new PDO("mysql:dbname=$db;host=$host", $user, $pass);
        return $conn;

    }
}

//$host = 'us-cdbr-east-02.cleardb.com'; // адрес сервера
//$database = 'heroku_78c06ec4330d665'; // имя базы данных
//$user = 'bcde434ef6ce7f'; // имя пользователя


//$password = 'f99d83c0'; // пароль heroku
$password = '1111'; // пароль notebook
//$password = 'ko2ra6t2a'; // пароль pk


$host = 'localhost'; // адрес сервера
$database = 'phone_book'; // имя базы данных
$user = 'root'; // имя пользователя

$mysqli = mysqli_connect($host, $user, $password, $database);
<?php
class DB{

    const USER = "bcde434ef6ce7f";
    const PASS = 'f99d83c0';
    const HOST = "us-cdbr-east-02.cleardb.com";
    const DB   = "heroku_78c06ec4330d665";

    public static function connToDB() {

        $user = self::USER;
        $pass = self::PASS;
        $host = self::HOST;
        $db   = self::DB;

        $conn = new PDO("mysql:dbname=$db;host=$host", $user, $pass);
        return $conn;

    }
}

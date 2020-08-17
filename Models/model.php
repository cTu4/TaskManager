<?php
class Model
{
    protected $db = null;

    public function __construct() {
        $this->db = DB::connToDB();
    }
    public function login($login,$password){
        $sql = "select password from users where login='".$login."'";
        $hash = $this->db->query($sql);
        foreach ($this->db->query($sql) as $row) {
            $hash = $row['password'];
        }
        $result = password_verify($password,$hash);
        return $result;
    }
    public function get_data()
    {
        $sql = 'select id,name,email,task,status,edit from tasks';
        $data=$this->db->query($sql);
        $result = [];
        $result['data']=[];
        foreach ($data as $key => $val){
            array_push($result['data'],['id'=>$val[0],'name'=>$val[1],'email'=>$val[2],'task'=>$val[3],'status'=>$val[4],'edit'=>$val[5]]);
        }
        return json_encode($result);
    }
    public function add_data($row){
        $sql='insert into tasks values(null,?,?,?,?,?)';
        $task = htmlspecialchars($row['task']);
        $name = htmlspecialchars($row['name']);
        $email = htmlspecialchars($row['email']);

        $this->db->prepare($sql)->execute([$name,$email,$task,$row['status'],0]);
    }
    public function edit_task($id,$task){
        $sql = "update tasks set task=?, edit=? where id=?";
        $this->db->prepare($sql)->execute([$task,1,$id]);
    }
    public function edit_status($id,$status){
        $sql = "update tasks set status=? where id=?";
        $this->db->prepare($sql)->execute([$status,$id]);
    }
}
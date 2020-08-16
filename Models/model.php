<?php
class Model
{
    protected $db = null;

    public function __construct() {
        $this->db = DB::connToDB();
    }
    public function get_data()
    {
        $sql = 'select id,name,email,task,status from tasks';
        $data=$this->db->query($sql);
        $result = [];
        $result['data']=[];
        foreach ($data as $key => $val){
            array_push($result['data'],['id'=>$val[0],'name'=>$val[1],'email'=>$val[2],'task'=>$val[3],'status'=>$val[4]]);
        }
        return json_encode($result);
    }
    public function add_data($row){
        $sql='insert into tasks values(null,?,?,?,?)';
        $this->db->prepare($sql)->execute([$row['name'],$row['email'],$row['task'],$row['status']]);
    }
    public function edit_task($id,$task){
        $sql = "update tasks set task=? where id=?";
        $this->db->prepare($sql)->execute([$task,$id]);
    }
    public function edit_status($id,$status){
        $sql = "update tasks set status=? where id=?";
        $this->db->prepare($sql)->execute([$status,$id]);
    }
}
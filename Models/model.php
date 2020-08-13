<?php
class Model
{
    public function get_data()
    {
        include 'db_config.php';
        $sql = 'select name,email,task,status from tasks';
        $data = mysqli_query($mysqli, $sql);
        $data = mysqli_fetch_all($data);
        $result = [];
        $result['data']=[];
        foreach ($data as $key => $val){
            array_push($result['data'],['name'=>$val[0],'email'=>$val[1],'task'=>$val[2],'status'=>$val[3]]);
        }
        return json_encode($result);
    }
    public function add_data($row){
        include 'db_config.php';
        $sql="INSERT INTO tasks VALUES (null, '".$row['name']."','".$row['email']."','".$row['task']."',".$row['status'].")";
        $data = mysqli_query($mysqli, $sql);
    }
    public function edit_task($row){
        include 'db_config.php';
        $sql="INSERT INTO tasks VALUES (null, '".$row['name']."','".$row['email']."','".$row['task']."',".$row['status'].")";
        $data = mysqli_query($mysqli, $sql);
    }
}
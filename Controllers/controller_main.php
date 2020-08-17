<?php
class Controller_Main extends Controller
{
    function __construct()
    {
        $this->model = new model();
        $this->view = new View();
        session_start();
    }
    function action_index()
    {
        $this->view->generate('main_view.php', 'template_view.php');
    }
    function action_login()
    {
        $_SESSION['login'] = $_POST['login'];
        $_SESSION['password'] = $_POST['password'];
        echo $this->model->login( $_SESSION['login'],$_SESSION['password']);
    }
    function action_CheckAdmin()
    {
        //var_dump($_SESSION);
        if(isset($_SESSION['login']) && isset($_SESSION['password'])){
            //var_dump($this->model->login( $_SESSION['login'],$_SESSION['password']));
            echo $this->model->login( $_SESSION['login'],$_SESSION['password']);
        }
        else{
            echo false;
        }

    }
    function action_logout()
    {
       if(isset($_SESSION['login']) && isset($_SESSION['password'])){
           unset($_SESSION['login'],$_SESSION['password']);
       }

    }
    function action_get_data(){
        echo (($this->model->get_data()));
    }
    function action_add_data(){
        $this->model->add_data($_POST['data']);
    }
    function action_edit_task(){
        $this->model->edit_task(intval($_POST['id']),$_POST['task']);
    }
    function action_edit_status(){
        $status=0;
        if($_POST['status']==='true'){
            $status=1;
        }
        $this->model->edit_status(intval($_POST['id']),$status);
    }
}
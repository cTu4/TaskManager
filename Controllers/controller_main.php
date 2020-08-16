<?php
class Controller_Main extends Controller
{
    function __construct()
    {
        $this->model = new model();
        $this->view = new View();
    }
    function action_index($admin=false)
    {
        $this->view->generate('main_view.php', 'template_view.php',$admin);
    }
    function action_get_data(){
        echo (($this->model->get_data()));
    }
    function action_add_data(){
        $this->model->add_data($_POST['data']);
        return (($this->model->get_data()));
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
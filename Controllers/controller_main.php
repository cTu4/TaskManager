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
    function action_edit_task($row){
        $this->model->edit_task($_POST['data']);
        return (($this->model->get_data()));
    }
}
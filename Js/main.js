$(document).ready(function () {
    var admin;
    var btn='';
    var btn_Log_in ={
        text: 'Log in',
        action: ActionButton
    };
    var btn_Log_out = {
        text: 'Log out',
        action:function (){
            admin = false;
            var table = $('#main_table').DataTable();
            let button = table.button();
            toastr.info('You Log out!')
            $.ajax({
                url: 'index.php?r=main/logout',
                success: function (){
                    button.text(btn_Log_in.text);
                    button.action(btn_Log_in.action);
                }
            });
            table.clear().ajax.reload();

        }
    }

    $.ajax({
        url:'index.php?r=main/CheckAdmin',
        success:function (response){
            admin=!!response;
            console.log(admin);

            $('#main_table').DataTable({
                ajax:{
                    url: "index.php?r=main/get_data",
                    type: 'POST'
                },
                "drawCallback": function() {
                    $('[type="checkbox"]').click(function (e){


                        function Ses(callback){
                            $.ajax({
                                url:'index.php?r=main/CheckAdmin',
                                success: callback,
                                error: function (){
                                    alert('aaa')
                                }
                            });
                        }
                        if (admin){
                            let table = $('#main_table').DataTable();
                            let tr = $(e.target).closest('tr');
                            let id = table.row(tr).data().id;
                            Ses(function (result){
                                if(!!result){
                                    $.ajax({
                                        url: 'index.php?r=main/edit_status',
                                        type: 'POST',
                                        data: {id:id,status:$(e.target).prop('checked')}
                                    })
                                }
                                else{
                                    toastr.warning('Log in please!');
                                    ActionButton();
                                }
                            });


                        }
                    });
                },
                "pagingType": "simple_numbers",
                "lengthMenu": [3,3],
                "columns":[
                    {
                        "data": "name"
                    },
                    {
                        "data": 'email'
                    },
                    {
                        "data": 'task'
                    },
                    {
                        "data": 'status',
                        "render": function ( data, type, row ) {
                            let disable = admin? '': 'disabled';
                            let check = data==='1' ? ' checked':'';
                            let checkbox = "<input type='checkbox' "+disable+check+">";
                            return checkbox;
                        }
                    },
                    {
                        "data": 'edit',
                        "render": function ( data, type, row ) {
                            let check = data==='1' ? ' checked':'';
                            let checkbox = "<input type='checkbox' disabled "+check+">";
                            return checkbox;
                        }
                    }

                ],

                dom: 'Bfrtip',
                buttons: [
                    admin?btn_Log_out:btn_Log_in,
                    {
                        text: 'Add task',
                        action: function ( e, dt, node, config ) {
                            $('#main_table').append($('<div/>',{
                                id:'add_task',
                                title: 'Add task'
                            }));
                            $('#add_task').append($('<div/>',{
                                html: '<label class="field">Name: <input id="name"> </label>' +
                                    '<label class="field">E-mail: <input id="email"> </label>' +
                                    '<label class="field">Task: <input id="task"> </label>' +
                                    '<div class="field"><button>Okay</button></div>'
                            }));
                            $('.field').css('margin','10px');
                            $('.field button').click(function (){
                                let name = $('#name')[0].value;
                                let email = $('#email')[0].value;
                                let task  = $('#task')[0].value;
                                if(ValidateEmail(email)){
                                    if(name!=='' && email!=='' && task!=='' ){
                                        let data = {data:{name:name,email:email,task:task,status:0}};
                                        $.ajax({
                                            url:'index.php?r=main/add_data',
                                            type: 'POST',
                                            data: data,
                                            success: function (response){
                                                var table = $('#main_table').DataTable();
                                                table.clear().ajax.reload();
                                                toastr.success('You add task!',function (){
                                                    $('#add_task').remove();
                                                });
                                            }

                                        });
                                    }
                                    else {
                                        toastr.warning('Incorrect input!');
                                    }
                                }
                            });
                            $('#add_task').dialog();
                        }
                    }
                ]
            });
        }

    });


    function ValidateEmail(mail)
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        toastr.warning("You have entered an invalid email address!")
        return (false)
    }

    $('#main_table').on('click', 'td', function(e) {
        let item = $(e.target)[0];
        if(item.cellIndex===2 && admin===true){
            item.innerHTML='<input id="task" value="'+item.innerHTML+'"><i class="fa fa-check check"></i>';
            let fa_check =$('.check');
            fa_check.css('margin','10px','cursor','pointer');
            fa_check.css('cursor','pointer');
            fa_check.click(function (e){
                let task = $('#task')[0].value;
                let table = $('#main_table').DataTable();
                let tr = $(e.target).closest('tr');
                let id = table.row(tr).data().id;
                console.log(id,task);
                $.ajax({
                   url: 'index.php?r=main/edit_task',
                   type: 'POST',
                   data: {id:id,task:task}
                });
                table.clear().ajax.reload();

            })
        }

    });


    function ActionButton(){
        $('#main_table').append($('<div/>',{
            id:'admin_form',
            title: 'Log in'
        }));
        $('#admin_form').append($('<div/>',{
            html: '<label class="field">Name: <input id="name"> </label>' +
                '<label class="field">Password: <input id="password" type="password"> </label>' +
                '<div class="field"><button>Okay</button></div>'
        }));
        $('.field').css('margin','10px');
        $('.field button').click(function (){
            let name = $('#name')[0].value;
            let password = $('#password')[0].value;
            if(name!=='' && password!==''){
                $.ajax({
                    url: 'index.php?r=main/login',
                    type: 'POST',
                    data: {login: name, password: password},
                    success: function (response){
                        //console.log(!!response);
                        if(!!response){
                            admin=true;
                            var table = $('#main_table').DataTable();
                            let button = table.button();
                            button.text(btn_Log_out.text);
                            button.action(btn_Log_out.action);
                            table.clear().ajax.reload();
                            $('#admin_form').remove();
                        }
                        else {
                            toastr.warning('Incorrect data, please check form!');
                        }

                    }
                });

            }
            else{
                toastr.warning('Empty login or password!');
                $('#name')[0].value='';
                $('#password')[0].value='';
            }
        });
        $('#admin_form').dialog();
    }

function CheckAdmin(){
        $.ajax({
        url:'index.php?r=main/CheckAdmin',
        type: 'POST',
        success: function (response){
            console.log("response "+response);
            admin = !!Number(response);
        }
        });
        console.log("admin - "+admin);
}


});
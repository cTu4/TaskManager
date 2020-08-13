$(document).ready(function () {
    var admin = false;
    $('#main_table').DataTable({
        ajax:{
            url: "index.php?r=main/get_data",
            type: 'POST'
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
                    if(data==='1'){
                        return '<input type="checkbox" disabled checked>'
                    }
                    else{
                        return '<input type="checkbox" disabled>'
                    }
                    if(admin){
                        $('#main_table input').prop('disabled',false);
                    }
                }
            }
        ],

        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Log in',
                action: function ( e, dt, node, config ) {
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
                        console.log(password);
                        if(name==='admin' && password==='123' && name!=='' && password!==''){
                            admin=true;
                            $('#main_table input').prop('disabled',false);
                            $('#admin_form').remove();
                        }
                        else{
                            alert('Uncorrected login or password!');
                            $('#name')[0].value='';
                            $('#password')[0].value='';
                        }
                    });
                    $('#admin_form').dialog();

                }
            },
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
                        if(name!=='' && email!=='' && task!==''){
                            let data = {data:{name:name,email:email,task:task,status:0}};
                            $.ajax({
                                url:'index.php?r=main/add_data',
                                type: 'POST',
                                data: data,
                                success: function (response){
                                    console.log((response));
                                    var table = $('#main_table').DataTable();
                                    table.clear().ajax.reload();
                                    $('#add_task').remove();
                                }

                            });
                        }
                        else {
                            alert('Check input!');
                        }

                    });
                    $('#add_task').dialog();
                }
            }
        ]
    });
    $('#main_table').on('click', 'td', function(e) {
        let item = $(e.target)[0];
        if(item.cellIndex===2 && admin===true){
            item.innerHTML='<input id="task" value="'+item.innerHTML+'"><i class="fa fa-check check"></i>';
            let fa_check =$('.check');
            fa_check.css('margin','10px','cursor','pointer');
            fa_check.css('cursor','pointer');
            fa_check.click(function (){
                item.innerHTML=$('#task')[0].value;
            })
        }

    });




});
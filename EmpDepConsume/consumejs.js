$(document).ready(function () {
  
   var table= $('#myTable').DataTable({
        "ajax": {
            url: "http://localhost:57671/api/emp/get",
            dataSrc: "" 
        }
        , "columns": [
            //{ "data": "EmpId" },
            { "data": "EmpName" },
            { "data": "DeptName" },
            {
                "data": "EmpId",
                render: function (data) {
                    return "<button class='btn btn-danger js-delete' data-empid="+data+">Delete</button>"
                        }
            }
        ]   
            //,
            //"columnDefs": [{
            //    "defaultContent": "-",
            //    "targets": "_all"
            //}]

    })

   $('#myTable').on('click', '.js-delete', function () {
       var button = $(this);
       alert(button.attr('data-empid'))
   })

    $('#clickme').click(function () {
        $.ajax({
            contentType: "application/json",
            url: "http://localhost:57671/api/emp/get",
            success: function (json) {
                $("#tableData").empty();
                //alert(json)
                var obj = JSON.stringify(json)
                console.log(json)
                $.each(json, function (key, value) {
                    var el = $('<tr>')  

                    $.each(value, function (key, value) {
                        console.log('key: ' + key + ' value:' + value)
                        $(el).append($('<td>').text(value))
                    })
                    $(el).appendTo('#tableData')
                })
            }
        })
    })

})
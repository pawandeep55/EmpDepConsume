$(document).ready(function () {

    var table = $('#myTable').DataTable({
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
                    return "<button class='btn btn-info js-edit' data-empid=" + data + " data-toggle='modal' data-target='#myModal'>Edit</button>" + "  " + "<button class='btn btn-danger js-delete' data-empid=" + data + ">Delete</button>"
                }
            }
            //,
            //{
            //    "data": "EmpId",
            //    render: function (data) {
            //        return "<button class='btn btn-danger js-delete' data-empid=" + data + ">Delete</button>"
            //    }
            //}
            
        ]
        //,
        //"columnDefs": [{
        //    "defaultContent": "-",
        //    "targets": "_all"
        //}]

    })

    $('#myTable').on('click', '.js-delete', function () {
        var button = $(this);
        bootbox.confirm("Are you sure you want to delete this Employee?", function (result) {
            if (result) {
                $.ajax({
                    url: "http://localhost:57671/api/emp/" + button.attr("data-empid"),
                    method: "DELETE",
                    success: function () {
                        table.row(button.parents("tr")).remove().draw();
                    }
                })
            }
        })
    })

    //$('#jsinsert').click(function () {
    //    alert('yoo')

    //})


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
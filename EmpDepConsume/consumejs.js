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
                    return "<button class='btn btn-info js-edit' data-empid=" + data + " >Edit</button>" + "  " + "<button class='btn btn-danger js-delete' data-empid=" + data + ">Delete</button>"
                }
            }
            //data- toggle='modal' data- target='#myModal'
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
    $('#myTable').on('click', '.js-edit', function () {
        var button = $(this)
        //alert('yoo ' + button.attr("data-empid"))
        var p = button.attr("data-empid");
        var newUrl = "http://localhost:57671/api/emp/" + p
        alert(newUrl)
        $.ajax({
            contentType: "application/json",
            url: newUrl,
            success: function (json) {
                console.log(json.EmpName)
                $('#myModal').modal('toggle');
                $('#myModal #EmpName').val(json.EmpName)
                $('#myModal #DeptName').val(json.DeptName)
                $('#jsupdate').attr("data-empid", p)
            }
        })
    })
    $('#myModal').on('click', '#jsupdate', function () {
        var button = $(this)
        //alert('check' + button.attr("data-empid"))
        $.ajax({
            contentType: "application/json",
            url: "http://localhost:57671/api/emp/" + button.attr("data-empid"),
            type: "PUT",
            success: function (json) {
                console.log(json)
                $('#myModal').modal('toggle');
                alert('updated')
            }
        })
    
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
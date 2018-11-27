$regexForInputUsername = "^.{3}.*$";
$regexForInputPassword = "^.{3}.*$";
$regexForInputName = "^.{3}.*$";
$regexForInputSurname = "^.{3}.*$";
$regexForInputGender = "^male$|female$";
$regexForInputEmail = "^.+\\@.+\\..+$";
$regexForInputIdOfEmployee = "^[0-9]{1}[0-9]*$";
$regexForInputTelephone = "^[0-9]{3}[0-9]*$";
$regexForInputAddress = "^.{3}.*$";

// globalny array vsetkych usernames (unique ID)
var $usernames = [];

function edit_concrete_row(counterOfTheRows)
{
    console.log("edit here");
    document.getElementById("edit_button_index_"+counterOfTheRows).style.display="none";
    document.getElementById("delete_button_index_"+counterOfTheRows).style.display="none";
    document.getElementById("save_button_index_"+counterOfTheRows).style.display="inline-block";

    var username=document.getElementById("username_row_"+counterOfTheRows);
    var password=document.getElementById("password_row_"+counterOfTheRows);
    var name=document.getElementById("name_row_"+counterOfTheRows);
    var surname=document.getElementById("surname_row_"+counterOfTheRows);
    var gender=document.getElementById("gender_row_"+counterOfTheRows);
    var id=document.getElementById("id_row_"+counterOfTheRows);
    var telephone=document.getElementById("telephone_row_"+counterOfTheRows);
    var address=document.getElementById("address_row_"+counterOfTheRows);

    var username_data=username.innerHTML;
    var password_data=password.innerHTML;
    var name_data=name.innerHTML;
    var surname_data=surname.innerHTML;
    var gender_data=gender.innerHTML;
    var id_data = id.innerHTML;
    var telephone_data=telephone.innerHTML;
    var address_data=address.innerHTML;

    username.innerHTML="<input type='text'  class='form-control' id='username_text"+counterOfTheRows+"' value='"+username_data+"' disabled>";
    password.innerHTML="<input type='text' class='form-control'  id='password_text"+counterOfTheRows+"' value='"+"***********"+"'>";
    name.innerHTML="<input type='text' class='form-control'  id='name_text"+counterOfTheRows+"' value='"+name_data+"'>";
    surname.innerHTML="<input type='text' class='form-control'  id='surname_text"+counterOfTheRows+"' value='"+surname_data+"'>";
    gender.innerHTML="<input type='text' class='form-control' id='gender_text"+counterOfTheRows+"' value='"+gender_data+"'>";
    id.innerHTML="<input type='text' class='form-control'id='id_text"+counterOfTheRows+"' value='"+id_data+"'>";
    telephone.innerHTML="<input type='text' class='form-control' id='telephone_text"+counterOfTheRows+"' value='"+telephone_data+"'>";
    address.innerHTML="<input type='text' class='form-control' id='address_text"+counterOfTheRows+"' value='"+address_data+"'>";

}

function save_concrete_row(counterOfTheRows)
{
    console.log("save here");
    var username_val=document.getElementById("username_text"+counterOfTheRows).value;
    var password_val=document.getElementById("password_text"+counterOfTheRows).value;
    var name_val=document.getElementById("name_text"+counterOfTheRows).value;
    var surname_val=document.getElementById("surname_text"+counterOfTheRows).value;
    var gender_val=document.getElementById("gender_text"+counterOfTheRows).value;
    var id_val=document.getElementById("id_text"+counterOfTheRows).value;
    var telephone_val=document.getElementById("telephone_text"+counterOfTheRows).value;
    var address_val=document.getElementById("address_text"+counterOfTheRows).value;

    if(!username_val.match($regexForInputUsername)
        || !password_val.match($regexForInputPassword)
        || !name_val.match($regexForInputName)
        || !surname_val.match($regexForInputSurname)
        || !gender_val.match($regexForInputGender)
        || !id_val.match($regexForInputIdOfEmployee)
        || !telephone_val.match($regexForInputTelephone)
        || !address_val.match($regexForInputAddress)) {

        controlEmployeeInputs(username_val, password_val, name_val, surname_val, gender_val, id_val, telephone_val, address_val, counterOfTheRows);
    }
    else{

        $.ajax({
            url: "https://restaurant.memonil.com/register",
            headers:{
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "PUT",
            data: JSON.stringify(
                {   "username":   username_val,
                    "privileges":      2,
                    "name":  name_val,
                    "surname": surname_val,
                    "gender": gender_val,
                    "identification_number": id_val,
                    "telephone_number": telephone_val,
                    "address": address_val
                } ),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                console.log("PUT method");
                removeAlertText();
                removeAlertClasses();
            },
        });

        document.getElementById("username_row_"+counterOfTheRows).innerHTML=username_val;
        document.getElementById("password_row_"+counterOfTheRows).innerHTML="***********";
        document.getElementById("name_row_"+counterOfTheRows).innerHTML=name_val;
        document.getElementById("surname_row_"+counterOfTheRows).innerHTML=surname_val;
        document.getElementById("gender_row_"+counterOfTheRows).innerHTML=gender_val;
        document.getElementById("id_row_"+counterOfTheRows).innerHTML=id_val;
        document.getElementById("telephone_row_"+counterOfTheRows).innerHTML=telephone_val;
        document.getElementById("address_row_"+counterOfTheRows).innerHTML=address_val;

        document.getElementById("edit_button_index_"+counterOfTheRows).style.display="inline-block";
        document.getElementById("delete_button_index_"+counterOfTheRows).style.display="inline-block";
        document.getElementById("save_button_index_"+counterOfTheRows).style.display="none";
    }
}

function add_concrete_row()
{
    console.log("add here");
    var new_username=document.getElementById("new_username").value;
    var new_password=document.getElementById("new_password").value;
    var new_name=document.getElementById("new_name").value;
    var new_surname=document.getElementById("new_surname").value;
    var new_gender=document.getElementById("new_gender").value;
    var new_id=document.getElementById("new_id").value;
    var new_telephone=document.getElementById("new_telephone").value;
    var new_address=document.getElementById("new_address").value;

    // kontrola existujuceho usernameID
    for(var i = 0; i < $usernames.length; i++){
        console.log("array -> " +  $usernames[i]);
        if($usernames[i] === new_username){
            $('#badUsername').empty().append("Wrong username (already exists)" + '<br>');
            $('#badUsername').addClass("alert alert-danger text-danger font-weight-bold text-center");
            return;
        }
    }

    // TODO: kontrolnu funkciu pre spravnost inputov..
    console.log("this is new name -> " + new_name);
    if(!new_username.match($regexForInputUsername)
        || !new_password.match($regexForInputPassword)
        || !new_name.match($regexForInputName)
        || !new_surname.match($regexForInputSurname)
        || !new_gender.match($regexForInputGender)
        || !new_id.match($regexForInputIdOfEmployee)
        || !new_telephone.match($regexForInputTelephone)
        || !new_address.match($regexForInputAddress)) {

        controlEmployeeInputs(new_username, new_password, new_name, new_surname, new_gender, new_id, new_telephone, new_address, 0);
    }
    else{
        var table=document.getElementById("employeeTable");
        var table_len=(table.rows.length)-1;
        table.insertRow(table_len).outerHTML=
            "<tr id='row"+table_len+"'>" +
            "<td id='username_row_"+table_len+"'>"+new_username+"</td>" +
            "<td id='password_row_"+table_len+"'>"+"***********"+"</td>" +
            "<td id='name_row_"+table_len+"'>"+new_name+"</td>" +
            "<td id='surname_row_"+table_len+"'>"+new_surname+"</td>" +
            "<td id='gender_row_"+table_len+"'>"+new_gender+"</td>" +
            "<td id='id_row_"+table_len+"'>"+new_id+"</td>" +
            "<td id='telephone_row_"+table_len+"'>"+new_telephone+"</td>" +
            "<td id='address_row_"+table_len+"'>"+new_address+"</td>" +
            "<td>" +
            "<div id=first class='row justify-content-center'>" +
            "<input type='button' id='save_button_index_"+table_len+"' value='Save' class='save btn btn-green' onclick='save_concrete_row("+table_len+")'>" +
            "<i id='edit_button_index_"+table_len+"' style='font-size: 40px;color:teal;' class='fa fa-edit edit' aria-hidden='true' onclick='edit_concrete_row("+table_len+")'></i>" +
            "<i id='delete_button_index_"+table_len+"' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row("+table_len+")'></i>" +
            "</div>" +
            "</td>" +
            "</tr>";

        $.ajax({
            url: "https://restaurant.memonil.com/register",
            headers:{
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "POST",
            data: JSON.stringify(
                {   "username":   new_username,
                    "password":   new_password,
                    "privileges":      2,
                    "name":  new_name,
                    "surname": new_surname,
                    "gender": new_gender,
                    "identification_number": new_id,
                    "telephone_number": new_telephone,
                    "address": new_address
                } ),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                console.log("POST method");
                removeAlertText();
                removeAlertClasses();
            },
        });

        document.getElementById("new_username").value="";
        document.getElementById("new_password").value="";
        document.getElementById("new_name").value="";
        document.getElementById("new_surname").value="";
        document.getElementById("new_gender").value="";
        document.getElementById("new_id").value="";
        document.getElementById("new_telephone").value="";
        document.getElementById("new_address").value="";

        document.getElementById("edit_button_index_"+table_len).style.display="inline-block";
        document.getElementById("delete_button_index_"+table_len).style.display="inline-block";
        document.getElementById("save_button_index_"+table_len).style.display="none";
    }
}

function delete_concrete_row(counterOfTheRows)
{
    console.log("Rows -> " + counterOfTheRows);

    // vycistenie
    $('#responseMessageDeleteEmployee').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#responseMessageDeleteEmployee').empty();

    var username_val=document.getElementById("username_row_"+counterOfTheRows).innerHTML;
    // var password_val=document.getElementById("password_text"+counterOfTheRows).value;
    var name_val=document.getElementById("name_row_"+counterOfTheRows).innerHTML;
    var surname_val=document.getElementById("surname_row_"+counterOfTheRows).innerHTML;
    var gender_val=document.getElementById("gender_row_"+counterOfTheRows).innerHTML;
    var id_val=document.getElementById("id_row_"+counterOfTheRows).innerHTML;
    var telephone_val=document.getElementById("telephone_row_"+counterOfTheRows).innerHTML;
    var address_val=document.getElementById("address_row_"+counterOfTheRows).innerHTML;

    console.log("toto posielam" + "\n" +
        "U:" + username_val + "\n" +
        "N:" + name_val + "\n" +
        "S:" + surname_val + "\n" +
        "G:" + gender_val + "\n" +
        "ID:" + id_val + "\n" +
        "TEL:" + telephone_val + "\n" +
        "ADDR:" + address_val + "\n");

    $('#confirmDeleteModalYes').off().on('click',function(){
        $.ajax({
            url: "https://restaurant.memonil.com/register",
            headers:{
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "DELETE",
            data: JSON.stringify(
                {   "username":   username_val,
                    "privileges":      2,
                    "name":  name_val,
                    "surname": surname_val,
                    "gender": gender_val,
                    "identification_number": id_val,
                    "telephone_number": telephone_val,
                    "address": address_val
                } ),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                console.log("DELETE method");
                removeAlertText();
                removeAlertClasses();

                $('#responseMessageDeleteEmployee').addClass("alert alert-success text-success font-weight-bold text-center");
                $('#responseMessageDeleteEmployee').empty().append("Success");
                console.log("delete row");
                document.getElementById("row"+counterOfTheRows+"").outerHTML="";
                $('#confirmDeleteModal').data('hideInterval', setTimeout(function(){
                    $('#confirmDeleteModal').modal('hide');
                }, 1000));
            },
        });
    });

}

function controlEmployeeInputs(username, password, name, surname, gender, id, telephone, address, counterOfTheRows){
    removeAlertText(counterOfTheRows);
    removeAlertClasses(counterOfTheRows);

    console.log("Pocet riadkov -> " + counterOfTheRows );
    if(counterOfTheRows < 1){
        console.log("Counter < 1");
        if(!username.match($regexForInputUsername)){
            $('#badUsername').empty().append("Wrong username (at least 3 chars long)" + '<br>');
            $('#badUsername').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!password.match($regexForInputUsername)){
            $('#badPassword').empty().append("Wrong password (at least 3 chars long)" + '<br>');
            $('#badPassword').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!name.match($regexForInputName)){
            $('#badName').empty().append("Wrong name (at least 3 chars long)" + '<br>');
            $('#badName').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!surname.match($regexForInputSurname)){
            $('#badSurname').empty().append("Wrong surname (at least 3 chars long)" + '<br>');
            $('#badSurname').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!gender.match($regexForInputGender)){
            $('#badGender').empty().append("Wrong gender (male or female)" + '<br>');
            $('#badGender').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!id.match($regexForInputIdOfEmployee)){
            $('#badId').empty().append("Wrong id (at least 1 digits long)" + '<br>');
            $('#badId').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!telephone.match($regexForInputTelephone)){
            $('#badTelephone').empty().append("Wrong telephone (at least 3 digits long)" + '<br>');
            $('#badTelephone').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!address.match($regexForInputAddress)){
            $('#badAddress').empty().append("Wrong address (at least 3 chars long)" + '<br>');
            $('#badAddress').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
    }
    else{

        if(!username.match($regexForInputUsername)){
            $('#username_row_' + counterOfTheRows+'').append("<div " + "id='badUsername"+counterOfTheRows+"'>Wrong username (at least 3 chars long)</div>");
            $('#badUsername' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center")
        }
        if(!password.match($regexForInputUsername)){
            $('#password_row_' + counterOfTheRows+'').append("<div " + "id='badPassword"+counterOfTheRows+"'>Wrong password (at least 3 chars long)</div>");
            $('#badPassword' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!name.match($regexForInputName)){
            $('#name_row_' + counterOfTheRows+'').append("<div " + "id='badName"+counterOfTheRows+"'>Wrong name (at least 3 chars long)</div>");
            $('#badName' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!surname.match($regexForInputSurname)){
            $('#surname_row_' + counterOfTheRows+'').append("<div " + "id='badSurname"+counterOfTheRows+"'>Wrong surname (at least 3 chars long)</div>");
            $('#badSurname' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!gender.match($regexForInputGender)){
            $('#gender_row_' + counterOfTheRows+'').append("<div " + "id='badGender"+counterOfTheRows+"'>Wrong gender (male or female)</div>");
            $('#badGender' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!id.match($regexForInputIdOfEmployee)){
            $('#id_row_' + counterOfTheRows+'').append("<div " + "id='badId"+counterOfTheRows+"'>Wrong id (at least 1 digits long)</div>");
            $('#badId' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!telephone.match($regexForInputTelephone)){
            $('#telephone_row_' + counterOfTheRows+'').append("<div " + "id='badTelephone"+counterOfTheRows+"'>Wrong telephone (at least 3 digits long)</div>");
            $('#badTelephone' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!address.match($regexForInputAddress)){
            $('#address_row_' + counterOfTheRows+'').append("<div " + "id='badAddress"+counterOfTheRows+"'>Wrong address (at least 3 chars long)</div>");
            $('#badAddress' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }

    }

}

function removeAlertText(counterOfTheRows){
    // removing text
    // for first only
    $('#badUsername').empty();
    $('#badPassword').empty();
    $('#badName').empty();
    $('#badSurname').empty();
    $('#badGender').empty();
    $('#badId').empty();
    $('#badTelephone').empty();
    $('#badAddress').empty();
    if(counterOfTheRows > 0){
        $('#badUsername' + counterOfTheRows+'').remove();
        $('#badPassword' + counterOfTheRows+'').remove();
        $('#badName' + counterOfTheRows+'').remove();
        $('#badSurname' + counterOfTheRows+'').remove();
        $('#badGender' + counterOfTheRows+'').remove();
        $('#badId' + counterOfTheRows+'').remove();
        $('#badTelephone' + counterOfTheRows+'').remove();
        $('#badAddress' + counterOfTheRows+'').remove();
    }

}

function removeAlertClasses(counterOfTheRows){
    // removing alert classes
    $('#badUsername').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badPassword').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badName').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badSurname').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badGender').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badId').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badTelephone').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badAddress').removeClass("alert alert-success text-success font-weight-bold text-center");
    if(counterOfTheRows > 0){
        $('#badUsername' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badPassword' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badName' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badSurname' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badGender' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badId' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badTelephone' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badAddress' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
    }
}

$( document ).ready(function() {
    $.ajax({
        url: "https://restaurant.memonil.com/employees",
        type: "GET",
        headers:{
                    "Authorization": sessionStorage.getItem("jwtToken")
                },
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            // handle the response
            var JsonObject = JSON.parse(response);
            console.log(response);
            console.log("GET method");
            var rowFormatCounter = 0;
            for (var key in JsonObject) {
                var table=document.getElementById("employeeTable");
                var table_len=(table.rows.length)-1;
                table.insertRow(table_len).outerHTML=
                    "<tr id='row"+table_len+"'>" +
                    "<td id='username_row_"+table_len+"'>"+JsonObject[key].username+"</td>" +
                    "<td id='password_row_"+table_len+"'>"+"***********"+"</td>" +
                    "<td id='name_row_"+table_len+"'>"+JsonObject[key].name+"</td>" +
                    "<td id='surname_row_"+table_len+"'>"+JsonObject[key].surname+"</td>" +
                    "<td id='gender_row_"+table_len+"'>"+JsonObject[key].gender+"</td>" +
                    "<td id='id_row_"+table_len+"'>"+JsonObject[key].identification_number+"</td>" +
                    "<td id='telephone_row_"+table_len+"'>"+JsonObject[key].telephone_number+"</td>" +
                    "<td id='address_row_"+table_len+"'>"+JsonObject[key].address+"</td>" +
                    "<td>" +
                    "<div id='rowFormat_"+rowFormatCounter+"' class='row justify-content-center'>" +
                    "<input type='button' id='save_button_index_"+table_len+"' value='Save' class='save btn btn-green' onclick='save_concrete_row("+table_len+")'>" +
                    "<i id='edit_button_index_"+table_len+"' style='font-size: 40px;color:teal;' class='fa fa-edit edit' aria-hidden='true' onclick='edit_concrete_row("+table_len+")'></i>" +
                    "<i id='delete_button_index_"+table_len+"' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row("+table_len+")'></i>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";

                document.getElementById("edit_button_index_"+table_len).style.display="inline-block";
                document.getElementById("delete_button_index_"+table_len).style.display="inline-block";
                document.getElementById("save_button_index_"+table_len).style.display="none";

                // ulozim si taktiez vsetky username do sessionStorage...
                $usernames.push(JsonObject[key].username);
                rowFormatCounter++;
            }
        }
    });
});

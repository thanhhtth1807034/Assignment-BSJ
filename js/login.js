$('#btn-show-modal').click(function () {
    $('#loginModal').modal('show');
});
$('#btn-submit').click(function () {
    var _email = $('#loginInputEmail1').val();
    var _password = $('#loginInputPassword1').val();
    var loginInfor ={
        email: _email,
        password: _password,
    }
    $.ajax({
        type: 'POST',
        url: LOGIN_API,
        contentType: 'application/json',
        data : JSON.stringify(loginInfor),
        success: function (data, status, jqXhr) {
            localStorage.setItem('my-token', data.token);
            $('#loginModal').modal('hide');
            $('#msg-success').text('Login success');
            $('#msg-success').removeClass('d-none')
        },
        error: function (jqXhr, status, errorThrown) {
            alert('Login fails');
        }
    });
});
var validator = $('#loginForm').validate({
    rules: {
        password: {
            required: true,
            minlength: 3
        },
        'confirm-password':{
            equalTo :'[name = "password"]'
        },
        email: {
            required: true,
            email: true
        },
    },
    messages: {
        password: {
            required: 'Vui lòng nhập mật khẩu',
            minlength: 'mat khau qua ngan, Vui lòng nhập ít nhất {0} kí tự'
        },
        email: {
            required: "vui long nhap email",
            email: 'vui long nhap email dug dinh dang',
        },
        'confirm-password': {
            equalTo: 'pass khong giống nhau.'
        },
    },
    submitHandler: function (form, event) {
        event.preventDefault();
        var senderOject = {
            password: $(form["password"]).val(),
            email: $(form["email"]).val(),
        };
        $.ajax({
            url: LOGIN_API,
            type: 'POST',
            contentType: "application/json; charset = utf-8",
            data: JSON.stringify(senderOject),
            success: function (data, textStatus, jqXHR) {
                // alert('Success')
                console.log('Success');
                console.log(data);
                console.log('-----');
                console.log(data.responseText);
                console.log('-----');
                console.log(textStatus);
                console.log('-----');
                console.log(jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (Object.keys(jqXHR.responseJSON.error).length > 0) {
                    $('summary')
                        .text(`Please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
                    validator.showErrors(jqXHR.responseJSON.error);
                }
            }
        });
        return false;
    }
});
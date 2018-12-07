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
            alert('Login success!')
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
            minlength: 2
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
            required: 'Please enter password',
            minlength: 'Password is too short , please enter minimum {0} characters .'
        },
        email: {
            required: 'Please enter email.',
            email : 'Please enter true email.'
        },
        'confirm-password': {
            equalTo: 'pass not same.'
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
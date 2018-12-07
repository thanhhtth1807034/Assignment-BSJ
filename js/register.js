var validator = $('#registerForm').validate({
    rules:{
        firstName: {
            required: true,
            minlength: 5,
            maxlength: 15
        },
        lastName: {
            required: true,
            minlength: 2,
            maxlength: 15
        },
        email: {
            required:true,
            email: true
        },
        password:{
            required: true,
            minlength: 2,
        },
        // 'confirm-password':{
        //     equalTo: '[name = "password"]'
        // },
        phone: {
            required: true,
            maxlength: 10,
            minlength: 10,
            number: true
        },
        avatar: {
            required: true,
            url: true
        },
        address: {
            required: true,
            minlength: 2,

        },
    },
    messages:{
        firstName: {
            required: 'Please enter firstname  .',
            minlength: 'firstname is too short , please enter minimum {0} characters .',
            maxlength: 'firstname is too long , please enter maximum {0} characters .'
        },
        lastName: {
            required: 'vui lòng nhập họ .',
            minlength: 'lastname is too short , please enter minimum {0} characters.',
            maxlength: 'lastname is too long , please enter maximum {0} characters.'
        },
        email: {
            required: 'Please enter email.',
            email : 'Please enter true email.'
        },
        password: {
            required: 'Please enter password.',
            minlength: 'Password is too short , please enter minimum {0} characters .',
        },
        // 'confirm-password': {
        //     equalTo: 'password không giống nhau.'
        // },
        phone:{
            required: 'Please enter phone number.',
            maxlength: 'Please enter true {0} nummber',
            minlength: 'Please enter true {0} nummber',
            number: 'Please enter true phone nummber.'
        },
        avatar: {
            required: 'PLease enter avatar.',
            url: 'Please enter true URL'
        },
        address: {
            required: 'Please enter address.',
            minlength: 'Please enter true {0} characters ',

        }
    },
    submitHandler: function (form, event) {
        event.preventDefault();
        var senderOject = {
            firstName: $(form["firstName"]).val(),
            lastName: $(form["lastName"]).val(),
            password: $(form["password"]).val(),
            address : $(form["address"]).val(),
            phone: $(form["phone"]).val(),
            gender: $(form["gender"]).val(),
            email: $(form["email"]).val(),
            avatar: $(form["avatar"]).val(),
            birthday: $(form["birthday"]).val(),
        };
        $.ajax({
            url:REGISTER_API,
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
                alert('Dang ky thanh cong!');
            },
            error: function (jqXHR, textStatus, errorThrown) {

                if(jqXHR.responseJSON.error.size > 0) {
                    validator.showErrors({
                        firstName: 'Message error: ' + jqXHR.responseJSON.error.size
                    });
                } else  {
                    validator.showErrors({
                        email: 'Message error: ' + jqXHR.responseJSON.error.email
                    });
                }

                if (Object.keys(jqXHR.responseJSON.error).length > 0){
                    $('summary')
                        .text(`Please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
                    validator.showErrors(jqXHR.responseJSON.error);
                }
            }
        });
        return false;
    }
});

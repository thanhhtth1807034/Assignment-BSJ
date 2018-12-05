var validator = $('#createSong').validate({
    rules: {
        name: {
            required: true,
        },
        singer: {
            required: true
        },
        description: {
            required: true,
        },
        author: {
            required: true,
        },
        thumbnail: {
            required: true,
        },
        link: {
            required: true,
        },
    },
    messages: {
        name: {
            required: 'vui long nhap ten bai hat',
        },
        singer: {
            required: 'vui long nhap ten ca si',
        },
        description:{
            required: 'vui long nhap mo ta',
        },
        author: {
            required:'vui long nhap ten tac gia',
        },
        thumbnail: {
            required: 'vui long nhap thumbnail',
        },
        link: {
            required: 'vui long nhap link bai hat',
        },
    },
    submitHandler: function (form, event) {
        event.preventDefault();
        var senderOject = {
            name: $(form["name"]).val(),
            singer: $(form["singer"]).val(),
            description: $(form["description"]).val(),
            author : $(form["author"]).val(),
            thumbnail: $(form["thumbnail"]).val(),
            link : $(form["link"]).val(),
        };
        $.ajax({
            url:CREATE_SONG_API,
            type: 'POST',
            contentType: "application/json; charset = utf-8",
            Authorization: "Basic " + localStorage.getItem('my-token'),
            beforeSend: function (xhr) {
                / Authorization header /
                xhr.setRequestHeader("Authorization", "Basic " +localStorage.getItem('my-token'));
            },
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
                alert(`Lưu thành công bài hát ${data.name}`);
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
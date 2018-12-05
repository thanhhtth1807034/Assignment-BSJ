// var xmlHttpRequest = new XMLHttpRequest();
// xmlHttpRequest.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//         var listSong = JSON.parse(this.responseText);
//         var content = '';
//         for (var i = 0; i < listSong.length; i++) {
//             content += '<div class="song-item">';
//             content += '<div>';
//             content += '<div class="song-index">' + (i + 1) + '</div>';
//             content += '<div class="song-thumbnail">';
//             content += '<img src="' + listSong[i].thumbnail + '" alt="">';
//             content += '</div>';
//             content += '<div class="song-infor">';
//             content += '<div class="song-name">' + listSong[i].name + '</div>';
//             content += '<div class="song-singer">' + listSong[i].singer + '</div>';
//             content += '</div>';
//             content += '</div>';
//             content += '<div class="song-control d-flex justify-content-center w-100" onclick="playSong(\'' + listSong[i].link + '\', \'' + listSong[i].name + '\', \'' + listSong[i].singer + '\', \'' +listSong[i].thumbnail+'\')">' +
//                 '<a href="#"><i class="fas fa-backward fa-2x" aria-hidden="true"></i></a>'+
//                 '<a href="#"><i class="fas fa-play-circle fa-2x" aria-hidden="true"></i></a>'+
//                 '<a href="#"><i class="fas fa-forward fa-2x" aria-hidden="true"></i></a>'+
//                 '</div>';
//             content += '</div>';
//         }
//         document.getElementById('list-song').innerHTML = content;
//     }
// }
// xmlHttpRequest.open('GET', MY_SONG_API, true);
// xmlHttpRequest.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('my-token'));
// xmlHttpRequest.send();
//
// function playSong(link, name, singer, thumbnail) {
//     document.getElementById('player').src = link;
//     document.getElementById('current-play-title').innerHTML = 'Current playing: ' + name + " - " + singer;
//     $('#scroll').attr("src",thumbnail)
// }
$.ajax({
    url: MY_SONG_API,
    type: 'GET',
    contentType: "application/json; charset = utf-8",
    Authorization: "Basic " + localStorage.getItem('my-token'),
    beforeSend: function (xhr) {

        xhr.setRequestHeader("Authorization", "Basic " +localStorage.getItem('my-token'));
    },
    // data: JSON.stringify(senderOject),
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

        var content = '';
        for (var i = 0; i < data.length; i++) {
            content += '<div class="song-item col-md-3 p-0">';
            content += '<div class=" bg-dark m-3 p-2 rounded">';
            content += '<div class="song-index position-absolute p-2">' + (i + 1) + '</div>';
            content += '<div class="song-thumbnail w-100" onclick="playSong(\'' + data[i].link + '\', \'' + data[i].name + '\', \'' + data[i].singer + '\', \'' +data[i].thumbnail+'\')">';
            content += '<img class="w-100" src="' + data[i].thumbnail + '" alt="">';
            content += '</div>';
            content += '<div class="song-infor d-flex align-items-center">';
            content += '<div class="song-control p-2" onclick="playSong(\'' + data[i].link + '\', \'' + data[i].name + '\', \'' + data[i].singer + '\', \'' +data[i].thumbnail+'\')">' +
                '<a href="#"><i class="fas fa-play-circle fa-2x" aria-hidden="true"></i></a>'+
                '</div>';
            content += '<div>'
            content += '<div class="song-name">' + data[i].name + '</div>';
            content += '<div class="song-singer">' + data[i].singer + '</div>';
            content += '</div>';
            content += '</div>';
            content += '</div>';
            content += '</div>';
            $('#list-song').html(content);
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        if (Object.keys(jqXHR.responseJSON.error).length > 0) {
            $('summary')
                .text(`Please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
            validator.showErrors(jqXHR.responseJSON.error);
        }
    }
});
function playSong(link, name, singer, thumbnail) {
    $('#player').attr("src", link);
    $('#current-play-title').text('Current:' + name + " - " + singer);
    $('#scroll').attr("src", thumbnail)
}

function calculateTotalValue(length) {
    var minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ':' + seconds

    return time;
}

function calculateCurrentValue(currentTime) {
    var current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
}

function initProgressBar() {
    var player = document.getElementById('player');
    var length = player.duration
    var current_time = player.currentTime;

    var totalLength = calculateTotalValue(length)
    $(".end-time").html(totalLength);

    var currentTime = calculateCurrentValue(current_time);
    $(".start-time").html(currentTime);

    var progressbar = document.getElementById('seekObj');
    progressbar.value = (player.currentTime / player.duration);
    progressbar.addEventListener("click", seek);

    if (player.currentTime === player.duration) {
        $('#play-btn').removeClass('pause');
    }

    function seek(evt) {
        var percent = evt.offsetX / this.offsetWidth;
        player.currentTime = percent * player.duration;
        progressbar.value = percent / 100;
    }
};

function initPlayers(num) {
    for (var i = 0; i < num; i++) {
        (function() {
            var playerContainer = document.getElementById('player-container'),
                player = document.getElementById('player'),
                isPlaying = false,
                playBtn = document.getElementById('play-btn');
            if (playBtn != null) {
                playBtn.addEventListener('click', function() {
                    togglePlay()
                });
            }
            function togglePlay() {
                if (player.paused === false) {
                    player.pause();
                    isPlaying = false;
                    $('#play-btn').removeClass('pause');

                } else {
                    player.play();
                    $('#play-btn').addClass('pause');
                    isPlaying = true;
                }
            }
        }());
    }
}
initPlayers(jQuery('#player-container').length);

$(function(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) $('#topControl').fadeIn();
        else $('#topControl').fadeOut();
    });
    $('#topControl').click(function () {
        $('body,html').animate({scrollTop: 0}, 'slow');
    });
});
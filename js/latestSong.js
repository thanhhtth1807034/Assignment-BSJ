var MY_API = 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-free-songs';
document.addEventListener('DOMContentLoaded', function () {
    loadSongs();
});

function loadSongs() {
    $.ajax({
        url: MY_API,
        type: 'GET',
        contentType: "application/json; charset = utf-8",
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
                content += '<img id="img" class="w-100" src="' + data[i].thumbnail + '" alt="">';
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
            // alert('Error')
            console.log('error');
            console.log(jqXHR);
            console.log('-----');
            console.log(jqXHR.responseText);
            console.log('-----');
            console.log(jqXHR.responseJSON.error);
            console.log('-----');
            console.log(textStatus);
            console.log('-----');
            console.log(errorThrown);
        },
    });
};
// function songPlay(link, name, singer, thumbnail) {
//     $('#img').attr("src",link);
// }
function playSong(link, name, singer, thumbnail) {
    $('#player').attr("src", link);
    $('#current-play-title').text('Current:' + name + " - " + singer);
    $('#scroll').attr("src",thumbnail)
// document.getElementById('my-mp3').src = link;
// document.getElementById('current-play-title').innerHTML = 'Current playing: ' + name + " - " + singer;
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
    var length = player.duration;
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
                    $('#play-btn').removeClass('pause');
                    document.getElementById('scroll').classList.remove('spin');
                    $('#play-btn').attr('src', url('http://www.lukeduncan.me/images/play-button.png'));
                    isPlaying = false;

                } else {
                    player.play();
                    $('#play-btn').addClass('pause');
                    document.getElementById('scroll').classList.add('spin');
                    $('#play-btn').attr('src', url('http://www.lukeduncan.me/images/pause-button.png'));
                    isPlaying = true;
                }
            }
        }());
    }
}
initPlayers($('#player-container').length);

// var player = document.getElementById('play-btn');
// function playOrPause() {
//     if (player.paused){
//         player.play();
//
//             document.getElementById('scroll').classList.remove('spin');
//     } else {
//         player.pause();
//             document.getElementById('scroll').classList.remove('spin');
//     }
// }
$(function(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) $('#topControl').fadeIn();
        else $('#topControl').fadeOut();
    });
    $('#topControl').click(function () {
        $('body,html').animate({scrollTop: 0}, 'slow');
    });
});
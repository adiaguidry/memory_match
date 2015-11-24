var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var reset_counter = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var accuracy_percent = (Math.floor((accuracy) * 100));
var cards = 18;
var difficulty = 'easy';
var i = 0;
var j = 0;
var counter = 0;
var generate_bubbles = null;

function make_bubble() {
    var bubble_array = ['bubble1', 'bubble2', 'bubble3', 'bubble4', 'bubble5', 'bubble6', 'bubble7', 'bubble8', 'bubble9', 'bubble10'];
    var bubble_size = ['sm_bubble', 'md_bubble', 'big_bubble', 'biggest', 'sm_bubble', 'md_bubble'];
    var new_bubble = $('<img>').attr('src', 'images/bubble.png').addClass('bubbles');
    new_bubble.addClass(bubble_array[i]);
    new_bubble.addClass(bubble_size[j]);
    $('.all_bubbles').append(new_bubble);
    i++;
    j++;
    counter++;
    if (i == bubble_array.length && (j)) {
        i = 0;
    }
    if (j == bubble_size.length) {
        j = 0;
    }
}

function check_counter() {
    var message = $('#message');
    console.log(counter);
    var bubble_container = $('.all_bubbles');
    switch (attempts) {
        case 3:
            $(bubble_container).show();
            generate_bubbles = setInterval(make_bubble, 200);
            audio_clip($('#bubbles'));
            break;
        case 4:
            $(message).text('Oh No! Bruce is getting hungry');
            generate_bubbles = null;
            break;
        case 6:
            $(message).text("If you don't match the next cards Bruce will eat us all!");
            $(bubble_container).hide();
            break;
        case 7:
            $(message).text('AAaaaahh! Click reset to play again.');
            audio_clip($('#intervention'));
            $('#game-area').css('visibility', 'hidden');
            $('html').addClass('end');
            $('#shark').removeClass('sharkBody').addClass('sharkBody_end');
            counter = null;
            break;
    }
    console.log('this is the interval ', generate_bubbles);
}

function card_creation(front_img_src, bootstrap_card_size) {

    var front_img = $('<img>').attr('src', front_img_src).addClass('cards');
    var back_img = $('<img>').attr('src', 'images/darla.jpg').addClass('cards');
    var div_back = $('<div>').addClass('back').append(back_img).attr('onclick', 'cardClick(this)');
    var div_front = $('<div>').addClass('front').append(front_img);
    var div_card = $('<div>').addClass(bootstrap_card_size + ' card bottom_row');
    $(div_back).append(back_img);
    $(div_front).append(front_img);
    $(div_card).append(div_front, div_back);
    $('#game-area').append(div_card);
}

//loops through card creation until there are 18 cards
function board_creation() {
    var front_image_source = ['images/lilturtle.jpg',
        'images/darl.png',
        'images/dory.jpg',
        'http://showbizgeek.com/wp-content/uploads/2013/04/Screen-Shot-2013-04-29-at-18.45.30.png',
        'https://s-media-cache-ak0.pinimg.com/originals/1c/0c/70/1c0c70c869e98cd5c9ad0fd68410a5ff.jpg',
        'http://static.tumblr.com/jrqkomz/hOxmf1y09/finding_nemo.jpg',
        'https://s-media-cache-ak0.pinimg.com/236x/a9/3f/11/a93f11b692924f7dc50b095c70aa9d7a.jpg',
        'http://media.coveringmedia.com/media/images/movies/2012/09/09/nemo_02cf.jpg',
        'http://mobileanimalbackgrounds.com/img/shark/finding-nemo-nemo-dory-a-shark.jpg'];
    switch (difficulty) {
        case "easy":
            var card_front_img_random = front_image_source.slice(0, 4);
            card_front_img_random = card_front_img_random.concat(card_front_img_random);
            cards = 8;
            total_possible_matches = 4;
            var card_size = 'col-md-3';
            break;
        case "medium":
            var card_front_img_random = front_image_source.slice(0, 6);
            card_front_img_random = card_front_img_random.concat(card_front_img_random);
            cards = 12;
            total_possible_matches = 6;
            var card_size = 'col-md-3';
            break;
        case 'hard':
            var card_front_img_random = front_image_source;
            card_front_img_random = card_front_img_random.concat(card_front_img_random);
            cards = 18;
            total_possible_matches = 9;
            var card_size = 'col-md-2';
            break;
    }
    var i = 0;
//generate random img index assign it to front img
    while (i < cards) {
        var front = Math.floor(Math.random() * (card_front_img_random.length));
        card_creation(card_front_img_random[front], card_size);
        i++;
        card_front_img_random.splice(front, 1);
    }
}
//runs board creation
board_creation();
function difficulty_level(level) {
    difficulty = level;
    reset();
}

function cardClick(element) {
    var front_img = $(element).parent().find('.front');
    //hides back of card
    var back = $(element);
    $(back).hide();
    //if cards are already matched wont record as matched again
    if (front_img.hasClass('match')) {
        return;
    }
    //checks if its first card if true stores src in first_card_clicked
    if (first_card_clicked == null) {
        //stores first_card_clicked var with src
        first_card_clicked = $(element).parent().find('.front');
    }
    else {
        // stores src in second_card_clicked var
        second_card_clicked = $(element).parent().find('.front');
        //check if we have a match
        if (first_card_clicked.find('img').attr('src') == second_card_clicked.find('img').attr('src')) {
            $(first_card_clicked).find('img').addClass('match');
            $(second_card_clicked).find('img').addClass('match');
            var sound_clip = first_card_clicked.find('img').attr('src');
            switch (sound_clip) {
                case'images/darl.png':
                    audio_clip($('#darla'));
                    $('.back').css('opacity', '.4');
                    setTimeout(function () {
                        $('.back').css('opacity', '1');
                    }, 1000);
                    break;
                case'images/dory.jpg':
                    audio_clip($('#dory'));
                    break;
            }
            //set global var back to null
            first_card_clicked = null;
            second_card_clicked = null;

            //increase match counter
            match_counter++;
            display_stats();
            if (match_counter == total_possible_matches) {
                console.log('won');
                $('.won').text('You Won!! Play again?');
                $('all_bubbles').hide();
            }
        }
        else{

            var reset_card_1 = $(first_card_clicked).parent().find('.back');
            var reset_card_2 = $(second_card_clicked).parent().find('.back');
            $(reset_card_1).show(1000);
            $(reset_card_2).show(1000);
            first_card_clicked = null;
            second_card_clicked = null;
            attempts++;
            display_stats();
            setTimeout(function(){
                check_counter();
            },1000);
        } //Cards did not match rest back to show and set global var to null

    }
}
function audio_clip(sound) {
    console.log(sound);
    var clip = sound;
    $(clip)[0].volume = 0.5;
    $(clip)[0].load();
    $(clip)[0].play();
}

$(document).ready(function () {
    audio_clip($('#hello'));
});

function reset() {
    audio_clip('#bruce');
    reset_counter++;
    games_played++;
    $('.games_played_value').empty().append(games_played);
    $('.match').removeClass('match');
    $('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
    reset_stats();
    $('#game-area').html('');
    $('#message').text('');
    $('all_bubbles').hide();
    $('#game-area').css('visibility', 'visible');
    $('html').removeClass('end');
    $('#shark').addClass('sharkBody').removeClass('sharkBody_end');
    counter = 0;
    generate_bubbles = null;
    board_creation();
}

function display_stats() {
    accuracy = match_counter / attempts;
    var accuracy_percent = (Math.floor((accuracy) * 100));
    $('.games_played_value').empty().append(games_played);
    $('.attempts_value').empty().append(attempts);
    $('.accuracy_value').empty().append(accuracy_percent + "%");

}

function reset_stats() {
    match_counter = 0;
    reset_counter = 0;
    attempts = 0;
    accuracy = 0;
    $('.attempts_value').empty().append(attempts);
    $('.accuracy_value').empty().append(accuracy_percent + "%");

}


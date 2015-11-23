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
var time = 700;
var i =0;
var j =0;
var counter =0;

function make_bubble(){
    var bubble_array =['bubble1', 'bubble2', 'bubble3', 'bubble4', 'bubble5', 'bubble6', 'bubble7','bubble8', 'bubble9','bubble10'];
    var bubble_size = ['sm_bubble','md_bubble', 'big_bubble', 'biggest'];
    var new_bubble = $('<img>').attr('src', 'images/bubble.png').addClass('bubbles');
    new_bubble.addClass(bubble_array[i]);
    new_bubble.addClass(bubble_size[j]);
    $('.all_bubbles').append(new_bubble);
    i++;
    j++;
    counter++;
    console.log(counter);
    if(i == bubble_array.length){
        i =0;
    }
    if(j == bubble_size.length){
        j =0;
    }
    if(counter === 400){
        setInterval(make_bubble, 100);
        console.log(counter, time ,"more bubbles");
    }
    if(counter === 440){
        console.log(counter);
        bubble_clip();

    }
    if(counter === 520){
        console.log("we are here", counter);
        $('#message').text('Oh No! Bruce is getting hungry');
        $('.bubbles').css('display', 'none');
        $('.all_bubbles').remove();
    }
    if(counter === 570) {
        $('#message').text('Too Late!');
        $('#game-area').css('visibility', 'hidden');
        $('html').addClass('end');
        $('#shark').removeClass('sharkBody').addClass('sharkBody_end');
        $('.all_bubbles').remove();
    }

}


function card_creation(front_img_src, bootstrap_card_size) {

//generate random img index assign it to front img

//dom creation
    var front_img = $('<img>').attr('src', front_img_src).addClass('cards');
    var back_img = $('<img>').attr('src', 'images/darla.jpg').addClass('cards');
    var div_back = $('<div>').addClass('back').append(back_img).attr('onclick', 'cardClick(this)');
    var div_front = $('<div>').addClass('front').append(front_img);
    var div_card = $('<div>').addClass(bootstrap_card_size + ' card bottom_row');
    $(div_back).append(back_img);
    $(div_front).append(front_img);
    $(div_card).append(div_front, div_back);
    $('#game-area').append(div_card);

//splices img index from array in order for there to be no more than the matching pair on board

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
            //do easy game here
            var card_front_img_random = front_image_source.slice(0, 4);
            card_front_img_random = card_front_img_random.concat(card_front_img_random);
            cards = 8;
            total_possible_matches = 4;
            var card_size = 'col-md-3';
            break;
        case "medium":
            //meduim game
            var card_front_img_random = front_image_source.slice(0, 6);
            card_front_img_random = card_front_img_random.concat(card_front_img_random);
            cards = 12;
            total_possible_matches = 6;
            var card_size = 'col-md-3';
            break;
        case 'hard':
            //hard game
            var card_front_img_random = front_image_source;
            card_front_img_random = card_front_img_random.concat(card_front_img_random);
            cards = 18;
            total_possible_matches = 9;
            var card_size = 'col-md-2';
            break;
    }
    var i = 0;

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
        attempts++;

        //check if we have a match
        if (first_card_clicked.find('img').attr('src') == second_card_clicked.find('img').attr('src')) {
            $(first_card_clicked).find('img').addClass('match');
            $(second_card_clicked).find('img').addClass('match');
            var sound_clip = first_card_clicked.find('img').attr('src');
            switch(sound_clip){
                case'images/darl.png':
                    darla_clip();
                    break;
                case'images/dory.png':
                    dory_clip();
                    break;
            }
            //set global var back to null
            first_card_clicked = null;
            second_card_clicked = null;

            //increase match counter
            match_counter++;
            display_stats();
            if (match_counter == total_possible_matches) {
                $('#win').css('visibility', 'visible');
                $('.play_again').css('visibility', 'visible');
            }
        }
        //Cards did not match rest back to show and set global var to null
        else {
            var reset_card_1 = $(first_card_clicked).parent().find('.back');
            var reset_card_2 = $(second_card_clicked).parent().find('.back');
            $(reset_card_1).show(1000);
            $(reset_card_2).show(1000);
            first_card_clicked = null;
            second_card_clicked = null;
        }
    }
}
function bubble_clip() {
    var bubbles = $('#bubbles');
    $(bubbles)[0].volume = 0.5;
    $(bubbles)[0].load();
    $(bubbles)[0].play();
}
function dory_clip() {
    var dory = $('#dory');
    $(dory)[0].volume = 0.5;
    $(dory)[0].load();
    $(dory)[0].play();
}
function darla_clip() {
    var darla = $('#darla');
    $(darla)[0].volume = 0.5;
    $(darla)[0].load();
    $(darla)[0].play();
    $('.back').css('opacity', '.5');
    setTimeout(function(){  $('.back').css('opacity', '1');
    }, 1000);
}


$('.play').on('click', function () {
    bubble_clip();
});
$(document).ready(function () {
    setInterval(make_bubble, 700);
});


function reset() {
    reset_counter++;
    games_played++;
    $('.games_played_value').empty().append(games_played);
    $('.match').removeClass('match');
    $('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
    $('#win').css('visibility', 'hidden');
    $('.play_again').css('visibility', 'hidden');
    reset_stats();
    $('#game-area').html('');
    $('#message').text('');
    $('#game-area').css('visibility', 'visible');
    $('html').removeClass('end');
    $('#shark').addClass('sharkBody').removeClass('sharkBody_end');
    //$('.all_bubbles').css(di);
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


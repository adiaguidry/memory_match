var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;




function cardClick (element) {
    //hides back of card
    var back = $(element).find('.back');
    $(back).hide()
    var front_img = $(element).find('.front').find('img').attr('src');
    console.log(front_img);

    //checks if its first card if true stores src in first_card_clicked
    if(first_card_clicked == null) {
        //stores first_card_clicked var with src
        first_card_clicked = $(element);
    }
    else{
        // stores src in second_card_clicked var
        second_card_clicked = $(element);

        //check if we have a match
        if(first_card_clicked.find('.front').find('img').attr('src') == second_card_clicked.find('.front').find('img').attr('src')){
            $(first_card_clicked).find('.front').addClass('match');
            $(second_card_clicked).find('.front').addClass('match');
            console.log('first set ', first_card_clicked.find('.front').find('img').attr('src'), second_card_clicked.find('.front').find('img').attr('src'));
            //set global var back to null
            first_card_clicked = null;
            second_card_clicked = null;
            
            //increase match counter 
            match_counter ++;
            if(match_counter == 9){
                $('#win').css('visibility', 'visible');
            }

           
        }
         //Cards did not match rest back to show and set global var to null
        else {
            var reset_card_1 = $(first_card_clicked).find('.back');
            var reset_card_2 = $(second_card_clicked).find('.back');
            $(reset_card_1).show(1000);
            $(reset_card_2).show(1000);

            first_card_clicked = null;
            second_card_clicked = null;
            console.log('second set ', first_card_clicked, second_card_clicked);

        }

    }
}







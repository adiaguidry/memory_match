var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;




function cardClick (element) {
    //hides back of card
    $(element).addClass('hide');

    //checks if its first card if true stores src in first_card_clicked
    if(first_card_clicked == null) {
        //stores first_card_clicked var with src
         first_card_clicked = $(element).prev().find("img");
       }
    else{
        // stores src in second_card_clicked var
        second_card_clicked = $(element).prev().find("img");
        //check if we have a match
             if(first_card_clicked.attr('src') == second_card_clicked.attr('src')){
                 $(first_card_clicked).addClass('match');
                 $(second_card_clicked).addClass('match');
                 console.log('first set ', first_card_clicked, second_card_clicked);

                 first_card_clicked = null;
                 second_card_clicked = null;
                 match_counter ++;
                     if(match_counter == 9){
                         $('#win').css('visibility', 'visible');
                     }

                 console.log(match_counter);
                }
            else{
                 first_card_clicked = null;
                 second_card_clicked = null;
                console.log('second set ', first_card_clicked, second_card_clicked);
             }
        }
}






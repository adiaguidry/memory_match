function cardClick(element) {
    //wont all third card clicked unless first_card_clicked and second_card_clicked are set to null
    /*if ((first_card_clicked != null) && (second_card_clicked != null)) {
     console.log(first_card_clicked, second_card_clicked);
     return;
     }*/

    //hides back of card on click
    var back = $(element).find('.back');
    var front_1 = $(element).find('.front');
    var card_1_img = $(front_1).attr('img');
    console.log(card_1_img);
    $(back).hide();
    //checks if it's the first card, if true store src in first_card_clicked
    if (first_card_clicked == null) {
        //stores first_card_clicked var with src
        first_card_clicked = $(element);
        //var first_card_src = $(first_card_clicked).('front').attr('img');
        //console.log("this is the ", first_card_clicked);
    }
    else {
        // stores src in second_card_clicked var
        second_card_clicked = $(element);

        //check if we have a match

        if (first_card_src == second_card_clicked.find('.front').attr('src')) {
            //add class match to cards that match
            $(first_card_clicked).addClass('match');
            $(second_card_clicked).addClass('match');
            // $(back).addClass('match_hide');

            console.log("this is the parent " + first_parent);

            //If there is a match add this class to the back of all the matched cards so it stays hidden

            //reset global var
            first_card_clicked = null;
            second_card_clicked = null;
            //add counter of matches
            match_counter++;
            //if match counter and total possible is equal you win
            if (match_counter == total_possible_matches) {
                $('#win').css('visibility', 'visible');
            }


        }
        //After no match was found remove the hide class
        else {
            console.log("this is the " + back);
            var reset_card_1 = $(first_card_clicked).find('back');
            var reset_card_2 = $(second_card_clicked).find('.back');
            $(reset_card_1).show(1000);
            $(reset_card_2).show(1000);

            first_card_clicked = null;
            second_card_clicked = null;
            console.log('second set ', first_card_clicked, second_card_clicked);

        }

    }

}


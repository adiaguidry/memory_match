var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

$('.card').click(function(){

      $(this).find('.back').css('visibility', 'hidden');

       var first_card_clicked = $(this).find('.front');

        if(first_card_clicked != null) {

            $('.card').click(function(){
                $(this).find('.back').css('visibility', 'hidden');
                var second_card_clicked = $(this).find('.front');

            });

         if(first_card_clicked != null && second_card_clicked != null)  {
             $('.card').click(function(){
                 alert('nope');
             })
         }



    }


});

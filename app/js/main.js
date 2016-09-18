"use strict";

jQuery(document).ready(function($) {

  $( ".courses-item-action input[type=checkbox]" ).change(function() {
    var numberOfCourseItems = $( ".courses-item:visible" ).length

    $(this).parent().parent().addClass("course-checked").parent().delay(1000).fadeOut();
    numberOfCourseItems--;

    if (!numberOfCourseItems) {
      setTimeout(function (){
        $( ".courses" ).children().remove();
        $( ".courses" ).append('<div class="success-item-wrapper"><h1 class="success-item">Задание выполнено</h1></div>');
      },1000);
    }
  });

});

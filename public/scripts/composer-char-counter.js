
// Count & display number of characters remaining
$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let remainingCharacters = 140 - $(this).val().length;
    let $counter = $(this).siblings().children(".counter");
    $counter.val(remainingCharacters);

    //If the remaining character count is less than zero, change the font to red
    if (remainingCharacters < 0) {
      $counter.addClass('negative-color');
    } else {
      $counter.removeClass('negative-color');
    }
  });
});
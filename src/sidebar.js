jQuery(function($) {
    var $bodyEl = $('body'),
        $sidedrawerEl = $('#sidedrawer');
  
  
    function showSidedrawer() {
      // show overlay
      var options = {
        onclose: function() {
          $sidedrawerEl
            .removeClass('active')
            .appendTo(document.body);
        }
      };
  
      var $overlayEl = $(mui.overlay('on', options));
  
      // show element
      $sidedrawerEl.appendTo($overlayEl);
      setTimeout(function() {
        $sidedrawerEl.addClass('active');
      }, 20);
    }
  
  
    function hideSidedrawer() {
      $bodyEl.toggleClass('hide-sidedrawer');
    }
  
  
    $('.js-show-sidedrawer').on('click', showSidedrawer);
    $('.js-hide-sidedrawer').on('click', hideSidedrawer);
  });
























//   {
//     "model": "Nissan",
//     "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUbe3UuX6dN_76ZS_rjrIrvgcYipPp-LTVhg&usqp=CAU",
//     "price": "15000",
//     "milage": "10200",
//     "city": "Abovyan",
//     "tel": "2143534523",
//     "year": "2010"

// }
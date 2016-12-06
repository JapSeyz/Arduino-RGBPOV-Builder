$(document).ready(function(){

    makeCircle();

    // If a cookie has been set with data
    // Load the data and delete the Cookie
    if($.cookie('data')){
        $('.load-area').val($.cookie('data'));
        $.removeCookie('data'); // => true

        setTimeout(function(){
            $('.load').trigger('click');
        }, 500);
    }

    // While holding down the mouse and hovering over an
    // LED block, change it to the next color in the rotation
    $(document).mousedown(function() {
        $(".led").bind('mouseover',function(){
          changeLED($(this));
      });
    })
    .mouseup(function() {
        $(".led").unbind('mouseover');
    });
    $('.led').mousedown(function() {
     changeLED($(this));
 });

    $('.generate').on('click', generate);
    $('.load').on('click', load);
});

function changeLED(that){
    switch(that.attr('data-color')){
        case 'red':
        that.attr('data-color', 'green');
        break;

        case 'green':
        that.attr('data-color', 'blue');
        break;

        case 'blue':
        that.attr('data-color', 'black');
        break;

        default:
        that.attr('data-color', 'red');
        break;
    }
};


// Mutate the Image into an C-style Byte-string
function generate(){

    // The Canvas Columns
    var columns = $('.column');

    // Data holder
    var data = [];

    // Initialize Variables
    var leds, cloumn;

    // Loop over all the Columns
    $.each(columns, function(index, element){
        // Start the Byte
        column = '{';
        leds = $(element).find('.led');

        // Loop over the LEDs
        $.each(leds, function(key, led){
            led = $(led);

            switch(led.attr('data-color')){
                case 'red':
                    column += "{0,1,0}";
                    break;
                case 'green':
                    column += "{0,0,1}";
                    break;
                case 'blue':
                    column += "{1,0,0}";
                    break;
                default:
                    column += "{0,0,0}";
                    break;
            }

                // Add a comma seperator
                if(typeof leds[key+1] !== 'undefined'){
                    column += ',';
                }
            });

        column += '},\n';
        data[index] = column;
    });

    $('.output').html(data);
}

function load(){
    // The Canvas Columns
    var columns = $('.column');

    // Data to Parse
    var data = $('.load-area').val().replace(/\r?\n|\r/g, '');

    // Initialize Variables
    var leds, domLed;
    var hasCheckedSize = false;

    // Split the data into Columns
    data = data.split(/,{{/g);

    // Loop over the Columns in the DOM
    $.each(columns, function(index, element){

        // Split the LEDs into it's own array
        var column = data[index];
        leds = column.replace(/{{|}},?/g, '').split(/},{/g);
        
        // Loop over all the LEDs
        $.each(leds, function(key, led){

            // Make sure the size of the canvas matches
            // that of the Data-to-parse
            if(!hasCheckedSize){
                hasCheckedSize = true;

                // Validate the size of the 2x2 arrays
                if(columns.length !== data.length || leds.length != $($(element).find('.led')).length) {
                    // Save the Data in a Cookie before the reload
                    $.cookie('data', $('.load-area').val());

                    // Reload the page with the proper parameters
                    window.location = '/?columns='+data.length+'&leds='+leds.length
                }
            }

            // Get the DOM Led in Question
            domLed = $($(element).find('.led:nth-child('+(key+1)+')'));

            // Give the LEd the correct color
            switch(led){
                case '0,1,0':
                    domLed.attr('data-color', 'red');
                    break;
                case '0,0,1':
                    domLed.attr('data-color', 'green');
                    break;
                case '1,0,0':
                    domLed.attr('data-color', 'blue');
                    break;
                default:
                    domLed.attr('data-color', 'black');
                    break;
            }
        });
    });
}

function makeCircle(){
    var $columns = $('.column');
    $.each($columns, function(index, column){
        $(column).css({
            "padding-top": (5*$columns.length)+'px',
            "transform-origin": "0 0",
            transform: "rotate("+(360/$columns.length * index)+"deg)",
        });

    });
}
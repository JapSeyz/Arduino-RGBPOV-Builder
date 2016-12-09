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

    $('.output').on('click', function(){
        SelectText('output');
    });
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
            that.attr('data-color', 'magenta');
            break;
         case 'magenta':
            that.attr('data-color', 'cyan');
            break;
         case 'cyan':
            that.attr('data-color', 'yellow');
            break;
         case 'yellow':
            that.attr('data-color', 'white');
            break;
        case 'white':
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
        column = '\"';
        leds = $(element).find('.led');

        // Loop over the LEDs
        $.each(leds, function(key, led){
            led = $(led);

            switch(led.attr('data-color')){
                case 'red':
                    column += "010";
                    break;
                case 'green':
                    column += "001";
                    break;
                case 'blue':
                    column += "100";
                    break;
                case 'magenta':
                    column += "110";
                    break;
                case 'cyan':
                    column += "101";
                    break;
                case 'yellow':
                    column += "011";
                    break;
                case 'white':
                    column += "111";
                    break;
                default:
                    column += "000";
                    break;
            }
            });

        column += '\",\n';
        data[index] = column;
    });

    $('.output').html(data);
}

function load(){
    // The Canvas Columns
    var columns = $('.column');

    // Data to Parse
    var data = $('.load-area').val().replace(/\r?\n|\r|\"|,$/g, '');

    // Initialize Variables
    var leds, domLed;
    var hasCheckedSize = false;

    // Split the data into Columns
    data = data.split(/,/g);

    // Loop over the Columns in the DOM
    $.each(columns, function(index, element){

        // Split the LEDs into it's own array
        var column = data[index];

        leds = column.match(/.{1,3}/g);

        
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
                case '010':
                    domLed.attr('data-color', 'red');
                    break;
                case '001':
                    domLed.attr('data-color', 'green');
                    break;
                case '100':
                    domLed.attr('data-color', 'blue');
                    break;
                case '110':
                     domLed.attr('data-color', 'magenta');
                    break;
                case '101':
                     domLed.attr('data-color', 'cyan');
                    break;
                case '011':
                     domLed.attr('data-color', 'yellow');
                    break;
                case '111':
                     domLed.attr('data-color', 'white');
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
            transform: "rotate("+(360/$columns.length * index)+"deg)",
        });

    });
}


http://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse/987376#987376
function SelectText(element) {
    var doc = document
        , text = doc.getElementsByClassName(element)[0]
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
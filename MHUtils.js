//MHScrollToElement
//
//DESCRIPTION
//  Scrolls to the specified jQuery element
//ARGUMENTS
//  element - A jQuery Element
//  offset - The amount of pixel that the scroll should be offset by (used for floating headers etc)
//  time - The amount of time in milliseconds it should take to scroll to the desired element
//USAGE
//  MHScrollToElement($("#heading"),0,500);
function MHScrollToElement(element,offset,time){
    var body = $("html,body");
    var y = element.offset().top;
    body.animate({scrollTop: y - 70},1000);
}

//MHCounterSpin
//
//DESCRIPTION
//  Animates a set of divs each containing a individual number to create a counter effect
//ARGUMENTS
//  prefix - A string representing the prefix of each individual number div, so if the prefix was 
//           mycounter the divs containing the numbers would have the ID's mycounter1, mycounter2 and so forth
//  digits - The total number of digits (number containing divs)
//  number - The desired number (the number which the counter should spin to)
//  timespin - The time in milliseconds for each number to change
//  timestop - The time in milliseconds for each number to stop after the previous number has stopped
//USAGE
//  HTML CODE
//      <div id='mycounter1'>0</div>
//      <div id='mycounter2'>0</div>
//      <div id='mycounter3'>0</div>
//  JAVASCRIPT CODE
//      MHCounterSpin("mycounter",3,123,20,1000)
var MHCounterStopped = [];
function MHCounterSpin(prefix,digits,number,timespin,timestop){
    var numberString = number.toString();
    var extraneeded = digits - numberString.length;
    for (var j = 0; j < extraneeded; j++){
        numberString = "0" + numberString;   
    }
    for (var i = 1; i < digits + 1; i++){
        MHCounterStopped[prefix + i] = false;
        MHCounterChangeDigits(prefix, i,Math.random() * 9,numberString[i - 1],timespin);
    }
    MHCounterStop(prefix,1,digits,timestop);
}

function MHCounterChangeDigits(prefix, digit, pos, desired,timespin){
    pos = Math.round(pos);
    if (pos > 9){
        pos = 0;   
    }
    setTimeout(function(){
        $("#" + prefix + digit).html(pos);
        if (MHCounterStopped[prefix + digit] == false || pos != desired){
            pos++;
            MHCounterChangeDigits(prefix,digit, pos, desired,timespin);
        }
    }, timespin);
}

function MHCounterStop(prefix, digit,total,timestop){
    setTimeout(function(){
        MHCounterStopped[prefix + digit] = true;
        digit++;
        if (digit <= total){
            MHCounterStop(prefix,digit,total,timestop);
        }
    },timestop);
}
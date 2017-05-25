/**
 * Created by michael hirsch on 5/25/17.
 */

console.log("michael hirsch");

var c = document.getElementById('drawing');
var ctx = c.getContext('2d');

console.log(ctx);
var i=0;
var prev;
var words = [];
var currentWord = "";

function findDoodle(currentWord){
    $.get('/api/find_doodle/'+currentWord, function(response){
        console.log(response);
    })
}


$('body').on('keydown', function(t){
    console.log(t.keyCode);

    if (t.keyCode>=65 && t.keyCode<=90){
        ctx.fillText(t.key,10*i,20);
        i+=1;
        console.log(i);
        prev=t.key;
        currentWord+=t.key;
    }

    if (t.keyCode===32){
        console.log("this is the word: " + currentWord);
        words.push(currentWord);
        findDoodle(currentWord);
        currentWord = "";
    }

    if (t.keyCode===8){
        i-=1;
        currentWord = currentWord.substr(0, currentWord.length-1);
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(prev,10*i, 20);
        ctx.fillStyle = '#000000'

    }

});
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
var doodle_count = -1;
var currentWord = "";

function draw_doodle(vertices){

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(vertices[0].x+doodle_count*256, vertices[0].y);
    var i = 0;
    var interval = setInterval(function(){
        var pt = vertices[i];

        var prevPt = vertices[i > 0 ? i - 1 : 0];
        ctx.moveTo(prevPt.x+doodle_count*256, prevPt.y)
        ctx.lineTo(pt.x+doodle_count*256, pt.y);
        ctx.stroke();
        i ++;
        if(i >= vertices.length){
            clearInterval(interval);
        }
    }, 40);
}

function findDoodle(currentWord){
    $.get('/api/find_doodle/'+currentWord, function(response){
    doodle_count+=1;

        console.log(response)
        response.image.forEach(function(el){
            vertices = [];
            for (var i=0; i < el[0].length; i++){
                vertices.push({
                        x: el[0][i],
                        y: el[1][i]
                    })
                }
            draw_doodle(vertices);
        });
    })
}


$('body').on('keydown', function(t){
    console.log(t.keyCode);

    if ((t.keyCode>=65 && t.keyCode<=90) || t.keyCode ===32){
        ctx.fillText(t.key,10*i,20);
        i+=1;
        console.log(i);
        prev=t.key;
        currentWord+=t.key;
    }

    if (t.keyCode===13){
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
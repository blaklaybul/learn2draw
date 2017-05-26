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
var doodle_count = 0;
var currentWord = "";

function draw_doodle(vertices){
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(vertices[0].x+doodle_count*256, vertices[0].y);
    vertices.forEach(function(pt){
        ctx.lineTo(pt.x+doodle_count*256, pt.y);
    })
    ctx.stroke();
}

function findDoodle(currentWord){
    $.get('/api/find_doodle/'+currentWord, function(response){

        console.log(response.image)
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
    doodle_count+=1;
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
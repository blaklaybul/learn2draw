/**
 * Created by michael hirsch on 5/25/17.
 */

var c = document.getElementById('drawing');
var ctx = c.getContext('2d');

console.log(ctx);
var i=0;
var prev;
var words = [];
var doodle_count = -1;
var currentWord = "";

function draw_doodle(draw_verts, ind){
    var vertices = Object.values(draw_verts[ind])[0];
    var at = parseInt(Object.keys(draw_verts[0])[0]);
    console.log(at);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(vertices[0].x+at*256, vertices[0].y);
    var i = 0;
    var interval = setInterval(function(){
        var pt = vertices[i];
        var prevPt = vertices[i > 0 ? i - 1 : 0];
        ctx.moveTo(prevPt.x+at*256, prevPt.y)
        ctx.lineTo(pt.x+at*256, pt.y);
        ctx.stroke();
        i++;
        if(i >= vertices.length){
            ind+=1;
            if(ind < draw_verts.length){
                draw_doodle(draw_verts, ind);
            }
            clearInterval(interval);
        }
    }, 30);
}

function findDoodle(currentWord, doodle_num){
    $.get('/api/find_doodle/'+currentWord, function(response){

        var all_verts = [];
        response.image.forEach(function(el){
            var vertices = [];
            for (var i=0; i < el[0].length; i++){
                vertices.push({
                        x: el[0][i],
                        y: el[1][i]
                    })
                }
            console.log("this is doodle_num " + doodle_num);
            var o = {};
            o[doodle_num] = vertices;
            all_verts.push(o);
        });
        draw_doodle(all_verts, 0);
    })
}


$('body').on('keydown', function(t){

    if ((t.keyCode>=65 && t.keyCode<=90) || t.keyCode ===32){
        ctx.fillText(t.key,10*i,20);
        i+=1;
        prev=t.key;
        currentWord+=t.key;
    }

    if (t.keyCode===13){
        words.push(currentWord);
        doodle_count+=1;
        findDoodle(currentWord, doodle_count);
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
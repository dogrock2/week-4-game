
var playerChoose;
var oponent;
var noClick;
var ap; //attack power
var cap;//counter attack power
var hp;//health points
const characters = ['obi','qui','maul','vader'];

$(document).ready(function () {

    noClick = false;
    ap = 4;
    hp = [100, 125, 150, 200];
    cap = [4, 5, 10, 15];

});//ends document ready


$("img").on("click", function () {            
    playerChoose = $(this).attr('id'); 
    $('#choose').text('OPONENT');    
    $("#choose").addClass("text-danger");
    setPlayerVS(playerChoose,hp[(characters.indexOf(playerChoose))]);
    $('#eneDiv').empty();        
    $.each(characters, function(index, value){            
        if(playerChoose != value){
            var cont = $('<div class="d-inline-block" id="enemies">');               
            cont.html('<img class="imgCls mx-2" id="'+value+'2" src="assets/images/'+value+'.jpg" alt="Image not found">');
            $('#eneDiv').append(cont);
            $('#'+value+'Row').remove();                
        }//ends inner if
    });//ends .each               
});//ends on click

$("#eneDiv").on("click", 'img', function () { //here issues dinamically created not static
   if(noClick == false){
        noClick = true;
        var str = $(this).attr('id');
        $('#'+str).remove();
        oponent = str.substring(0, str.length-1);
        setOponentVS(oponent,hp[(characters.indexOf(oponent))]);
   }//ends if
});

function setPlayerVS(charact, health){
    $("#playerSelection").empty();
    $("#playerSelection").append('<img class="imgVs" src="assets/images/'+charact+'.jpg" alt="Image not found">');
    $("#playerSelection").append('<div class="text-center" id="plyrHP">');
    $("#plyrHP").text(health);
}

function setOponentVS(charact, health){
    $("#enemySelection").empty();
    $("#enemySelection").append('<img class="imgVs" src="assets/images/'+charact+'.jpg" alt="Image not found">');
    $("#enemySelection").append('<div class="text-center" id="opoHP">');
    $("#opoHP").text(health);
}

$('button').on("click", function(){

     var currentHP = parseInt( $('#plyrHP').text() );
     var oponentHP = parseInt( $('#opoHP').text() );

     currentHP -= cap[(characters.indexOf(oponent))];
     $("#plyrHP").text(currentHP);

     oponentHP -= ap; 
     $("#opoHP").text(oponentHP);

     ap = ap + 4;
     
     if(currentHP < 0)
        youLose();

     if(oponentHP < 0)
        youWin();            
     
});

function youLose(){
   $('#winLoseMsg').text('SORRY YOU LOST');
}

function youWin(){
    $('#winLoseMsg').text('YOU WIN');
}
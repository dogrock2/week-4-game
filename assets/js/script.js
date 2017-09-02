
var playerChoose;
var oponent;
var noClick;
var ap; //attack power
var cap; //counter attack power
var hp; //health points
var winCnt;
var allCharacters = {
    obi: 100,
    qui: 125,
    maul: 130,
    vader: 160
};

$(document).ready(function () {

    noClick = false;
    ap = 5;
    cap = [4, 5, 10, 15];
    winCnt = 0;
    $("#attack").prop("disabled", true);
    $('#play').hide();

});//ends document ready

$("img").on("click", function () {
    playerChoose = $(this).attr('id');
    $('#choose').text('CHOOSE YOUR OPONENT');
    $("#choose").addClass("text-danger");
    setPlayerVS(playerChoose, 100);
    $('#eneDiv').empty();
    $.each(allCharacters, function (index, value) {
        if (playerChoose != index) {
            var cont = $('<div class="d-inline-block" id="enemies">');
            cont.html('<img class="imgCls mx-2" id="' + index + '2" src="assets/images/' + index + '.jpg" alt="Image not found">');
            $('#eneDiv').append(cont);
            $('#' + index + 'Row').remove();
        }//ends inner if
    });//ends .each               
});//ends on click

$("#eneDiv").on("click", 'img', function () {
    if (noClick == false) {
        noClick = true;
        $("#attack").prop("disabled", false);
        var str = $(this).attr('id');
        $('#' + str).remove();
        oponent = str.substring(0, str.length - 1);
        setOponentVS(oponent, allCharacters[oponent]);
    }//ends if
});//ends oponent imag click

function setPlayerVS(charact, health) {
    $("#playerSelection").empty();
    $("#playerSelection").append('<img class="imgVs" src="assets/images/' + charact + '.jpg" alt="Image not found">');
    $("#playerSelection").append('<div class="text-center" id="plyrHP">');
    $("#plyrHP").text(health);
}//ends playeVs

function setOponentVS(charact, health) {
    $("#enemySelection").empty();
    $("#enemySelection").append('<img class="imgVs" src="assets/images/' + charact + '.jpg" alt="Image not found">');
    $("#enemySelection").append('<div class="text-center" id="opoHP">');
    $("#opoHP").text(health);
}//ends oponentvs

$('#attack').on("click", function () {
    var currentHP = parseInt($('#plyrHP').text());
    var oponentHP = parseInt($('#opoHP').text());
    var charIndex = 0;
    var counter = 0;
    $.each(allCharacters, function (index, value) {
        if (index === oponent)
            currentHP -= cap[counter];
        counter++;
    });
    $("#plyrHP").text(currentHP);
    oponentHP -= ap;
    $("#opoHP").text(oponentHP);
    ap += 5;
    if (oponentHP < 0)
        youWin();
    else if (currentHP < 0)
        youLose();
});//ends buttonclick

function youLose() {
    $("#attack").prop("disabled", true);
    $('#playerSelection').empty();
    $('#vsTxt').hide();
    $('button').hide();
    $('#winLoseMsg').text('SORRY YOU LOST. THE WINNER IS');
    $('#opoHP').text(oponent);
    $('#play').show();
}//ends youlos

function youWin() {
    winCnt++;
    $("#attack").prop("disabled", true);
    $('#choose').text('NEXT OPONENT');
    $('#enemySelection').empty();
    noClick = false;
    if (winCnt == 3) {
        $('#winLoseMsg').text('YOU WIN. YOU ARE THE CHAMPION.');
        $('button').hide();
        $("#plyrHP").hide();
        $('#vsTxt').hide();
        $('#play').show();
    }//ends if
}//ends youWin

$('#play').on('click', function () {
    location.reload();
});//ends play click
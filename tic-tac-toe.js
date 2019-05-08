let win_comp = [['1', '2', '3'], 
                ['4', '5', '6'], 
                ['7', '8', '9'], 
                ['1', '4', '7'], 
                ['2', '5', '8'], 
                ['3', '6', '9'], 
                ['1', '5', '9'], 
                ['3', '5', '7']],
    
    turn = "X",
		xscore = [],
		oscore = [],
		moves = 0;

$(function() {
  
  'use strict';  // to use strict rules of javascript syntax .. i guess!!
  
  // this function is to force  the  game to restart after each conclusion
  $('#reset').on('click',  function (e){
    gameRestart();
  });
  
  // a click even for the player to click a box
  $("#board").on('click', 'li', function (e){
    
    let _this = $(this);
    
    // this is to ristrict players from clicking on an already used cell
    if ( moves < 9 && _this.hasClass('selected') ) {
      swal("Can't click this cell, try another :0");
      return false;
    }
    
    // if a player selected a good 
    _this.addClass('selected');
    moves++;
 
    if (_this.text() == "" || _this.text() == undefined) {
      _this.text(turn);
      
      //track player click
      if (turn == "X"){
        xscore.push(this.id[4]);
        xscore.sort();
        
      }
      else {
        oscore.push(this.id[4]);
        oscore.sort();
      }
      
      //check winning compination
      if (isWiningComp( turn )) {
        swal(turn+" User wins!");
        gameRestart();
      }
      // draw
      else if(moves == 9) {
        swal(" Tie Game!");
        gameRestart();
      }
      
      
      // Next player turn
      if (turn == "X")
        turn = "O";
      else
        turn = "X";
      // show whos turn
      $('#turn').text('Player '+turn);
      
    }
    
  });
  
  

});

/* check if user won */ 
const gameRestart = function () {
  $('li').text('').removeClass('selected');
  xscore = [],
  oscore = [],
  moves = 0;
}
/* check if user won */ 
const isWiningComp = function ( turn ) {
  for (let i = 0; i <= win_comp.length - 1; i++) {
    let wpTest = win_comp[i];
    let a1 = wpTest[0],
        a2 = wpTest[1],
        a3 = wpTest[2];
        
    if (turn == "X")
      userSquaresArr = xscore;
    else
      userSquaresArr = oscore;
    
    if ((userSquaresArr.includes(a1)) && (userSquaresArr.includes(a2)) && (userSquaresArr.includes(a3))) {
      
        console.log(" a1: "+a1+" wpTest[0]: "+wpTest[0]+" a2: "+a2+" wpTest[1]: "+wpTest[1]+
        " a3: "+a3+" wpTest[2]: "+wpTest[2]);
        
        console.log("user "+turn+" has played a winning pattern!");
        return true;
    } 
  }
}


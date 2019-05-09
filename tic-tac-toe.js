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
  
  
  // this function is to force  the  game to restart after each conclusion
  $('#reset').on('click',  function (e){
    gameRestart();
  });
  
  // a click event for the player to click a box
  $("#board").on('click', 'li', function (e){
    
    let _this = $(this);
    
    // this is to ristrict players from clicking on an already used cell
    if ( moves < 9 && _this.hasClass('selected') ) {
      swal("Can't click this cell, try another :0");
      return false; // to leave delegation
    }
    
    // if a player selected a playable cell this what will happen
    _this.addClass('selected');
    moves++; // to track moves
 
    if (_this.text() == "" || _this.text() == undefined) {
      _this.text(turn);
      
      //track a player click
      if (turn == "X"){
        xscore.push(this.id[4]); // i tried to reigister score by using the last digit of  the id "spot1"
        xscore.sort(); // susing for the winninfg combinations
        
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
      // check in case of a tie
      else if(moves == 9) {
        swal(" Tie Game!");
        gameRestart();
      }
      
      
      // Next player turn
      if (turn == "X") // this to enterchange b/w "X" and "O"
        turn = "O";
      else
        turn = "X";
      // show whos turn
      $('#turn').text('Player '+turn);
      
    }
    
  });
  
  

});

/* check if user won */ 
const gameRestart = function () {   // this the funciton for restarting the game when it's called
  $('li').text('').removeClass('selected');
  xscore = [],
  oscore = [],
  moves = 0;
}
/* check if user won */ 
const isWiningComp = function ( turn ) {
  for (let i = 0; i <= win_comp.length - 1; i++) { //  loop that goes through the array inside the the main array.
    let wpTest = win_comp[i]; 
    let a1 = wpTest[0], //   
        a2 = wpTest[1],
        a3 = wpTest[2];
        
    if (turn == "X")
      userSquaresArr = xscore;
    else
      userSquaresArr = oscore;
    
    if ((userSquaresArr.includes(a1)) && (userSquaresArr.includes(a2)) && (userSquaresArr.includes(a3))) {
            return true;
    } 
  }
}


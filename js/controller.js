//Controller handles all the input

// Handles tile click.
function tile_clicked(){
    
    process_tile(this);
}

var bufferedcoordinate = [];

// Handles keyboard input for signal shortcuts and algebraic notation shortcuts.
function handle_keypress(e){

    var k = e.keyCode;

    if(k == 85){
	process_undo()
    }
    else if(k == 82){
	process_reset()
    }
    else if(k >= 65 && k <= 72 && bufferedcoordinate.length == 0){
	bufferedcoordinate.push(String.fromCharCode(k + 32))
    }
    else if(k >= 49 && k <= 57 && bufferedcoordinate.length == 1){
	bufferedcoordinate.push(String.fromCharCode(k));
	file = bufferedcoordinate.pop();
	rank = bufferedcoordinate.pop();
	process_tile(location_to_tile(rank + file));
	
    } 
}

// Updates the message on the display bar.
function handle_message(message){
    document.getElementById("message").innerHTML = message;
}

// Actually sets up a button event listener.
function bind_button(buttonid, command){
    var undo_button = document.getElementById(buttonid);
    undo_button.addEventListener('click', command);
}

// Sets up the buttons to send signals to backend.
function setup_buttons(){
    bind_button("undo_button", process_undo);
    bind_button("reset_button", process_reset);
}

// Setup the key listener.
window.onkeyup = function(e) {handle_keypress(e)}




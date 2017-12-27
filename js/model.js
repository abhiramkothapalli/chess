// uci.js receives commands from stockfish

const fs = require('fs');
const child_process = require('child_process');

//var Chess = require('js/chess').Chess;
var chess = new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

const stockfish = child_process.spawn('./stockfish');

const fen_prefix = "position fen "
skill_level = 0
depth = 1


function receive(data) {
    
    data_array = data.split("\n");

    for(var i = 0; i < data_array.length; i++){

	data_subarray = data_array[i].split(" ")
	
	index = data_subarray.indexOf('bestmove');

	if (index != -1){
	    process_computer(data_subarray[index + 1])
	}
    }
    
}


function push_state(){

    fen = chess.fen()

    // Update stockfish state
    stockfish.stdin.write(fen_prefix + fen + "\n");

    // Update board state
    update_board(fen)
    
    console.log("push state: " + chess.fen())
}

function calculate(){
    stockfish.stdin.write("go depth " + depth + "\n")
}

function process_computer(m) {
    if (chess.move(m, {sloppy: true})) {
	push_state();
    }

}

function process_player(m) {

    console.log("got move: " + m)

    if (chess.move(m, {sloppy: true})){
	push_state();
	calculate();
    }
}

function process_undo(){
    remove_all_color();
    chess.undo();
    chess.undo();
    push_state();
}


function process_reset(){
    console.log("reset requested")
    remove_all_color()
    chess.reset();
    push_state();
}

var bufferedlocations = [];

function process_tile(tile){

    var location = tile_to_location(tile);

    // Unselected the same location
    if(location == bufferedlocations[0]){
	remove_all_color();
	bufferedlocations = []
	return;
    }
    
    // Selected a new piece
    else if(chess.get(location) && chess.get(location).color == 'w' && chess.turn() == 'w'){
	remove_all_color()
	bufferedlocations = []
	process_piece_click(location_to_tile(location));
    }

    bufferedlocations.push(location);

    // If we have collected two locations.
    if(bufferedlocations.length == 2){
	remove_all_color();
	var end = bufferedlocations.pop();
	var start = bufferedlocations.pop();

	if(chess.get(start) && chess.get(start).color == 'w'){
	    process_player(start + end);
	}
    }

}

function process_piece_click(tile){
    add_color_selected(tile);
    loc = tile_to_location(tile);

    moves = chess.moves({square : loc, verbose: true});

    for(var i = 0; i < moves.length; i++){
	move = moves[i]
	loc = move.to
	potential_tile = location_to_tile(loc)
	add_color_potential(potential_tile);
    }
}

function set_skill_level(){
    stockfish.stdin.write("setoption name Skill Level value " + skill_level + "\n");
}

function start(){

    stockfish.stdout.on('data', function(data){
	receive(data.toString())
    });

    // Init sequence
    initalize_board();
    //setup_buttons();
    set_skill_level();
    push_state()

}

// Need to wait until main div loads.
window.onload = function(){start()}

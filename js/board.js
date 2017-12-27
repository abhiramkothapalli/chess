//board.js handles creating, populating, and manipulating the frontend

// Creates the HTML elements for the board.
function create_board(){

    var board = document.createElement("div");
    board.className = "board";

    for(var r = 0; r < 8; r++){
	var row = document.createElement("div");
	row.className = "row";

	for(var c = 0; c < 8; c++){
	    var tile = document.createElement("div");
	    tile.className = "tile";

	    // We transform the coordinates so "0, 0" is on the bottom left corner.
	    tile.id = c.toString() + (7 - r).toString();

	    if(r % 2 != c % 2){
		tile.classList.add("dark");
	    }
	    else {
		tile.classList.add("light");
	    }

	    // Add click listener for later GUI interactivity.
	    tile.onclick = tile_clicked;
	    
	    row.appendChild(tile);
	}	
	board.appendChild(row);
    }
    document.getElementById("main").appendChild(board);
}

// Removes color from all tiles.
function remove_all_color(){
    var tiles = document.getElementsByClassName("tile");
    for(var i = 0; i < tiles.length; i++){
	tiles[i].classList.remove("selected");
	tiles[i].classList.remove("potential");
    } 
}

// Adds color to specified tile
function add_color_selected(tile){
    tile.classList.add("selected");
}

// Adds color to specified tile
function add_color_potential(tile){
    tile.classList.add("potential");
}

// Converts a algebraic location to a tile object
function fen_to_font(fen){

    var fen_dict = new Array();
    fen_dict["R"] = "r";
    fen_dict["N"] = "n";
    fen_dict["B"] = "b";
    fen_dict["Q"] = "q";
    fen_dict["K"] = "k";
    fen_dict["P"] = "p";
    fen_dict["r"] = "t";
    fen_dict["n"] = "m";
    fen_dict["b"] = "v";
    fen_dict["q"] = "w";
    fen_dict["k"] = "l";
    fen_dict["p"] = "o";

    return fen_dict[fen];
}

// This function updates the board based on the state provided by the backend.
function update_board(fen){

    // If the state updates, the message is outdated.
    //document.getElementById("message").innerHTML = "";

    var grid = fen.split(' ')[0]
    var rows = grid.split('/')

    for(var r = 0; r < 8; r++){
	row = rows[7 - r]
	var pieces = row.split('');

	var c = 0
	while(pieces.length != 0){
	    
	    piece = pieces[0]
	    pieces.shift()

	    if(piece >= '0' && piece <= '8'){
		ctemp = c
		while(c < parseInt(piece) + ctemp){
		    var tile = document.getElementById(c.toString() + r.toString());
		    tile.innerHTML = ""
		    c++
		}
	    }
	    else {
		var tile = document.getElementById(c.toString() + r.toString());
		tile.innerHTML = fen_to_font(piece)
		c++
	    }
	    
	}
	
    }
    
}

// Converts a algebraic location to a tile object.
function location_to_tile(location){
    var rank = location.charCodeAt(0) - 97;
    var file = parseInt(location.substring(1)) - 1; 
    return document.getElementById(rank.toString() + file.toString());
}

// Converts a tile object to a location object.
function tile_to_location(tile){
    var rank = String.fromCharCode(tile.id.charCodeAt(0) + 49);
    var file = String.fromCharCode(tile.id.charCodeAt(1) + 1);
    return rank + file;
}

// Setup the board.
function initalize_board(){
    create_board();
}



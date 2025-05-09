/*
 * HANDLES PLACEMENTS AND ALGORITHM SEARCH & LOCATE
 * 
 */
/*
 * Use Array() for Queue, List and Stack
 * Use Set() for Set and List
 */

  class BlockmanControlCentral {
   
     constructor(grid){
      this.grid = grid;
     
      this.bg_plain = "white";
      this.bg_player = "#ff9c08";
      this.bg_edible = "#7cff35";
      this.bg_hostile = "#ff0707";
      this.bg_portal = "#1ecaff";
      this.bg_gate = "#ff6417";
      this.bg_super_edible = "#0e06ff";
    
      //this.flagged_node = new GridNode("Dg");
      //console.log("Flagging Initial Node");
      //this.x = 0; this.y = 0;
      
      this.playable_X = 0;
      this.playable_Y = 0;
      this.player_Health = 0;
      this.player_direction = "R";
      this.move_tick_interval = null;
    
      this.playables_count = 0;
      this.playables_arr = new Array();
    
     //holds Player objects
      this.players_list = new Array();
      this.portals_list = new Array();
    
      this.msg = "";
      this.previous_node = "";
      this.current_node = "";
    
      this.gl_directions = "";
      this.action_index = 0;
      
     // this.grapher = new NodeGridGraph();
      this.actions_list = new Array(); // new ArrayList<>();
      this.player_movements = [];
   
      this.free_tiles = new Array();
    
      this.targets_count = 0;
      this.targets_arr = new Array();
    
      this.edibles_count = 0;
      this.edibles_arr = new Array();
    
      this.active_player = null;
      this.active_player_health = -1;
      this.active_player_index = -1;

      this.active_hostile = null;
      this.hostile_X = -1;
      this.hostile_Y = -1;
      this.hostile_movements = [];
    
      this.hostile_routes = [];
      this.hostile_route_map = new Map();
      this.hostile_Xmoves = [];
      this.hostile_Ymoves = [];
      this.hostile_route_Xmoves = [];
      this.hostile_route_Ymoves = [];
      
      this.hostile_success = false;
    
      this.active_portal = null;
      this.active_portal_index;
      this.portal_activated = false;
    
      this.crrnt_playable_index = 0;
    //  this.selectPlayer(this.crrnt_playable_index);
    /*
     * 
     *•The "edibles_count" stores the total number of "edible" nodes on the map
     *•The "edibles_arr" array stores the IDs of all "edible" nodes present on the map
     * - An Edible node has the class name "edible"
     * - An Edible can not be contolled by the player
     * 
     •The "playables_count" stores the total number of "playable" nodes
      present on the map.
     •The "playables_arr" array stores the IDs of all "playable" nodes
     - A playable node has the class name "playable"
     - A "playable" can be controlled by the directions movement buttons
     - There can be more than 1 "playable" on the map.
     - The "playable" is switched by the "switchPlayer()" function.
    
    */
     
   //  console.log("Grid Map Initialized Successfully!\n");
  }
   
 
  
  getAllFreeTiles(){
  var free_tiles = new Array();
  var tile;

   for(let R = 0; R < this.grid.length-1; R++){
       for(let C = 0; C < this.grid[0].length-1; C++){
           tile = this.grid[R][C].getNodeType();
           if(tile == 0){
             free_tiles.push(`${C},${R}`)
           }
      }
   }
   this.free_tiles = free_tiles;
   return this.free_tiles;
}
  
   

//// Traversal Algorithms
  
  /*
   * Designed and implemented by Fatherly P. Titus
   * Finished 25th November 2022
   */
   a_star(flag){
    console.log(`A* Search For Node ==> ‘ ${flag} ’ \n`);
    
    const visited = new Set();    
    const select_list = new Set();
    let p_Q = null,Q = null;
    
    let t_cost = 0, //total cost(g) from flagged_node to node with flag
    g = -1; // the sum of edge cost from flagged_node to select_node (same as t_node)
    
    let f = 0, //sum of t_cost and H-value of goal node
    min_f = -1, //the minimum obtained F-value
    h = -1;
  
    let reached = false;
    let path = "";
    let direction = "";
    var select_edge = null;
    
    select_list.add(this.flagged_node);
    visited.add(this.flagged_node.data);

    const goal_node = this.moveTo_BFS_Alt(flag);
    //console.log("Goal Node (X,Y) = [%s,%s]\n\n",goal_node.getX(),goal_node.getY());
    
   while(select_list.size > 0){
      min_f = -1;
    for(const gn of select_list.values()){
     if(min_f == -1){
        min_f = gn.getF();  
        //Q = gn;
        p_Q = gn;
       }
        
     if(gn.getF() < min_f){
        p_Q = gn; 
        //Q = gn;
        min_f = gn.getF();
      }
    }
      direction += (Q == null)? "" : ""+Q.getNodeDirection(p_Q);
      Q = p_Q;
      path += Q.data+" ";
     select_list.clear();
     // console.log("Selected Q => %s\n\n",Q.data);
      if(Q.data == flag){
        reached = true;
        console.log("\nNode Reached !");
        console.log(`QUICKEST PATH: ${path}\n\n`);
        console.log(`Direction: ${direction}\n`);
        break;
      }
     
    Q.neighbors.forEach((e)=>{
      var n = e.node;
      h = this.euclidean_distance(n,goal_node);  
      //h = this.manhattan_distance(n,goal_node);
      g = e.weight + t_cost;
      f = g + h; 
                
      n.setG(g); n.setF(f); n.setH(h); 
     // console.log(" %s to %s = %s;(X,Y)=[%s,%s]; (HV) = %s; (FV) = %s\n",Q.data,n.data,g,n.getX(),n.getY(),h,f);
     if(!visited.has(n.data)){
         select_list.add(n);
         visited.add(n.data);
       } 
    });
       t_cost = g;
      if(!visited.has(Q.data)){
        visited.add(Q.data);
      }
      if(select_list.size == 0 && !reached){
        console.log("COULD NOT FIND A SUITABLE PATH !\n");
        break;
      }
    }
  }
  
   euclidean_distance( s, goal){
    return (Math.abs(s.getX() - goal.getX()) + Math.abs(s.getY() - goal.getY())); 
  }
  
   manhattan_distance(s, goal){
    return Math.floor(Math.sqrt((s.getX() - goal.getX())^2 + (s.getY() - goal.getY())^2) ); 
  }
  
  ///////////////////////////////////////////////////////////// 
  
  placeBlock(x, y){
    /*
   * type_number => 0 - plain
   * 1 - player - access_level: 0
   * 2 - target - access_level: 1
   * 3 - hostile - access_level: 1
   * 4 - block - access_level: 0
    */
   this.grid[x][y].setNodeType(4);
}
 
placeHostile(x,y){
   this.grid[x][y].setNodeType(6);
   //hostiles_arr.push(this.grid[x][y]);
}
 
placeGate(x,y){
   this.grid[x][y].setNodeType(5);
   //hostiles_arr.push(this.grid[x][y]);
}

placeTargetNode(x,y){
   this.grid[x][y].setNodeType(2);
  // targets_arr.push(this.grid[x][y]);
}

placePlayer(x,y){
   this.grid[x][y].setNodeType(1);
  // hostiles_arr.push(this.grid[x][y]);
}

placePortal(x,y){
   this.grid[x][y].setNodeType(3);
}
 
standingOnPortal(){
   return (this.grid[this.playable_Y][this.playable_X].getNodeType() == 3);
}
 
standingOnGate(){
   return (this.grid[this.playable_Y][this.playable_X].getNodeType() == 5);
}
  

//wall the entire field map
 blockField(){
  for(let i = 0; i < this.grid.length; i++){
     for(let j = 0; j < this.grid[0].length; j++){
        //console.log("Observe Node: \n"+this.grid[i][j]); 
        this.grid[i][j].setNodeType(4);  
    }
  }
}



/*
 * •plhedg => PLayers.Hostiles.Edibles.Doors.Gates:
 *   p-(x,y) + h-(x,y) + e-(x,y) + d-(x,y) + g-(x,y)
 */
placePLHEDG(str){
 
var placements = [], placement=[], desig = "", x_pos=0, y_pos=0; 
 //console.log("Placements Length: "+placements.length);

//if no "+" found in str; place the string to placements array   
 if(str.indexOf("+") == -1){
 placements.push(str);
 }
//else if "+" found in str; split string by "+" delimiter and assign to placements array  
else if(str.indexOf("+") > -1){
 placements = str.split("+");
 //placements.trim();
}

placements.forEach((val,i)=>{
 //get designation letter
  placement = val.split("-");

 desig = placement[0];

 //get coord positions
 x_pos = parseInt(placement[1].split(",")[0]);   

 y_pos = parseInt(placement[1].split(",")[1]); 
  
 console.log(`Index: ${i}\nDesig: ${desig}\nX-${x_pos}, Y-${y_pos}`);

 //place tile according to designation
 //console.log(`Node Type: ${this.grid[y_pos]}`);
  if(desig === "p"){
    this.addPlayer(x_pos,y_pos); //this.grid[y_pos][x_pos].setNodeType(1);
    }
 else if(desig === "e"){
    this.grid[y_pos][x_pos].setNodeType(2);
    }
 else if(desig === "d"){
    //this.grid[y_pos][x_pos].setNodeType(3);
    this.addPortal(x_pos,y_pos);
    }
 else if(desig === "g"){
    this.grid[y_pos][x_pos].setNodeType(5);
    }	
 else if(desig === "h"){
      this.addHostile(x_pos,y_pos);  //this.grid[y_pos][x_pos].setNodeType(6);
    }
  });
}
  
  chart(x_pos,y_pos){
//
//x_pos => TaX coordinate
//y_pos => Y coordinate
  this.grid[y_pos][x_pos].setNodeType(0); 
}
  
   //charts passages on the map (removes placed blocks)
// pos•index > s_p,l
//• pos => The X or Y direction the chart is to be made
//• index => The initial position index of the chart direction
//• s_p => The start index which the charting is to begin from
//• l => The length of path to be the charted.  
//Xn,Yn+Xn1,Yn2+Xn3,Yn4..
chartMap(str){
 //Split map_string into individual placements
 var placements = [];
 var placement = [], x_pos = 0, y_pos = 0;  

 //if no "+" found in str; place the string to placements array   
 if(str.indexOf("+") == -1){
 placements.push(str);
 }
//else if "+" found in str; split string by "+" delimiter and assign to placements array  
else if(str.indexOf("+") > -1){
 placements = str.split("+");
 //placements.trim();
}
//console.log("Coords Length => "+placements.length);  

//for each value in placememts array =>  
 placements.forEach((val,i)=>{
 if(val){
 x_pos = parseInt(val.split(",")[0]);
 y_pos = parseInt(val.split(",")[1]);

//  console.log(`=> ${x_pos}, ${y_pos}`);
 this.grid[y_pos][x_pos].setNodeType(0);
 }}); 
 
}
   
  
  setActionsList(dir){
    this.actions_list = [];
    this.actions_list = dir.split(""); 
    this.gl_directions = "";
  }
  
  
  loadActionsList(...c){
    this.actions_list = [];
    for(const s_chr of  c ){
      this.actions_list.push(s_chr);
    }
  }
    
    executeActions(){
    for(const action_char of this.actions_list){
        if(action_char == "l"){
          this.moveLeft(); }
        else if(action_char == "r"){
          this.moveRight(); }
        else if(action_char == "u"){
          this.moveUp(); }
        else if(action_char == "d"){
          this.moveDown(); }
        else{
       this.moveDown(); }
      
      console.log("\n");
    }
  }
  
  executeAction(action_char){
   
        if(action_char == "l"){
          this.moveLeft(); }
        else if(action_char == "r"){
          this.moveRight(); }
        else if(action_char == "u"){
          this.moveUp(); }
        else if(action_char == "d"){
          this.moveDown(); }
        else{
       this.moveDown(); }
      
      console.log("\n");
  }

   executeNext(){
    let dir = this.actions_list.shift();
    //console.log("Executing: "+dir);
    switch(dir){
      case "l" : this.moveLeft(); break;
      case "r" : this.moveRight(); break;
      case "u" : this.moveUp(); break;
      case "d" : this.moveDown(); break;
    }
  }
   
   
//We want the direction letter designates of the recent 6 movements the player has made
//: [R, D, U, L, L, D]

  docPlayerMovement(desig){
    if(this.player_movements.length == 6){
      this.player_movements.shift();
    }
    this.player_movements.push(desig);
 }
   
  showPlayerMovements(){
    console.log(this.player_movements+"\n");
}

removeAllCharactersFromMap(){
    //Remove Player Character
    this.grid[this.playable_Y][this.playable_X].setNodeType(0);
    this.playable_X = -1; this.playable_Y = -1;
    this.active_player = null;

   //Remove Hostile Character
   this.grid[this.hostile_Y][this.hostile_X].setNodeType(0);
   this.hostile_Y = -1; this.hostile_X = -1;
   this.active_hostile = null;

  console.log("ALL ACTIVE CHARACTERS REMOVED FROM MAP");
  }
   
   

///////// HOSTILE MOVEMENTS /////////////

  setHostileMovements(dirs){
    this.hostile_movements = dirs;
  }

  appendHostileMovements(dir){
    this.hostile_movements.push(dir);
  }
   

   stopAutoPilotHostile(){
      clearInterval(this.hostile_move_tick_interval);
      this.hostile_move_tick_interval = null;
      console.warn("HOSTILE AUTOPILOT STOPPED !");
   }

// Compute best possible route from hostile to player
//A route is desired when there is 0 encounters with a blockage/wall or it brings the hostile closest to the player
//Multiple route possibilities are computed and the best is determine
   hostileRouteCompute(){
    var tile, type;
    var X = this.hostile_X,
     Y = this.hostile_Y;
    
    //console.log(`X=>${X}, Y=>${Y}`); 
    
     for(let i = 0; i < this.hostile_routes.length-1; i++){
       var route = this.hostile_routes[i];
        //console.warn(`Computing Route: ${i}, =>${route}`); 
       //route is an array of direction designators
       this.hostile_route_map.set(route,0);

       for(let j = 0; j < route.length-1; j++){
           var desig = route[j];
           var indx = j;
           //console.log(`Computing Desig: ${j}, =>${desig}`); 
        switch(desig){
           case "U" : Y-=1;
         break;
           case "D" : Y+=1;
         break;
           case "L" : X-=1;
         break;
           case "R" : X+=1;
         break;
        } 
           tile = this.grid[Y][X];
           type = tile.getNodeType();
           if(type == 4){
             this.hostile_route_map.set(route,indx);
             break;
           }
      } X = this.hostile_X; Y = this.hostile_Y;
    }
    return this.hostile_route_map;
   }
   
 //Now we determine and select the route of most desirability
   selectHostileRoute(){
      var preferred = [];
      var index = -1
      var MSG = "";
      var ideals = []; //for more than 1 zero route

      this.hostile_route_map.forEach((I, R)=>{
       if(I == 0){
         ideals.push(R);
         index = 50;
         MSG = "No Obstacle Encountered!"
       }
       if(I !== 0){
        if(I > index){
          preferred = R; 
          index = I;
          MSG = `Obstacle Encountered At Index: ${I} !`;
        }
       }
      });

    if(ideals.length > 0){
      if(ideals.length > 1){
        var rnd_indx = Math.floor(Math.random()*ideals.length)
   preferred = ideals[rnd_indx]
      }else if(ideals.length == 1){ preferred = ideals[0]; }
   }

      console.warn(`PREFERRED ROUTE PATH: ${preferred}\nMessage: ${MSG}`);
      this.hostile_movements = preferred;
    }  
   
   

//Get the pure coordinate route from hostile to player
   getRouteToPlayer(){
var dir = [];
var x_moves = [], y_moves = [];

    //console.log(`HOSTILE COORD: ${this.hostile_X},${this.hostile_Y}\nPLAYER COORD: ${this.playable_X},${this.playable_Y}`);
    
//Player's Coords:
var dX = this.playable_X - this.hostile_X;
var dY = this.playable_Y - this.hostile_Y;

//direction Y
var dirY = (dY < 0)? "U" : "D";
//direction X
var dirX = (dX < 0)? "L" : "R";

//distance Y
var sY = Math.abs(dY); for(let i = 0; i < sY; i++){dir.push(dirY); this.hostile_route_Ymoves.push(dirY);}

//distance X
var sX = Math.abs(dX); for(let j = 0; j < sX; j++){dir.push(dirX); this.hostile_route_Xmoves.push(dirX);}

this.hostile_movements = dir;
    
     /* console.log(`Hostile Y-Moves : ${this.hostile_route_Ymoves}`);
     console.log(`Hostile X-Moves : ${this.hostile_route_Xmoves}`); */
    
 return dir;
}


  computeRoutesCombinations(route){
    //For [X->Y]
    var R1 = this.hostile_route_Xmoves.concat(this.hostile_route_Ymoves);
    //For [Y->X]
    var R2 = this.hostile_route_Ymoves.concat(this.hostile_route_Xmoves);
    //For [X,Y,X,Y,X,Y]
    var R3 = []
    for(let i = 0; i < R1.length; i++){
        if(i < this.hostile_route_Xmoves.length){
         R3.push(this.hostile_route_Xmoves[i]);
        }
        if(i < this.hostile_route_Ymoves.length){
         R3.push(this.hostile_route_Ymoves[i]);
        }
    }

     //For [Y,X,Y,X,Y,X]
    var R4 = []
    for(let i = 0; i < R1.length; i++){
        if(i < this.hostile_route_Ymoves.length){
         R4.push(this.hostile_route_Ymoves[i]);
        }
        if(i < this.hostile_route_Xmoves.length){
         R4.push(this.hostile_route_Xmoves[i]);
        }
    }

    //For [X,X,Y,Y,X,X]
     var R5 = []
     var i1 = 0, j1 = 0, j2 = 1;

     while(R5.length < R1.length){
         if(this.hostile_route_Xmoves[j1] !== undefined){
           R5.push(this.hostile_route_Xmoves[j1]);
         }if(this.hostile_route_Xmoves[j2] !== undefined){
           R5.push(this.hostile_route_Xmoves[j2]);
         }
         if(this.hostile_route_Ymoves[j1] !== undefined){
           R5.push(this.hostile_route_Ymoves[j1]);
         }if(this.hostile_route_Ymoves[j2] !== undefined){
           R5.push(this.hostile_route_Ymoves[j2]);
         }
       j1 += 2; j2 += 2;
     }
     j1 = 0; j2 = 1
    //For [Y,Y,X,X,Y,Y]
   var R6 = [];
     while(R6.length < R1.length){
         if(this.hostile_route_Ymoves[j1] !== undefined){
           R6.push(this.hostile_route_Ymoves[j1]);
         }if(this.hostile_route_Ymoves[j2] !== undefined){
           R6.push(this.hostile_route_Ymoves[j2]);
         }
         if(this.hostile_route_Xmoves[j1] !== undefined){
           R6.push(this.hostile_route_Xmoves[j1]);
         }if(this.hostile_route_Xmoves[j2] !== undefined){
           R6.push(this.hostile_route_Xmoves[j2]);
         }
       j1 += 2; j2 += 2;
     }
       j1 = 0; j2 = 1;

    //For [X,Y,Y,X,Y,Y,X]
    var R7 = [];

    while(R7.length < R1.length){
         if(this.hostile_route_Xmoves[i1] !== undefined){
           R7.push(this.hostile_route_Xmoves[i1]);
         }
         if(this.hostile_route_Ymoves[j1] !== undefined){
           R7.push(this.hostile_route_Ymoves[j1]);
         }
         if(this.hostile_route_Ymoves[j2] !== undefined){
           R7.push(this.hostile_route_Ymoves[j2]);
         }
       i1 += 1; j1 += 2; j2 += 2;
     }
       i1 = 0; j1 = 0; j2 = 1;
    //For [Y,X,X,Y,X,X,Y]
    var R8 = [];

    while(R8.length < R1.length){
         if(this.hostile_route_Ymoves[i1] !== undefined){
           R8.push(this.hostile_route_Ymoves[i1]);
         }
         if(this.hostile_route_Xmoves[j1] !== undefined){
           R8.push(this.hostile_route_Ymoves[j1]);
         }
         if(this.hostile_route_Xmoves[j2] !== undefined){
           R8.push(this.hostile_route_Xmoves[j2]);
         }
       i1 += 1; j1 += 2; j2 += 2;
     }
       i1 = 0; j1 = 0; j2 = 1;

    this.hostile_routes.push(R1,R2,R3,R4,R5,R6,R7,R8);
    //console.log(this.hostile_routes);
    return this.hostile_routes;
 }


  catchPlayer(){
var dir = [];

//Player's Coords:
var dX = this.playable_X - this.hostile_X;
var dY = this.playable_Y - this.hostile_Y;

//direction Y
dirY = (dY < 0)? "U" : "D";
//direction X
dirX = (dX < 0)? "L" : "R";

//distance Y
sY = Math.abs(dY); for(i = 0; i < sY; i++){dir.push(dirY);}
//distance X
sX = Math.abs(dX); for(j = 0; j < sX; j++){dir.push(dirX);}

//proceed to move
for(let k = 0; k < dir.length; k++){
    switch(dir[k]){
     case "L": this.hostileLeft(); break;
     case "R": this.hostileRight(); break;
     case "U": this.hostileUp(); break;
     case "D": this.hostileDown(); break;
    }
}
}
   
     isHostileSuccess(){
   if((this.hostile_X == this.playable_X) && (this.hostile_Y == this.playable_Y)){
    this.hostile_success = true; }
   else{this.hostile_success = false;}
     return this.hostile_success;
  }  
  
  //Reset the hostile movement
   resetHostileRoutes(){
     this.hostile_routes = [];
     this.hostile_route_map = new Map();
     this.hostile_route_Xmoves = [];
     this.hostile_route_Ymoves = [];
     this.hostile_movements = [];
     console.warn("=> HOSTILE ROUTING RESET <=");
   }   

   /////////// Player's Movement ///////////////
   
  
    moveLeft(){
      if((this.playable_X - 1) != -1 && this.isNodeAccessible((this.playable_X-1),this.playable_Y)){    
      
      this.FlagNode(this.playable_X-1,this.playable_Y);
      this.msg = "Previous Node: "+this.previous_node+"\nCurrent Node: "+this.current_node+"";

       this.player_direction="L";
       this.docPlayerMovement("L");

      this.msg="";
    }else{/*console.log("Cannot Move Left!");*/}
  }
  
    moveRight(){
    if((this.playable_X + 1) != this.grid[0].length && this.isNodeAccessible((this.playable_X+1),this.playable_Y)){
     
      this.player_direction="R";
      this.docPlayerMovement("R");

      this.FlagNode(this.playable_X+1,this.playable_Y);
      this.msg = "Previous Node: "+this.previous_node+"\nCurrent Node: "+this.current_node+"";
      //console.log(this.msg);
      this.msg="";
     
     //console.warn("MOVE-Direction: "+this.player_direction)
    }else{/*console.log("Cannot Move Right!");*/}
  }
  
    moveUp(){
    if((this.playable_Y - 1) != -1 && this.isNodeAccessible(this.playable_X,(this.playable_Y-1))){
      //console.log("Moved Up");

     this.player_direction="U";
     this.docPlayerMovement("U"); 

      this.FlagNode(this.playable_X,this.playable_Y-1);
      this.msg = "Previous Node: "+this.previous_node+"\nCurrent Node: "+this.current_node+"";
      //console.log(this.msg);
      this.msg="";
    }else{/*console.log("Cannot Move Up!");*/}
  }
  
    moveDown(){
    if((this.playable_Y + 1) != this.grid.length && this.isNodeAccessible(this.playable_X,(this.playable_Y+1))){
      //console.log("Moved Down");

     this.player_direction="D";
     this.docPlayerMovement("D");
      
      this.FlagNode(this.playable_X,this.playable_Y+1);
      this.msg = "Previous Node: "+this.previous_node+"\nCurrent Node: "+this.current_node+"";
     // console.log(this.msg);
      this.msg="";
    }else{/*console.log("Cannot Move Down!");*/}
  }


     hostileLeft(){
        if((this.hostile_X - 1) != -1 && this.isNodeAccessible((this.hostile_X-1),this.hostile_Y)){    
      
        this.FlagHostileNode(this.hostile_X-1,this.hostile_Y);
      }
     }

      hostileRight(){
        if((this.hostile_X + 1) != this.grid[0].length && this.isNodeAccessible((this.hostile_X+1),this.hostile_Y)){    
      
        this.FlagHostileNode(this.hostile_X+1,this.hostile_Y);
      }
     }

      hostileUp(){
        if((this.hostile_Y - 1) != -1 && this.isNodeAccessible(this.hostile_X,(this.hostile_Y-1))){    
      
        this.FlagHostileNode(this.hostile_X,this.hostile_Y-1);
      }
     }

      hostileDown(){
        if((this.hostile_Y + 1) != this.grid.length && this.isNodeAccessible(this.hostile_X,(this.hostile_Y+1))){    
      
        this.FlagHostileNode(this.hostile_X,this.hostile_Y+1);
      }
     }


  
setCol_TileType(node,type){
 //console.log(`NODE: ${node}`);
let x = parseInt(node.getAttribute("x")),
y = parseInt(node.getAttribute("y"));

if(node.classList.contains("edible")){
 switch(node){
 case "edible" : node.setAttribute("tile-value","5"); break;
 case "super-edible" : node.setAttribute("tile-value","10"); break;
 default : node.setAttribute("tile-value","0");
 node.classList.remove("edible"); break;
   }
}
this.grid[y][x].setNodeType(type); 
}


getAllTilesOfType(type){
return document.querySelectorAll(`col[tile-type="${type}"`);
}


  addPlayer(x, y){
    //console.log(`Adding Player To Map:\nX-${x}, Y-${y}`);
  if(this.isNodeAccessible(x,y)){
   // Flag new tile
    var elems_parent = document.getElementsByClassName(`row`)[y];
    //console.log(`P_Elem: ${elems_parent[x]}`);
    var elem = elems_parent.children[x];
    this.setCol_TileType(elem,1);
      
     this.active_player = new Player(x,y)
      //console.log("Player Selected !");
     
      //Reset playable X and Y
      this.playable_X = this.active_player.x;
      this.playable_Y = this.active_player.y;
    this.player_direction="R";
       //this.moveRepeat();
   }
 }
  

addHostile(x, y){
    //console.log(`Adding Player To Map:\nX-${x}, Y-${y}`);
  if(this.isNodeAccessible(x,y)){

   // Flag new tile
    var elems_parent = document.getElementsByClassName(`row`)[y];
    //console.log(`P_Elem: ${elems_parent[x]}`);

    var elem = elems_parent.children[x];
    this.setCol_TileType(elem,6);
      
     this.active_hostile = new Hostile(x,y);
     //this.player_direction="R";  
     this.hostile_X = this.active_hostile.x;
      this.hostile_Y = this.active_hostile.y; 
   }
 }
  
 

 selectPlayer(indx){
    //select player
if(this.players_list.length > 0){
    if(indx >= 0 && indx < this.players_list.length){
      this.active_player = this.players_list[indx];
      console.log("Player Selected !");
     
      //Reset playable X and Y
      this.playable_X = this.active_player.x;
      this.playable_Y = this.active_player.y;
    }
}
else if(this.players_list.length == 0){
         alert("No Available Players on Map!");
  }
}


   switchPlayer(){
     if(this.players_list.length > 1){
       for(let i = 0; i < this.grid.length; i++){
           for(let j = 0; j < this.grid[0].length; j++){
               tile = this.grid[i][j]
               tile_type = tile.getNodeType();
               if(tile_type == 1){
                 if(!((i == this.active_player.y) && (j == this.active_player.x))){
                   this.active_player = tile;

                   //Reset playable X and Y
                   this.playable_X = this.active_player.x;
                   this.playable_Y = this.active_player.y;
                   alert("Player Switched");
                 }
              }  
           }
        }
      }
    
  }

  
portalActivated(){
 var status = false;
 if(this.playable_X == this.active_portal.x &&
   this.playable_Y == this.active_portal.y){
   status = true;
  }
}

addPortal(x,y){
   //console.log(`Adding Player To Map:\nX-${x}, Y-${y}`);
   // Flag new tile
    this.grid[x][y].setNodeType(3);
      
     var portal_obj = new Player(x,y);
     this.portals_list.push(portal_obj);
  // Increment playable count;
    if(this.portals_list.length == 1){
       this.selectPortal(0);
      }   
}

selectPortal(indx){
if(this.portals_list.length > 0){
    if(indx >= 0 && indx < this.portals_list.length){
      var portal = this.portals_list[indx];
      this.active_portal = portal;
    }
}
else if(this.portals_list.length == 0){
 alert("No Available Players on Map!");
  }
}

switchPortal(){
if(this.portals_list.length > 1){
      //if the number of "playable" nodes is greater than 1
      //switch control from current playable to the next playable
      // - reassign previous player object     
        this.portals_list[this.active_portal_index] = this.active_portal;


      if((this.active_player_index + 1) >= this.portals_list.length){ this.active_portal_index = 0;}
      else if((this.active_player_index + 1) < this.portals_list.length){ this.active_portal_index += 1;}
      //console.log(``); 
      //get the next player object of players_list 
      //set the "active_player" to the selected player
        this.active_portal = this.portals_list[this.active_portal_index]; 
    
        //alert("Switched Portal");
    }else if(this.portals_list.length == 1){
     alert("Only 1 portal present on map");
    }
}
  
  //radomly decide btwn "normal edible" and "super edible"
addEdible(){
   this.getAllFreeTiles();
   let x = -1, y = -1;
    while(true){
     //get a random index of free tiles
    var rand_index = Math.floor(Math.random()*this.free_tiles.length),
     index_col = this.free_tiles[rand_index];
    //get the x and y value of this column
     x = index_col.getAttribute("x");
     y = index_col.getAttribute("y");

    //edible type
    var edible_type_rand = Math.floor(Math.random()*2),
    edbl_type = (edible_type_rand == 0)? "super":"normal";
      
    if(this.isNodeAccessible(x,y)){
    // Flag new tile
    var elems_parent = document.querySelector(".row-"+y);
    var elem = elems_parent.children[x];
   
    switch(edbl_type){
     case "super" : 
    this.setCol_TileType(elem,7,this.bg_super_edible);
     // console.log(`Edible Placed @ X:${x} Y:${y}`);
    // Increment edible count;
    break;
     case "normal" :
    this.setCol_TileType(elem,2,this.bg_edible);
    break;
   }
    this.edibles_count++;  break;
        }
      }
}
   
    
   FlagTargetNode(x, y){
    //this.target_node.setFlagData(0);
    this.target_node = this.grid[x][y];
    this.target_node.setFlagData(2);
   
    //First: unflag 
    var elems_parent = document.getElementsByClassName(".row")[this.target_x];
    var elem = elems_parent.children[this.target_y];
    elem.style.backgroundColor = "white";   
    elem.style.border = "none";   
    
    //Second: flag
    elems_parent = document.querySelector(".row-"+x);
    elem = elems_parent.children[y];
    elem.style.backgroundColor = "green";     
    this.target_x = x; this.target_y = y;
    
   }

   FlagNode(x, y){
    
    //First: unFlag current tile
    var elems_parent = document.getElementsByClassName(`row`)[this.playable_Y];
    var elem = elems_parent.children[this.playable_X];
    this.setCol_TileType(elem,0);

    //Second: Flag new tile
    elems_parent = document.getElementsByClassName(`row`)[y];
    elem = elems_parent.children[x];
    this.setCol_TileType(elem,1);
    this.active_player.altPosition(x,y);

    this.playable_X = x; this.playable_Y = y;
  }
  

  FlagHostileNode(x, y){
    
    //First: unFlag current tile
    var elems_parent = document.getElementsByClassName(`row`)[this.hostile_Y];
    var elem = elems_parent.children[this.hostile_X];
    this.setCol_TileType(elem,0);

    //Second: Flag new tile
    elems_parent = document.getElementsByClassName(`row`)[y];
    elem = elems_parent.children[x];
    this.setCol_TileType(elem,6);
    this.active_hostile.altPosition(x,y);

    this.hostile_X = x; this.hostile_Y = y;
  }
   
   getFlaggedNode(){
      var len = grid.length;
      var flagged_node = null;
      
      for(let i = 0; i < len; i++ ){
         for(let j = 0; j < grid[0].length; j++){
            if(grid[i][j].getFlagData() == 1){
               flagged_node = grid[i][j];
               break;
            }
         }
    }  return flagged_node;
  }


isNodeAccessible(x,y){
 let status = false;
 var elem = document.getElementsByClassName(`row`)[y].children[x];
// console.log(`Checking Accessiblity of: ${elem}\n@ X-${x}, Y-${y}\nClass list: ${elem.classList.value}`);
 var access = elem.getAttribute("data-access");
// console.log("Access: "+access);
 if(access == 1){status = true;}
 return status;
}
   

}





/*
 * 
 * CODE WRITTEN BY FATHERLY POWERED TITUS©2023
 * LATEST UPDATE => MAY 2025
 * 
 * FOR USE IN THE BLOCKMAN GAME SERIES CREATED BY FATHERLY P. TITUS
 */
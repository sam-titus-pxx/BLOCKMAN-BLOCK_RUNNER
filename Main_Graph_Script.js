/*
 * CONTROL UNIT: HANDLES ACTIONS AND EVENT HANDLERS
 */

/*
 * GridNode
 * GridMap
 * NodeGridGraph
 */

 const node_grid_graph = new NodeGridGraph(); 

 var matrix = node_grid_graph.createFieldMatrix(8,11);

 //console.log("\n\n");
 //node_grid_graph.printGridNodeMatrix(matrix);
 var graph_map;

var playable_maps = [[]]; //[map: [map1][map2]]

/*
 * •chart_str => The charted path string to be decoded for map layouts.  
 * •plhedg => PLayers.Hostiles.Edibles.Doors.Gates:
 *   p-x,y + h-x,y + e-x,y + d-x,y + g-x,y
 */

FPT_INITIALS = `0,0+2,6+2,5+2,4+3,0+4,0+6,6+6,5+6,4+6,0+
7,0+8,0+10,0+8,2+10,2+8,3+8,4+10,4+10,5+8,6+
1,0+2,0+3,2+3,4+3,5+3,6+5,0+9,0+7,4+7,5+
7,6+10,3+8,5+2,2+1,2+3,1+3,3+1,4+1,5+5,5+
5,4+5,2+7,3+7,2+7,1+0,6+4,6+9,6+1,6+5,6+
10,6+` ;

MAP1 = 
`2,0+3,0+4,0+5,0+6,0+7,0+8,0+1,1+2,1+3,1+
4,1+5,1+6,1+7,1+8,1+9,1+1,2+2,2+3,2+4,2+
6,2+7,2+8,2+9,2+1,3+2,3+3,3+7,3+8,3+9,3+
1,4+2,4+3,4+7,4+8,4+9,4+1,5+2,5+3,5+4,5+
6,5+7,5+8,5+9,5+1,6+2,6+3,6+4,6+5,6+6,6+
7,6+8,6+9,6+2,7+3,7+4,7+5,7+6,7+7,7+8,7+`;

MAP2 = 
`1,1+1,3+1,2+1,4+1,5+1,6+9,6+9,5+9,4+9,3+
9,2+9,1+8,1+6,1+5,1+4,1+3,1+7,1+2,1+2,3+
4,3+5,3+6,3+8,4+8,3+7,4+6,4+3,4+2,4+4,4+
9,7+8,7+7,7+6,7+5,7+2,7+1,7+3,7+4,7+4,6+
6,6+2,6+3,6+7,6+5,6+8,6+8,2+2,2`;

MAP3 = 
`2,0+3,0+4,0+5,0+6,0+7,0+8,0+1,1+2,1+
3,1+4,1+5,1+6,1+7,1+8,1+9,1+1,2+2,2+
3,2+4,2+5,2+6,2+7,2+8,2+9,2+1,3+2,3+
3,3+4,3+5,3+6,3+7,3+8,3+9,3+1,4+2,4+
3,4+4,4+5,4+6,4+7,4+8,4+9,4+1,5+2,5+
3,5+4,5+5,5+6,5+7,5+8,5+9,5+1,6+2,6+
3,6+4,6+5,6+6,6+7,6+8,6+9,6+2,7+3,7+
4,7+5,7+6,7+7,7+8,7+`;

MAP4 = 
`0,0+1,0+2,0+3,0+4,0+5,0+6,0+7,0+8,0+
0,1+2,1+3,1+4,1+5,1+7,1+8,1+9,1+0,2+
3,2+4,2+5,2+8,2+9,2+10,2+0,3+1,3+2,3+
3,3+4,3+5,3+6,3+7,3+8,3+9,3+10,3+0,4+
1,4+2,4+3,4+5,4+6,4+7,4+8,4+9,4+10,4+
0,5+1,5+2,5+5,5+6,5+7,5+8,5+9,5+10,5+
1,6+2,6+3,6+4,6+5,6+6,6+7,6+9,6+10,6+
2,7+3,7+4,7+5,7+6,7+9,7+10,7+`;

MAP5 =
`0,0+3,0+6,0+7,0+8,0+9,0+10,0+0,1+1,1+
3,1+4,1+5,1+6,1+8,1+10,1+1,2+2,2+5,2+
8,2+10,2+2,3+5,3+6,3+8,3+10,3+1,4+2,4+
3,4+4,4+6,4+8,4+9,4+10,4+0,5+1,5+4,5+
5,5+6,5+10,5+0,6+2,6+3,6+4,6+6,6+8,6+
9,6+10,6+0,7+1,7+2,7+6,7+7,7+8,7+`
/*node_grid_graph.loadField(matrix); 
 graph_map.blockField();*/
// graph_map.chartMap(FPT_INITIALS);
// graph_map.placePLHEDG(plhedg4);
//place & select players
/*graph_map.addPlayer(0,0);
graph_map.selectPlayer(0);
*/
//place portal
//graph_map.placePortal(7,10);

//place gate
//graph_map.placeGate(7,10); 

var selected_mission = -1,
selected_level = -1,
selected_map = "",
selected_plhedg_variant = "";


function loadPlayField(mission,level){
 node_grid_graph.loadField(matrix);  
    
 var mission_str = "",
    level_plhedg = `plhedg`;
    
 switch(mission){
    case 1 : mission_str = mission1[level];
           break;
    case 2 : mission_str = mission2[level];
           break;
    case 3 : mission_str = mission3[level];
           break;
        
    }
   
 graph_map = new BlockmanControlCentral(matrix)  
   
 graph_map.blockField();
 graph_map.chartMap(MAP5);
 //graph_map.placePLHEDG("p-1,1+h-9,6");
   placeCharacters();
   
   //moveRepeat()
   //AutoPilot();
   //AutoPilotHostile();
   //graph_map.catchPlayer();
   
   route = graph_map.getRouteToPlayer();
   //console.log(`ROUTE TO PLAYER: ${route}`);
   
   rM = graph_map.computeRoutesCombinations(route);
   //printRouteMatrix(rM);
   
   r_map = graph_map.hostileRouteCompute();
   
   //printRouteMap(r_map);
   graph_map.selectHostileRoute();
   
   //AutoPilotHostile();
}


function get_PLHEDG_Position(mission,level){
//randomly select plhedg variant
//each level has 3 different positioning variants
//the levels are seperated by '&' and the variants are seperated by '|'   

var plhedg = "";

$.get("scripts/mission_maps.txt",function(data,status){
 //alert("Extracting PLHEDG!");
  positions = data.split("*")[3];
  //alert("Positions: \n"+positions);
 //select the mission
  mission_pos = positions.split("•")[mission];
 //select the level
  level_pos = mission_pos.split("&")[level];  
 //select the variant
  var variants = level_pos.split("|");
  //alert("Variants: "+variants);
  plhedg = variants[(Math.floor(Math.random()*variants.length)+1)];
  console.log("Selected Variant: "+plhedg);
  selected_plhedg_variant = plhedg;
});
}

function loadFieldMap(mission, level){
 //load the field map of the slecified
//mission & level
get_PLHEDG_Position(mission,level);

 setTimeout(function(){
  
$.get("scripts/mission_maps.txt",function(data,status){
//alert("Loading Play Field!")
 var mission_lvls = data.split("*")[mission];  
 var lvl = mission_lvls.split("!")[level];
 //alert("Selected Map: \n"+lvl);
 //alert(`Selected POS Variant: ${selected_plhedg_variant}`);

 selected_mission_id = "mission:"+mission;
 //console.log("BREAK 1");
 matrix = node_grid_graph.createFieldMatrix(8,11);
 node_grid_graph.loadField(matrix); 
 //console.log("BREAK 2");
 graph_map = new BlockmanControlCentral(matrix);
   
 console.log("BREAK 3");
 setTimeout(()=>{
    console.log("BREAK 4");
 graph_map.blockField();
    console.log("BREAK 4a");
 graph_map.chartMap(lvl);
   // console.log("BREAK 4b");
 graph_map.placePLHEDG(selected_plhedg_variant);
   //console.log("BREAK 4c");
    
 document.querySelector("#load-screen-modal").classList.replace("w3-show","w3-hide");
 graph_map.altPlayerHealth(5,"+");
 $("#game-aux-modal").hide();
 $("#btn-main-game-timer").click();
  },800);
 //alert(graph_map.getAllFreeTiles());
});
 
 },800);
}


function loadMissionsSelector(){
//Load the missions selector overlay interface.

//alert("Loading Mission Selector")
$("#SUB-OVERLAY").hide();
$("#blockman-game-aux-modal-content").html(missions_select_html);
document.querySelector("#blockman-game-aux-modal-content").classList.add("FLEX-MULTI-LAY");
$("#game-aux-modal").show();

//Mission Selection Handler
var mission_selects = document.getElementsByClassName("btn-mission-select");
 for(let i = 0; i < mission_selects.length; i++){
  mission_selects[i].addEventListener("click",function(){
  //get mission number
  var mssn_number = this.parentElement.getAttribute("mission-number"); 
  selected_mission = mssn_number;
  //alert(`Selected Mission: ${mssn_number}`);
   loadLevelSelector(selected_mission);
 });
} }


function loadLevelSelector(mission){
 //Load the Level selector of a selected/specific mission
var levels_select_string = "";
//alert("Levels Selection");
//get missions maps file
$.get("scripts/mission_maps.txt",function(data){
   //alert("Extracting Mission Map");
   
   var mission_str = data.split("*")[selected_mission];
   //console.log(mission_str);
   var levels_arr = mission_str.split("!");
   //console.log("Levels Count: "+levels_arr.length); 
   levels_arr.forEach((val,i)=>{
    levels_select_string += `
    <div level-number="${i}" style="width:120px;height:fit-content;"class="w3-section w3-bar-item w3-card-4 w3-center pb-3 w3-border w3-round w3-blue-grey">
    <div class="w3-border-white w3-bottombar"><b class="HEAD-STYLE3 w3-medium">LEVEL ${i+1}</b></div>
    <button type="button" style="width:60px;height:30px;margin-top:4px;" class="HEAD-STYLE2 w3-tiny btn-level-select w3-padding-small w3-center w3-btn w3-round w3-flat-nephritis">
    Select &nbsp 
    <span class="fas fa-cube fa-sm"></span>
    </button>
    </div> `;
  });  //alert(levels_string);
});
 setTimeout(function(){
  //load levels
$("#blockman-game-aux-modal-content").html(levels_select_string);  
//alert("Levels Extracted & Set");
 
//Handle Level Selection
var level_selects = document.getElementsByClassName("btn-level-select");
 for(let i = 0; i < level_selects.length; i++){
  level_selects[i].addEventListener("click",function(){
  //get mission number
  var level_number = this.parentElement.getAttribute("level-number"); 
  selected_level = level_number;
  //alert(`Selected Level: ${level_number}`);
  
 loadFieldMap(selected_mission,selected_level);
 }); }
 },500);
}

/*
 * ========================================================
 *
 */
  
 function placeCharacters(){
    
  var free_tiles = graph_map.getAllFreeTiles();
       var ix = 0, jy = 0;
       
       while(ix == jy){
          ix = Math.floor(Math.random()*free_tiles.length);
          jy = Math.floor(Math.random()*free_tiles.length);
       }
       
       cord_x = free_tiles[ix];
       cord_y = free_tiles[jy];
       
       graph_map.placePLHEDG(`p-${cord_x}+h-${cord_y}`);
    
 }

//move character randomly accross map
function AutoPilot(){
   graph_map.move_tick_interval = setInterval(function(){
      
   var dir = Math.floor(Math.random()*4); 
      
switch(dir){
   case 0: 
// console.warn("MOVE-REPEAT: "+graph_map.player_direction)
 graph_map.moveRight(); 
 break;
   case 1: graph_map.moveLeft(); 
 break;
   case 2: graph_map.moveUp(); 
 break;
   case 3: graph_map.moveDown(); 
 break;
 default: graph_map.moveRight();
   break;
}
      
      graph_map.showPlayerMovements();
 //console.warn("MOVE-REPEAT: "+this.player_direction)
},500);

   
}


//move character randomly accross map
function AutoPilotHostile(){
   console.warn("ENGAGING HOSTILE AUTOPILOT !");
   //console.log(`ROUTE TO PLAYER: ${graph_map.hostile_movements}`);
   graph_map.hostile_move_tick_interval = setInterval(function(){
      
  var dir = graph_map.hostile_movements.shift(); 
      //console.log(`HOSTILE movements: ${dir} => ${graph_map.hostile_movements}`);
      
switch(dir){
   case "R": 
 //console.warn("Hostile MOVE-Right: "+graph_map.player_direction)
 graph_map.hostileRight(); 
 break;
   case "L": graph_map.hostileLeft(); 
 break;
   case "U": graph_map.hostileUp(); 
 break;
   case "D": graph_map.hostileDown(); 
 break;
 default: graph_map.hostileRight();
   break;
}
      if(graph_map.hostile_movements.length == 0){
         if(!graph_map.isHostileSuccess()){
            graph_map.resetHostileRoutes();
            
            route = graph_map.getRouteToPlayer();
             //console.log(`ROUTE TO PLAYER: ${route}`);
            rM = graph_map.computeRoutesCombinations(route);
   //printRouteMatrix(rM);
            r_map = graph_map.hostileRouteCompute();
   
            //printRouteMap(r_map);
            graph_map.selectHostileRoute();
         }else{
        graph_map.stopAutoPilotHostile();  
         console.warn("OBJECTIVE COMPLETE!\n AUTO PILOT DISENGAGED!");
         }
      }
      //graph_map.showPlayerMovements();
 //console.warn("MOVE-REPEAT: "+this.player_direction)
},300);

   console.warn("HOSTILE AUTOPILOT ENGAGED!");

}




function moveRepeat(){
console.warn("MOVE-REPEAT: "+graph_map.player_direction)
graph_map.move_tick_interval = setInterval(function(){
 
switch(graph_map.player_direction){
   case "R": 
// console.warn("MOVE-REPEAT: "+graph_map.player_direction)
 graph_map.moveRight(); 
 break;
   case "L": graph_map.moveLeft(); 
 break;
   case "U": graph_map.moveUp(); 
 break;
   case "D": graph_map.moveDown(); 
 break;
 default: console.warn("MOVE-Default: "+graph_map.player_direction); break;
}
   
   
   
 //console.warn("MOVE-REPEAT: "+this.player_direction)
},200);

}

function printRouteMatrix(rM){
   console.log("<=  Printing Routes Matrix  =>");
   rM.forEach((rA,indx)=>{
      //for eah route array, rA
      console.log(`Route ${indx}: ${rA}`);
   })
}

function printRouteMap(rM){
   rM.forEach((v,k)=>{
      console.log(`${k} => ${v}`)
   }
   )
}



     $("#btn-switch-player").click(()=>{
            graph_map.switchPlayer();
      });

     $("#btn-player-activity-update").click(()=>{
       if(graph_map.hasPortalDoor()){
         if(graph_map.portalActivated()){
           Alert("Portal Activated !!")
         }
        }
      });

    $("#btn-pause-game").click(()=>{
       graph_map.stopAutoPilotHostile();
       graph_map.resetHostileRoutes();
       
       getElem("btn-pause-game").style.display = "none";
       getElem("btn-resume-game").style.display = "block";
    })

    $("#btn-resume-game").click(()=>{
       AutoPilotHostile();
       
       getElem("btn-pause-game").style.display = "block";
       getElem("btn-resume-game").style.display = "none";
    })

    $("#btn-reset-game").click(()=>{
       graph_map.removeAllCharactersFromMap();
       
       var free_tiles = graph_map.getAllFreeTiles();
       var ix = 0, jy = 0;
       
       while(ix == jy){
          ix = Math.floor(Math.random()*free_tiles.length);
          jy = Math.floor(Math.random()*free_tiles.length);
       }
       
       cord_x = free_tiles[ix];
       cord_y = free_tiles[jy];
       
       graph_map.placePLHEDG(`p-${cord_x}+h-${cord_y}`);
       console.log("GAME RESET!")
      });

    $("#btn-moveup").click(()=>{
            //graph_map.showPlayerMovements();
            graph_map.moveUp();
      });
      
    $("#btn-movedown").click(()=>{
            //graph_map.showPlayerMovements();
            graph_map.moveDown();
      });
      

    $("#btn-generate-edible").click(()=>{
            graph_map.showPlayerMovements();
            graph_map.addEdible();
     });
   
    $("#btn-remove-edible").click(()=>{
            graph_map.showPlayerMovements();
            graph_map.removeEdible();
     });

     /*
      $("#btn-movetopleft").click(()=>{
            graph_map.moveTopLeft();
      });
      
      $("#btn-movetopright").click(()=>{
            graph_map.moveTopRight();
      });
      
      $("#btn-movebottomright").click(()=>{
            graph_map.moveBottomRight();
      });
      
      $("#btn-movebottomleft").click(()=>{
            graph_map.moveBottomLeft();
      });
      */

      $("#btn-moveleft").click(()=>{
            graph_map.moveLeft();
      });
      
      $("#btn-moveright").click(()=>{
            graph_map.moveRight();
      });
 
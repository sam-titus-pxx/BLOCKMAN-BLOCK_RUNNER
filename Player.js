

class Player{
   
   constructor(x,y){
      this.x = x; this.y = y;
      this.health = 100;
      //this.player_id = generateID();
      this.inventory = new Map();
      this.player_id = this.generateID();
      
      this.max_health = 100;
      this.min_health = 0;
   }
   
   /*var elems_parent = document.getElementsByClassName(`row`)[y];
     var elem = elems_parent.children[x];
    */
   altPosition(x,y){
      this.x = x; this.y = y;
      
     var elems_parent = document.getElementsByClassName(`row`)[y];
     var elem = elems_parent.children[x];
     //console.log(`Player Position Changed:\n${x}, ${y}`);
      if(elem.classList.contains("edible")){
         //console.log(`Player ${this.player_id} Ate an Edible!!`);
         switch(elem.getAttribute("tile-type")){
          case "edible" :
               this.altHealth(parseInt(elem.getAttribute("tile-value")),"+"); 
               break;
          case "super-edible" :
               this.altHealth(parseInt(elem.getAttribute("tile-value")),"+");  
         }
         
      }else if(elem.classList.contains("gate")){
         console.log(`Player ${this.player_id} Arrived a Gate !!`);

      }else if(elem.classList.contains("portal")){
         console.log(`Player ${this.player_id} Entered a Portal !!`);
      }
   }
   
   generateID(){
      var id = "block-";
      for(let i = 0; i < 3; i++){
         id += Math.floor(Math.random()*9);
      }
      return id;
   }
   
   altHealth(amnt,ve){
   switch(ve){
    case "+" :
         this.health += amnt;
         if(this.health > this.max_health){
               this.health = this.max_health;
            }
      break;
    case "-" :
         this.health = this.health - amnt;
     break;
   }
      
 var health_clr = "";
 if(this.health <= 100 && this.health >= 76){
    health_clr = "w3-green";
   }  
 else if(this.health <= 75 && this.health >= 50){
    health_clr = "w3-yellow";
   }  
  else if(this.health < 50 && this.health >= 35){
    health_clr = "w3-orange";
   } 
   else if(this.health < 35){
    health_clr = "w3-red";
   }  
   
  $("#player-health-bar").css({"width":`${this.health}%`});
  var crrnt_color = document.querySelector("#player-health-bar").classList.item(1);
  //alert(crrnt_color);
  document.querySelector("#player-health-bar").classList.replace(crrnt_color,health_clr);

  }
}



class Hostile{
   
   constructor(x,y){
      this.x = x; this.y = y;
      this.health = 100;
      //this.player_id = generateID();
      //this.inventory = new Map();
      this.hostile_id = this.generateID();
      
      this.max_health = 100;
      this.min_health = 0;
   }
   
   /*var elems_parent = document.getElementsByClassName(`row`)[y];
     var elem = elems_parent.children[x];
    */
   altPosition(x,y){
      this.x = x; this.y = y;
      
     var elems_parent = document.getElementsByClassName(`row`)[y];
     var elem = elems_parent.children[x];
     //console.log(`Player Position Changed:\n${x}, ${y}`);
      if(elem.classList.contains("edible")){
         //console.log(`Player ${this.player_id} Ate an Edible!!`);
         switch(elem.getAttribute("tile-type")){
          case "edible" :
               this.altHealth(parseInt(elem.getAttribute("tile-value")),"+"); 
               break;
          case "super-edible" :
               this.altHealth(parseInt(elem.getAttribute("tile-value")),"+");  
         }
         
      }else if(elem.classList.contains("gate")){
         console.log(`Player ${this.player_id} Arrived a Gate !!`);

      }else if(elem.classList.contains("portal")){
         console.log(`Player ${this.player_id} Entered a Portal !!`);
      }
   }
   
   generateID(){
      var id = "block-";
      for(let i = 0; i < 3; i++){
         id += Math.floor(Math.random()*9);
      }
      return id;
   }
   
}















class Portal{
   constructor(x,y){
      this.x = x; this.y = y;
   }
}

class Gate{
   constructor(x,y){
      this.x = x; this.y = y;
      this.maps = new Array();
      this.crrnt_map_index;
   }
}


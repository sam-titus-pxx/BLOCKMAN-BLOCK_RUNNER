

/*
 *THE MAKEUP CLASS OF A NODE 
 */
/*
 * Author: Fatherly P. Titus
 * copyright 2022©
 */


/*
 *         n_T
 *          |
 *  n_L <=  N  =>  n_R
 *          |
 *         n_B
 */


 class MapNode {
   constructor(x,y,data){
   this.data = data;
   
   this.access_level = 1;
   this.node_type = 0;
  
   this.id = "N_#"+data;
   //positioning variables   
   this.x = x;
   this.y = y;
    
   this.tile_color = "white";
   }
        
 setAccessLevel(access_level){
   /*
   * type_number => 0 - plain
   * 1 - player - access_level: 0 - inaccessible
   * 2 - target - access_level: 1 - accessible
   * 3 - hostile - access_level: 1 - accessible
   * 4 - block - access_level: 0 - inaccessible
    */
   this.access_level = access_level;
 }
 
   getID(){
      return this.id;
   }
 
 
   setNodeType(type_number){
    /*
    * type_number => 0 - plain
   * 1 - player
   * 2 - target
   * 3 - hostile
   * 4 - block
   * 6 - 
    */
  // console.log(`Node Cords: X-${this.x}, Y-${this.y}\n`);
   var elems_parent = document.getElementsByClassName("row")[this.y], 
    elem = elems_parent.children[this.x];
  
    this.node_type = type_number;
    switch(type_number){
    case 0 :
    this.tile_color = "white";
    this.access_level = 1;
    elem.style.backgroundColor = this.tile_color;
    elem.setAttribute("data-access",`1`);
    break;
    case 1 :
    this.tile_color = "#194fff";
    this.access_level = 0;
    break;
    case 2 :
    this.tile_color = "green";
    this.access_level = 1;
    break;
    case 3 :
    this.tile_color = "red";
    this.access_level = 1;
    break;
    case 4 :
    this.tile_color = "grey";
    this.access_level = 0;
    elem.style.backgroundColor = this.tile_color;
    elem.setAttribute("data-access",`0`);
   // console.log(`Blocked Node @ X-${this.x},Y-${this.y}`)
    break;
    case 6 : 
      this.tile_color = "blue";
      this.access_level = 0;
      elem.style.backgroundColor = this.tile_color;
      elem.setAttribute("data-access",`0`);
    break;
    default : 
      this.node_type = 0; 
      break;
  }
//   elem.style.backgroundColor = this.tile_color;
  }
 
   setData(data){
      this.data = data;
      this.id = "N_#"+data;
   }
   
   setFlagData(val){
      this.flag_data = (val > 0)? 1 : 0;
   }
   
   setPos(x, y){
      this.x = x; this.y = y;
   }
  
   getAccessID(){
      return this.access_id;
   }
 
   getNodeType(){
    return this.node_type;
   }
   
   isAccessible(){
   return this.access_level == 1;
  }
     
 
   getX(){
      return this.x;
   }
   
   getY(){
      return this.y;
   }
  
     getFlagData(){
      return this.flag_data;
   }
 
     getAccessLevel(){
      return this.access_level;
   }

   
   equals( obj){
      let status = false;
       if(obj instanceof GridNode){
         var node = obj;
         
         if(node.getID() == this.id){
            status = true;
         }
      }
      return status;
   }
    
}


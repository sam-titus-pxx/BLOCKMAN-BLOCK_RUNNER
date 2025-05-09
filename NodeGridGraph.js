/*
 * HANDLES GRID MAP CREATION, FIELD PLACEMENT, AND NODES INITIALIZATION
 */
class NodeGridGraph {
  
  //Terminologies,=>
  /*
   * Node Grid: a 1-D linear array of Nodes, connected linearly(left,right) via Edge to each other
   * Node Grid Matrix: a 2-D array matrix of Node Grids connected bi-directionally(up,down,left,right).
   * 
   * { [A]-[B]-[C] }  {[] [] []} | {[] [] []} | {[] [] []}
   *   |   |   |
   * { [D]-[E]-[F] }
   *   |   |   |
   * { [G]-[H]-[I] }
   */
   
   constructor(){
      console.log("Nodes Grid Graph Initialized Successfully!\n");

   }
   
   
   loadField(matrix){
      
    var rows = matrix.length;
    var columns = matrix[0].length;
    //console.log(`Matrix Row Length: ${rows}\nMatrix Column Length: ${columns}\n`);  
      
    var r_elem, c_elem;
    
    for(let i = 0; i < rows; i++){
       r_elem = document.createElement("div");   
       
       r_elem.setAttribute("id",`r-${i}`);
       r_elem.setAttribute("class",`row row-${i}`);  
         
       for(let j = 0; j < columns; j++){
          c_elem = document.createElement("div");
            
          c_elem.setAttribute("id",`col-${generateID()}`);
          c_elem.setAttribute("class",`col`); 
          c_elem.setAttribute("data-access",`1`);
          c_elem.setAttribute("x",`${j}`);
          c_elem.setAttribute("y",`${i}`);
          c_elem.setAttribute("tile-value","0");
          c_elem.setAttribute("tile-type","plain");
            
          r_elem.append(c_elem);
       } 
         document.querySelector("#FIELD").append(r_elem);
     }
      
       console.log("FIELD MAP LAYED");
      // this.placeFlag(0,0);
   }
   
    createFieldMatrix(height, width){
      /*
       * height => rows
       * width => columns
       */
      var seed_arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let seed = 0,seed_value = "";
      let seed_comp = 0;
      
     // console.log(`Creating Field Matrix\nRows: ${height}\nColumns: ${width}\n\n`);
      /* [],[],[],[],[]
       * [],[],[],[],[]
       */
      var matrix = [];
      var row_arr = [], top_row = [];
      let node = null, last_node = null, top_node = null;
    
      //for each row=>
      //• create "width" number of columns
      for(let rows = 0; rows < height; rows++,seed++){
         for(let cols = 0; cols < width; cols++,seed_comp++){
             seed_value = `${seed_arr.split("")[seed]}${seed_comp}`; 
  //create new column node with "seed_value" as data value 
           node = new GridNode(cols,rows,seed_value);      
           //node.setNodeType(0);
  //if last_node is null: set last_node = node
  //else if last_node != null: add edge between current node and last_node
  // -set last_node to current node;
            if(last_node == null){
               last_node = node;
            }
            else if(last_node !== null){
              node.addEdge("l",last_node);
              last_node = node;
            }
  //if index of current row being filled > 0:
  //set top_node (top neighbor node of crrnt node) 
  // to the cols index of the top_row
  //add edge between the current node and the top node
            if(rows > 0){
              top_node = top_row[cols];
              node.addEdge("t",top_node);
            }
    //set current node to row_arr array index "cols"        
    row_arr[cols] = node;
            
         }
    //reset values for next row
         seed_comp = 0;
         matrix[rows] = row_arr ;
         top_row = row_arr;
         row_arr = [];
         last_node = null;
      }
      
      return matrix;
   }
      
   //creates and returns a new GridNode grid of size 'length'
   createGridNodeArray(length,seed){
      /* SEED => AA AB AC AD AE AF AH...
       * BA BB BC BD BE BF BH...
       * 
       * AA <=> AB <=> AC <=> AD
       * BA <=> BB <=> BC <=> BD
       */
      
    var node_grid = []; //new GridNode[length];
    var seed_value; //string
    let seed_comp = 0;
    
    for(let i = 0; i < length; i++,seed_comp++){
       seed_value = seed+""+seed_comp;
       node_grid[i] = new GridNode(seed_value);
    }
    
    //ln : left node. l : left
    //rn : right node. r : right
    var k=1; //k = right node, k-1 = left node
    for(;k < length;k++){
       node_grid[k-1].addEdge("r", node_grid[k]);
      // node_grid[k].addEdge("l", node_grid[k-1]); 
    }
    return node_grid;
  }
   
   
    printGridNodeArray(nodes){
     let l = 0, len = nodes.length;
     let str = "";
      
     for(;l < len; l++){
         str += (l == len-1)? nodes[l].data : nodes[l].data+" <=> ";
        }console.log(str+"\n\n");
     return str;
    }
    

   printGridNodeMatrix(matrix){
        let sb = "      ";
        let x_line = "";
        for(let i = 0; i < matrix[0].length; i++){
         sb += i+"     ";
         x_line += "====";
        }
        sb += "\n "+x_line+"\n";
        for(let i = 0; i < matrix.length; i++){       
           sb += i+"| ";
           for(let j = 0; j < matrix[0].length; j++){
              sb += matrix[i][j].data+"    ";
            }
            sb += "|\n" ;
        }
        console.log(sb+"\n");
    }
}

function generateID(){
  var id = "";
   for(let i = 0; i < 6; i++){
    id+=Math.floor(Math.random()*9);
  }
  return id;
}


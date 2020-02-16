export function saveToFile(arrayToSave){

    //convert array to string
    let stringToSave = JSON.stringify(arrayToSave)

    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringToSave));
    a.setAttribute('download', 'sticky.txt');
    a.click();
}

let containerArray = [];

export function createArrayFromDiv(parentDiv){
 //create new empty json 
 let objectData = [];

 let currentDivChildren;
 //loop all the children
 for(let index=0;index < parentDiv.children.length;index++){
     currentDivChildren = parentDiv.children[index];

     let currentElement = {};
     //if current element is br, no value is set and no class
     if(currentDivChildren.localName === 'br'){
         currentElement[currentDivChildren.localName] ={
             value: currentDivChildren.textContent
         }
     }               
     //check for the other element (p) if the class is set
     else if(currentDivChildren.localName === 'p'){
         if(currentDivChildren.className != ''){
             currentElement[currentDivChildren.localName] = {
                 value: currentDivChildren.textContent,
                 className : currentDivChildren.className
             }               
         }
         else{
             //no class is set
             currentElement[currentDivChildren.localName] =  {
                 value: currentDivChildren.textContent
             }               
         }
     }
          //check for the other element (button) if the class is set
     else if(currentDivChildren.localName === 'button'){
         if(currentDivChildren.className != ''){
             currentElement[currentDivChildren.localName] = {
                 value: currentDivChildren.innerHTML,
                 className : currentDivChildren.className
             }               
         }
         else{
             //no class is set
             currentElement[currentDivChildren.localName] =  {
                 value: currentDivChildren.innerHTML
             }               
         }
     }

     objectData.push(currentElement);

 }
 containerArray.push(objectData);  
 return containerArray;
}
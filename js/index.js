import {saveToFile,createArrayFromDiv} from './fileHelper.js';
//import 2 functions from fileHelper file

//get buttons and add event listeners
let buttonAdd = document.getElementById('buttonAdd');
buttonAdd.addEventListener('click',addEventHandler);
let buttonSave = document.getElementById('buttonSave');
buttonSave.addEventListener('click',saveEventHandler);
let buttonBrowse = document.getElementById('buttonBrowse');
buttonBrowse.addEventListener('click',browseEventHandler);
let buttonGenerate = document.getElementById('buttonGenerate');
buttonGenerate.addEventListener('click',generateEventHandler);

let containerArray = [];
let loadedJson;
let files;

function addEventHandler() {
    
    let textAreaValue = 'Test value';
    if (textAreaValue === '') {   
        return;
    }
    
    let parentDiv = document.createElement('div');          //creare element div pentru ca avem mai multe noduri
    let buttonRemove = document.createElement('button');
    buttonRemove.innerHTML = "\u00D7";
    buttonRemove.className = 'removesticky';

    let newParagraph = document.createElement('p'); 
    newParagraph.className = 'textAreaClass';  
    let textAreaNode = document.createTextNode(textAreaValue);          //creeaza un nod tip text cu valoarea lui textarea
    newParagraph.appendChild(textAreaNode);

    let space = document.createElement('br');
    let space1 = document.createElement('br');
    let textDate = document.createTextNode(new Date().toDateString().slice(0,20));
    let empty = document.createElement('p');
    empty.className = 'date';
    empty.appendChild(textDate);
     
    parentDiv.appendChild(space);
    parentDiv.appendChild(space1);
    parentDiv.appendChild(empty);
    parentDiv.appendChild(buttonRemove);   
    parentDiv.appendChild(newParagraph);

    document.getElementById('container').prepend(parentDiv);                //appendChild adauga un nod copil
    parseDivElement(parentDiv);

}

function saveEventHandler(){
    //save only there are elements in array
    if(containerArray.length > 0){
        saveToFile(containerArray);//from file fileHelper.js
    }
}

function parseDivElement(parentDiv){
    containerArray = createArrayFromDiv(parentDiv);
}

function browseEventHandler(evt) {
  // FileList object
  files = evt.target.files;
}

function generateEventHandler() {
    //if no file is selected
    if (!files.length) {
        alert('Please select a file!');
        return;
      }

      const reader = new FileReader();
      reader.onload = function fileReadCompleted() {
    
        // when the reader is done, the content is in reader.result.
         console.log(reader.result); 
         loadedJson = JSON.parse(reader.result);
         //loop through each array of objects
         loadedJson.forEach(divArray => {
            let buttonFromFile = divArray[3];
            let dateFromFile = divArray[2];
            let valueFromFile = divArray[4];
            let breakOneFromFile = divArray[0];
            let breakTwoFromFile = divArray[1];

            let parentDiv = document.createElement('div');          //creare element div pentru ca avem mai multe noduri
            let buttonRemove = document.createElement('button');
            buttonRemove.innerHTML = buttonFromFile.button.value;
            buttonRemove.className =buttonFromFile.button.className;
        
            let newParagraph = document.createElement('p'); 
            newParagraph.className = valueFromFile.p.className;  
            let textAreaNode = document.createTextNode(valueFromFile.p.value);          //creeaza un nod tip text cu valoarea lui textarea
            newParagraph.appendChild(textAreaNode);
        
            //if break exist
            if(breakOneFromFile != undefined){
                let space = document.createElement('br');
                parentDiv.appendChild(space);
            }

            if(breakTwoFromFile != undefined){
                let space1 = document.createElement('br');
                parentDiv.appendChild(space1);
            }

            let textDate = document.createTextNode(dateFromFile.p.value);
            let empty = document.createElement('p');
            empty.className = dateFromFile.p.className;
            empty.appendChild(textDate);
            
            
            parentDiv.appendChild(empty);
            parentDiv.appendChild(buttonRemove);   
            parentDiv.appendChild(newParagraph);
        
            document.getElementById('container').prepend(parentDiv); 
    
         });
    
      };
    reader.readAsText(files[0]);

}
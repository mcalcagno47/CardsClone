//============================== SECTION 2==============================
//Workout Complete button will open the modal and also show a short confetti animation

//When you click "Go Back" button, it will reload to the homepage
let goBackBtn = document.getElementById('goBack')
goBackBtn.addEventListener('click', function () {
  //reset modal h2
  document.querySelector(".noteName").innerHTML = "Pick a name for your workout!";
  window.location.reload();
})

//============================= SAVING DATA ====================================
//When user clicks the final save button, the name and the exercise set will be saved as a key/value pair, Name/Cards Drawn
let saveBtn = document.getElementById('saveButton')

//FUNCTION to save favorites data
saveBtn.addEventListener('click', function () {
  // save key/value pair [workout names | array of workout names]
  let name = document.getElementById('workoutName').value;
  let savedNames;
  if (localStorage.getItem('savedWorkouts')) {
    savedNames = [].concat(localStorage.getItem('savedWorkouts'));
  } else {
    savedNames = [];
  }


  let savedNameArray;
  if (localStorage.getItem('savedWorkouts')) {
    savedNameArray = localStorage.getItem('savedWorkouts').split(',');
  } else {
    savedNameArray = [];
  }
  //if name is not unique
  if (savedNameArray.includes(name)){
    document.querySelector(".noteName").innerHTML = "Name taken. Pick another name for your workout.";

  }
  else //it's unique store it 
  {
    savedNames.push(name);
    localStorage.setItem('savedWorkouts', savedNames);

    //reset modal h2
    document.querySelector(".noteName").innerHTML = "Pick a name for your workout!";

    // save key/value pair [workout name | array of cards drawn] to storage
    let numCardsDrawn = document.getElementsByClassName('card').length;
    let card = document.getElementsByClassName('card');
    // console.log(document.getElementsByClassName('card'));
    let cardsDrawn = [];
    for (let i = 0; i < numCardsDrawn; i++) {
      let cardData = [];
      //the link to the card picture
      cardData.push(card[i].children[0].src);
      // console.log(card[i].children[0].src);
      //title of workout
      cardData.push(card[i].children[1].innerText);
      // console.log(card[i].children[1].innerText);
      //instruction of workout
      cardData.push(card[i].children[2].innerText);
      // console.log(card[i].children[2].innerText);

      cardsDrawn.push(cardData)
    }
    localStorage.setItem(name, JSON.stringify(cardsDrawn));
    goToFavorites();
  }
  
}
)

//FUNCTION that takes user to the favorites page (favorites.html)
function goToFavorites() {
  document.location.assign('./favorites.html');
  setTimeout(function () { showFavorites() }, 2000);

}

//FUNCTION for when DOM changes, reset the assigned elements to the new DOM
var oldHref = document.location.href;

window.onload = function () {
  var bodyList = document.querySelector("body")

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;

      }
    });
  });

  var config = {
    childList: true,
    subtree: true
  };

  observer.observe(bodyList, config);
};


//FUNCTION that retrieves favorites saved in local storage and displays buttons of favorites
const favoritesStage = document.getElementById('favoritesStage');

function showFavorites() {
  //Append workout name as a button to UI in favorites.html
  let savedWorkouts = localStorage.getItem('savedWorkouts').split(',');
  // console.log(savedWorkouts);
  if (savedWorkouts[0] != '') {
    for (var i = 0; i < savedWorkouts.length; i++) {
      // console.log("save " + i)
      let button = document.createElement('div');
      button.textContent = savedWorkouts[i];
      button.setAttribute('class', 'button savedWorkout');
      // console.log(button);
      document.querySelector('#favoriteList').append(button);

    }
  }
}


//FUNCTION that listens to favorite buttons, save it to current keyvalue and print cards
let currentKeyValue = '';

$(document).on("click", ".savedWorkout", function (event) {
  event.preventDefault();

  let keyValue = event.currentTarget.innerText;
  // console.log(keyValue);

  //save keyValue to global variable
  currentKeyValue = keyValue;

  //get element
  let cardSaved = JSON.parse(localStorage.getItem(keyValue));
  // console.log(cardSaved);

  //empty printing area
  $("#favoriteCards").empty();

  if (cardSaved != null) {
    //print card 
    for (var i = 0; i < cardSaved.length; i++) {
      // console.log(cardSaved[i]);
      printSaved(cardSaved[i]);
    }
  }

})

//print out cards for the saved workout
function printSaved(card) {

  //print
  //create column div 
  var colDiv = document.createElement("div");
  colDiv.setAttribute("class", "column")
  colDiv.setAttribute("style", "margin:10px;position:relative; width:250px")
  //create card div
  var cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card");
  cardDiv.setAttribute("style", "width:250px");
  cardDiv.setAttribute('style', 'border-radius:10pt');
  //create img element
  var cardImgDisplay = document.createElement("img");
  cardImgDisplay.setAttribute("src", card[0]);
  cardImgDisplay.setAttribute('id', 'cardImgDrawn');
  //create card divider
  var cardDivider = document.createElement("div");
  cardDivider.setAttribute("class", "card-divider");
  cardDivider.setAttribute("id", "exerciseDrawn");
  cardDivider.textContent = card[1];
  //create div with done
  var doneDiv = document.createElement("div");
  doneDiv.setAttribute("class", "text-block");
  doneDiv.setAttribute("style", "position:absolute;top:150px;left:30%; z-index:7;font-size:2rem;display:none");
  doneDiv.textContent = 'D O N E';
  //create exercise description
  var exerciseText = document.createElement("div");
  exerciseText.textContent = card[2];
  exerciseText.setAttribute("id", "exerciseTxtDrawn")
  exerciseText.setAttribute("style", "padding:10%; display:none")

  cardDiv.appendChild(cardImgDisplay);
  cardDiv.appendChild(cardDivider);
  cardDiv.appendChild(exerciseText);
  colDiv.appendChild(cardDiv);
  colDiv.appendChild(doneDiv);
  $("#favoriteCards").append(colDiv);
}

//FUNCTION that allows user to delete current display cards using the currentKeyValue data being displayed
$(document).on("click", "#delWorkout", function (event) {
  event.preventDefault();

  //if not empty get key value and delete it from localStorage and pop it out of stored array
  if (currentKeyValue) {
    //remove from localstorage array 
    let localArray = localStorage.getItem('savedWorkouts').split(',');
    // console.log(localArray);

    if (localArray.includes(currentKeyValue)) {

      for (var i = 0; i < localArray.length; i++) {
        if (localArray[i] === currentKeyValue) {
          //removes current key value from array
          localArray.splice(i, 1);

          //save new and changed array to local storage
          localStorage.setItem('savedWorkouts', localArray);

          //remove the key value pair from the local storage
          localStorage.removeItem(currentKeyValue);

          //display favorites again after clearing list and cards
          $('#favoriteList').empty();
          $('#favoriteCards').empty();
          showFavorites();
        }
      }
    }
  }

})

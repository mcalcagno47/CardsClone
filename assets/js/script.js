//============================== SECTION 1 ==============================
//universal variables

var exerName;
var exerInstructions;
var deckURL = 'https://www.deckofcardsapi.com/api/deck/'

//FUNCTION that draws cards
function drawCardsAPI(cardNum, suit, newD) {

    //clear display and reset 
    $("#rowCards").empty();
    //remove confetti if any   
    for (var i = 0; i < 100; i++) {
        if ($(".confetti-" + i)) {
            $(".confetti-" + i).remove();
        }
    }
    //reset modal h2
    document.querySelector(".noteName").innerHTML = "Pick a name for your workout!";

    //check suit type
    if (suit === "Clubs") {

        //fill clubs deck

        fetch('https://www.deckofcardsapi.com/api/deck/' + newD + '/return/')
            console.log(newD)
            //shuffle clubs cards
            .then(fetch('https://www.deckofcardsapi.com/api/deck/' + newD + '/shuffle/?cards=AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC')
                .then(data => data.json())
                .then(partialD => {
                
                    //create partial deck of clubs
                    var clubsUrl = deckURL + partialD.deck_id + '/draw/?count=' + cardNum;
                    fetch(clubsUrl)
                        .then(response => response.json())
                        .then(clubsHand => {

                            for (var i = 0; i < clubsHand.cards.length; i++) {
                                var clubCard = clubsHand.cards[i];
                                displayCards(clubCard, i);
                            }

                        })
                        .catch(error => console.log('error', error))
                }))
            .catch(error => console.log('error', error));

    }

    if (suit === "Diamonds") {

        //fill deck
        fetch('https://www.deckofcardsapi.com/api/deck/' + newD + '/return/')
            //shuffle clubs cards
            .then(fetch('https://www.deckofcardsapi.com/api/deck/' + newD + '/shuffle/?cards=AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD')
                .then(data => data.json())
                .then(partialD => {
                    //create partial deck of diamonds
                    var diamondsUrl = deckURL + partialD.deck_id + '/draw/?count=' + cardNum;
                    fetch(diamondsUrl)
                        .then(response => response.json())
                        .then(diamondsHand => {
                            
                            for (var i = 0; i < diamondsHand.cards.length; i++) {
                                var diamondsCard = diamondsHand.cards[i];
                               
                                displayCards(diamondsCard, i);
                            }

                        })


                        .catch(error => console.log('error', error))
                }))
            .catch(error => console.log('error', error));
    }

    if (suit === "Hearts") {

        //fill clubs deck
        fetch('https://www.deckofcardsapi.com/api/deck/' + newD + '/return/')
            //shuffle clubs cards
            .then(fetch('https://www.deckofcardsapi.com/api/deck/' + newD + '/shuffle/?cards=AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH')
                .then(data => data.json())
                .then(partialD => {
                    var heartsUrl = deckURL + partialD.deck_id + '/draw/?count=' + cardNum;
                    fetch(heartsUrl)
                        .then(response => response.json())
                        .then(heartsHand => {
                            
                            for (var i = 0; i < heartsHand.cards.length; i++) {
                                var heartCard = heartsHand.cards[i];
                             
                                displayCards(heartCard, i);
                            }

                        })
                        .catch(error => console.log('error', error))
                })

                .catch(error => console.log('error', error))
            );
    }

    if (suit === "Spades") {

        //fill  deck
        fetch('https://www.deckofcardsapi.com/api/deck/' + newD + '/return/')
            //shuffle cards
            .then(fetch('https://www.deckofcardsapi.com/api/deck/' + newD + '/shuffle/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS')
                .then(data => data.json())
                .then(partialD => {
                    spadesUrl = deckURL + partialD.deck_id + '/draw/?count=' + cardNum;
                    fetch(spadesUrl)
                        .then(response => response.json())
                        .then(spadesHand => {

                            for (var i = 0; i < spadesHand.cards.length; i++) {
                                var spadesCard = spadesHand.cards[i];
                                displayCards(spadesCard, i);
                            }

                        })
                        .catch(error => console.log('error', error))
                }))
            .catch(error => console.log('error', error));
    }

    if (suit === "Full Workout") {

        //fill deck
        fetch('https://www.deckofcardsapi.com/api/deck/' + newD + '/return/')
            //shuffle cards
            .then(fetch('https://www.deckofcardsapi.com/api/deck/' + newD + '/shuffle/?remaining=false')
                .then(() => {
                    var deckAllUrl = deckURL + newD+ '/draw/?count=' + cardNum;
                    fetch(deckAllUrl)
                        .then(response => response.json())
                        .then(allHand => {
                            for (var i = 0; i < allHand.cards.length; i++) {
                                var allCard = allHand.cards[i];
                                displayCards(allCard, i);
                            }

                        })
                        .catch(error => console.log('error', error))
                }

                ))
            .catch(error => console.log('error', error));
    }

}


//FUNCTION that displays cards
function displayCards(card, exerciseIndex) {

    //grab important values
    var cardValue = card.value;
    var cardImg = card.image;
    var cardSuit = card.suit;
    var type;

    //card value indicates reps or minutes
    if ((cardValue === "JACK") || (cardValue === "QUEEN") || (cardValue === "KING")) {
        cardValue = '20';
    }
    if (cardValue === "ACE") {
        cardValue = '1';
    }

    // selected suite(s) are matched with specific types of exercises
    if (cardSuit == 'HEARTS') {
        type = 'type=cardio';
    }
    if (cardSuit == 'DIAMONDS') {
        type = 'muscle=abdominals';
    }
    if (cardSuit == 'SPADES') {
        type = 'type=strength';
    }
    if (cardSuit == 'CLUBS') {
        type = 'type=plyometrics';

    }

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "R78wAd5UBLglet+gIcUCSQ==qefnWKvG8uC3WfIv");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch('https://api.api-ninjas.com/v1/exercises?' + type, requestOptions)
        .then(response => response.json())
        .then(result => {
 

            // create cardz for flipping
            var cardContainer = document.createElement("div");
            cardContainer.setAttribute("class", "cardz")

            //create main flipper
            var cardInner = document.createElement("div");
            cardInner.setAttribute("class", "card__inner")

            //create card face front
            var cardFront = document.createElement("div");
            cardFront.setAttribute("class", "card__face card__face--front")

            //create img
            var backCard = document.createElement("img");
            backCard.setAttribute("src", "assets/images/cardBack2.jpg");
            backCard.setAttribute("style", "width:250px; height:400px;");

            //append
            cardFront.appendChild(backCard);
            cardInner.appendChild(cardFront);

            //create column div 
            var colDiv = document.createElement("div");
            colDiv.setAttribute("class", "column card__face card__face--back")
            colDiv.setAttribute("style", "margin:0 0 0 0; position:relative")
            //create card div
            var cardDiv = document.createElement("div");
            cardDiv.setAttribute("class", "card");
            cardDiv.setAttribute("style", "width:250px; border-radius:15px");
            //create img element
            var cardImgDisplay = document.createElement("img");
            cardImgDisplay.setAttribute("src", cardImg);
            cardImgDisplay.setAttribute('id', 'cardImgDrawn');
            //create card divider
            var cardDivider = document.createElement("div");
            cardDivider.setAttribute("class", "card-divider");
            cardDivider.setAttribute("id", "exerciseDrawn");

            //create div with done
            var doneDiv = document.createElement("div");
            doneDiv.setAttribute("class", "text-block");
            doneDiv.setAttribute("style", "position:absolute;top:150px;left:30%; z-index:7;font-size:2rem;display:none");
            doneDiv.textContent = 'D O N E';

            if (cardSuit == 'HEARTS') {
                cardDivider.setAttribute("style", "justify-content:center")
                cardDivider.textContent = cardValue + " Minute(s) of " + result[exerciseIndex].name;
            } else {
                cardDivider.setAttribute("style", "justify-content:center")
                cardDivider.textContent = cardValue + " rep(s) of " + result[exerciseIndex].name;
            }

            //create exercise description
            var exerciseText = document.createElement("div");
            exerciseText.textContent = result[exerciseIndex].instructions;
            exerciseText.setAttribute("id", "exerciseTxtDrawn");
            exerciseText.setAttribute("style", "padding:10%; display:none");

            //append to DOM
            cardDiv.appendChild(cardImgDisplay);
            cardDiv.appendChild(cardDivider);
            cardDiv.appendChild(exerciseText);
            colDiv.appendChild(cardDiv);
            colDiv.appendChild(doneDiv);
            cardInner.appendChild(colDiv);
            cardContainer.appendChild(cardInner);

            $("#rowCards").append(cardContainer);

        }
        )
        .catch(error => console.log('error', error));
}


//FUNCTION to submit form
function submitForm(event) {
    event.preventDefault(event);

    //hide workout complete button
    document.querySelector("#workoutComplete").setAttribute("style", "display:none");

    //capture user input # of cards
    var numCards = document.querySelector("#sliderOutput1").value;


    //capture the card suit
    var selectedSuit = $('input[name="suitBtn"]:checked').val();

    //fetch new deck
    fetch('https://www.deckofcardsapi.com/api/deck/new/')
        .then(response => response.json())
        .then(newDeck => {

            drawCardsAPI(numCards, selectedSuit, newDeck.deck_id);


        })
        .catch(error => console.log('error', error))



}

$("#submitBtn").on("click", submitForm);

//FUNCTION to show and hide exercise instructions
$(document).on("click", ".card-divider", function (event) {
    event.preventDefault();

    var display = event.target.parentNode.querySelector("#exerciseTxtDrawn");
    display.style.display = display.style.display == "none" ? "block" : "none";
})


//FUNCTION section to gray out cards when done and determine when all workout completed
$(document).on("click", "#cardImgDrawn", function (event) {
    event.preventDefault();


    if (this.classList.contains('grayOut')) {
        //change back to color
        this.classList.remove('grayOut');
        this.parentNode.parentNode.querySelector(".text-block").setAttribute("style", "display:none");
    }
    else {
        //gray out image
        this.setAttribute("class", "grayOut");
        this.parentNode.parentNode.querySelector(".text-block").setAttribute("style", "display:block;position:absolute;top:150px;left:30%; z-index:7;font-size:2rem;");
    }

    //determine workout completed
    //capture how many cards there are
    let numCardsDrawn = document.getElementsByClassName('card').length;
    //capture how many cards are grayed out 
    let numGreyCards = document.getElementsByClassName('grayOut').length;

    //if all cards are grayed out then workout complete, show workout complete button
    if (numCardsDrawn === numGreyCards) {

        if (!(typeof on_index === "undefined")) {
            document.querySelector("#workoutComplete").setAttribute("style", "display:block");
        }
    }
    else {
        if (!(typeof on_index === "undefined")) {
            document.querySelector("#workoutComplete").setAttribute("style", "display:none");

            //remove confetti if any
            for (var i = 0; i < 100; i++) {
                if ($(".confetti-" + i)) {
                    $(".confetti-" + i).remove();
                }
            }
        }
    }

})

//FUNCTION to flip open drawn cards once
$(document).on("click", ".card__inner", function () {
    this.classList.add('is-flipped');
})

//FUNCTION to press icon and keep it there
var rad = document.querySelectorAll(".radio-button");
var prev = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function () {
        (prev) ? console.log(prev.value) : null;
        if (this !== prev) {

            if (prev !== null) {
                prev.nextSibling.querySelector(".suits").setAttribute("style", "display:inline");
                prev.nextSibling.querySelector(".workout").setAttribute("style", "display:none;");
                prev.nextSibling.classList.remove("iconClick");

            }

            prev = this;

            prev.nextSibling.querySelector(".suits").setAttribute("style", "display:none");
            prev.nextSibling.querySelector(".workout").setAttribute("style", "display:inline;font-size: 24pt;position: relative;top: -25px;");
            prev.nextSibling.classList.add("iconClick");

        }

    });
}

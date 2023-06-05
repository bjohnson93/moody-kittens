let kittens = []
drawKittens()
/** DONE
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5,
  }
    if (kittens.find(kitten => kitten.name == form.name.value)) 
    alert("There's already a kitten with this name!")
    else if (form.name.value == "")
    alert("You must give this kitten a name")
    else{
      kittens.push(kitten)
      saveKittens()
      drawKittens()
      form.reset()
    }
}
    
    

/** DONE
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**DONE
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens()
  let kittensElem = document.getElementById("kittens")
  let kittensTemplate = ""
  
  kittens.forEach(kitten => {
     kittensTemplate += `
          
     <div class="container card m-1 kitten text-center ${kitten.mood}" id = "card-${kitten.id}">
          <img class="kitten" src="https://www.dogalize.com/wp-content/uploads/2017/11/Sylvester-the-cat.gif" alt="catPic">
          
          <div class="d-flex justify-content-center">${kitten.name}</div>
          <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
          <div class="d-flex justify-content-center">Affection: ${kitten.affection}</div>
          
          
          <button class="btn-${kitten.mood}" onclick="pet('${kitten.id}')">Pet</button>
          <button class="btn-${kitten.mood}" onclick="catnip('${kitten.id}')">Catnip</button>
          <button class="btn-dark btn-${kitten.id} i class="action fa fa-trash text-danger" onclick="deleteKitten('${kitten.id}')">Sayonara, ${kitten.name}!!!</button>
          </div>`
        }) 
        
        kittensElem.innerHTML = kittensTemplate
}



function deleteKitten(kittenId) {
  let index = kittens.findIndex(kitten => kitten.id == kittenId)
  if (index == -1) {
    throw new Error("Invalid Kitten Id")
  }
  kittens.splice(index, 1)
  saveKittens()
}


/**DONE? 
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kitten => kitten.id == id);
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let affectionNumber = Math.random()

  if(affectionNumber > .5) {
  currentKitten.affection++;
     setKittenMood(currentKitten)
     saveKittens()
    } else {
    currentKitten.affection--;
    setKittenMood(currentKitten)
    saveKittens()
  }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "Tolerant"
  currentKitten.affection = 5;
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  document.getElementById("kittens").classList.remove(kitten.mood)
  if(kitten.affection >= 6) {
    kitten.mood = "happy"
  }
  if(kitten.affection <=5){
    kitten.mood = "tolerant"
  }
  if(kitten.affection <= 3) {
    kitten.mood = "angry"
  }
  if(kitten.affection <= 0) {
    kitten.mood = "gone"
  }

  document.getElementById("kittens").classList.add(kitten.mood)
  saveKittens()
}


/**?DONE?
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.length = 0
  saveKittens()
}

/** Done maybe?
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:sting, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();

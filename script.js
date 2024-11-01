
// step:1 Get reference to dom elements 

const container = document.querySelector(".container");

const seats = document.querySelectorAll(".row .seat:not(.sold)");

const count = document.getElementById("count");

const total = document.getElementById("total");

const movieSelect = document.getElementById("movie");

// initialize ticket price
let ticketPrice =+ movieSelect.value
// console.log(ticketPrice)


// step:2 Add event listner

movieSelect.addEventListener("change", (e)=>{
    ticketPrice = e.target.value
    // console.log(ticketPrice)

    setMovieData(e.target.selectedIndex, e.target.value)

    updateSelectedCount();
})

container.addEventListener("click", (e)=>{
    if(e.target.classList.contains("seat") && !e.target.classList.contains("sold")){
        e.target.classList.toggle("selected");


        updateSelectedCount();
    }
})

// step:3 Define function to update selected count and total

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected")

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // console.log(seatsIndex)

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))

    const selectedSeatsCounts = selectedSeats.length;
    // console.log(selectedSeatsCounts)

    count.innerText = selectedSeatsCounts;
    total.innerText = selectedSeatsCounts * ticketPrice ;
}

// step:4 Define function to set selected movie data, in local storage

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex )
    localStorage.setItem("selectedMoviePrice", moviePrice )

}

// step:5 Define function to populate UI with local storage data

function populateUI(){

    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
    console.log(selectedSeats)

}

// step:6 Initialize setup of count, total and UI based on save data

populateUI()
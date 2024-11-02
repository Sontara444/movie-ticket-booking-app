
// step:1 Get reference to dom elements 

const container = document.querySelector(".container");

const seats = document.querySelectorAll(".row .seat:not(.sold)");

const count = document.getElementById("count");

const total = document.getElementById("total");

const movieSelect = document.getElementById("movie");


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

    setMovieData(movieSelect.selectedIndex, movieSelect.value)
}

// step:4 Define function to set selected movie data, in local storage

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex )
    localStorage.setItem("selectedMoviePrice", moviePrice )

}

// step:5 Define function to populate UI with local storage data

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
    // console.log(selectedSeats)

    // if there are selected seats, mark them as selected in the UI
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected")
            }
        })

    }

    // get selected movie data from local storage

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex")

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }

    const selectedMoviePrice = localStorage.getItem("selectedMoviePrice")


}

// step:6 Initialize setup of count, total and UI based on save data

populateUI()

// initialize ticket price
let ticketPrice =+ movieSelect.value

updateSelectedCount()

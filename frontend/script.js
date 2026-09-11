const prices = {
    VIP: 500,
    Premium: 300,
    Regular: 150
};
let seats = [];
let selectedSeats = [];

for (let i = 1; i <= 60; i++) {
    let category;

    if (i <= 20) {
        category = "VIP";
    } else if (i <= 40) {
        category = "Premium";
    } else {
        category = "Regular";
    }

    seats.push({
        id: i,
        category: category
    });
}
function displaySeats() {
    const container = document.getElementById("seatContainer");
    container.innerHTML = "";

    ["VIP", "Premium", "Regular"].forEach(category => {

        const categoryDiv = document.createElement("div");
        categoryDiv.className = "seat-category";

        const heading = document.createElement("h3");
        heading.textContent = `${category} - ₹${prices[category]}`;
        categoryDiv.appendChild(heading);

        const seatsDiv = document.createElement("div");
        seatsDiv.className = "seats";

        seats
            .filter(seat => seat.category === category)
            .forEach(seat => {
                const button = document.createElement("button");
                button.textContent = seat.id;
                button.className = "seat";
                button.dataset.seatId = seat.id;
                if (seat.booked) {
                    button.classList.add("booked");
                    button.disabled = true;
                } else if (selectedSeats.includes(seat.id)) {
                    button.classList.add("selected");
                }
                button.addEventListener("click", () => toggleSeat(seat.id));

                seatsDiv.appendChild(button);
            });

        categoryDiv.appendChild(seatsDiv);
        container.appendChild(categoryDiv);
    });
}

function toggleSeat(seatId) {
    const seat = seats.find(item => item.id === seatId);
    if (!seat || seat.booked) return;

    if (selectedSeats.includes(seatId)) {
        selectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
        selectedSeats.push(seatId);
    }

    updateSummary();
    displaySeats();
}

function updateSummary() {
    const selected = seats.filter(seat => selectedSeats.includes(seat.id));
    document.getElementById("selectedSeats").textContent = selected.length
        ? selected.map(seat => seat.id).join(", ")
        : "None";
    document.getElementById("seatCount").textContent = selected.length;
    document.getElementById("totalAmount").textContent = selected.reduce(
        (total, seat) => total + prices[seat.category],
        0
    );
}

function confirmBooking() {
    const selected = seats.filter(seat => selectedSeats.includes(seat.id));
    if (!selected.length) {
        alert("Please select at least one seat.");
        return;
    }

    selected.forEach(seat => {
        seat.booked = true;
    });

    const bookingList = document.getElementById("bookingList");
    if (bookingList.textContent.trim() === "No bookings yet.") {
        bookingList.textContent = "";
    }

    const booking = document.createElement("div");
    booking.className = "booking-card";
    booking.textContent = `Seats: ${selected.map(seat => seat.id).join(", ")} | Total: ₹${selected.reduce(
        (total, seat) => total + prices[seat.category],
        0
    )}`;
    bookingList.appendChild(booking);

    selectedSeats = [];
    updateSummary();
    displaySeats();
}

document.getElementById("confirmBtn").addEventListener("click", confirmBooking);
displaySeats();

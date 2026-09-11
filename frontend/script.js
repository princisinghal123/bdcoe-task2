const prices = {
    VIP: 500,
    Premium: 300,
    Regular: 150
};

// Create 60 seats
let seats = [];

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

// Display seats
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

                seatsDiv.appendChild(button);
            });

        categoryDiv.appendChild(seatsDiv);
        container.appendChild(categoryDiv);
    });
}

displaySeats();

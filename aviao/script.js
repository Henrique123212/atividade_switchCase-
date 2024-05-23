const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const seatsPerRow = 9;
const basePrice = {
    4: 800,
    5: 800,
    6: 800,
    1: 1000,
    2: 1000,
    3: 1000,
    7: 1000,
    8: 1000,
    9: 1000,
};
const priceModifiers = {
    increase: {
        rows: ['D', 'E', 'F', 'G'],
        percentage: 0.05,
    },
    specialIncrease: {
        rows: ['A', 'J'],
        percentage: 0.50,
    },
    decrease: {
        rows: ['B', 'E', 'H'],
        percentage: -0.20,
    },
};

let selectedSeats = [];
let occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats')) || [];

document.addEventListener('DOMContentLoaded', () => {
    createSeatMap();
    updateSeatStatus();
});

function createSeatMap() {
    const seatMap = document.getElementById('seat-map');
    rows.forEach(row => {
        for (let i = 1; i <= seatsPerRow; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat available';
            seat.id = `${row}${i}`;
            seat.innerText = `${row}${i}`;
            seat.onclick = () => selectSeat(seat.id);
            seatMap.appendChild(seat);
        }
    });
}

function selectSeat(id) {
    const seat = document.getElementById(id);
    if (seat.classList.contains('occupied')) {
        return;
    }
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== id);
    } else {
        seat.classList.add('selected');
        selectedSeats.push(id);
    }
}

function calculatePrice(row, seatNumber) {
    let price = basePrice[seatNumber];
    if (priceModifiers.increase.rows.includes(row)) {
        price += price * priceModifiers.increase.percentage;
    }
    if (priceModifiers.specialIncrease.rows.includes(row)) {
        price += price * priceModifiers.specialIncrease.percentage;
    }
    if (priceModifiers.decrease.rows.includes(row)) {
        price += price * priceModifiers.decrease.percentage;
    }
    return price;
}

function purchaseSeats() {
    const buyerName = document.getElementById('buyer-name').value;
    if (!buyerName) {
        alert('Por favor, insira o nome do comprador.');
        return;
    }

    selectedSeats.forEach(seatId => {
        const [row, seatNumber] = seatId.split(/(\d+)/).filter(Boolean);
        const price = calculatePrice(row, parseInt(seatNumber));
        occupiedSeats.push({ id: seatId, buyer: buyerName, price });
    });

    selectedSeats = [];
    localStorage.setItem('occupiedSeats', JSON.stringify(occupiedSeats));
    updateSeatStatus();
    document.getElementById('buyer-name').value = '';
}

function updateSeatStatus() {
    document.querySelectorAll('.seat').forEach(seat => {
        seat.classList.remove('selected', 'occupied');
        seat.classList.add('available');
    });

    occupiedSeats.forEach(seat => {
        const seatElement = document.getElementById(seat.id);
        if (seatElement) {
            seatElement.classList.remove('available');
            seatElement.classList.add('occupied');
        }
    });
}

function generateReport() {
    const report = document.getElementById('report');
    report.innerHTML = '<h2>Relatório de Assentos</h2>';
    rows.forEach(row => {
        for (let i = 1; i <= seatsPerRow; i++) {
            const seatId = `${row}${i}`;
            const seat = occupiedSeats.find(s => s.id === seatId);
            if (seat) {
                report.innerHTML += `<p>Assento ${seatId}: ${seat.buyer} - R$ ${seat.price.toFixed(2)}</p>`;
            } else {
                report.innerHTML += `<p>Assento ${seatId}: Disponível</p>`;
            }
        }
    });
}

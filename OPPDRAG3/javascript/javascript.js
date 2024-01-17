let hasVoted = false; // Variabel som holder styr på om noen har stemt
let votes = { "PartiA": 0, "PartiB": 0, "PartiC": 0, "PartiD": 0, "PartiE": 0 }; // Lagrer antall stemmer for hvert parti
let PartiAVotes = 0; // Antall stemmer for PartiA (denne variabelen erklæres, men brukes ikke)
let PartiBVotes = 0; // Antall stemmer for PartiB (denne variabelen erklæres, men brukes ikke)
let votedUsers = []; // Liste over brukere som har stemt

// Funksjon for å gå videre til avstemningen
function proceedToVote() {
    const entranceForm = document.querySelector(".entrance-form");
    const name = entranceForm.querySelector("#name").value;
    const contactInfo = entranceForm.querySelector("#contactInfo").value;

    const votedUserKey = name + contactInfo;

    if (votedUsers.includes(votedUserKey)) {
        alert("Du har allerede stemt med dette navnet og kontakinformasjonen. Hver person kan bare stemme én gang.");
        return;
    }

    votedUsers.push(votedUserKey);

    document.getElementById("votePage").style.display = "block";
    document.querySelector(".entrance-container").style.display = "none";
    hasVoted = true;
}

// Funksjon for å stemme på et parti
function stemPåParti(parti) {
    if (hasVoted) {
        votes[parti]++;
        localStorage.setItem("PartiAVotes", PartiAVotes);
        localStorage.setItem("PartiBVotes", PartiBVotes);
        updateChart();
        hasVoted = false; 
    } else {
        alert("Du har allerede stemt. Du kan ikke stemme mer enn én gang.");
    }
}

// Funksjon for å oppdatere grafen med stemmer
function updateChart() {
    const data = Object.values(votes);
    const chartCanvas = document.getElementById("chartCanvas");
    const ctx = chartCanvas.getContext("2d");

    ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

    const colors = ['#FF474C', '#2ecc71', '#8B0000', '#f39c12', '#0000FF'];
    const barWidth = 80;
    const spacing = 30;
    const maxBarHeight = Math.max(...data) * 10;

    for (let i = 0; i < data.length; i++) {
        const barHeight = data[i] * 10;
        const normalizedHeight = (barHeight / maxBarHeight) * (chartCanvas.height - 20);
        ctx.fillStyle = colors[i];
        ctx.fillRect(10 + i * (barWidth + spacing), chartCanvas.height - normalizedHeight, barWidth, normalizedHeight);
        ctx.fillStyle = "#fff";
        ctx.fillText(data[i], 10 + i * (barWidth + spacing) + barWidth / 2, chartCanvas.height - normalizedHeight - 5);
    }

    animateVotes();
}

// Funksjon for å animere antall stemmer
function animateVotes() {
    const animatedNumberElement = document.getElementById("animatedNumber");
    let animatedNumber = 0;

    const intervalId = setInterval(() => {
        const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
        if (animatedNumber < totalVotes) {
            animatedNumber += 5; // Du kan justere animasjonshastigheten
            animatedNumberElement.textContent = animatedNumber;
        } else {
            clearInterval(intervalId);
        }
    }, 20);
}

// Nullstiller stemmestatus ved sidenes innlasting
window.onload = function () {
    hasVoted = false;
    votedUsers = [];
};
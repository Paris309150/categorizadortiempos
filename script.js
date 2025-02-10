let dataEntries = [];
let currentPage = 0;
const entriesPerPage = 10;

// Load data from localStorage on page load
if (localStorage.getItem('dataEntries')) {
    dataEntries = JSON.parse(localStorage.getItem('dataEntries'));
    renderSummary();
    renderTable();
}


document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dau = document.getElementById('dau').value;
    const category = document.getElementById('category').value;
    const age = document.getElementById('age').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const timeDiff = calculateMinutes(startTime, endTime);

    dataEntries.push({ dau, category, age, startTime, endTime, time: timeDiff });

     // Save data to localStorage
     localStorage.setItem('dataEntries', JSON.stringify(dataEntries));
    renderSummary();
    renderTable();
    document.getElementById('entryForm').reset();
});

function calculateMinutes(start, end) {
    const startParts = start.split(":").map(Number);
    const endParts = end.split(":").map(Number);
    return (endParts[0] * 60 + endParts[1]) - (startParts[0] * 60 + startParts[1]);
}

function renderSummary() {
    const summaryTable = document.getElementById('summaryTable');
    summaryTable.innerHTML = ''; 
    const categories = ['C1', 'C2', 'C3', 'C4', 'C5'];

    categories.forEach(category => {
        const filteredEntries = dataEntries.filter(entry => entry.category === category);
        const pediatricPatients = filteredEntries.filter(entry => entry.age === "Pediátrico");
        const adultPatients = filteredEntries.filter(entry => entry.age === "Adulto");

        const pediatricTotalTime = pediatricPatients.reduce((sum, entry) => sum + entry.time, 0);
        const adultTotalTime = adultPatients.reduce((sum, entry) => sum + entry.time, 0);

        const avgTimePediatric = pediatricPatients.length > 0 ? (pediatricTotalTime / pediatricPatients.length).toFixed(2) : "N/A";
        const avgTimeAdult = adultPatients.length > 0 ? (adultTotalTime / adultPatients.length).toFixed(2) : "N/A";

        const pediatricCount = pediatricPatients.length;
        const adultCount = adultPatients.length;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category}</td>
            <td>${pediatricCount}</td>
            <td class="pediatric-avg">${avgTimePediatric} min</td>
            <td>${adultCount}</td>
            <td class="adult-avg">${avgTimeAdult} min</td>
        `;
        summaryTable.appendChild(row);
    });
}


function renderTable() {

    const start = currentPage * entriesPerPage;
    const end = start + entriesPerPage;
    const paginatedEntries = dataEntries.slice(start, end);
    const paginatedTable = document.getElementById('paginatedTable');
    paginatedTable.innerHTML = '';
    paginatedEntries.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.dau}</td>
            <td>${entry.category}</td>
            <td>${entry.age}</td>
            <td>${entry.startTime}</td>
            <td>${entry.endTime}</td>
            <td>${entry.time} min</td>
        `;

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            const entryIndex = dataEntries.indexOf(entry);
            if (entryIndex > -1) {
                dataEntries.splice(entryIndex, 1);
                localStorage.setItem('dataEntries', JSON.stringify(dataEntries));
                renderTable();
                renderSummary();
            }
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        paginatedTable.appendChild(row);
    });

}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    if ((currentPage + 1) * entriesPerPage < dataEntries.length) {
        currentPage++;
        renderTable();
    }
}

document.getElementById('clearButton').addEventListener('click', function() {
    dataEntries = [];
    // Clear data from localStorage
    localStorage.removeItem('dataEntries');
    renderSummary();
    renderTable();
});

document.getElementById('downloadButton').addEventListener('click', function() {
    let textData = "DAU | Categoría | Edad | Hora de Inicio | Hora de Fin | Minutos\n";
    dataEntries.forEach(entry => {
        textData += `${entry.dau} | ${entry.category} | ${entry.age} | ${entry.startTime} | ${entry.endTime} | ${entry.time} min\n`;
    });
    const blob = new Blob([textData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'registro_sar.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

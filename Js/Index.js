// Simulación de datos cargados desde un archivo JSON o una API
const creditData = [
    { type: 'Hipotecario', rate: 3.5, minTerm: 120, maxTerm: 360 },
    { type: 'Consumo', rate: 7.0, minTerm: 12, maxTerm: 60 },
    { type: 'Automotriz', rate: 5.0, minTerm: 12, maxTerm: 36 },
];

// Simulación de la función de la biblioteca de formateo de números
function formatMoney(amount) {
    return `$${amount.toFixed(2)}`;
}

// Generación dinámica del DOM
async function initApp() {
    // Simulación de fetch para cargar datos
    await new Promise(resolve => setTimeout(resolve, 500));

    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="container">
            <h1>Simulador de créditos avanzado</h1>
            <label for="name">Nombre:</label>
            <input type="text" id="name">
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email">
            <label for="creditType">Tipo de Crédito:</label>
            <select id="creditType"></select>
            <label for="amount">Monto del Crédito:</label>
            <input type="number" id="amount">
            <label for="rate">Tasa de Interés (anual):</label>
            <input type="number" id="rate" readonly>
            <label for="term">Plazo:</label>
            <select id="term"></select>
            <button id="calculate">Calcular</button>
            <div id="result"></div>
        </div>
    `;

    const creditTypeSelect = document.getElementById('creditType');
    const rateInput = document.getElementById('rate');
    const termSelect = document.getElementById('term');
    const calculateButton = document.getElementById('calculate');

    creditData.forEach(data => {
        const option = document.createElement('option');
        option.value = data.type;
        option.textContent = data.type;
        creditTypeSelect.appendChild(option);
    });

    function updateLoanDetails() {
        const selectedType = creditTypeSelect.value;
        const { rate, minTerm, maxTerm } = creditData.find(data => data.type === selectedType);
        rateInput.value = rate;
        termSelect.innerHTML = '';
        for (let i = minTerm; i <= maxTerm; i += 12) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i / 12} años`;
            termSelect.appendChild(option);
        }
    }

    creditTypeSelect.addEventListener('change', updateLoanDetails);
    calculateButton.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const rate = parseFloat(rateInput.value) / 100 / 12;
        const term = parseFloat(termSelect.value);
        const monthlyPayment = amount * rate / (1 - Math.pow(1 + rate, -term));
        const totalInterest = monthlyPayment * term - amount;
        const totalPayment = monthlyPayment * term;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>Pago Mensual: ${formatMoney(monthlyPayment)}</p>
            <p>Total en Intereses: ${formatMoney(totalInterest)}</p>
            <p>Total Pagado: ${formatMoney(totalPayment)}</p>
        `;
    });

    updateLoanDetails();
}

initApp();

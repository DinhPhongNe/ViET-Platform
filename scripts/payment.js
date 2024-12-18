const expYearSelect = document.getElementById('expYear');
const currentYear = new Date().getFullYear();

for (let year = 2022; year <= 2042; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    expYearSelect.appendChild(option);
}

document.getElementById('payment-btn').addEventListener('click', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expMonth = document.getElementById('expMonth').value;
    const expYear = document.getElementById('expYear').value;
    const cvv = document.getElementById('cvv').value;

    if (!fullName || !email || !address || !city || !district || !cardNumber || !expMonth || !expYear || !cvv) {
        const errorPopup = document.getElementById('error-popup');
        errorPopup.style.display = 'block';
        setTimeout(() => {
            errorPopup.style.display = 'none';
        }, 4000);
        return;
    }

    const confirmPopup = document.getElementById('payment-confirmation');
    confirmPopup.style.display = 'flex';

    let countdown = 3;
    const countdownElement = document.getElementById('countdown');
    const confirmButton = document.getElementById('confirm-payment');
    const cancelButton = document.getElementById('cancel-payment');

    const interval = setInterval(() => {
        countdownElement.textContent = `Đếm ngược: ${countdown}`;
        if (countdown <= 0) {
            clearInterval(interval);
            countdownElement.textContent = '';
            confirmButton.style.display = 'inline-block';
        }
        countdown--;
    }, 1000);

    cancelButton.addEventListener('click', () => {
        confirmPopup.style.display = 'none';
    });

    confirmButton.addEventListener('click', () => {
        const popup = document.getElementById('payment-popup');
        popup.style.display = 'flex';

        let progress = 0;
        const progressBar = document.getElementById('payment-progress');
        const completeButton = document.getElementById('complete-payment');

        const paymentInterval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);

            if (progress >= 100) {
                clearInterval(paymentInterval);
                completeButton.style.display = 'inline-block';
            }
        }, 500);

        completeButton.addEventListener('click', function () {
            localStorage.setItem('paymentCompleted', 'true');
            window.location.href = 'index.html';
        });
    });
});

if (window.location.href.indexOf("index.html") > -1) {
    if (localStorage.getItem('paymentCompleted') === 'true') {
        const successPopup = document.getElementById('success-popup');
        successPopup.style.display = 'block';

        setTimeout(() => {
            successPopup.style.display = 'none';
        }, 3000);

        localStorage.removeItem('paymentCompleted');
    }
}

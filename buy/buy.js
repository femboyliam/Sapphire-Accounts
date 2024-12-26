document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters for account details
    const urlParams = new URLSearchParams(window.location.search);
    const accountType = urlParams.get('type');
    const price = urlParams.get('price');
    const stock = urlParams.get('stock');

    // Update summary information
    document.getElementById('account-type').textContent = accountType || 'Select Account';
    document.getElementById('summary-type').textContent = accountType || 'N/A';
    document.getElementById('summary-price').textContent = price || '$0.00';
    document.getElementById('summary-stock').textContent = stock || '0';

    // Back button functionality
    document.querySelector('.back-button').addEventListener('click', function(e) {
        e.preventDefault();
        const referrer = document.referrer;
        if (referrer && referrer.includes('steam')) {
            window.location.href = '../steam/index.html';
        } else if (referrer && referrer.includes('epic-game')) {
            window.location.href = '../epic-game/index.html';
        } else {
            window.location.href = '../index.html';
        }
    });

    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentForms = document.querySelectorAll('.payment-form');

    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');

            // Hide all payment forms
            paymentForms.forEach(form => form.style.display = 'none');

            // Show relevant payment form
            const method = this.dataset.method;
            switch(method) {
                case 'paypal':
                    document.getElementById('paypal-form').style.display = 'block';
                    break;
                case 'cashapp':
                    document.getElementById('cashapp-form').style.display = 'block';
                    break;
                case 'bitcoin':
                case 'ethereum':
                    document.getElementById('crypto-form').style.display = 'block';
                    // Update crypto address based on selected method
                    document.getElementById('crypto-address').textContent = 
                        method === 'bitcoin' ? 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' : '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
                    break;
                case 'card':
                    document.getElementById('card-form').style.display = 'block';
                    break;
            }
        });
    });

    // Copy crypto address
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const cryptoAddress = document.getElementById('crypto-address').textContent;
            navigator.clipboard.writeText(cryptoAddress).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
    }

    // Card input formatting
    const cardInputs = document.querySelectorAll('#card-form input');
    cardInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.placeholder === 'MM/YY') {
                this.value = this.value.replace(/\D/g, '')
                    .replace(/(\d{2})(\d)/, '$1/$2')
                    .substring(0, 5);
            } else if (this.placeholder === 'Card Number') {
                this.value = this.value.replace(/\D/g, '')
                    .substring(0, 16);
            } else if (this.placeholder === 'CVV') {
                this.value = this.value.replace(/\D/g, '')
                    .substring(0, 3);
            }
        });
    });

    // Purchase confirmation
    document.getElementById('confirm-purchase').addEventListener('click', function() {
        const selectedPayment = document.querySelector('.payment-option.selected');
        if (!selectedPayment) {
            alert('Please select a payment method');
            return;
        }

        const discord = document.getElementById('discord').value;
        const email = document.getElementById('email').value;

        if (!discord || !email) {
            alert('Please fill in all contact information');
            return;
        }

        // Here you would typically send the purchase data to your backend
        alert('Purchase initiated! Please check your email for further instructions.');
    });
});

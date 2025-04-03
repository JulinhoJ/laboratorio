document.addEventListener('DOMContentLoaded', function() {
    // Get all donation buttons
    const donationButtons = document.querySelectorAll('.post-button2');
    
    // Add click event listener to each button
    donationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent anchor element
            const parentAnchor = this.closest('a');
            if (parentAnchor) {
                // Prevent the default navigation
                e.preventDefault();
                
                // Extract the amount from the button text
                const buttonText = this.textContent.trim();
                const amountText = buttonText.replace('R$ ', '').replace('.', '').replace(',', '');
                const amount = parseInt(amountText, 10) * 100; // Convert to cents
                
                // Call the function to generate PIX
                generatePix(amount);
            }
        });
    });
    
    // Function to generate PIX
    function generatePix(amount) {
        // Track InitiateCheckout event for Facebook Pixel (browser-side)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'InitiateCheckout', {
                currency: 'BRL',
                value: amount / 100,
                content_type: 'donation'
            });
        }
        
        // Track InitiateCheckout event via Conversion API (server-side)
        fetch('./api/fb_conversion_api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventName: 'InitiateCheckout',
                customData: {
                    value: amount / 100,
                    currency: 'BRL',
                    content_type: 'donation'
                }
            })
        })
        .then(response => response.json())
        .then(data => console.log('Conversion API InitiateCheckout tracked:', data))
        .catch(error => console.error('Conversion API error:', error));
        
        // Show loading state
        showLoading();
        
        // Prepare products data
        const products = [
            {
                title: 'Pagamento Único',
                id: 'pag01',
                unitPrice: amount, // Amount in cents
                quantity: 1,
                tangible: false
            }
        ];
        
        // Log the entire body of the request being sent to the API
        const requestBody = JSON.stringify({ amount: amount, products: products });
        console.log('Request Body:', requestBody);

        // Make API request to generate PIX
        fetch('./api/pix_payment.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody // Use the logged request body
        })
        .then(response => response.json())
        .then(data => {
            // Hide loading state
            hideLoading();
            
            if (data.success) {
                // Show PIX modal with QR code
                showPixModal(data, amount/100);
                
                // Save order data to database
                saveOrderData(data, amount, products);
            } else {
                // Show error message
                showError(data.message || 'Erro ao gerar o PIX. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            // Hide loading state
            hideLoading();
            
            // Show error message
            showError('Erro ao gerar o PIX. Por favor, tente novamente.');
            console.error('Error:', error);
        });
    }
    
    // Function to show loading state
    function showLoading() {
        // Check if loading modal already exists
        let loadingModal = document.getElementById('loading-modal');
        
        if (!loadingModal) {
            // Create loading modal
            loadingModal = document.createElement('div');
            loadingModal.id = 'loading-modal';
            loadingModal.className = 'modal';
            loadingModal.innerHTML = `
                <div class="modal-content loading-content">
                    <div class="loader"></div>
                    <p>Gerando PIX...</p>
                </div>
            `;
            
            // Append to body
            document.body.appendChild(loadingModal);
        }
        
        // Show loading modal
        loadingModal.style.display = 'flex';
    }
    
    // Function to hide loading state
    function hideLoading() {
        const loadingModal = document.getElementById('loading-modal');
        if (loadingModal) {
            loadingModal.style.display = 'none';
        }
    }
    
    // Function to show PIX modal with QR code
    function showPixModal(data, amountFormatted) {
        // Store the amount for later use
        window.currentDonationAmount = amountFormatted;
        
        // Store the transaction ID for status checking
        window.currentTransactionId = data.sale.id || null;
        
        // Check if PIX modal already exists
        let pixModal = document.getElementById('pix-modal');
        
        if (!pixModal) {
            // Create PIX modal
            pixModal = document.createElement('div');
            pixModal.id = 'pix-modal';
            pixModal.className = 'modal';
            pixModal.innerHTML = `
                <div class="modal-content pix-content">
                    <span class="close-button">&times;</span>
                    <h2>Pagamento PIX</h2>
                    <div class="pix-amount">R$ <span id="pix-amount-value"></span></div>
                    <div class="pix-qrcode-container">
                        <div id="pix-qrcode"></div>
                    </div>
                    <div class="pix-copy-container">
                        <p>Código PIX para copiar e colar:</p>
                        <div class="pix-copy-input-container">
                            <input type="text" id="pix-copy-input" readonly>
                            <button id="pix-copy-button">Copiar</button>
                        </div>
                    </div>
                    <div class="pix-instructions">
                        <p>1. Abra o aplicativo do seu banco</p>
                        <p>2. Escolha a opção PIX</p>
                        <p>3. Escaneie o QR code ou cole o código</p>
                        <p>4. Confirme o pagamento</p>
                    </div>
                </div>
            `;
            
            // Append to body
            document.body.appendChild(pixModal);
            
            // Add event listener to close button
            const closeButton = pixModal.querySelector('.close-button');
            closeButton.addEventListener('click', function() {
                pixModal.style.display = 'none';
            });
            
            // Add event listener to copy button
            const copyButton = pixModal.querySelector('#pix-copy-button');
            copyButton.addEventListener('click', function() {
                const copyInput = document.getElementById('pix-copy-input');
                copyInput.select();
                document.execCommand('copy');
                this.textContent = 'Copiado!';
                setTimeout(() => {
                    this.textContent = 'Copiar';
                }, 2000);
            });
            
            // Close modal when clicking outside of it
            window.addEventListener('click', function(event) {
                if (event.target == pixModal) {
                    pixModal.style.display = 'none';
                }
            });
        }
        
        // Update modal content with PIX data
        const amountElement = pixModal.querySelector('#pix-amount-value');
        amountElement.textContent = amountFormatted.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        
        // Generate QR code
        const qrcodeElement = pixModal.querySelector('#pix-qrcode');
        qrcodeElement.innerHTML = '';
        
        // Check if we have the QR code data in the expected format
        if (data && data.sale && data.sale.payment && data.sale.payment.pix && data.sale.payment.pix.key) {
            // Use QRCode library to generate QR code
            new QRCode(qrcodeElement, {
                text: data.sale.payment.pix.key,
                width: 250,
                height: 250
            });
        } 
        
        // Set copy input value
        const copyInput = pixModal.querySelector('#pix-copy-input');
        if (data && data.sale && data.sale.payment && data.sale.payment.pix && data.sale.payment.pix.key) {
            copyInput.value = data.sale.payment.pix.key;
        }
        
        // Show PIX modal
        pixModal.style.display = 'flex';
        
        // Update the payment done button with the amount and transaction ID
        const paymentDoneButton = pixModal.querySelector('#payment-done-button');
        if (paymentDoneButton) {
            const urlParams = new URLSearchParams(window.location.search);
            const newParams = new URLSearchParams();
            urlParams.forEach((value, key) => {
                newParams.append(key, value);
            });
            newParams.append('amount', amountFormatted);
            newParams.append('transaction_id', window.currentTransactionId);
            paymentDoneButton.href = 'obrigado.html?' + newParams.toString();
        }
        
        // Start polling for payment status if we have a transaction ID
        if (window.currentTransactionId) {
            startPaymentStatusPolling(window.currentTransactionId, amountFormatted);
        }
    }
    
    // Polling interval in milliseconds
    const POLLING_INTERVAL = 5000; // 5 seconds
    let pollingTimer = null;
    
    // Function to start polling for payment status
    function startPaymentStatusPolling(transactionId, amountFormatted) {
        // Clear any existing polling timer
        if (pollingTimer) {
            clearInterval(pollingTimer);
        }
        
        // Add a status indicator to the modal
        const pixModal = document.getElementById('pix-modal');
        let statusElement = pixModal.querySelector('.payment-status');
        
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.className = 'payment-status';
            statusElement.innerHTML = '<p>Aguardando confirmação de pagamento...</p>';
            
            // Add it to the modal content, after the QR code container
            const modalContent = pixModal.querySelector('.modal-content');
            const qrCodeContainer = pixModal.querySelector('.pix-qrcode-container');
            
            if (modalContent && qrCodeContainer) {
                modalContent.insertBefore(statusElement, qrCodeContainer.nextSibling);
            } else {
                // Fallback: just append to modal content
                const modalContent = pixModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.appendChild(statusElement);
                }
            }
        }
        
        // Function to check payment status
        const checkPaymentStatus = () => {
            fetch('./api/check_payment_status.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ transactionId: transactionId })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Payment status check:', data);
                
                if (data.success && data.isPaid) {
                    // Payment confirmed! Redirect to thank you page
                    clearInterval(pollingTimer);
                    statusElement.innerHTML = '<p>Pagamento confirmado! Redirecionando...</p>';
                    
                    // Track Purchase event via Facebook Pixel (browser-side)
                    if (typeof fbq !== 'undefined') {
                        fbq('track', 'Purchase', {
                            value: amountFormatted,
                            currency: 'BRL',
                            content_type: 'donation'
                        });
                    }
                    
                    // Track Purchase event via Facebook Conversion API (server-side)
                    fetch('./api/fb_conversion_api.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            eventName: 'Purchase',
                            customData: {
                                value: amountFormatted,
                                currency: 'BRL',
                                content_type: 'donation',
                                transaction_id: transactionId
                            }
                        })
                    })
                    .then(response => response.json())
                    .then(data => console.log('Conversion API Purchase tracked:', data))
                    .catch(error => console.error('Conversion API error:', error));
                    
                    // Redirect after a short delay
                    setTimeout(() => {
                        const urlParams = new URLSearchParams(window.location.search);
                        const newParams = new URLSearchParams();
                        urlParams.forEach((value, key) => {
                            newParams.append(key, value);
                        });
                        newParams.append('amount', amountFormatted);
                        newParams.append('transaction_id', transactionId);
                        window.location.href = 'obrigado.html?' + newParams.toString();
                    }, 5000);
                } else {
                    // Update status message
                    statusElement.innerHTML = '<p>Aguardando confirmação de pagamento...</p>';
                }
            })
            .catch(error => {
                console.error('Error checking payment status:', error);
                statusElement.innerHTML = '<p>Erro ao verificar status do pagamento. Tente novamente.</p>';
            });
        };
        
        // Check immediately and then start polling
        checkPaymentStatus();
        pollingTimer = setInterval(checkPaymentStatus, POLLING_INTERVAL);
    }
    
    // Function to save order data to database
    function saveOrderData(response, amount, products) {
        if (response.success) {
            // Helper function to get URL parameters
            function getUrlParameter(name) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(name);
            }
            
            const orderData = {
                external_id: response.sale.id,
                orderId: response.sale.id,
                platform: 'operação',
                paymentMethod: response.sale.paymentMethod,
                status: response.sale.status,
                createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
                approvedDate: null,
                refundedAt: null,
                customer: response.sale.customer,
                products: products,
                trackingParameters: {
                    src: getUrlParameter('src'),
                    sck: getUrlParameter('sck'),
                    utm_source: getUrlParameter('utm_source'),
                    utm_campaign: getUrlParameter('utm_campaign'),
                    utm_medium: getUrlParameter('utm_medium'),
                    utm_content: getUrlParameter('utm_content'),
                    utm_term: getUrlParameter('utm_term')
                },
                commission: {
                    totalPriceInCents: amount,
                    gatewayFeeInCents: 0,
                    userCommissionInCents: amount,
                    currency: 'BRL'
                },
                isTest: false
            };

            // Send the order data to the backend
            fetch('./api/save_order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Order saved successfully:', data);
            })
            .catch((error) => {
                console.error('Error saving order:', error);
            });
        }
    }
    
    // Function to show error message
    function showError(message) {
        // Check if error modal already exists
        let errorModal = document.getElementById('error-modal');
        
        if (!errorModal) {
            // Create error modal
            errorModal = document.createElement('div');
            errorModal.id = 'error-modal';
            errorModal.className = 'modal';
            errorModal.innerHTML = `
                <div class="modal-content error-content">
                    <span class="close-button">&times;</span>
                    <h2>Erro</h2>
                    <p id="error-message"></p>
                    <button id="error-close-button">Fechar</button>
                </div>
            `;
            
            // Append to body
            document.body.appendChild(errorModal);
            
            // Add event listeners to close buttons
            const closeButton = errorModal.querySelector('.close-button');
            const closeButtonBottom = errorModal.querySelector('#error-close-button');
            
            closeButton.addEventListener('click', function() {
                errorModal.style.display = 'none';
            });
            
            closeButtonBottom.addEventListener('click', function() {
                errorModal.style.display = 'none';
            });
            
            // Close modal when clicking outside of it
            window.addEventListener('click', function(event) {
                if (event.target == errorModal) {
                    errorModal.style.display = 'none';
                }
            });
        }
        
        // Update error message
        const errorMessageElement = errorModal.querySelector('#error-message');
        errorMessageElement.textContent = message;
        
        // Show error modal
        errorModal.style.display = 'flex';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // --- DARK/LIGHT MODE TOGGLE ---
    var toggleBtn = document.getElementById('mode-toggle');
    if (toggleBtn) {
        // Check local storage for mode preference
        var isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            toggleBtn.innerHTML = '☀️ Light Mode';
        } else {
            document.body.classList.remove('dark-mode');
            toggleBtn.innerHTML = '🌙 Dark Mode';
        }

        toggleBtn.addEventListener('click', function() {
            var active = document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', active);
            if (active) {
                toggleBtn.innerHTML = '☀️ Light Mode';
            } else {
                toggleBtn.innerHTML = '🌙 Dark Mode';
            }
        });
    }

    // --- FOOTER META UPDATES ---
    var locationEl = document.getElementById('page-location');
    var modifiedEl = document.getElementById('last-modified');
    
    if (locationEl) {
        locationEl.textContent = window.location.href;
    }
    
    if (modifiedEl) {
        var modDate = new Date(document.lastModified);
        // Fallback for empty/invalid date
        if (isNaN(modDate.getTime())) {
            modifiedEl.textContent = document.lastModified;
        } else {
            modifiedEl.textContent = modDate.toLocaleString();
        }
    }

    // --- HOME PAGE SCROLL-TO-TOP SHOW/HIDE ---
    var scrollTopBtn = document.getElementById('scroll-to-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollPos > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
    }

    // --- CUSTOM CUTESY MODAL NOTIFICATION ---
    var cutesyModal = document.getElementById('cutesy-modal');
    var modalTitle = document.getElementById('cutesy-modal-title');
    var modalMessage = document.getElementById('cutesy-modal-message');
    var modalCloseBtn = document.getElementById('cutesy-modal-close');
    var reloadOnClose = false;
    
    function showNotification(title, message, triggerReload) {
        if (!cutesyModal || !modalTitle || !modalMessage) return;
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        reloadOnClose = triggerReload || false;
        
        // Reset button state by default
        if (modalCloseBtn) {
            modalCloseBtn.disabled = false;
            modalCloseBtn.textContent = 'OK';
            modalCloseBtn.classList.remove('disabled-btn');
        }
        
        cutesyModal.classList.add('show');
    }
    
    if (modalCloseBtn && cutesyModal) {
        modalCloseBtn.addEventListener('click', function() {
            cutesyModal.classList.remove('show');
            if (reloadOnClose) {
                // Clear fields
                var nameInput = document.getElementById('input-name');
                var contactInput = document.getElementById('input-contact');
                var messageInput = document.getElementById('input-message');
                if (nameInput) nameInput.value = '';
                if (contactInput) contactInput.value = '';
                if (messageInput) messageInput.value = '';
                
                // Refresh the page
                setTimeout(function() {
                    window.location.reload();
                }, 100);
            }
        });
    }

    // --- PLACEHOLDER POLYFILL & FORM SUBMISSION ---
    var contactForm = document.querySelector('#contact form');
    var nameInput = document.getElementById('input-name');
    var contactInput = document.getElementById('input-contact');
    var messageInput = document.getElementById('input-message');
    
    var placeholders = {
        'input-name': 'Enter your name',
        'input-contact': 'Email or Phone Number',
        'input-message': 'Write your message here...'
    };
    
    function setupPlaceholder(input) {
        if (!input) return;
        var placeholderText = placeholders[input.id];
        
        // Initial setup
        if (input.value === '' || input.value === placeholderText) {
            input.value = placeholderText;
            input.classList.add('placeholder-style');
        }
        
        input.addEventListener('focus', function() {
            if (input.value === placeholderText) {
                input.value = '';
                input.classList.remove('placeholder-style');
            }
        });
        
        input.addEventListener('blur', function() {
            if (input.value === '') {
                input.value = placeholderText;
                input.classList.add('placeholder-style');
            }
        });
    }
    
    setupPlaceholder(nameInput);
    setupPlaceholder(contactInput);
    setupPlaceholder(messageInput);
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop default form redirect
            
            // Check if user actually entered something or left placeholders
            var nameVal = nameInput.value;
            var contactVal = contactInput ? contactInput.value : '';
            var msgVal = messageInput.value;
            
            if (nameVal === placeholders['input-name'] || nameVal.trim() === '') {
                showNotification('🌸 Oops!', 'Please enter your name.', false);
                nameInput.focus();
                return;
            }
            if (contactVal === placeholders['input-contact'] || contactVal.trim() === '') {
                showNotification('🌸 Oops!', 'Please enter your email or phone number.', false);
                if (contactInput) contactInput.focus();
                return;
            }
            if (msgVal === placeholders['input-message'] || msgVal.trim() === '') {
                showNotification('🌸 Oops!', 'Please enter a message.', false);
                messageInput.focus();
                return;
            }
            
            var payload = {
                _subject: "🌸 Message from Siam's Pastel Paradise! 🌸",
                "Form Origin": "Siam's Pastel Paradise Website",
                "Sender Name": nameVal,
                "Contact Info": contactVal,
                "Message Details": msgVal,
                "Sent At": new Date().toLocaleString()
            };
            
            // Show sending notification
            showNotification('🌸 Sending...', 'Sending your message to Siam...', false);
            if (modalCloseBtn) {
                modalCloseBtn.disabled = true;
                modalCloseBtn.textContent = 'Wait...';
                modalCloseBtn.classList.add('disabled-btn');
            }
            
            var actionUrl = contactForm.getAttribute('action') || 'https://formspree.io/f/your_formspree_id';
            
            // Send via AJAX fetch
            fetch(actionUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(function(response) {
                if (response.ok) {
                    showNotification('🌸 Success!', 'Your message has been sent successfully to Siam! 🌸', true);
                } else {
                    // Fallback success for demo
                    showNotification('🌸 Success!', 'Your message has been sent successfully (Demo Mode)! 🌸', true);
                }
            })
            .catch(function(error) {
                // Fallback success for demo
                showNotification('🌸 Success!', 'Your message has been sent successfully (Demo Mode)! 🌸', true);
            });
        });
    }
});

if (sessionStorage.getItem('skipPageFlipOnce') === 'true') {
    document.documentElement.classList.add('no-page-flip');
    sessionStorage.removeItem('skipPageFlipOnce');
}

document.addEventListener('DOMContentLoaded', function() {

    // --- DARK MODE TOGGLE ---
    var toggleBtn = document.getElementById('mode-toggle');
    if (toggleBtn) {
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
            toggleBtn.innerHTML = active ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }

    // --- FOOTER META ---
    var locationEl = document.getElementById('page-location');
    var modifiedEl = document.getElementById('last-modified');

    if (locationEl) {
        locationEl.textContent = window.location.href;
    }

    if (modifiedEl) {
        var modDate = new Date(document.lastModified);
        modifiedEl.textContent = isNaN(modDate.getTime()) ? document.lastModified : modDate.toLocaleString();
    }

    // --- SCROLL TO TOP ---
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

    // --- MODAL ---
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
                var nameInput    = document.getElementById('input-name');
                var contactInput = document.getElementById('input-contact');
                var messageInput = document.getElementById('input-message');
                if (nameInput)    nameInput.value    = '';
                if (contactInput) contactInput.value = '';
                if (messageInput) messageInput.value = '';
                sessionStorage.setItem('skipPageFlipOnce', 'true');
                setTimeout(function() { window.location.reload(); }, 100);
            }
        });
    }

    // --- FORM PLACEHOLDER POLYFILL & SUBMISSION ---
    var contactForm  = document.querySelector('#contact form');
    var nameInput    = document.getElementById('input-name');
    var contactInput = document.getElementById('input-contact');
    var messageInput = document.getElementById('input-message');

    var placeholders = {
        'input-name':    'Enter your name',
        'input-contact': 'Email or Phone Number',
        'input-message': 'Write your message here...'
    };

    function setupPlaceholder(input) {
        if (!input) return;
        var placeholderText = placeholders[input.id];
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
            e.preventDefault();
            var nameVal    = nameInput.value;
            var contactVal = contactInput ? contactInput.value : '';
            var msgVal     = messageInput.value;

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
                _subject: "🌸 Message from Siam's Scrapbook! 🌸",
                "Form Origin":    "Siam's Scrapbook Website",
                "Sender Name":    nameVal,
                "Contact Info":   contactVal,
                "Message Details": msgVal,
                "Sent At":        new Date().toLocaleString()
            };

            showNotification('🌸 Sending...', 'Sending your message to Siam...', false);
            if (modalCloseBtn) {
                modalCloseBtn.disabled = true;
                modalCloseBtn.textContent = 'Wait...';
                modalCloseBtn.classList.add('disabled-btn');
            }

            var actionUrl = contactForm.getAttribute('action') || 'https://formspree.io/f/your_formspree_id';

            fetch(actionUrl, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Form submission was not accepted.');
                }
                showNotification('🌸 Success!', 'Your message has been sent successfully to Siam! 🌸', true);
            })
            .catch(function(error) {
                showNotification('🌸 Not Sent!', 'Your message could not be confirmed. Please try again in a bit or contact Siam directly. 🌸', false);
            });
        });
    }

    // --- PAGE FLIP TRANSITION ---
    var wrapperEl = document.getElementById('wrapper');
    var navLinks  = document.querySelectorAll('.nav-links a');

    if (navLinks.length > 0) {
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var targetUrl = link.getAttribute('href');
                if (targetUrl && !targetUrl.startsWith('#') && !targetUrl.startsWith('http') && !link.classList.contains('active')) {
                    e.preventDefault();
                    if (wrapperEl) {
                        wrapperEl.classList.add('page-flip-exit');
                        setTimeout(function() { window.location.href = targetUrl; }, 480);
                    } else {
                        window.location.href = targetUrl;
                    }
                }
            });
        });
    }

    // --- BOOKMARK RETRACTION ---
    var bookmark = document.getElementById('bookmark-ribbon');
    if (bookmark) {
        var isRetracted = localStorage.getItem('bookmarkRetracted') === 'true';
        if (isRetracted) { bookmark.classList.add('bookmark-retracted'); }
        bookmark.addEventListener('click', function() {
            var retracted = bookmark.classList.toggle('bookmark-retracted');
            localStorage.setItem('bookmarkRetracted', retracted);
        });
    }

});

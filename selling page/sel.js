/**
 * Fibre Reborn - Services Page JavaScript
 * Handles animations, form submissions, and interactive elements
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize other components
    initScrollAnimations();
    initFormValidation();
    initHoverEffects();
    initSmoothScrolling();
});

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Initialize hover effects for service cards
 */
function initHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

/**
 * Validate individual form field
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('is-invalid');
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'هذا الحقل مطلوب');
        return false;
    }
    
    // Validate email fields
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'يرجى إدخال بريد إلكتروني صحيح');
            return false;
        }
    }
    
    // Validate phone fields
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'يرجى إدخال رقم هاتف صحيح');
            return false;
        }
    }
    
    return true;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear field error
 */
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('is-invalid');
    
    const errorMessage = field.parentNode.querySelector('.invalid-feedback');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/**
 * Validate entire form
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Submit B2C Form
 */
function submitB2CForm() {
    const form = document.getElementById('b2cForm');
    const submitBtn = document.querySelector('#b2cModal .btn-primary');
    
    if (!validateForm(form)) {
        showMessage('يرجى تصحيح الأخطاء في النموذج', 'error', 'b2cModal');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: document.getElementById('b2c-name').value,
        phone: document.getElementById('b2c-phone').value,
        product: document.getElementById('b2c-product').value,
        quantity: document.getElementById('b2c-quantity').value,
        notes: document.getElementById('b2c-notes').value,
        type: 'b2c'
    };
    
    // Simulate API call
    setTimeout(() => {
        console.log('B2C Form Data:', formData);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showMessage('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.', 'success', 'b2cModal');
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            bootstrap.Modal.getInstance(document.getElementById('b2cModal')).hide();
            clearMessages('b2cModal');
        }, 2000);
        
    }, 2000);
}

/**
 * Submit B2B Form
 */
function submitB2BForm() {
    const form = document.getElementById('b2bForm');
    const submitBtn = document.querySelector('#b2bModal .btn-primary');
    
    if (!validateForm(form)) {
        showMessage('يرجى تصحيح الأخطاء في النموذج', 'error', 'b2bModal');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        company: document.getElementById('b2b-company').value,
        email: document.getElementById('b2b-email').value,
        product: document.getElementById('b2b-product').value,
        quantity: document.getElementById('b2b-quantity').value,
        notes: document.getElementById('b2b-notes').value,
        type: 'b2b'
    };
    
    // Simulate API call
    setTimeout(() => {
        console.log('B2B Form Data:', formData);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showMessage('تم إرسال طلب عرض السعر بنجاح! سنرسل لك العرض عبر البريد الإلكتروني.', 'success', 'b2bModal');
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            bootstrap.Modal.getInstance(document.getElementById('b2bModal')).hide();
            clearMessages('b2bModal');
        }, 2000);
        
    }, 2000);
}

/**
 * Submit Contact Form
 */
function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.querySelector('#contactModal .btn-primary');
    
    if (!validateForm(form)) {
        showMessage('يرجى تصحيح الأخطاء في النموذج', 'error', 'contactModal');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: document.getElementById('contact-name').value,
        phone: document.getElementById('contact-phone').value,
        email: document.getElementById('contact-email').value,
        fabricType: document.getElementById('contact-fabric-type').value,
        quantity: document.getElementById('contact-quantity').value,
        condition: document.getElementById('contact-condition').value,
        type: 'contact'
    };
    
    // Simulate API call
    setTimeout(() => {
        console.log('Contact Form Data:', formData);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showMessage('تم إرسال طلبك بنجاح! سنتواصل معك لتقييم القماش التالف.', 'success', 'contactModal');
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide();
            clearMessages('contactModal');
        }, 2000);
        
    }, 2000);
}

/**
 * Show message in modal
 */
function showMessage(message, type, modalId) {
    const modal = document.getElementById(modalId);
    const modalBody = modal.querySelector('.modal-body');
    
    // Remove existing messages
    const existingMessages = modalBody.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Insert at the beginning of modal body
    modalBody.insertBefore(messageDiv, modalBody.firstChild);
}

/**
 * Clear messages from modal
 */
function clearMessages(modalId) {
    const modal = document.getElementById(modalId);
    const messages = modal.querySelectorAll('.success-message, .error-message');
    messages.forEach(msg => msg.remove());
}

/**
 * Handle window resize for responsive adjustments
 */
window.addEventListener('resize', function() {
    // Refresh AOS on resize
    AOS.refresh();
});

/**
 * Handle scroll events for additional effects
 */
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

/**
 * Add CSS for form validation
 */
const style = document.createElement('style');
style.textContent = `
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;
    }
`;
document.head.appendChild(style);


/**
 * Fibre Reborn Website JavaScript
 * يحتوي على التفاعلات والحركات المطلوبة للموقع
 */

// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل التمرير السلس للروابط
    initSmoothScroll();
    
    // تفعيل تأثيرات التمرير
    initScrollAnimations();
    
    // تفعيل تأثيرات الحركة عند تحريك الماوس على بطاقات الخدمات
    initServiceCardHover();
    
    // تفعيل نموذج الاتصال
    initContactForm();
    
    // تفعيل شريط التنقل الثابت عند التمرير
    initStickyNavbar();
});

/**
 * تفعيل التمرير السلس للروابط
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // إغلاق القائمة المنسدلة في الشاشات الصغيرة
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

/**
 * تفعيل تأثيرات التمرير
 */
function initScrollAnimations() {
    // تحديد العناصر التي ستتأثر بالتمرير
    const elementsToAnimate = document.querySelectorAll('.section-header, .about-content, .stat-card, .service-card, .accordion-item, .contact-form-wrapper');
    
    // إضافة فئة scroll-animate لجميع العناصر
    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-animate');
    });
    
    // دالة للتحقق من ظهور العناصر في نطاق الرؤية
    function checkVisibility() {
        elementsToAnimate.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // المسافة التي يجب أن يكون فيها العنصر مرئيًا
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // تنفيذ الدالة عند التمرير
    window.addEventListener('scroll', checkVisibility);
    
    // تنفيذ الدالة عند تحميل الصفحة
    checkVisibility();
}

/**
 * تفعيل تأثيرات الحركة عند تحريك الماوس على بطاقات الخدمات
 */
function initServiceCardHover() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // تأثير الحركة عند تحريك الماوس فوق البطاقة
            this.style.transform = 'translateY(-10px)';
            
            // تغيير لون الأيقونة
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // إعادة البطاقة إلى وضعها الأصلي
            this.style.transform = '';
            
            // إعادة الأيقونة إلى وضعها الأصلي
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

/**
 * تفعيل نموذج الاتصال
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على قيم الحقول
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // التحقق من صحة البيانات
            if (!name || !email || !subject || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            // محاكاة إرسال النموذج (في الموقع الحقيقي، سيتم إرسال البيانات إلى الخادم)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> جاري الإرسال...';
            
            // محاكاة تأخير الإرسال
            setTimeout(() => {
                // إعادة تعيين النموذج
                contactForm.reset();
                
                // إظهار رسالة نجاح
                alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.');
                
                // إعادة زر الإرسال إلى حالته الأصلية
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 1500);
        });
    }
}

/**
 * تفعيل شريط التنقل الثابت عند التمرير
 */
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.remove('shadow');
            navbar.style.padding = '1rem 0';
        }
    });
}

/**
 * تفعيل الأكورديون (تم تفعيله تلقائيًا بواسطة Bootstrap)
 * لكن يمكننا إضافة بعض التأثيرات الإضافية
 */
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const button = item.querySelector('.accordion-button');
    const collapse = item.querySelector('.accordion-collapse');
    
    // إضافة تأثير انتقالي عند فتح وإغلاق الأكورديون
    collapse.addEventListener('show.bs.collapse', function() {
        button.style.transition = 'all 0.3s ease';
        item.style.transform = 'scale(1.02)';
        item.style.transition = 'all 0.3s ease';
    });
    
    collapse.addEventListener('hide.bs.collapse', function() {
        item.style.transform = 'scale(1)';
    });
});


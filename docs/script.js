// Добавь этот код в существующий JS файл

// Анимация появления элементов при скролле
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.tech-category, .case-card, .testimonial-card, .service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Плавное появление страницы
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Улучшенная навигация
const nav = document.querySelector('.nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollToTop = document.getElementById('scrollToTop');
    
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
        scrollToTop.classList.add('visible');
        
        // Скрыть навигацию при скролле вниз
        if (window.scrollY > lastScrollY) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
    } else {
        nav.classList.remove('scrolled');
        scrollToTop.classList.remove('visible');
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
});

// Параллакс эффект для героя
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Интерактивные технологии
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
        this.style.color = 'white';
        this.style.transform = 'translateX(12px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = '';
        this.style.color = '';
        this.style.transform = 'translateX(8px) scale(1)';
    });
});

// Анимация статистики
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.round(current) + (stat.textContent.includes('%') ? '%' : '');
        }, 30);
    });
};

// Запуск анимации статистики при попадании в viewport
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

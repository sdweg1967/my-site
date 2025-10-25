// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Закрываем мобильное меню если открыто
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Анимация появления при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Анимируем карточки работ и технологии
document.querySelectorAll('.work-card, .tech-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Фиксированная навигация с эффектом
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    const scrollToTop = document.getElementById('scrollToTop');
    
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
        scrollToTop.classList.add('visible');
    } else {
        nav.classList.remove('scrolled');
        scrollToTop.classList.remove('visible');
    }
});

// Кнопка "Наверх"
document.getElementById('scrollToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Мобильное меню
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    this.classList.toggle('active');
});

// FAQ аккордеон
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = answer.classList.contains('active');
        
        // Закрываем все ответы
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('active');
        });
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
        });
        
        // Открываем текущий если был закрыт
        if (!isActive) {
            answer.classList.add('active');
            question.classList.add('active');
        }
    });
});

// Форма заявки
document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.name.value,
        email: this.email.value,
        projectType: this.projectType.value,
        message: this.message.value,
        date: new Date().toLocaleString('ru-RU')
    };
    
    // В реальном проекте здесь будет отправка на сервер
    // Например, через EmailJS, Formspree или ваш бэкенд
    
    // Имитация успешной отправки
    setTimeout(() => {
        this.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        
        // Очистка формы
        this.reset();
        
        // Можно добавить отправку на почту через EmailJS
        // sendEmail(formData);
    }, 1000);
});

// Функция для отправки email (требует настройки EmailJS)
function sendEmail(formData) {
    // Пример для EmailJS
    emailjs.send('service_id', 'template_id', formData)
        .then(() => {
            console.log('Email отправлен!');
        })
        .catch(error => {
            console.error('Ошибка отправки:', error);
        });
}

// Загрузка страницы
window.addEventListener('load', () => {
    // Добавляем плавное появление элементов
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Закрытие мобильного меню при клике вне его
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});
// Форма заявки с отправкой на почту
document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.name.value,
        email: this.email.value,
        projectType: this.projectType.value,
        message: this.message.value,
        date: new Date().toLocaleString('ru-RU'),
        source: 'Портфолио сайт'
    };
    
    // Показываем уведомление
    this.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    
    // Отправляем данные (простая версия)
    sendToTelegram(formData);
    
    // Очистка формы
    this.reset();
});

// Простая отправка в Telegram (бесплатный вариант)
function sendToTelegram(formData) {
    const botToken = 'YOUR_BOT_TOKEN'; // Нужно создать бота в @BotFather
    const chatId = 'YOUR_CHAT_ID'; // Твой ID в Telegram
    
    const text = `📨 Новая заявка с сайта:
    
👤 Имя: ${formData.name}
📧 Email: ${formData.email}
🎯 Тип проекта: ${formData.projectType}
📝 Сообщение: ${formData.message}
⏰ Время: ${formData.date}`;

    // В реальном проекте нужно использовать бэкенд
    // Пока просто выводим в консоль
    console.log('Заявка:', formData);
    console.log('Текст для Telegram:', text);
    
    // Для реальной отправки раскомментируй:
    // fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({chat_id: chatId, text: text})
    // });
}

// Альтернатива - отправка на email через Formspree
function sendToEmail(formData) {
    // Зарегистрируйся на formspree.io и замени FORM_ID
    fetch('https://formspree.io/f/FORM_ID', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    });
}
// Основные функции остаются теми же, добавляем обработку новой формы

document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.name.value,
        phone: this.phone.value,
        service: this.service.value,
        message: this.message.value,
        date: new Date().toLocaleString('ru-RU'),
        source: 'Сайт портфолио'
    };
    
    // Показываем успешную отправку
    this.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    
    // Отправляем данные (в реальном проекте - на сервер)
    sendNotification(formData);
    
    // Очистка формы
    this.reset();
});

function sendNotification(formData) {
    // В реальном проекте здесь будет отправка на email/telegram
    console.log('Новая заявка:', formData);
    
    // Пример для Telegram (нужно настроить бота)
    // sendToTelegram(formData);
    
    // Пример для EmailJS
    // sendToEmail(formData);
}

// Остальной код из предыдущей версии остается
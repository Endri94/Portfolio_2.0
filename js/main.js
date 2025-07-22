function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
    <div class="loader-content">
      <svg class="loader-spinner" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="var(--primary-color)" stroke-width="4"></circle>
      </svg>
      <span>Loading...</span>
    </div>
  `;
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
}
document.addEventListener('DOMContentLoaded', function () {
    showLoader();
    setTimeout(hideLoader, 3000); // спрячется через 3 секунды


    // Burger menu toggle
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    burger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add shadow to header on scroll
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animation on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.section > .container > *');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.animationPlayState = 'running';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Skills tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');

    // Translations
    const translations = {
        'en': {
            'about': 'About',
            'experience': 'Experience',
            'education': 'Education',
            'skills': 'Skills',
            'projects': 'Projects',
            'testimonials': 'Testimonials',
            'contact': 'Contact',
            'hero_title': 'Hi, I\'m <span class="highlight">Endri Grigoryan</span>',
            'hero_subtitle': 'Frontend-developer',
            'view_work': 'View Work',
            'contact_me': 'Contact Me',
            'about_title': 'About Me',
            'about_text1': 'Here you can tell about yourself, your experience and professional interests. Share what you are passionate about, what technologies you use and what inspires you.',
            'about_text2': 'My experience includes working on various projects, from small websites to complex web applications. I am constantly learning and improving my skills.',
            'name': 'Name:',
            'name-value': 'Endri',
            'email': 'Email:',
            'email-value': 'enik.grigoryan@yandex.ru',
            'experience_years': 'Experience:',
            'experience_value': '31 years',
            'location': 'Location:',
            'location_value': 'Moscow, Russia',
            'experience_title': 'Work Experience',
            'job1_title': 'Frontend Developer',
            'job1_company': 'Company ABC',
            'job1_description': 'Development and maintenance of user interfaces for web applications. Performance and accessibility optimization.',
            'job2_title': 'Web Developer',
            'job2_company': 'Studio XYZ',
            'job2_description': 'Creating responsive websites and online stores. Working with clients and implementing their requirements.',
            'job3_title': 'Intern',
            'job3_company': 'Tech Company',
            'job3_description': 'Learning the basics of web development, participating in team projects, studying modern technologies.',
            'education_title': 'Education',
            'degree1': 'Bachelor of Computer Science',
            'university1': 'ABC University',
            'education_year1': '2015 - 2019',
            'education_desc1': 'Study of algorithms, data structures, web technologies and software development principles.',
            'degree2': 'Web Development Courses',
            'university2': 'Online Platform XYZ',
            'education_year2': '2020',
            'education_desc2': 'Advanced courses on modern frameworks and web development tools.',
            'degree3': 'Certification',
            'university3': 'Organization DEF',
            'education_year3': '2021',
            'education_desc3': 'Certification in specialized technologies and development methodologies.',
            'skills_title': 'Skills',
            'frontend': 'Frontend',
            'backend': 'Backend',
            'tools': 'Tools',
            'projects_title': 'My Projects',
            'project1_title': 'Web Application',
            'project1_desc': 'Full-featured web application using React and Node.js',
            'project2_title': 'Online Store',
            'project2_desc': 'Responsive online store with cart and payment system',
            'project3_title': 'Corporate Website',
            'project3_desc': 'Modern corporate website with animations and CMS',
            'project4_title': 'Mobile App',
            'project4_desc': 'Cross-platform mobile app with React Native',
            'view_project': 'View Project',
            'view_code': 'Code',
            'testimonials_title': 'Testimonials',
            'testimonial1_text': 'Excellent work! Professional approach and attention to detail. The project was completed on time and exceeded all expectations.',
            'testimonial1_name': 'Ivan Petrov',
            'testimonial1_position': 'Director, Company ABC',
            'testimonial2_text': 'Very satisfied with the cooperation. The developer took initiative and offered great solutions for our project.',
            'testimonial2_name': 'Anna Smirnova',
            'testimonial2_position': 'Project Manager, Studio XYZ',
            'testimonial3_text': 'The work was done at a high level. All requirements were taken into account, and the result exceeded expectations. I recommend!',
            'testimonial3_name': 'Dmitry Ivanov',
            'testimonial3_position': 'CEO, Startup DEF',
            'contact_title': 'Contact Me',
            'phone': 'Phone',
            'form_name': 'Your Name',
            'form_email': 'Your Email',
            'form_subject': 'Subject',
            'form_message': 'Your Message',
            'form_submit': 'Send Message',
            'footer_about': 'About Portfolio',
            'footer_about_text': 'This portfolio was created to showcase my skills and projects. You can contact me to discuss cooperation.',
            'footer_links': 'Quick Links',
            'footer_social': 'Social Media',
            'footer_rights': 'My Portfolio. All Rights Reserved.'
        },
        'ru': {
            'about': 'Обо мне',
            'experience': 'Опыт',
            'education': 'Образование',
            'skills': 'Навыки',
            'projects': 'Проекты',
            'testimonials': 'Отзывы',
            'contact': 'Контакты',
            'hero_title': 'Привет, я <span class="highlight">Эндри Григорьян</span>',
            'hero_subtitle': 'Frontend-разработчик',
            'view_work': 'Мои работы',
            'contact_me': 'Связаться',
            'about_title': 'Обо мне',
            'about_text1': 'Здесь вы можете рассказать о себе, своем опыте и профессиональных интересах. Расскажите, чем вы увлекаетесь, какие технологии используете и что вас вдохновляет.',
            'about_text2': 'Мой опыт включает работу над различными проектами, от небольших сайтов до сложных веб-приложений. Я постоянно учусь и совершенствую свои навыки.',
            'name': 'Имя:',
            'name-value': 'Эндри',
            'email': 'Email:',
            'email-value': 'enik.grigoryan@yandex.ru',
            'experience_years': 'Опыт:',
            'experience_value': '31 год',
            'location': 'Местоположение:',
            'location_value': 'Москва, РФ',
            'experience_title': 'Опыт работы',
            'job1_title': 'Frontend разработчик',
            'job1_company': 'Компания ABC',
            'job1_description': 'Разработка и поддержка пользовательских интерфейсов для веб-приложений. Оптимизация производительности и доступности.',
            'job2_title': 'Веб-разработчик',
            'job2_company': 'Студия XYZ',
            'job2_description': 'Создание адаптивных веб-сайтов и интернет-магазинов. Работа с клиентами и реализация их требований.',
            'job3_title': 'Стажер',
            'job3_company': 'Технологическая компания',
            'job3_description': 'Обучение основам веб-разработки, участие в командных проектах, изучение современных технологий.',
            'education_title': 'Образование',
            'degree1': 'Бакалавр компьютерных наук',
            'university1': 'Университет ABC',
            'education_year1': '2015 - 2019',
            'education_desc1': 'Изучение алгоритмов, структур данных, веб-технологий и принципов разработки ПО.',
            'degree2': 'Курсы веб-разработки',
            'university2': 'Онлайн платформа XYZ',
            'education_year2': '2020',
            'education_desc2': 'Продвинутые курсы по современным фреймворкам и инструментам веб-разработки.',
            'degree3': 'Сертификация',
            'university3': 'Организация DEF',
            'education_year3': '2021',
            'education_desc3': 'Сертификация по специализированным технологиям и методологиям разработки.',
            'skills_title': 'Навыки',
            'frontend': 'Frontend',
            'backend': 'Backend',
            'tools': 'Инструменты',
            'projects_title': 'Мои проекты',
            'project1_title': 'Веб-приложение',
            'project1_desc': 'Полнофункциональное веб-приложение с использованием React и Node.js',
            'project2_title': 'Интернет-магазин',
            'project2_desc': 'Адаптивный интернет-магазин с корзиной и системой оплаты',
            'project3_title': 'Корпоративный сайт',
            'project3_desc': 'Современный корпоративный сайт с анимациями и CMS',
            'project4_title': 'Мобильное приложение',
            'project4_desc': 'Кроссплатформенное мобильное приложение с React Native',
            'view_project': 'Посмотреть',
            'view_code': 'Код',
            'testimonials_title': 'Отзывы',
            'testimonial1_text': 'Отличная работа! Профессиональный подход и внимание к деталям. Проект был завершен вовремя и превзошел все ожидания.',
            'testimonial1_name': 'Иван Петров',
            'testimonial1_position': 'Директор, Компания ABC',
            'testimonial2_text': 'Очень доволен сотрудничеством. Разработчик проявил инициативу и предложил отличные решения для нашего проекта.',
            'testimonial2_name': 'Анна Смирнова',
            'testimonial2_position': 'Менеджер проектов, Студия XYZ',
            'testimonial3_text': 'Работа выполнена на высоком уровне. Все требования были учтены, а результат превзошел ожидания. Рекомендую!',
            'testimonial3_name': 'Дмитрий Иванов',
            'testimonial3_position': 'CEO, Стартап DEF',
            'contact_title': 'Свяжитесь со мной',
            'phone': 'Телефон',
            'form_name': 'Ваше имя',
            'form_email': 'Ваш email',
            'form_subject': 'Тема',
            'form_message': 'Ваше сообщение',
            'form_submit': 'Отправить сообщение',
            'footer_about': 'О портфолио',
            'footer_about_text': 'Это портфолио создано для демонстрации моих навыков и проектов. Вы можете связаться со мной для обсуждения сотрудничества.',
            'footer_links': 'Быстрые ссылки',
            'footer_social': 'Социальные сети',
            'footer_rights': 'Мое портфолио. Все права защищены.'
        }
    };

    function changeLanguage(lang) {
        // Save selected language to localStorage
        localStorage.setItem('language', lang);

        // Update active button
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Update content
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', translations[lang][key]);
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });
    }

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'ru';
    changeLanguage(savedLanguage);

    // Language switcher event listeners
    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Initialize EmailJS
    emailjs.init('YOUR_USER_ID'); // Замените на ваш User ID из EmailJS

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: this.name.value,
            email: this.email.value,
            subject: this.subject.value,
            message: this.message.value
        };

        // Send email
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData) // Замените на ваши ID
            .then(() => {
                formMessage.textContent = document.querySelector('[data-i18n="form_success"]')?.textContent || 'Сообщение успешно отправлено!';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, (error) => {
                formMessage.textContent = document.querySelector('[data-i18n="form_error"]')?.textContent || 'Произошла ошибка. Пожалуйста, попробуйте позже.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';

                console.error('EmailJS Error:', error);
            });
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();


});

// Projects data
const projectsData = [
    {
        id: 1,
        title: "DM Leasing Cars",
        category: "markup",
        date: "2024-03-15",
        image: "img/web/leasing.png",
        description: "Адаптивный лендинг лизинговой компании. Полностью валидная вёрстка по макету Figma.",
        tech: ["HTML5", "CSS3", "JavaScript", "Swiper"],
        liveUrl: "https://endri94.github.io/Leasing/",
        codeUrl: "https://github.com/endri94/Leasing"
    },
    {
        id: 2,
        title: "Bicycles Shop",
        category: "markup",
        date: "2024-03-15",
        image: "img/web/veloshop.png",
        description: "Магазин продажи велосипедов",
        tech: ["HTML5", "CSS3", "Figma"],
        liveUrl: "https://endri94.github.io/Bicycles/",
        codeUrl: "https://github.com/endri94/bicycles"
    },
    {
        id: 3,
        title: "Aura",
        category: "skillbox",
        date: "2024-03-16",
        image: "img/skillbox/aura.png",
        description: " Площадка продажи криптостикеров",
        tech: ["HTML5", "CSS3", "Figma", "Javascript", "Swiper"],
        liveUrl: "https://endri94.github.io/Aura_stickers-collection/",
        codeUrl: "https://endri94/Aura_stickers-collection/"
    },
    {
        id: 4,
        title: "Игра в пары",
        category: "js",
        date: "2024-04-29",
        image: "img/js/memory-game.png",
        description: "Игра в пары на JS",
        tech: ["JavaScript"],
        liveUrl: "https://endri94.github.io/Memory-game/",
        codeUrl: "https://endri94/Memory-game/"
    },
    {
        id: 5,
        title: "Lionic",
        category: "skillbox",
        date: "2024-03-15",
        image: "img/skillbox/lionic.png",
        description: "Lionic",
        tech: ["Javascript", "Burger", "HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/Lionic/",
        codeUrl: "https://endri94/Lionic/"
    },
    {
        id: 6,
        title: "W-Wave",
        category: "skillbox",
        date: "2024-04-09",
        image: "img/skillbox/wwave.png",
        description: "Магазин радио-товаров",
        tech: ["Javascript", "Burger", "HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/W-wave-Radio/",
        codeUrl: "https://endri94/W-wave-Radio/"
    },
    {
        id: 7,
        title: "Blanchard",
        category: "skillbox",
        date: "2024-03-15",
        image: "img/skillbox/blanchard.png",
        description: "Арт-галерея Blanchard",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/Blanchard/",
        codeUrl: "https://endri94/Blanchard/"
    },
    {
        id: 8,
        title: "Курсы 3D-моделирования",
        category: "skillbox",
        date: "2024-03-15",
        image: "img/skillbox/3d.png",
        description: "Платформа курсов 3D моделирования",
        tech: ["HTML5", "Bootstrap@4", "Flex"],
        liveUrl: "https://endri94.github.io/3D-Model/",
        codeUrl: "https://endri94/3D-Model/"
    },
    {
        id: 9,
        title: "Евклид",
        category: "skillbox",
        date: "2025-04-26",
        image: "img/skillbox/evklid.png",
        description: "Лендинг строительной компании",
        tech: ["JavaScript", "Tabs", "Burger", "Swiper", "HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/Evklid/",
        codeUrl: "https://github.com/Endri94/Evklid"
    },
    {
        id: 10,
        title: "Lagoona",
        category: "skillbox",
        date: "2024-06-03",
        image: "img/skillbox/lagoona.png",
        description: "Сеть отелей для отдыха",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/lagoona/",
        codeUrl: "https://github.com/Endri94/lagoona"
    },
    {
        id: 11,
        title: "Tealuxe",
        category: "markup",
        date: "2024-03-15",
        image: "img/web/tealuxe.png",
        description: "Магазин продажи премиум чая",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/TeaLuxe/",
        codeUrl: "https://github.com/Endri94/TeaLuxe"
    },
    {
        id: 12,
        title: "AirPods Max",
        category: "markup",
        date: "2024-03-16",
        image: "img/web/airpods.png",
        description: "Лендинг страницы продажи наушников",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/AirPods-Max/",
        codeUrl: "https://github.com/Endri94/AirPods-Max"
    },
    {
        id: 13,
        title: "Fanatic",
        category: "markup",
        date: "2024-03-16",
        image: "img/web/fanatic.png",
        description: "Лендинг страницы продажи сап-досок",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/FANATIC/",
        codeUrl: "https://github.com/Endri94/FANATIC"
    },
    {
        id: 14,
        title: "3D Parallax",
        category: "markup",
        date: "2024-03-19",
        image: "img/web/3d-parallax.png",
        description: "Parallax эффект",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/3D-Parallax/",
        codeUrl: "https://github.com/Endri94/3D-Parallax"
    },
    {
        id: 15,
        title: "Iphone 14 Pro",
        category: "markup",
        date: "2024-03-18",
        image: "img/web/iphone-14.png",
        description: "Лендинг страницы продажи айфона",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/Iphone-14ProMax/",
        codeUrl: "https://github.com/Endri94/Iphone-14ProMax"
    },
    {
        id: 16,
        title: "Oculus",
        category: "markup",
        date: "2024-03-19",
        image: "img/web/oculus.png",
        description: "Лендинг страницы продажи VR-очков",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/Oculus-VR/",
        codeUrl: "https://github.com/Endri94/Oculus-VR"
    },
    {
        id: 17,
        title: "Animation",
        category: "markup",
        date: "2024-03-18",
        image: "img/web/3d-animation.png",
        description: "Эффект анимации",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/3D-Animation/",
        codeUrl: "https://github.com/Endri94/3D-Animation"
    },
    {
        id: 18,
        title: "MNTN",
        category: "markup",
        date: "2024-03-22",
        image: "img/web/mntn.png",
        description: "Страница турпохода в горы",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/MNTN/",
        codeUrl: "https://github.com/Endri94/MNTN"
    },
    {
        id: 19,
        title: "Xiaomi HIMO Bicycle",
        category: "markup",
        date: "2024-03-19",
        image: "img/web/xiaomi.png",
        description: "Лендинг страницы продажи велосипеда",
        tech: ["HTML5", "CSS3", "Tabs"],
        liveUrl: "https://endri94.github.io/HIMO/",
        codeUrl: "https://github.com/Endri94/HIMO"
    },
    {
        id: 20,
        title: "Loft-house",
        category: "markup",
        date: "2024-03-24",
        image: "img/web/loft-house.png",
        description: "Лендинг сайта продажи квартир премиум класса",
        tech: ["HTML5", "CSS3", "Tabs", "YouTube LightBox", "UI/UX"],
        liveUrl: "https://endri94.github.io/Loft-House/",
        codeUrl: "https://github.com/Endri94/Loft-House"
    },
    {
        id: 21,
        title: "Kropp-Fitness",
        category: "markup",
        date: "2024-03-24",
        image: "img/web/kropp.png",
        description: "Страница о фитнес-центре",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/KROPP/",
        codeUrl: "https://github.com/Endri94/KROPP"
    },
    {
        id: 22,
        title: "Coffee Shop",
        category: "markup",
        date: "2024-03-29",
        image: "img/web/coffee-shop.png",
        description: "Кофейный магазин",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/Coffee-Shop/",
        codeUrl: "https://github.com/Endri94/Coffee-Shop"
    },
    {
        id: 23,
        title: "Dior",
        category: "markup",
        date: "2024-05-26",
        image: "img/web/dior.png",
        description: "Лендинг новой коллекции от дома Диор",
        tech: ["HTML5", "CSS3", "UI/UX", "Swiper", "Tabs"],
        liveUrl: "https://endri94.github.io/Dior/",
        codeUrl: "https://github.com/Endri94/Dior"
    },
    {
        id: 24,
        title: "Lava Roasters",
        category: "markup",
        date: "2024-03-31",
        image: "img/web/lava.png",
        description: "Страница продажи аксессуаров для приготовления кофе",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/Lava-Roasters/",
        codeUrl: "https://github.com/Endri94/Lava-Roasters"
    },
    {
        id: 25,
        title: "Alivio",
        category: "markup",
        date: "2024-04-01",
        image: "img/web/alivio.png",
        description: "Лендинг страницы",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/Alivio/",
        codeUrl: "https://github.com/Endri94/Alivio"
    },
    {
        id: 26,
        title: "Collection",
        category: "markup",
        date: "2024-04-02",
        image: "img/web/collection.png",
        description: "Страница бренда повседневной одежды",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/Collection/",
        codeUrl: "https://github.com/Endri94/Collection"
    },
    {
        id: 27,
        title: "2rism",
        category: "markup",
        date: "2024-04-07",
        image: "img/web/2rism.png",
        description: "Страница туроператора",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/2rism/",
        codeUrl: "https://github.com/Endri94/2rism"
    },
    {
        id: 28,
        title: "Fashion",
        category: "markup",
        date: "2024-04-11",
        image: "img/web/fashion.png",
        description: "Лендинг страницы бренда одежды",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/FASHION/",
        codeUrl: "https://github.com/Endri94/FASHION"
    },
    {
        id: 29,
        title: "Candler",
        category: "markup",
        date: "2024-03-15",
        image: "img/web/candles.png",
        description: "Магазин продажи кастомных свечей для дома",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/Candles-Store/",
        codeUrl: "https://github.com/Endri94/Candles-Store"
    },
    {
        id: 30,
        title: "Зеленая палитра",
        category: "markup",
        date: "2024-03-15",
        image: "img/web/green-palette.png",
        description: "Лендинг страницы для садоводов",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/Green-Palette/",
        codeUrl: "https://github.com/Endri94/Green-Palette"
    },
    {
        id: 31,
        title: "Modimal",
        category: "markup",
        date: "2024-03-15",
        image: "img/web/modimal.png",
        description: "Магазин дизайнерской одежды для женщин",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/Modimal/",
        codeUrl: "https://github.com/Endri94/Modimal"
    },
    {
        id: 32,
        title: "3legant",
        category: "markup",
        date: "2024-04-28",
        image: "img/web/elegant.png",
        description: "Магазин продажи наушников",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/3legant-store/",
        codeUrl: "https://github.com/Endri94/3legant-store"
    },
    {
        id: 33,
        title: "Blog",
        category: "markup",
        date: "2024-05-06",
        image: "img/web/fashion-blog.png",
        description: "Лендинг блога о моде",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/Fashion-Blog-Template/",
        codeUrl: "https://github.com/Endri94/Fashion-Blog-Template"
    },
    {
        id: 34,
        title: "Konstruct",
        category: "markup",
        date: "2024-05-07",
        image: "img/web/konstrukt.png",
        description: "Страница различных инженерных решений",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/KonstruKt/",
        codeUrl: "https://github.com/Endri94/KonstruKt"
    },
    {
        id: 35,
        title: "PodOfCast",
        category: "markup",
        date: "2024-05-14",
        image: "img/web/podcast.png",
        description: "Лендинг подкаст плафтормы",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/PodOfCast/",
        codeUrl: "https://github.com/Endri94/PodOfCast"
    },
    {
        id: 36,
        title: "Good4Me",
        category: "markup",
        date: "2024-05-15",
        image: "img/web/good.png",
        description: "Магазинов витаминов для здоровья",
        tech: ["HTML5", "CSS3", "UI/UX"],
        liveUrl: "https://endri94.github.io/Good4Me/",
        codeUrl: "https://github.com/Endri94/Good4Me"
    },
    {
        id: 37,
        title: "AskExperts",
        category: "markup",
        date: "2024-05-18",
        image: "img/web/ask.png",
        description: "Лендинг компании для юр. консультации",
        tech: ["HTML5", "CSS3", "UI/UX", "Многостраничный", "Javascript"],
        liveUrl: "https://endri94.github.io/Ask-Experts/",
        codeUrl: "https://github.com/Endri94/Ask-Experts"
    },
    {
        id: 38,
        title: "Your-Meal",
        category: "markup",
        date: "2024-05-25",
        image: "img/web/your-meal.png",
        description: "Лендинг сайта для заказа еды",
        tech: ["HTML5", "CSS3", "UI/UX", "Tabs", "Javascript"],
        liveUrl: "https://endri94.github.io/Your-Meal/",
        codeUrl: "https://github.com/Endri94/Your-Meal"
    },
    {
        id: 39,
        title: "Dananz",
        category: "markup",
        date: "2024-05-27",
        image: "img/web/dananz.png",
        description: "Лендинг Dananz",
        tech: ["HTML5", "CSS3", "UI/UX", "Tabs", "Javascript", "Многостраничный"],
        liveUrl: "https://endri94.github.io/Dananz/",
        codeUrl: "https://github.com/Endri94/Dananz"
    },
    {
        id: 40,
        title: "FinSweet",
        category: "markup",
        date: "2024-05-30",
        image: "img/web/dananz.png",
        description: "Страница FinSweet",
        tech: ["HTML5", "CSS3", "UI/UX", "Tabs", "Javascript", "Многостраничный"],
        liveUrl: "https://endri94.github.io/FinSweet/",
        codeUrl: "https://github.com/Endri94/FinSweet"
    },
    {
        id: 41,
        title: "Cargo",
        category: "markup",
        date: "2024-06-06",
        image: "img/web/cargo.png",
        description: "Лендинг логистической компании по доставке грузов из Китая",
        tech: ["HTML5", "CSS3", "UI/UX", "Tabs", "Javascript", "Многостраничный"],
        liveUrl: "https://endri94.github.io/Cargo-Master/",
        codeUrl: "https://github.com/Endri94/Cargo-Master"
    },
    {
        id: 42,
        title: "Escape",
        category: "markup",
        date: "2024-06-16",
        image: "img/web/escape.png",
        description: "Страница о ментальном здоровье",
        tech: ["HTML5", "CSS3", "UI/UX", "Tabs", "Javascript", "Многостраничный"],
        liveUrl: "https://endri94.github.io/Escape/",
        codeUrl: "https://github.com/Endri94/Escape"
    },
    {
        id: 43,
        title: "E-commerce",
        category: "markup",
        date: "2025-07-03",
        image: "img/web/e-commerse.png",
        description: "Главная страница магазина одежды",
        tech: ["HTML5", "CSS3", "UI/UX", "Tabs", "Javascript", "Многостраничный", "Cookie", "JustValidate"],
        liveUrl: "https://endri94.github.io/Urban/",
        codeUrl: "https://github.com/Endri94/Urban"
    },
    {
        id: 44,
        title: "VK-Маруся",
        category: "react",
        date: "2025-07-22",
        image: "img/react/vk-marusia.png",
        description: "Стриминговый сервис",
        tech: ["HTML5", "CSS3", "UI/UX", "Tabs", "TypeScript", "Многостраничный", "React", "Axios"],
        liveUrl: "https://vk-marusia-ecru.vercel.app/",
        codeUrl: "https://github.com/Endri94/vk-marusia"
    },
    {
        id: 45,
        title: "Briaton",
        category: "js",
        date: "2025-05-22",
        image: "img/js/briaton.png",
        description: "Магазин товаров",
        tech: ["HTML5", "CSS3", "UI/UX", "Tabs", "JS"],
        liveUrl: "https://endri94.github.io/Briaton/",
        codeUrl: "https://github.com/Endri94/Briaton"
    },
    {
        id: 46,
        title: "Список фильмов - localStorage",
        category: "js",
        date: "2025-05-22",
        image: "img/js/js.png",
        description: "Списко фильмов с хранением в LS",
        tech: ["HTML5", "CSS3", "JS"],
        liveUrl: "https://endri94.github.io/Film-list/",
        codeUrl: "https://github.com/Endri94/Film-list"
    },
    {
        id: 47,
        title: "Список фильмов - Server",
        category: "js",
        date: "2025-05-22",
        image: "img/js/js-1.png",
        description: "Списко фильмов с хранением на сервере",
        tech: ["HTML5", "CSS3", "JS"],
        liveUrl: "https://endri94.github.io/films-list-server/",
        codeUrl: "https://github.com/Endri94/films-list-server"
    },
    {
        id: 48,
        title: "Delivery",
        category: "js",
        date: "2025-06-13",
        image: "img/js/js-2.png",
        description: "Приложение Доставка",
        tech: ["HTML5", "CSS3", "JS"],
        liveUrl: "https://endri94.github.io/Delivery-app/",
        codeUrl: "https://github.com/Endri94/Delivery-app"
    },
    {
        id: 49,
        title: "Склад",
        category: "js",
        date: "2025-06-14",
        image: "img/js/js.png",
        description: "Приложение Склад вещей или товаров",
        tech: ["HTML5", "CSS3", "JS"],
        liveUrl: "https://endri94.github.io/Warehouse-modules/",
        codeUrl: "https://github.com/Endri94/Warehouse-modules"
    },
    {
        id: 50,
        title: "Skillbox 4.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Стилизация гибкого компонента",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-layout-4.1/",
        codeUrl: "https://github.com/Endri94/web-layout-4.1"
    },
    {
        id: 51,
        title: "Skillbox 4.2",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Вёрстка гибкого компонента",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-layout-4.2/",
        codeUrl: "https://github.com/Endri94/web-layout-4.2"
    },
    {
        id: 53,
        title: "Skillbox 4.3",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Доработка и модификация гибкого компонента",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-4.3/",
        codeUrl: "https://github.com/Endri94/web-4.3"
    },
    {
        id: 54,
        title: "Skillbox 5.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Вёрстка основного содержимого страницы",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-5.1/",
        codeUrl: "https://github.com/Endri94/web-5.1"
    },
    {
        id: 55,
        title: "Skillbox 5.2",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Вёрстка разделов страницы",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-5.2/",
        codeUrl: "https://github.com/Endri94/web-5.2"
    },
    {
        id: 56,
        title: "Skillbox 5.3.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Доработка разделов страницы",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-5.3.1/",
        codeUrl: "https://github.com/Endri94/web-5.3.1"
    },
    {
        id: 57,
        title: "Skillbox 5.3.2",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Доработка разделов страницы",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-5.3.2/",
        codeUrl: "https://github.com/Endri94/web-5.3.2"
    },
    {
        id: 58,
        title: "Skillbox 6.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Вёрстка формы подачи заявки",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-6.1/",
        codeUrl: "https://github.com/Endri94/web-6.1"
    },
    {
        id: 59,
        title: "Skillbox 6.2.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Верстка страниц входа и регистрации",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-6.2.1/",
        codeUrl: "https://github.com/Endri94/web-6.2.1"
    },
    {
        id: 60,
        title: "Skillbox 6.2.2",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Верстка страниц входа и регистрации",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-6.2.2/",
        codeUrl: "https://github.com/Endri94/web-6.2.2"
    },
    {
        id: 61,
        title: "Skillbox 6.2.3",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Верстка страниц входа и регистрации",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-6.2.3/",
        codeUrl: "https://github.com/Endri94/web-6.2.3"
    },
    {
        id: 62,
        title: "Skillbox 7.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Адаптивная вёрстка страницы статей",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-7.1/",
        codeUrl: "https://github.com/Endri94/web-7.1"
    },
    {
        id: 63,
        title: "Skillbox 7.2.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Адаптивная вёрстка страниц «Клиентам» и «Партнёрам»",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-7.2.1/",
        codeUrl: "https://github.com/Endri94/web-7.2.1"
    },
    {
        id: 64,
        title: "Skillbox 7.2.2",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Адаптивная вёрстка страниц «Клиентам» и «Партнёрам»",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-7.2.2/",
        codeUrl: "https://github.com/Endri94/web-7.2.2"
    },
    {
        id: 65,
        title: "Skillbox 8.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Резиновая вёрстка страницы «О компании»",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-8.1/",
        codeUrl: "https://github.com/Endri94/web-8.1"
    },
    {
        id: 66,
        title: "Skillbox 8.2.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Резиновая вёрстка страницы «Результаты поиска»",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-8.2.1/",
        codeUrl: "https://github.com/Endri94/web-8.2.1"
    },
    {
        id: 67,
        title: "Skillbox 8.2.2",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Резиновая вёрстка страницы «Результаты поиска»",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-8.2.2/",
        codeUrl: "https://github.com/Endri94/web-8.2.2"
    },
    {
        id: 68,
        title: "Skillbox 8.3",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Доработка резиновой вёрстки страницы «Привилегии»",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-8.3/",
        codeUrl: "https://github.com/Endri94/web-8.3"
    },
    {
        id: 69,
        title: "Skillbox 9.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Разработка микроанимаций",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-9.1/",
        codeUrl: "https://github.com/Endri94/web-9.1"
    },
    {
        id: 70,
        title: "Skillbox 9.2",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Разработка многоступенчатой анимации",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-9.2/",
        codeUrl: "https://github.com/Endri94/web-9.2"
    },
    {
        id: 71,
        title: "Skillbox 9.3",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Разработка анимаций мобильной версии",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-9.3/",
        codeUrl: "https://github.com/Endri94/web-9.3"
    },
    {
        id: 72,
        title: "Skillbox 10.1",
        category: "skillbox-3.0",
        date: "2025-05-27",
        image: "img/skillbox/web-3.0.png",
        description: "Предрелизная подготовка страниц «Блог» и «Публикации»",
        tech: ["HTML5", "CSS3"],
        liveUrl: "https://endri94.github.io/web-10.1/",
        codeUrl: "https://github.com/Endri94/web-10.1"
    },
];


// Projects functionality
let currentPage = 1;
const projectsPerPage = 6;
let filteredProjects = [...projectsData];

function renderProjects() {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const projectsToShow = filteredProjects.slice(startIndex, endIndex);

    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';

    projectsToShow.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="project-meta">
                    <span class="project-category">${getCategoryName(project.category)}</span>
                    <span class="project-date">${formatDate(project.date)}</span>
                </div>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <button class="btn btn-small view-project" data-id="${project.id}">
                    Подробнее
                </button>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Update pagination
    updatePagination();

    // Add event listeners to project buttons
    document.querySelectorAll('.view-project').forEach(btn => {
        btn.addEventListener('click', () => openProjectModal(btn.dataset.id));
    });
}

function getCategoryName(category) {
    const categories = {
        'markup': 'Вёрстка',
        'js': 'JavaScript',
        'skillbox': 'Skillbox',
        'skillbox-3.0': 'Skillbox-3.0',
        'react': 'React'
    };
    return categories[category] || category;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const pagination = document.getElementById('pagination');
    const pageNumbers = pagination.querySelector('.page-numbers');

    pageNumbers.innerHTML = '';

    // Previous button
    const prevBtn = pagination.querySelector('.prev');
    prevBtn.disabled = currentPage === 1;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            renderProjects();
        });
        pageNumbers.appendChild(pageNumber);
    }

    // Next button
    const nextBtn = pagination.querySelector('.next');
    nextBtn.disabled = currentPage === totalPages;
}

function filterProjects(category) {
    if (category === 'all') {
        filteredProjects = [...projectsData];
    } else {
        filteredProjects = projectsData.filter(project => project.category === category);
    }

    currentPage = 1;
    renderProjects();
}
function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id == projectId);
    if (!project) return;

    const modal = document.getElementById('projectModal');

    // Обновляем содержимое модалки
    modal.querySelector('.modal-image').src = project.image;
    modal.querySelector('.modal-title').textContent = project.title;
    modal.querySelector('.modal-description').textContent = project.description;

    // Очищаем и добавляем технологии
    const modalTech = modal.querySelector('.modal-tech');
    modalTech.innerHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');

    // Получаем ссылки
    const liveLink = document.getElementById('liveLink');
    const codeLink = document.getElementById('codeLink');

    // Удаляем старые обработчики событий
    liveLink.replaceWith(liveLink.cloneNode(true));
    codeLink.replaceWith(codeLink.cloneNode(true));

    // Обновляем ссылки
    const newLiveLink = document.getElementById('liveLink');
    const newCodeLink = document.getElementById('codeLink');

    newLiveLink.href = project.liveUrl || '#';
    newCodeLink.href = project.codeUrl || '#';

    // Добавляем новые обработчики
    newLiveLink.addEventListener('click', function (e) {
        if (!project.liveUrl || project.liveUrl === '#') {
            e.preventDefault();
            alert('Демо-версия недоступна');
        } else {
            closeModal();
        }
    });

    newCodeLink.addEventListener('click', function (e) {
        if (!project.codeUrl || project.codeUrl === '#') {
            e.preventDefault();
            alert('Исходный код недоступен');
        } else {
            closeModal();
        }
    });

    // Показываем модалку
    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('modal-active');
    document.body.style.overflow = 'auto';
}

// Initialize projects
document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProjects(this.dataset.filter);
        });
    });

    // Add event listeners to pagination buttons
    document.querySelector('.prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProjects();
        }
    });

    document.querySelector('.next').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProjects();
        }
    });

    // Modal close button
    document.querySelector('.close-modal').addEventListener('click', closeModal);

    // Close modal when clicking outside
    document.getElementById('projectModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Initial render
    renderProjects();
});
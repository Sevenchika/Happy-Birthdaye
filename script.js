document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const screens = document.querySelectorAll('.screen');
    const giftButtons = document.querySelectorAll('.gift-button');
    const envelope = document.querySelector('.envelope');

    // Элементы для старта
    const startButton = document.getElementById('btn-ready');
    const notReadyButton = document.getElementById('btn-not-ready');
    const backToStartButton = document.getElementById('btn-back-to-start');
    
    // Элементы для Галереи
    const galleryRows = document.querySelectorAll('.photo-row');

    // НОВЫЙ элемент: Кнопка "К Концу"
    const btnToEndScreen = document.getElementById('btn-to-end-screen');


    // --- УПРАВЛЕНИЕ ЭКРАНАМИ ---

    function switchScreen(targetId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    }

    // --- 1. ЛОГИКА СТАРТА ---
    
    // Кнопка "ГОТОВА"
    startButton.addEventListener('click', () => {
        audio.volume = 0.5;
        audio.play().catch(error => {
            console.log('Автовоспроизведение заблокировано.');
        });
        switchScreen('gifts-screen');
    });

    // Кнопка "НЕТ"
    notReadyButton.addEventListener('click', () => {
        switchScreen('sad-screen');
    });
    
    // Кнопка "Вернуться" (с грустного экрана)
    backToStartButton.addEventListener('click', () => {
        switchScreen('start-screen');
    });


    // --- 3. ЛОГИКА ГАЛЕРЕИ (Три линии) ---

    function resetGallery() {
        galleryRows.forEach(row => row.classList.remove('animate'));
    }

    function animateGallery() {
        resetGallery(); 

        setTimeout(() => {
            galleryRows[0].classList.add('animate');
        }, 100);

        setTimeout(() => {
            galleryRows[1].classList.add('animate');
        }, 1000); 

        setTimeout(() => {
            galleryRows[2].classList.add('animate');
        }, 2000); 
    }

    // --- ОБРАБОТЧИКИ КЛИКОВ (Навигация) ---

    // Клик по кнопкам подарков
    giftButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.currentTarget.dataset.target;
            switchScreen(targetId);
            
            if (targetId === 'gallery-screen') {
                animateGallery(); 
            } else {
                 resetGallery();
                 envelope.classList.remove('open');
            }
        });
    });

    // Клик по кнопкам "Назад"
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target; // Получаем цель из data-target
            switchScreen(target); // Переключаемся на указанный экран

            resetGallery();
            envelope.classList.remove('open');
        });
    });

    // Интерактивность Конверта (Подарок 2)
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
        });
    }

    // НОВЫЙ ОБРАБОТЧИК: Кнопка "К Концу"
    if (btnToEndScreen) {
        btnToEndScreen.addEventListener('click', () => {
            switchScreen('end-screen');
            audio.pause(); // Останавливаем музыку в конце
            audio.currentTime = 0;
        });
    }

});
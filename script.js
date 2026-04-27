// Скрипт для свадебного сайта Ильдар & Нафиса
document.addEventListener('DOMContentLoaded', function() {
    console.log('Свадебный сайт загружен');
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initRSVPForm();
    
    // Убираем все проблемы с hero-высотой
    // Просто удаляем все inline стили, которые могли быть
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.height = '';
        hero.style.minHeight = '';
    }
});

function updateCountdown() {
    const weddingDate = new Date('2026-06-28T14:30:00+03:00');
    const now = new Date();
    const diff = weddingDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString();
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
}

// ========== БАЗОВЫЕ СТИЛИ АНИМАЦИЙ ==========
const coreStyles = document.createElement('style');
coreStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(coreStyles);

// ========== УНИВЕРСАЛЬНОЕ МОДАЛЬНОЕ ОКНО ==========
function showModal(title, message, isError = false) {
    const existingModal = document.getElementById('customModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'customModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const icon = isError ? '✕' : '✓';
    const iconColor = isError ? '#c62828' : '#2e7d32';
    const bgIconColor = isError ? '#ffebee' : '#e8f5e9';
    const borderColor = isError ? '#c62828' : '#2e7d32';

    modal.innerHTML = `
        <div style="
            background: #ffffff;
            border-radius: 16px;
            padding: 32px 40px;
            max-width: 380px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
            animation: slideUp 0.3s ease;
            border-top: 3px solid ${borderColor};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        ">
            <div style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: ${bgIconColor};
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px auto;
            ">
                <div style="
                    font-size: 32px;
                    font-weight: 400;
                    color: ${iconColor};
                    line-height: 1;
                ">${icon}</div>
            </div>
            <h3 style="
                font-size: 24px;
                font-weight: 500;
                color: #1a1a1a;
                margin-bottom: 12px;
                letter-spacing: -0.3px;
            ">${title}</h3>
            <p style="
                font-size: 16px;
                color: #555555;
                margin-bottom: 28px;
                line-height: 1.5;
            ">${message}</p>
            <button onclick="this.closest('#customModal').remove()" style="
                background: #f5f5f5;
                color: #333333;
                border: none;
                padding: 12px 32px;
                border-radius: 40px;
                font-family: inherit;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            " onmouseover="this.style.background='#e8e8e8'" onmouseout="this.style.background='#f5f5f5'">
                Закрыть
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    if (!isError) {
        setTimeout(() => {
            if (modal.parentElement) modal.remove();
        }, 4000);
    }
}

// ========== МОДАЛЬНОЕ ОКНО ЗАГРУЗКИ ==========
function showLoadingModal() {
    const existingLoading = document.getElementById('loadingModal');
    if (existingLoading) existingLoading.remove();
    
    const loadingModal = document.createElement('div');
    loadingModal.id = 'loadingModal';
    loadingModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(3px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    loadingModal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            padding: 32px 40px;
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid #e0e0e0;
                border-top-color: #999;
                border-radius: 50%;
                margin: 0 auto 20px;
                animation: spin 1s linear infinite;
            "></div>
            <p style="
                font-size: 15px;
                color: #666;
                margin: 0;
            ">Отправка ответа...</p>
        </div>
    `;
    document.body.appendChild(loadingModal);
    return loadingModal;
}

// ========== GOOGLE SHEETS ==========
const SCRIPT_URL = 'https://script.google.com/mac18MSExJLpvmi1WekJpFcdvYosXbhrFRhVbyzGMOl4Vk62yUG8TS7NFDzTXlgYj8o-2w/exec';

// Инициализация формы RSVP (с алкогольными предпочтениями)
function initRSVPForm() {
    const rsvpForm = document.querySelector('.rsvp-form');
    if (!rsvpForm) return;
    
    rsvpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        
        // Получаем данные
        const nameInput = this.querySelector('input[type="text"]');
        const attendanceRadio = this.querySelector('input[name="attendance"]:checked');
        
        const name = nameInput ? nameInput.value.trim() : '';
        const attendance = attendanceRadio ? attendanceRadio.value : null;
        
        // Получаем выбранные алкогольные предпочтения
        const alcoholCheckboxes = this.querySelectorAll('input[name="alcohol"]:checked');
        const alcoholPreferences = Array.from(alcoholCheckboxes).map(cb => cb.value).join(', ');
        
        // Получаем выбранные безалкогольные предпочтения
        const nonAlcoholCheckboxes = this.querySelectorAll('input[name="nonalcohol"]:checked');
        const nonAlcoholPreferences = Array.from(nonAlcoholCheckboxes).map(cb => cb.value).join(', ');
        
        // Валидация
        if (!name) {
            showModal('Ошибка', 'Пожалуйста, введите ваше имя', true);
            nameInput.focus();
            return;
        }
        
        if (!attendance) {
            showModal('Ошибка', 'Пожалуйста, выберите вариант присутствия', true);
            return;
        }
        
        // Показываем загрузку
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        const loadingModal = showLoadingModal();
        
        try {
            // Формируем данные для отправки
            const formDataToSend = new URLSearchParams();
            formDataToSend.append('name', name);
            formDataToSend.append('attendance', attendance);
            formDataToSend.append('alcohol', alcoholPreferences);
            formDataToSend.append('nonalcohol', nonAlcoholPreferences);
            
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formDataToSend.toString()
            });
            
            const result = await response.json();
            
            loadingModal.remove();
            
            if (result.result === 'success') {
                // Формируем сообщение об успехе
                let preferencesMessage = '';
                if (alcoholPreferences) {
                    preferencesMessage += `\n\n🍸 Алкоголь: ${alcoholPreferences}`;
                }
                if (nonAlcoholPreferences) {
                    preferencesMessage += `\n🥤 Безалкогольное: ${nonAlcoholPreferences}`;
                }
                
                if (attendance === 'yes') {
                    showModal(
                        'Спасибо, ' + name + '!',
                        'Мы будем ждать вас на нашей свадьбе 4 августа 2026 года! 🎉' + preferencesMessage,
                        false
                    );
                } else {
                    showModal(
                        'Спасибо за ответ!',
                        'Очень жаль, что вы не сможете быть с нами в этот день.' + preferencesMessage,
                        false
                    );
                }
                // Очищаем форму
                rsvpForm.reset();
            } else {
                throw new Error(result.message || 'Ошибка отправки');
            }
        } catch (error) {
            loadingModal.remove();
            showModal(
                'Ошибка',
                error.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.',
                true
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ========== МУЗЫКАЛЬНЫЙ ПЛЕЕР ==========
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const audio = document.getElementById('weddingMusic');
    const circleText = document.querySelector('.circle-text');
    
    if (playButton && audio) {
        // Флаг для авто-воспроизведения (только после взаимодействия с пользователем)
        let isPlaying = false;
        
        // Функция воспроизведения
        function playMusic() {
            audio.play().then(() => {
                isPlaying = true;
                playButton.classList.add('playing');
                if (circleText) {
                    circleText.style.animationPlayState = 'running';
                }
                console.log('Музыка играет');
            }).catch(error => {
                console.log('Ошибка воспроизведения:', error);
                // На некоторых устройствах нужно взаимодействие с пользователем
                showModal('Внимание', 'Нажмите на кнопку еще раз, чтобы включить музыку', true);
            });
        }
        
        // Функция паузы
        function pauseMusic() {
            audio.pause();
            isPlaying = false;
            playButton.classList.remove('playing');
            if (circleText) {
                circleText.style.animationPlayState = 'running'; // текст продолжает вращаться
            }
            console.log('Музыка на паузе');
        }
        
        // Обработчик клика по кнопке
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!isPlaying) {
                playMusic();
            } else {
                pauseMusic();
            }
        });
        
        // Автоматически запускаем вращение текста
        if (circleText) {
            circleText.style.animation = 'rotateText 25s linear infinite';
            circleText.style.animationPlayState = 'running';
        }
        
        // Когда музыка закончилась (на всякий случай, но у нас loop)
        audio.addEventListener('ended', function() {
            if (isPlaying) {
                audio.play().catch(e => console.log('Ошибка рестарта:', e));
            }
        });
        
        // Обработка ошибок загрузки аудио
        audio.addEventListener('error', function(e) {
            console.error('Ошибка загрузки аудио:', e);
            showModal('Ошибка', 'Не удалось загрузить музыкальный файл. Проверьте файл 1.mp3', true);
        });
        
        // Для мобильных устройств - сохраняем состояние при сворачивании/разворачивании
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && isPlaying) {
                // Страница скрыта - ничего не делаем, музыка продолжает играть
            } else if (!document.hidden && isPlaying) {
                // Страница снова видима, проверяем что музыка еще играет
                if (audio.paused) {
                    audio.play().catch(e => console.log('Ошибка восстановления:', e));
                }
            }
        });
    } else {
        console.log('Элементы плеера не найдены');
    }
});
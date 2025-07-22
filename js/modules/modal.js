import { closeModal } from './modal.js';

export function openProjectModal(projectId) {
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

    // Обновляем ссылки
    const liveLink = modal.querySelector('#liveLink');
    const codeLink = modal.querySelector('#codeLink');

    liveLink.href = project.liveUrl || '#';
    codeLink.href = project.codeUrl || '#';

    // Удаляем старые обработчики
    liveLink.onclick = null;
    codeLink.onclick = null;

    // Добавляем новые обработчики
    liveLink.addEventListener('click', (e) => {
        if (!project.liveUrl || project.liveUrl === '#') {
            e.preventDefault();
            alert('Демо-версия недоступна');
        } else {
            closeModal();
        }
    });

    codeLink.addEventListener('click', (e) => {
        if (!project.codeUrl || project.codeUrl === '#') {
            e.preventDefault();
            alert('Исходный код недоступен');
        } else {
            closeModal();
        }
    });

    // Показываем модалку
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

export function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
import { showLoader, hideLoader } from '../loader.js';
import { projectsData } from './data.js';
import { initModal } from './modal.js';
import { initFilter } from './filter.js';

export async function initProjects() {
    showLoader();

    // Имитация загрузки (можно удалить)
    await new Promise(resolve => setTimeout(resolve, 500));

    renderProjects(projectsData);
    initFilter();
    initModal();
    hideLoader();
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = projects.map(project => `
    <div class="project-card" data-id="${project.id}">
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
    </div>
  `).join('');
}

// helpers.js
function getCategoryName(category) {
    const categories = {
        'markup': 'Вёрстка',
        'js': 'JavaScript',
        'skillbox': 'Skillbox'
    };
    return categories[category] || category;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}
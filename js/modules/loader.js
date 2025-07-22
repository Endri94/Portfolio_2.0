export function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
    <div class="loader-content">
      <svg class="loader-spinner" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="var(--primary-color)" stroke-width="4"></circle>
      </svg>
    </div>
  `;
    document.body.appendChild(loader);
}

export function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
}
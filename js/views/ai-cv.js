import { guard } from '../utils/guard.js';
import { renderNavbar } from '../components/ui/navbar.js';

async function loadVacancies() {
  try {
    const vacancySelect = document.getElementById('vacancy');
    
    if (!vacancySelect) return;

    const response = await fetch('https://elevate-backend-auhz.onrender.com/api/vacancies');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    vacancySelect.innerHTML = '<option disabled selected>Select a vacancy</option>';
    data.forEach(v => {
      vacancySelect.innerHTML += `
        <option value="${v.vacancy_id}" data-title="${v.title}">
          ${v.title}
        </option>
      `;
    });
  } catch (error) {
    const vacancySelect = document.getElementById('vacancy');
    if (vacancySelect) {
      vacancySelect.innerHTML = '<option disabled selected>Error loading vacancies</option>';
    }
  }
}

// ============================================================================
// HEADER FUNCTIONALITY - Added for project visual consistency
// ============================================================================


// Initialize header functionality when page loads
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'aiCvPage.html';
    
    // Run guard to protect the page
    guard(currentPage);
    
    // Render navbar component
    renderNavbar('navbar-container', 'aiCv');
    
    // Load vacancies
    loadVacancies();

    // Setup form submission
    const form = document.getElementById('cv_ai');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const vacancySelect = document.getElementById('vacancy');
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
            </div>
        `;

        const formData = new FormData(form);

        const selectedOption = vacancySelect.options[vacancySelect.selectedIndex];
        if (selectedOption) {
            formData.append("vacancy_id", selectedOption.value);
            formData.append("vacancyTitle", selectedOption.dataset.title);
        }

        const loadingDiv = document.getElementById('loading');
        loadingDiv.classList.remove('hidden');

        try {
            const response = await fetch('https://elevate-backend-auhz.onrender.com/api/aicv/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Error in request: ' + response.status);

            await response.json();
            form.reset();
            showSuccessMessage(selectedOption.value);
        } catch (error) {
            showErrorMessage();
        } finally {
            loadingDiv.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,152a8,8,0,0,1-8,8H182.63l-46.35,46.34a8,8,0,0,1-11.31,0L78.63,160H32a8,8,0,0,1,0-16H82.37L128,98.34,173.63,144H216A8,8,0,0,1,224,152Z"></path>
                </svg>
                Proccess CVs
            `;
        }
    });
});

// Message functions
function showSuccessMessage(vacancyId) {
    const container = document.getElementById('message-container');
    container.className = 'mt-6 p-4 rounded-lg bg-green-50 border border-green-200 relative';
    container.innerHTML = `
        <button onclick="this.parentElement.classList.add('hidden')" 
                class="absolute top-2 right-2 text-green-400 hover:text-green-600 p-1 rounded-lg hover:bg-green-100 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        <div class="flex items-center gap-3 mb-3">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-green-800 font-medium">CVs processed successfully!</span>
        </div>
        <a href="vacanciePage.html?id=${vacancyId}" 
           class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
            View vacancy with new candidates →
        </a>
    `;
    container.classList.remove('hidden');
}

function showErrorMessage() {
    const container = document.getElementById('message-container');
    container.className = 'mt-6 p-4 rounded-lg bg-red-50 border border-red-200';
    container.innerHTML = `
        <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span class="text-red-800 font-medium">Error processing CVs. Please try again.</span>
        </div>
    `;
    container.classList.remove('hidden');
}

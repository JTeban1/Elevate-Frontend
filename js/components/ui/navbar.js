import { isAdmin } from '../../utils/auth.js';

/**
 * Navbar component with integrated user dropdown functionality
 * Provides consistent header across all pages with navigation and user management
 */

/**
 * Generate navbar HTML with navigation and user dropdown
 * @param {string} activePage - Current active page identifier
 * @param {Object} options - Configuration options
 * @returns {string} Complete navbar HTML
 */
export function createNavbar(activePage = '', options = {}) {
    const {
        showNavigation = true,
        logoLink = '../index.html',
        logoText = 'TalentTrack'
    } = options;

    const navigationItems = [
        { id: 'vacancies', label: 'Vacancies', href: 'vacanciesPage.html' },
        { id: 'candidates', label: 'Candidates', href: 'candidatesPage.html' },
        { id: 'aiCv', label: 'Upload CVs', href: 'aiCvPage.html' }
    ];

    // Add Users link only for admins
    if (isAdmin()) {
        navigationItems.push({ id: 'users', label: 'Users', href: 'usersPage.html' });
    }

    const navigationHTML = showNavigation ? navigationItems.map(item => {
        const isActive = activePage === item.id;
        const activeClasses = isActive 
            ? 'border-b-2 border-blue-100 pb-2 text-blue-100 font-bold px-3 py-2'
            : 'hover:text-blue-100 transition-colors px-3 py-2 rounded-lg hover:bg-white/10';
        
        return `<a class="${activeClasses}" href="${item.href}">${item.label}</a>`;
    }).join('') : '';

    return `
        <header class="flex items-center justify-between px-4 md:px-10 py-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white shadow-lg">
            <a href="${logoLink}" class="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                <img src="../assets/img/logo.png" alt="Elevate Logo" class="w-9 h-9 rounded-xl" />
                <h2 class="text-lg md:text-xl font-bold tracking-wide">
                    Elevate
                    <span class="block text-xs font-medium opacity-80">your talent</span>
                </h2>
            </a>
            
            ${showNavigation ? `
                <!-- Desktop Navigation -->
                <nav class="hidden md:flex gap-8 text-base font-medium">
                    ${navigationHTML}
                </nav>
                
            ` : ''}
            
            <div class="flex items-center gap-4">
                <!-- Mobile Menu Button -->
                ${showNavigation ? `
                    <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors">
                        <svg id="menu-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                        <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                ` : ''}
                
                <div class="relative">
                    <div id="user-avatar" class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/30 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <span id="user-initials" class="text-white font-bold text-sm">--</span>
                    </div>
                    
                    <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div class="px-4 py-3 border-b border-gray-200">
                            <p class="text-sm font-medium text-gray-900" id="navbar-user-name">Usuario</p>
                            <p class="text-xs text-gray-500" id="navbar-user-email">usuario@example.com</p>
                            <p class="text-xs text-blue-600 font-medium" id="user-role">Rol</p>
                        </div>
                        <div class="py-1">
                            <a href="#" id="logout-btn" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
        ${showNavigation ? `
            <!-- Mobile Navigation Menu -->
            <div id="mobile-nav-menu" class="hidden md:hidden bg-blue-800 shadow-lg border-t border-blue-600">
                <nav class="px-4 py-3 space-y-1">
                    ${navigationItems.map(item => {
                        const isActive = activePage === item.id;
                        const activeClasses = isActive 
                            ? 'block px-3 py-2 rounded-lg bg-blue-700 text-white text-sm font-medium'
                            : 'block px-3 py-2 rounded-lg text-blue-100 hover:bg-blue-700 hover:text-white transition-colors text-sm font-medium';
                        return `<a class="${activeClasses}" href="${item.href}">${item.label}</a>`;
                    }).join('')}
                </nav>
            </div>
        ` : ''}
    `;
}

/**
 * Initialize navbar functionality including user dropdown
 * Should be called after navbar HTML is inserted into DOM
 */
export function initializeNavbar() {
    setupUserDropdown();
    setupMobileMenu();
}

/**
 * Setup user dropdown functionality
 * Handles avatar click, outside click, and logout
 */
function setupUserDropdown() {
    const userAvatar = document.getElementById('user-avatar');
    const userDropdown = document.getElementById('user-dropdown');

    if (!userAvatar || !userDropdown) {
        console.warn('Navbar: User dropdown elements not found');
        return;
    }

    // User dropdown toggle
    userAvatar.addEventListener('click', function () {
        userDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!userAvatar.contains(event.target) && !userDropdown.contains(event.target)) {
            userDropdown.classList.add('hidden');
        }
    });

    // Get logged user data from localStorage
    const loggedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userName = loggedUser.name || 'Usuario';
    const userEmail = loggedUser.email || 'usuario@example.com';
    
    // Map role_id to role name
    const getRoleName = (roleId) => {
        switch(roleId) {
            case 1: return 'Admin';
            case 2: return 'Recruiter';
            default: return 'User';
        }
    };
    
    const userRole = getRoleName(loggedUser.role_id);
    const initials = userName.split(' ').map(name => name.charAt(0)).join('').substring(0, 2).toUpperCase();

    // Update user interface
    const userInitialsElement = document.getElementById('user-initials');
    const userNameElement = document.getElementById('navbar-user-name');
    const userEmailElement = document.getElementById('navbar-user-email');
    const userRoleElement = document.getElementById('user-role');

    if (userInitialsElement) userInitialsElement.textContent = initials;
    if (userNameElement) userNameElement.textContent = userName;
    if (userEmailElement) userEmailElement.textContent = userEmail;
    if (userRoleElement) userRoleElement.textContent = userRole;

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Clear session data
            localStorage.removeItem('currentUser');
            localStorage.removeItem('returnUrl');
            
            // Redirect to index
            window.location.href = '../index.html';
        });
    }
}

/**
 * Setup mobile menu functionality
 * Handles hamburger button toggle and menu visibility
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!mobileMenuBtn || !mobileNavMenu) {
        console.warn('Navbar: Mobile menu elements not found');
        return;
    }

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function () {
        const isHidden = mobileNavMenu.classList.contains('hidden');
        
        if (isHidden) {
            // Show menu
            mobileNavMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            // Hide menu
            mobileNavMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    // Close mobile menu when clicking on navigation links
    const mobileNavLinks = mobileNavMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });

    // Close mobile menu when screen becomes larger
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) { // md breakpoint
            mobileNavMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });
}

/**
 * Render navbar into specified container
 * @param {string} containerId - ID of container element
 * @param {string} activePage - Current active page identifier
 * @param {Object} options - Configuration options
 */
export function renderNavbar(containerId, activePage = '', options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Navbar: Container with ID '${containerId}' not found`);
        return;
    }

    container.innerHTML = createNavbar(activePage, options);
    initializeNavbar();
}
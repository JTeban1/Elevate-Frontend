# Contributing to Elevate Frontend

Thank you for your interest in contributing to the Elevate Frontend! This document provides guidelines and best practices specifically for frontend development contributions.

## Table of Contents

- [Frontend Development Setup](#frontend-development-setup)
- [Frontend Coding Standards](#frontend-coding-standards)
- [Frontend Component Guidelines](#frontend-component-guidelines)
- [Feature and Commit Naming Guide](#feature-and-commit-naming-guide)
- [Frontend Testing Guidelines](#frontend-testing-guidelines)
- [UI/UX Contribution Guidelines](#uiux-contribution-guidelines)
- [Code Review Process](#code-review-process)

## Frontend Development Setup

### Prerequisites

- **Modern Web Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Node.js**: Version 20+ (for development tools)
- **Text Editor**: VS Code, WebStorm, or similar with JavaScript support
- **Backend API**: Running on `http://localhost:9000`

### Local Development Environment

1. **Navigate to frontend directory**:

   ```bash
   cd public
   ```

2. **Start development server**:

   ```bash
   # Option 1: Using Node.js http-server
   npx http-server . -p 3000 --cors
   
   # Option 4: Using Live Server (VS Code extension)
   # Right-click index.html -> "Open with Live Server"
   ```

3. **Configure API endpoints**:

   Edit `js/utils/config.js`:

   ```javascript
   // Development configuration
   export const API_BASE_URL = 'http://localhost:9000';
   export const API_TIMEOUT = 10000; // 10 seconds
   ```

4. **Verify setup**:

   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:9000/api`
   - Test login with backend connection


## Feature and Commit Naming Guide

### Frontend-Specific Branch Naming

```text
frontend/<type>/<short-description>
```

**Frontend Types:**

- `frontend/ui/` - UI/UX improvements
- `frontend/component/` - New or updated components
- `frontend/page/` - New pages or page updates
- `frontend/api/` - API integration changes
- `frontend/responsive/` - Responsive design improvements
- `frontend/accessibility/` - Accessibility enhancements
- `frontend/performance/` - Performance optimizations

**Examples:**

```text
frontend/ui/improve-navigation-design
frontend/component/add-pagination-component
frontend/page/create-dashboard-page
frontend/api/integrate-vacancy-endpoints
frontend/responsive/mobile-candidate-cards
frontend/accessibility/keyboard-navigation
frontend/performance/lazy-load-images
```

### Frontend Commit Messages

```text
<type>(frontend): <description>

feat(frontend): add responsive candidate card component
fix(frontend): resolve login form validation issue
style(frontend): improve button hover states
perf(frontend): optimize image loading with lazy loading
a11y(frontend): add ARIA labels to navigation menu
refactor(frontend): reorganize utility functions
docs(frontend): update component usage examples
```

### Frontend Scope Examples

- `(ui)` - User interface changes
- `(component)` - Component-related changes
- `(api)` - API integration
- `(auth)` - Authentication frontend
- `(responsive)` - Responsive design
- `(accessibility)` - Accessibility improvements
- `(performance)` - Performance optimizations

## Frontend Testing Guidelines

### Manual Testing Checklist

#### **Functionality Testing**

```markdown
- [ ] **Authentication Flow**
  - [ ] Login with valid credentials
  - [ ] Login with invalid credentials
  - [ ] Password visibility toggle
  - [ ] Form validation messages
  - [ ] Session persistence after refresh
  - [ ] Automatic logout on session expiry

- [ ] **Navigation**
  - [ ] All menu items work correctly
  - [ ] Route protection for unauthorized users
  - [ ] Breadcrumb navigation
  - [ ] Back button functionality

- [ ] **Forms**
  - [ ] All form inputs work correctly
  - [ ] Client-side validation
  - [ ] Error message display
  - [ ] Success feedback
  - [ ] Form reset functionality

- [ ] **Data Operations**
  - [ ] Create operations
  - [ ] Read/Display operations
  - [ ] Update operations
  - [ ] Delete operations with confirmation
  - [ ] Search and filtering
  - [ ] Pagination
```

#### **Browser Compatibility**

```markdown
- [ ] **Desktop Browsers**
  - [ ] Chrome 90+ (Windows, macOS, Linux)
  - [ ] Firefox 88+ (Windows, macOS, Linux)
  - [ ] Safari 14+ (macOS)
  - [ ] Edge 90+ (Windows, macOS)
```
<!-- - [ ] **Mobile Browsers**
  - [ ] Chrome Mobile (Android)
  - [ ] Safari Mobile (iOS)
  - [ ] Firefox Mobile (Android)
  - [ ] Samsung Internet (Android)
``` -->

#### **Responsive Design Testing**

```markdown
- [ ] **Mobile Devices** (320px - 767px)
  - [ ] iPhone SE (375x667)
  - [ ] iPhone 12 (390x844)
  - [ ] Samsung Galaxy (360x640)

- [ ] **Tablets** (768px - 1023px)
  - [ ] iPad (768x1024)
  - [ ] iPad Pro (1024x1366)

- [ ] **Desktop** (1024px+)
  - [ ] 1024x768 (minimum)
  - [ ] 1366x768 (common)
  - [ ] 1920x1080 (full HD)
  - [ ] 2560x1440 (2K)
```

#### **Accessibility Testing**

```markdown
- [ ] **Keyboard Navigation**
  - [ ] Tab order is logical
  - [ ] All interactive elements are focusable
  - [ ] Focus indicators are visible
  - [ ] Escape key closes modals/dropdowns

- [ ] **Screen Reader Compatibility**
  - [ ] ARIA labels are present
  - [ ] Heading structure is correct (h1, h2, h3...)
  - [ ] Form labels are associated correctly
  - [ ] Error messages are announced

- [ ] **Visual Accessibility**
  - [ ] Color contrast meets WCAG AA standards
  - [ ] Text is readable at 200% zoom
  - [ ] No information conveyed by color alone
  - [ ] Focus indicators are clearly visible
```

<!-- ### Performance Testing

```javascript
// Performance monitoring example
function measurePageLoad() {
    // Measure initial page load
    window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart);
    });
    
    // Measure API calls
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const start = performance.now();
        return originalFetch.apply(this, args).then(response => {
            const end = performance.now();
            console.log(`API Call to ${args[0]} took ${end - start}ms`);
            return response;
        });
    };
}

// Memory usage monitoring
function checkMemoryUsage() {
    if (performance.memory) {
        console.log('Memory Usage:', {
            used: Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB',
            total: Math.round(performance.memory.totalJSHeapSize / 1048576) + 'MB',
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + 'MB'
        });
    }
}
``` -->

<!-- ## UI/UX Contribution Guidelines

### Design System

#### **Color Palette**

```css
/* Primary Colors */
--blue-50: #eff6ff;
--blue-600: #2563eb;
--blue-700: #1d4ed8;

/* Status Colors */
--green-100: #dcfce7;  /* Success background */
--green-800: #166534;  /* Success text */
--red-100: #fee2e2;    /* Error background */
--red-800: #991b1b;    /* Error text */
--yellow-100: #fef3c7; /* Warning background */
--yellow-800: #92400e; /* Warning text */

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-600: #4b5563;
--gray-900: #111827;
```

#### **Typography Scale**

```css
/* Headings */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* 30px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }     /* 24px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }  /* 20px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; } /* 18px */

/* Body text */
.text-base { font-size: 1rem; line-height: 1.5rem; }    /* 16px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; } /* 14px */
.text-xs { font-size: 0.75rem; line-height: 1rem; }     /* 12px */
```

#### **Spacing System**

```css
/* Consistent spacing scale */
.space-y-1 > * + * { margin-top: 0.25rem; } /* 4px */
.space-y-2 > * + * { margin-top: 0.5rem; }  /* 8px */
.space-y-3 > * + * { margin-top: 0.75rem; } /* 12px */
.space-y-4 > * + * { margin-top: 1rem; }    /* 16px */
.space-y-6 > * + * { margin-top: 1.5rem; }  /* 24px */
.space-y-8 > * + * { margin-top: 2rem; }    /* 32px */
```

### Component Design Guidelines

#### **Button Variants**

```html
<!-- Primary Button -->
<!-- <button class="
    bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 
    text-white font-medium px-4 py-2 rounded-lg transition-colors
">
    Primary Action
</button> -->

<!-- Secondary Button -->
<!-- <button class="
    bg-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 
    text-gray-900 font-medium px-4 py-2 rounded-lg border border-gray-300 transition-colors
">
    Secondary Action
</button> -->

<!-- Danger Button -->
<!-- <button class="
    bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 
    text-white font-medium px-4 py-2 rounded-lg transition-colors
">
    Delete
</button>
``` -->

<!-- #### **Form Elements**

```html -->
<!-- Input Field -->
<!-- <div class="form-group">
    <label for="input-id" class="block text-sm font-medium text-gray-700 mb-1">
        Field Label
    </label>
    <input 
        type="text" 
        id="input-id"
        class="
            w-full px-3 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-50 disabled:text-gray-500
        "
        placeholder="Placeholder text"
    >
    <p class="text-sm text-gray-500 mt-1">Helper text</p>
</div> -->

<!-- Select Dropdown -->
<!-- <select class="
    w-full px-3 py-2 border border-gray-300 rounded-lg
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    bg-white
">
    <option value="">Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>
``` -->

<!-- #### **Card Components**

```html
<!-- Basic Card -->
<!-- <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
    <p class="text-gray-600 text-sm">Card description or content</p>
</div> -->

<!-- Interactive Card -->
<!-- <div class="
    bg-white rounded-lg shadow-sm border border-gray-200 p-6
    hover:shadow-md hover:border-gray-300 cursor-pointer
    transition-all duration-200
">
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Interactive Card</h3>
        <svg class="w-5 h-5 text-gray-400"><!-- arrow icon </svg>
    </div> 
</div> 
```-->
 

<!-- ### Animation Guidelines

```css
/* Transition timing */
.transition-fast { transition-duration: 150ms; }
.transition-normal { transition-duration: 200ms; }
.transition-slow { transition-duration: 300ms; }

/* Common animations */
@keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-down {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fade-in 200ms ease-out forwards;
}

.animate-slide-down {
    animation: slide-down 200ms ease-out forwards;
}
``` -->

## Code Review Process

### Frontend Review Checklist

#### **Code Quality**

```markdown
- [ ] **JavaScript Standards**
  - [ ] Uses ES6+ features appropriately
  - [ ] No console.log statements in production code
  - [ ] Proper error handling with try/catch
  - [ ] Functions are pure when possible
  - [ ] No global variables pollution

- [ ] **HTML Quality**
  - [ ] Semantic HTML elements used
  - [ ] Proper heading hierarchy (h1, h2, h3...)
  - [ ] All images have alt attributes
  - [ ] Form elements have associated labels
  - [ ] No inline styles or scripts

- [ ] **CSS/Styling**
  - [ ] Uses Tailwind classes consistently
  - [ ] No !important declarations
  - [ ] Responsive design implemented
  - [ ] Consistent spacing and typography
  - [ ] Hover and focus states defined
```

#### **Functionality Review**

```markdown
- [ ] **User Experience**
  - [ ] Intuitive navigation and flow
  - [ ] Clear feedback for user actions
  - [ ] Loading states for async operations
  - [ ] Appropriate error messages
  - [ ] Confirmation for destructive actions

- [ ] **Performance**
  - [ ] No unnecessary DOM manipulations
  - [ ] Images are optimized
  - [ ] API calls are efficient
  - [ ] Event listeners are cleaned up
  - [ ] No memory leaks detected
```

#### **Security Review**

```markdown
- [ ] **Input Validation**
  - [ ] All user inputs are validated
  - [ ] XSS prevention measures
  - [ ] No sensitive data in client-side code
  - [ ] Proper authentication checks
  - [ ] HTTPS for all API calls
```

### Review Process Steps

1. **Self Review**
   - Test functionality locally
   - Check browser console for errors
   - Verify responsive design
   - Run accessibility checks

2. **Peer Review**
   - Code logic and structure
   - UI/UX design consistency
   - Performance considerations
   - Security implications

3. **Testing Review**
   - Manual testing across browsers
   - Mobile device testing
   - Accessibility testing
   - Performance monitoring

## Best Practices Summary

### **Do's ✅**

- Use semantic HTML elements
- Implement proper error handling
- Follow responsive design principles
- Use Tailwind CSS classes consistently
- Write accessible code with ARIA labels
- Optimize images and assets
- Use ES6+ JavaScript features
- Implement proper event delegation
- Follow consistent naming conventions
- Write clear, descriptive comments

### **Don'ts ❌**

- Don't use inline styles
- Don't ignore browser console errors
- Don't skip accessibility considerations
- Don't hardcode API URLs
- Don't use deprecated JavaScript features
- Don't leave console.log statements
- Don't ignore mobile responsiveness
- Don't skip input validation
- Don't create memory leaks
- Don't ignore performance implications

## Getting Help

### **Frontend-Specific Resources**

- 🌐 **MDN Web Docs**: [developer.mozilla.org](https://developer.mozilla.org/)
- 🎨 **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- ♿ **Web Accessibility**: [web.dev/accessibility](https://web.dev/accessibility/)
- 📱 **Responsive Design**: [web.dev/responsive-web-design-basics](https://web.dev/responsive-web-design-basics/)

### **Questions and Support**

- 🐛 **UI Bugs**: Report issues with interface elements
- 💡 **Design Ideas**: Suggest UI/UX improvements
- ⚡ **Performance**: Report slow loading or laggy interactions
- ♿ **Accessibility**: Report accessibility barriers

---

<div align="center">
  <strong>Frontend guidelines crafted with 💙 by the Elevate Team</strong><br>
  <!-- <em>Building accessible, performant, and beautiful web interfaces</em> -->
</div>

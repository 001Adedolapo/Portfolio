import { myProjects } from './projects.js';

// --- THEME TOGGLE ---
window.toggleTheme = function() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    if(body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        icon.innerText = '☀️';
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        icon.innerText = '🌙';
    }
}

// --- MOBILE MENU ---
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('-translate-y-full');
    menu.classList.toggle('translate-y-0');
}

// --- FILTER ENGINE ---
const grid = document.getElementById('project-grid');

window.filterProjects = function(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        const isAll = category === 'All' && btn.innerText === 'ALL WORK';
        const isMatch = btn.innerText.toLowerCase().includes(category.toLowerCase());
        if (isAll || isMatch) {
            btn.className = "filter-btn whitespace-nowrap px-8 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest transition";
        } else {
            btn.className = "filter-btn whitespace-nowrap px-8 py-2 rounded-full border border-white/10 text-xs uppercase tracking-widest hover:bg-white/10 transition";
        }
    });

    const filteredData = category === 'All' ? myProjects : myProjects.filter(p => p.category === category);
    displayProjects(filteredData);
}

function displayProjects(data) {
    if (!grid) return;
    grid.innerHTML = data.map(project => `
        <a href="${project.link}" class="project-card fade-in relative group overflow-hidden rounded-2xl bg-neutral-900 aspect-[16/9] block">
            <img src="${project.img}" class="object-cover w-full h-full transition duration-700 group-hover:scale-110" alt="${project.title}">
            <div class="project-overlay absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 p-8 flex flex-col justify-end transition-opacity duration-300">
                <span class="text-blue-400 text-xs uppercase tracking-[0.2em] mb-2">${project.category}</span>
                <h3 class="text-3xl font-bold tracking-tighter text-white">${project.title}</h3>
            </div>
        </a>
    `).join('');
}
// Initial Load
displayProjects(myProjects);

const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('success-toast');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        // Show loading state
        btn.innerText = "SENDING...";
        btn.disabled = true;
        
        const data = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            contactForm.reset();
            btn.innerText = "MESSAGE SENT";
            toast.classList.remove('translate-x-[150%]');
            
            setTimeout(() => {
                toast.classList.add('translate-x-[150%]');
                btn.innerText = originalText;
                btn.disabled = false;
            }, 4000);
            
        } else {
            alert("Oops! Something went wrong.");
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}
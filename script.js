const pages = [
    { title: "Home Page",          file: "imgs/01-Home Page.jpg" },
    { title: "Product Page",       file: "imgs/02-Product page.jpg" },
    { title: "Product Details",    file: "imgs/03-Product Details Page.jpg" },
    { title: "About Us",           file: "imgs/04-About Us.jpg" },
    { title: "Contact Us",         file: "imgs/05-Contact Us.jpg" },
    { title: "Blog",               file: "imgs/Blog.jpg" },
    { title: "Blog Details",       file: "imgs/Blog Details Page.jpg" },
    { title: "Privacy Policy",     file: "imgs/Privacy Policy.jpg" },
    { title: "Recently Viewed",    file: "imgs/Recently Viewed Page.jpg" },
    { title: "Sign Up Page",       file: "imgs/Sign up Page.jpg" },
    { title: "Forgot Password",    file: "imgs/Forgot Password Pop up.jpg" },
    { title: "Warranty Policy",    file: "imgs/Warranty Policy.jpg" },
    { title: "Wishlist Pop-up",    file: "imgs/Wishlist Pop up form.jpg" },
    { title: "Wishlist",           file: "imgs/Wishlist.jpg" }
];

let currentIndex = 0;

// Elements
const mainImage = document.getElementById('mainImage');
const pageTitle = document.getElementById('pageTitle');
const pageCounter = document.getElementById('pageCounter');
const menuItemsContainer = document.getElementById('menuItems');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imageContainer = document.getElementById('imageContainer');

// Initialize Menu
function initMenu() {
    menuItemsContainer.innerHTML = ''; // Clear existing
    pages.forEach((page, index) => {
        const item = document.createElement('div');
        item.className = `menu-item ${index === 0 ? 'active' : ''}`;
        item.textContent = page.title;
        item.onclick = () => {
            loadPage(index);
            toggleMenu(false);
        };
        menuItemsContainer.appendChild(item);
    });
}

// Load Page
function loadPage(index) {
    if (index < 0 || index >= pages.length) return;

    // Fade out
    mainImage.style.opacity = 0;

    setTimeout(() => {
        currentIndex = index;
        const page = pages[currentIndex];

        // Update Content
        mainImage.src = page.file;
        mainImage.alt = page.title;
        pageTitle.textContent = page.title;
        pageCounter.textContent = `${currentIndex + 1} / ${pages.length}`;

        // Update Active Menu Item
        document.querySelectorAll('.menu-item').forEach((item, i) => {
            item.classList.toggle('active', i === currentIndex);
        });

        // Scroll to top of image container
        imageContainer.scrollTop = 0;

        // Fade in
        mainImage.onload = () => {
            mainImage.style.opacity = 1;
        };
    }, 300);
}

// Toggle Menu
function toggleMenu(isOpen) {
    sidebar.classList.toggle('open', isOpen);
    overlay.classList.toggle('visible', isOpen);
}

// Event Listeners
openMenuBtn.onclick = () => toggleMenu(true);
closeMenuBtn.onclick = () => toggleMenu(false);
overlay.onclick = () => toggleMenu(false);

prevBtn.onclick = () => {
    let nextIdx = currentIndex - 1;
    if (nextIdx < 0) nextIdx = pages.length - 1;
    loadPage(nextIdx);
};

nextBtn.onclick = () => {
    let nextIdx = currentIndex + 1;
    if (nextIdx >= pages.length) nextIdx = 0;
    loadPage(nextIdx);
};

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') toggleMenu(false);
});

// Init
initMenu();
loadPage(0);

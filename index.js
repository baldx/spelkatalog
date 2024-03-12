document.addEventListener("DOMContentLoaded", () => {
    const scrollAboutUs = document.querySelector('.about-link');
    
    scrollAboutUs.addEventListener("click", e => {
        e.preventDefault();
        const target = scrollAboutUs.getAttribute('href').substring(1);
        const targetElement = document.getElementById(target);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    })
})
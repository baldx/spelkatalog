document.addEventListener("DOMContentLoaded", () => {
    const scrollAboutUs = document.querySelector('.about-link'); //get .about-links
    
    scrollAboutUs.addEventListener("click", e => { //click event to all links
        e.preventDefault();
        const target = scrollAboutUs.getAttribute('href').substring(1); //targets the href attribute but removes the string before
        const targetElement = document.getElementById(target); //targets the element

        if (targetElement) { //if element exist
            targetElement.scrollIntoView({ behavior: "smooth" }); //scroll to element
        }
    })
})

// const formOutline = document.querySelectorAll('.form-outline');
// const labels = document.querySelectorAll('label');

// const dataInput = document.querySelectorAll('data-input');


// formOutline.forEach(e => e.addEventListener('click', () => {
//     labels.forEach(label => label.remove())
// }));
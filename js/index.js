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

const input = document.querySelectorAll('.form-control'); //get all inputs

input.forEach(input => { //iterates over all elements of input array
    input.addEventListener('input', (event) => { //for each element, theres event listener
        const currentInput = event.target; //references the event
        const currentLabel = currentInput.nextElementSibling; // references the next sibling aka label

        if (currentInput.value.trim() === '') currentLabel.style.display = 'block'; // if no input return label being visible
        else currentLabel.style.display = 'none'; //else hide it
    })
})
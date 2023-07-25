const carousel = document.querySelector(".projects__carousel");
const arrowBtns = document.querySelectorAll(".arrow-icon");
const firstProjectHeight = carousel.querySelector(".projects__carousel--item").offsetHeight;
const carouselChildrens = [...carousel.children];

let isDragging = false, startY, startScrollTop;

// Get the number of projects that can fit in the carousel at once
let projectPerView = Math.round(carousel.offsetHeight / firstProjectHeight);

// Insert copies of the last few projects to beginning of carousel for infinite scrolling
carouselChildrens.slice(-projectPerView).reverse().forEach(project => {
    carousel.insertAdjacentHTML("afterbegin", project.outerHTML);
})

// Insert copies of the first few projects to end of carousel for infinite scrolling
carouselChildrens.slice(0, projectPerView).forEach(project => {
    carousel.insertAdjacentHTML("beforeend", project.outerHTML);
})

// Add event listeners for the arrow buttons to scroll the carousel top and down
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollTop += btn.id === "up" ? -firstProjectHeight : firstProjectHeight;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the  initial cursor and scroll position of the carousel
    startY = e.pageY;
    startScrollTop = carousel.scrollTop
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollTop = startScrollTop - (e.pageY - startY);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the top, scroll to the bottom
    if (carousel.scrollTop === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollTop = carousel.scrollHeight - (2 * carousel.offsetHeight);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the bottom, scroll to the top
    else if (Math.ceil(carousel.scrollTop) === carousel.scrollHeight - carousel.offsetHeight) {
        carousel.classList.add("no-transition");
        carousel.scrollTop = carousel.offsetHeight;
        carousel.classList.remove("no-transition");
    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop)
carousel.addEventListener("scroll", infiniteScroll)
// DOM element selections for speakers list, navigation buttons, and modal
const speakersList = document.querySelector('.featured-speakers__list');
const prevBtn = document.querySelector('.featured-speakers__button--prev');
const nextBtn = document.querySelector('.featured-speakers__button--next');
const modal = document.querySelector('.featured-speakers__modal');

// Array of speaker objects containing all speaker information
const allSpeakers = [
    {
        name: 'Jane Smith',
        company: 'TCS',
        position: 'CEO',
        image: './assets/photo1.png',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci ad architecto! Ullam est nihil eius quam eligendi, soluta commodi.'
    },
    {
        name: 'John Doe',
        company: 'IBM',
        position: 'Chief Marketing Officer',
        image: './assets/photo2.png',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci ad architecto! Ullam est nihil eius quam eligendi, soluta commodi.'
    },
   
    {
        name: 'Emily Johnson',
        company: 'InnovateX',
        position: 'Head of Product',
        image: './assets/photo1.png',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci ad architecto! Ullam est nihil eius quam eligendi, soluta commodi.'
    },
    {
        name: 'Chris Lee',
        company: 'DevCon',
        position: 'Lead Developer',
        image: './assets/photo2.png',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci ad architecto! Ullam est nihil eius quam eligendi, soluta commodi.'
    },
    {
        name: 'David Brown',
        company: 'Fintech World',
        position: 'CTO',
        image: './assets/photo1.png',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci ad architecto! Ullam est nihil eius quam eligendi, soluta commodi.'
    },
    {
        name: 'Laura Wilson',
        company: 'HealthCorp',
        position: 'Chief Strategy Officer',
        image: './assets/photo2.png',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci ad architecto! Ullam est nihil eius quam eligendi, soluta commodi.'
    }
];

// Variables to track current display and pagination
let currentIndex = 0;
let itemsPerPage = 4;  

// Function to update the number of items per page based on screen size
const updateItemsPerPage = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1400) itemsPerPage = 4;
    else if (screenWidth >= 1240) itemsPerPage = 3;
    else if (screenWidth >= 768) itemsPerPage = 2;
    else itemsPerPage = 1;
};

// Function to render speakers based on current index with infinite loop logic
const renderSpeakers = () => {
    updateItemsPerPage();
    speakersList.innerHTML = '';  // Clear current list

    // Calculate the end index for slicing the speakers array
    const endIndex = (currentIndex + itemsPerPage) % allSpeakers.length;
    const currentSpeakers = endIndex > currentIndex 
        ? allSpeakers.slice(currentIndex, endIndex)
        : [...allSpeakers.slice(currentIndex), ...allSpeakers.slice(0, endIndex)];

    // Render speaker cards
    currentSpeakers.forEach(speaker => {
        const article = document.createElement('article');
        article.className = 'speaker__card';

        const img = document.createElement('img');
        img.className = 'speaker__card__photo';
        img.src = speaker.image;
        img.alt = `${speaker.name}'s photo`;

        const h2 = document.createElement('h2');
        h2.className = 'speaker__card__name';
        h2.textContent = speaker.name;

        const p1 = document.createElement('p');
        p1.className = 'speaker__card__position';
        p1.textContent = speaker.position;

        const p2 = document.createElement('p');
        p2.className = 'speaker__card__company';
        p2.textContent = speaker.company;

        article.append(img, h2, p1, p2);
        speakersList.appendChild(article);

        article.addEventListener('click', () => openModal(speaker));
    });
};

// Function to open a modal with speaker details
const openModal = (speaker) => {
    modal.style.display = 'flex';
    modal.innerHTML = '';  

    const container = document.createElement('div');
    container.className = 'modal__container';

    const closeButton = document.createElement('button');
    closeButton.className = 'modal__close';
    closeButton.innerHTML = '<i class="ri-close-line"></i>';
    closeButton.addEventListener('click', closeModal);

    const profile = document.createElement('div');
    profile.className = 'modal__profile';

    const profilePhoto = document.createElement('div');
    profilePhoto.className = 'modal__profile__photo';
    const modalImg = document.createElement('img');
    modalImg.className = 'modal__photo';
    modalImg.src = speaker.image;

    profilePhoto.appendChild(modalImg);

    const details = document.createElement('div');
    details.className = 'modal__details';
    details.innerHTML = `
        <h2 class="modal__name">${speaker.name}</h2>
        <p class="modal__position">${speaker.position}</p>
        <p class="modal__company">${speaker.company}</p>
        <div class="modal__profile__socialicon">
            <span><i class="fa-brands fa-drupal"></i></span>
            <span><i class="ri-twitter-line"></i></span>
            <span><i class="ri-linkedin-box-line"></i></span>
        </div>
    `;

    const content = document.createElement('div');
    content.className = 'modal__content';
    content.innerHTML = `<p class="modal__description">${speaker.description}</p>`;

    container.append(closeButton, profile, details, content);
    modal.appendChild(container);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
};

// Close modal function
const closeModal = () => {
    modal.style.display = 'none';
};

// Infinite loop navigation
const renderNext = () => {
    currentIndex = (currentIndex + itemsPerPage) % allSpeakers.length;
    renderSpeakers();
};

const renderPrev = () => {
    currentIndex = (currentIndex - itemsPerPage + allSpeakers.length) % allSpeakers.length;
    renderSpeakers();
};

// Keyboard navigation support
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') renderNext();
    if (e.key === 'ArrowLeft') renderPrev();
});

// Event listeners
prevBtn.addEventListener('click', renderPrev);
nextBtn.addEventListener('click', renderNext);
window.addEventListener('resize', renderSpeakers);

// Initial render
renderSpeakers();

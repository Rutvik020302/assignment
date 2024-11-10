// DOM element selections for speakers list, navigation buttons and modal
const speakers__list = document.querySelector('.featured-speakers__list');
const prevBtn = document.querySelector('.featured-speakers__button--prev');
const nextBtn = document.querySelector('.featured-speakers__button--next');
const modal = document.querySelector('.featured-speakers__modal');

// Array of speaker objects containing all speaker information
const allSpeakers = [
    {
        name: 'John Doe',
        company: 'Specbee',
        position: 'Chief Marketing Officer',
        image: './assets/photo1.png',
        description: 'Monotonectally synergize business communities rather than client-centric convergence. Assertively unleash cross-platform best practices rather than pandemic total linkage.'
    },
    {
        name: 'Jane Smith',
        company: 'TechCorp',
        position: 'CEO',
        image: './assets/photo2.png',
        description: 'Leading innovative solutions to the industry, driving change and efficiency with a focus on sustainability and growth.'
    },
    {
        name: 'Emily Johnson',
        company: 'InnovateX',
        position: 'Head of Product',
        image: './assets/photo3.png',
        description: 'Expert in product management and a key driver in delivering impactful features that meet market demands.'
    },
    {
        name: 'Chris Lee',
        company: 'DevCon',
        position: 'Lead Developer',
        image: './assets/photo4.png',
        description: 'Bringing expertise in full-stack development and driving complex projects to successful completion.'
    },
    {
        name: 'John Doe',
        company: 'Specbee',
        position: 'Chief Marketing Officer',
        image: './assets/photo1.png',
        description: 'Monotonectally synergize business communities rather than client-centric convergence. Assertively unleash cross-platform best practices rather than pandemic total linkage.'
    },
    {
        name: 'Jane Smith',
        company: 'TechCorp',
        position: 'CEO',
        image: './assets/photo2.png',
        description: 'Leading innovative solutions to the industry, driving change and efficiency with a focus on sustainability and growth.'
    },
    {
        name: 'Emily Johnson',
        company: 'InnovateX',
        position: 'Head of Product',
        image: './assets/photo3.png',
        description: 'Expert in product management and a key driver in delivering impactful features that meet market demands.'
    },
    {
        name: 'Chris Lee',
        company: 'DevCon',
        position: 'Lead Developer',
        image: './assets/photo4.png',
        description: 'Bringing expertise in full-stack development and driving complex projects to successful completion.'
    }
];

// Variables to track pagination
let count = 1;  // Current page number
let items = 4;  // Number of items to display per page

// Main function to render speakers on the page
const renderSpeakers = () => {
    // Disable previous button if we're on the first page
    prevBtn.disabled = count <= 1;
    // Disable next button if we're on the last page
    nextBtn.disabled = count * items >= allSpeakers.length;

    // Clear current speakers list
    speakers__list.innerHTML = '';

    // Calculate which speakers to show based on the current page
    const start = (count - 1) * items;
    const end = start + items;
    const currentSpeakers = allSpeakers.slice(start, end);

    // Create and append speaker cards for each speaker in the current list
    currentSpeakers.forEach((speaker) => {
        const article = document.createElement('article');
        article.className = 'speaker__card';

        // Create image element
        const img = document.createElement('img');
        img.className = 'speaker__card__photo';
        img.src = speaker.image;
        img.alt = `${speaker.name}'s photo`;

        // Create text elements
        const h2 = document.createElement('h2');
        h2.className = 'speaker__card__name';
        h2.textContent = speaker.name;

        const p1 = document.createElement('p');
        p1.className = 'speaker__card__position';
        p1.textContent = speaker.position;

        const p2 = document.createElement('p');
        p2.className = 'speaker__card__company';
        p2.textContent = speaker.company;

        // Assemble speaker card
        article.append(img, h2, p1, p2);
        speakers__list.appendChild(article);

        // Click event to open modal with speaker details
        article.addEventListener('click', () => {
            openModal(speaker);
        });
    });
};

// Function to open the modal with speaker details
const openModal = (speaker) => {
    // Display the modal
    modal.style.display = 'flex';
    modal.innerHTML = ''; // Clear existing modal content

    // Create modal container
    const container = document.createElement('div');
    container.className = 'modal__container';

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'modal__close';
    closeButton.innerHTML = '<i class="ri-close-line"></i>';
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Modal profile and details
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

    const modalName = document.createElement('h2');
    modalName.className = 'modal__name';
    modalName.textContent = speaker.name;

    const modalPosition = document.createElement('p');
    modalPosition.className = 'modal__position';
    modalPosition.textContent = speaker.position;

    const modalCompany = document.createElement('p');
    modalCompany.className = 'modal__company';
    modalCompany.textContent = speaker.company;

    details.append(modalName, modalPosition, modalCompany);

    // Social icons
    const socialIcons = document.createElement('div');
    socialIcons.className = 'modal__profile__socialicon';
    socialIcons.innerHTML = `
        <span><i class="fa-brands fa-drupal"></i></span>
        <span><i class="ri-twitter-line"></i></span>
        <span><i class="ri-linkedin-box-line"></i></span>
    `;
    details.appendChild(socialIcons);

    profile.append(profilePhoto, details);

    // Modal content
    const content = document.createElement('div');
    content.className = 'modal__content';

    const modalDescription = document.createElement('p');
    modalDescription.className = 'modal__description';
    modalDescription.textContent = speaker.description;

    content.appendChild(modalDescription);

    container.append(closeButton, profile, content);
    modal.appendChild(container);
};

// Update items per page based on screen size
const updateItems = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1400) items = 4;
    else if (screenWidth >= 1240) items = 3;
    else if (screenWidth >= 768) items = 2;
    else items = 1;

    renderSpeakers();
};

// Initialize rendering and responsive setup
updateItems();
window.addEventListener('resize', updateItems);

// Handle pagination with next and previous buttons
const renderNext = () => {
    count++;
    renderSpeakers();
};

const renderPrev = () => {
    count--;
    renderSpeakers();
};

prevBtn.addEventListener('click', renderPrev);
nextBtn.addEventListener('click', renderNext);

// Initial render
renderSpeakers();

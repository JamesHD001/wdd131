const year = new Date().getFullYear();
document.getElementById("currentyear").textContent = year;

document.getElementById("lastModified").textContent =
    "Last Modified: " + document.lastModified;


// Get all buttons
const buttons = document.querySelectorAll(".saveBtn");

// Load saved favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Function to save a story
function saveFavorite(story) {
    if (!favorites.includes(story)) {
        favorites.push(story);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

// Function to update button text
function updateButtons() {
    buttons.forEach(button => {
        const story = button.dataset.story;

        if (favorites.includes(story)) {
            button.textContent = `Saved ✅`;
            button.disabled = true;
        } else {
            button.textContent = `Save as Favorite ❤️`;
        }
    });
}

// Add event listeners
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const story = button.dataset.story;

        saveFavorite(story);
        updateButtons();
    });
});

// Initial update
updateButtons();

// Character data (OBJECTS + ARRAY)
const characters = [
    {
        name: "Kai",
        role: "Experiment",
        description: "A powerful being created through a secret experiment, holding the fate of humanity."
    },
    {
        name: "Rick",
        role: "Warrior",
        description: "A battle-hardened survivor shaped by war, driven by strength and resilience."
    }
];

// Select elements
const charButtons = document.querySelectorAll(".charBtn");
const display = document.getElementById("characterDisplay");

// Function to show character
function showCharacter(name) {
    const character = characters.find(c => c.name === name);

    if (character) {
        display.innerHTML = `
            <h3>${character.name}</h3>
            <p><strong>Role:</strong> ${character.role}</p>
            <p>${character.description}</p>
        `;
    }
}

// Event listeners
charButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        showCharacter(btn.dataset.name);
    });
});

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;

        formMessage.textContent = `Thank you, ${name}! Your message has been received.`;
        form.reset();
    });
}

// Stories data (ARRAY + OBJECTS)
const stories = [
    {
        title: "Silent Invasion",
        description: "An alien invasion threatens humanity, and hope lies in a mysterious experiment.",
        image: "images/silent-invasion.png"
    },
    
    {
        title: "A Man Gone Wild",
        description: "Stay tuned!...",
        image: "images/aman-gonewild.jpeg"
    },

    {
        title: "Death & Dragons; Dragons & Destruction",
        description: "Stay tuned!...",
        image: "images/dd-dd.png"
    },

    {
        title: "The Day Good Lost To Evil",
        description: "Stay tuned!...",
        image: "imgages/tdglte.png"
    },

    {
        title: "The Alkhals",
        description: "Stay tuned!...",
        image: "imgages/the-alkhals.png"
    }
];

// Select container
const storiesContainer = document.getElementById("storiesContainer");

// Function to display stories
function displayStories() {
    if (!storiesContainer) return;

    storiesContainer.innerHTML = stories.map(story => `
        <div class="story-card">
            <h3>${story.title}</h3>
            <img src="${story.image}" alt="${story.title}" loading="lazy">
            <p>${story.description}</p>
        </div>
    `).join("");
}

// Run function
displayStories();

const breadcrumb = document.getElementById("breadcrumb");

function generateBreadcrumb() {
    if (!breadcrumb) return;

    const path = window.location.pathname.split("/").pop();

    let pageName = "Home";

    if (path.includes("stories")) pageName = "Stories";
    else if (path.includes("characters")) pageName = "Characters";
    else if (path.includes("contact")) pageName = "Contact";
    else if (path.includes("messaging")) pageName = "Messaging";

    breadcrumb.innerHTML = `
        <a href="index.html">Home</a> > <span>${pageName}</span>
    `;

    if (path === "" || path === "index.html") {
        breadcrumb.innerHTML = `<span>Home</span>`;
    }
}

generateBreadcrumb();

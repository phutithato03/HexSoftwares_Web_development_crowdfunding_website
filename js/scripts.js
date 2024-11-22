const projectForm = document.getElementById('project-form');
const projectsContainer = document.getElementById('projects-container');

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const goal = document.getElementById('funding-goal').value;

    createProject(title, description, goal);

    projectForm.reset();
});

function createProject(title, description, goal) {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    projectDiv.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p><strong>Funding Goal:</strong> $${goal}</p>
        <p><strong>Contributions:</strong> $0</p>
        <button onclick="contribute(this, ${goal})">Contribute</button>
    `;

    projectsContainer.appendChild(projectDiv);
}

function contribute(button, goal) {
    const contributionAmount = prompt('Enter your contribution amount (USD):');
    if (!contributionAmount || isNaN(contributionAmount) || contributionAmount <= 0) {
        alert('Invalid contribution amount.');
        return;
    }

    const projectDiv = button.parentElement;
    const contributionsText = projectDiv.querySelector('p:nth-of-type(3)');
    let currentContributions = parseFloat(contributionsText.innerText.split('$')[1]);

    currentContributions += parseFloat(contributionAmount);
    contributionsText.innerHTML = `<strong>Contributions:</strong> $${currentContributions}`;

    if (currentContributions >= goal) {
        alert('Funding goal reached!');
        button.disabled = true;
    }
}

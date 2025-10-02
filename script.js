const userContainer = document.getElementById('user-container');
const reloadBtn = document.getElementById('reload-btn');

function displayUsers(users) {
    userContainer.innerHTML = '';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-card');
        userDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
        `;
        userContainer.appendChild(userDiv);
    });
}

function displayError(message) {
    userContainer.innerHTML = `<p class="error">${message}</p>`;
}

function fetchUserData() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayUsers(data);
        })
        .catch(error => {
            displayError('Failed to fetch user data. Please check your internet connection and try again.');
            console.error('Fetch error:', error);
        });
}

reloadBtn.addEventListener('click', () => {
    fetchUserData();
});

// Initial fetch on page load
fetchUserData();

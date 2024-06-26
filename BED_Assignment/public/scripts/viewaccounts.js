document.addEventListener('DOMContentLoaded', () => {
    fetchAccounts();

});

async function fetchAccounts() {
    try {
        // Fetch admin users
        const responseAdmin = await fetch('/admin');
        const adminUsers = await responseAdmin.json();

        // Fetch normal users
        const responseUsers = await fetch('/users');
        const normalUsers = await responseUsers.json();

        // Merge both arrays into one array of users
        const mergedUsers = adminUsers.map(user => ({ id: user.adminId, name: user.name, email: user.adminEmail }))
                                    .concat(normalUsers.map(user => ({ id: user.userId, name: user.name, email: user.email })));

        const tableBody = document.querySelector('#accounts-table tbody');
        tableBody.innerHTML = '';

        mergedUsers.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="update" onclick="updateAccount(${user.id})">Update</button>
                    <button class="delete" onclick="deleteAccount(${user.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching accounts:', error);
    }
}

// async function updateAccount(adminId) {
//     const name = prompt("Enter new name:");
//     const email = prompt("Enter new email:");
    
//     if (name && email) {
//         try {
//             const response = await fetch(`/admin/${adminId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ name, adminEmail: email })
//             });

//             if (response.ok) {
//                 fetchAccounts();
//             } else {
//                 alert('Error updating account');
//             }
//         } catch (error) {
//             console.error('Error updating account:', error);
//         }
//     }
// }

// async function deleteAccount(adminId) {
//     if (confirm("Are you sure you want to delete this account?")) {
//         try {
//             const response = await fetch(`/admin/${adminId}`, {
//                 method: 'DELETE'
//             });

//             if (response.ok) {
//                 fetchAccounts();
//             } else {
//                 alert('Error deleting account');
//             }
//         } catch (error) {
//             console.error('Error deleting account:', error);
//         }
//     }
// }

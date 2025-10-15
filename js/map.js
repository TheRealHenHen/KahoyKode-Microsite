fetch('../data/trees.json')
    .then(response => response.json())
    .then(trees => {
        const container = document.getElementById('treeContainer');

        trees.forEach(tree => {
            const card = document.createElement('div');
            card.className = 'tree-card';
            card.innerHTML = `
                <h2>${tree.common_name}</h2>
                <p><strong>Scientific Name:</strong> ${tree.scientific_name || 'N/A'}</p>
                <p><strong>Coordinates:</strong> ${tree.coordinates || 'N/A'}</p>
                <p><strong>Location:</strong> ${tree.location || 'N/A'}</p>
                <a href="tree_info.html?tree=${tree.tree_code}">View Tree</a>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading trees.json:', error);
        document.getElementById('treeContainer').innerHTML = '<p>Failed to load tree data.</p>';
    });
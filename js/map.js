fetch('../data/trees.json')
    .then(response => response.json())
    .then(trees => {
        const container = document.getElementById('treeContainer');

        trees.forEach(tree => {
            const card = document.createElement('div');
            card.className = 'tree-card';
            card.innerHTML = `
                <div style="background-image: url(${tree.image || 'images/default-tree.jpg'})" class="tree-image"></div>
                <div class="tree-info">
                    <h2>${tree.common_name}</h2>
                    <p><strong>Scientific Name:</strong> ${tree.scientific_name || 'N/A'}</p>
                    <p><strong>Coordinates:</strong> ${tree.coordinates || 'N/A'}</p>
                    <p><strong>Conservation Status:</strong> ${tree.conservation_status || 'N/A'}</p>
                    <p><strong>Family:</strong> ${tree.taxonomic_classification?.family || 'N/A'}</p>
                    <a href="tree_info.html?tree=${tree.tree_code}">View Tree</a>
                </div>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading trees.json:', error);
        document.getElementById('treeContainer').innerHTML = '<p>Failed to load tree data.</p>';
    });
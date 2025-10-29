fetch('../data/trees.json')
    .then(response => response.json())
    .then(trees => {
        const container = document.getElementById('tree-container');
        container.innerHTML = ''; // clear old content if any

        trees.forEach(tree => {
            const card = document.createElement('div');
            card.className = 'tree-card';

            card.innerHTML = `
                <a href="tree_info.html?tree=${tree.tree_code}" 
                   style="background-image: url(${tree.image || '../images/tree/default.jpg'})" 
                   class="tree-image"></a>

                <a href="tree_info.html?tree=${tree.tree_code}" class="tree-info">
                    <h2>${tree.common_name}</h2>
                    <p><strong>Scientific Name:</strong> <i>${tree.scientific_name || 'N/A'}</i></p>
                    <p><strong>Conservation Status:</strong> ${tree.conservation_status || 'N/A'}</p>
                    <p><strong>Family:</strong> ${tree.ancestry?.family || 'N/A'}</p>
                    <p><strong>Coordinates:</strong> ${tree.coordinates || 'N/A'}</p>
                </a>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading trees-new.json:', error);
        document.getElementById('tree-container').innerHTML = '<p>Failed to load tree data.</p>';
    });
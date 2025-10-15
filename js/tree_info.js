const params = new URLSearchParams(window.location.search);
const treeCode = params.get('tree');

fetch('../data/trees.json')
    .then(res => res.json())
    .then(trees => {
        const tree = trees.find(t => t.tree_code === treeCode);
        const container = document.getElementById('treeDetail');

        if (tree) {
            container.innerHTML = `
                <h1>${tree.common_name}</h1>
                <p><strong>Scientific Name:</strong> ${tree.scientific_name || 'N/A'}</p>
                <p><strong>Coordinates:</strong> ${tree.coordinates || 'N/A'}</p>
                <p><strong>Location:</strong> ${tree.location || 'N/A'}</p>
                <a class="back-link" href="../index.html">← Back to Tree Directory</a>
            `;
        } else {
            container.innerHTML = `
                <p>Tree not found.</p>
                <a class="back-link" href="../index.html">← Back to Tree Directory</a>
            `;
        }
    })
    .catch(err => {
        console.error('Error loading trees.json:', err);
        document.getElementById('treeDetail').innerHTML = '<p>Failed to load tree data.</p>';
    });
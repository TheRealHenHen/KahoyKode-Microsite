const params = new URLSearchParams(window.location.search);
const treeCode = params.get('tree');

fetch('../data/trees.json')
    .then(res => res.json())
    .then(trees => {
        const tree = trees.find(t => t.tree_code === treeCode);
        const container = document.getElementById('treeDetail');

        if (tree) {
            // Build taxonomic classification string
            const taxonomy = tree.taxonomic_classification || {};
            let taxonomyHTML = '';

            if (Object.keys(taxonomy).length > 0) {
                taxonomyHTML = '<p><strong>Taxonomic Classification:</strong></p><ul>';
                for (const [key, value] of Object.entries(taxonomy)) {
                    if (value) {
                        taxonomyHTML += `<li><strong>${key.replace('_', ' ').toUpperCase()}:</strong> ${value}</li>`;
                    }
                }
                taxonomyHTML += '</ul>';
            }

            container.innerHTML = `
                <h1>${tree.common_name}</h1>
                <p><strong>Scientific Name:</strong> ${tree.scientific_name || 'N/A'}</p>
                <p><strong>Tree Code:</strong> ${tree.tree_code || 'N/A'}</p>
                <p><strong>Coordinates:</strong> ${tree.coordinates || 'N/A'}</p>
                <p><strong>Conservation Status:</strong> ${tree.conservation_status || 'N/A'}</p>
                ${taxonomyHTML}
                <a class="back-link" href="map.html">← Back to Map</a>
            `;
        } else {
            container.innerHTML = `
                <p>Tree not found.</p>
                <a class="back-link" href="map.html">← Back to Map</a>
            `;
        }
    })
    .catch(err => {
        console.error('Error loading trees.json:', err);
        document.getElementById('treeDetail').innerHTML = '<p>Failed to load tree data.</p>';
    });
const params = new URLSearchParams(window.location.search);
const treeCode = params.get('tree');

fetch('../data/trees-new.json')
    .then(res => res.json())
    .then(trees => {
            const tree = trees.find(t => t.tree_code === treeCode);
            const container = document.getElementById('tree-detail');

            if (tree) {
                const ancestry = tree.ancestry || {};
                let ancestryHTML = '';

                // Build ancestry list
                if (Object.keys(ancestry).length > 0) {
                    ancestryHTML = '<p><strong>Taxonomic Classification:</strong></p><ul>';
                    for (const [key, value] of Object.entries(ancestry)) {
                        if (value) {
                            ancestryHTML += `<li><strong>${key.replace('_', ' ').toUpperCase()}:</strong> ${value}</li>`;
                        }
                    }
                    ancestryHTML += '</ul>';
                }

                // Vernacular names list (safe check)
                let vernacularHTML = '';
                if (tree.vernacular_names && Array.isArray(tree.vernacular_names) && tree.vernacular_names.length > 0) {
                    vernacularHTML = `<p><strong>Vernacular Names:</strong> ${tree.vernacular_names.join(', ')}</p>`;
                }

                // References list (safe check)
                let referencesHTML = '';
                if (tree.references && Array.isArray(tree.references) && tree.references.length > 0) {
                    referencesHTML = `
                    <p><strong>References:</strong></p>
                    <ul>
                    ${tree.references.map(ref => `<li><a href="${ref}" target="_blank">${ref}</a></li>`).join('')}
                    </ul>
                `;
                }


      container.innerHTML = `
        <aside class="children" id="tree-details">
          <img id="tree-image" src="${tree.image || '../images/placeholder.jpg'}" alt="${tree.common_name}">
          <div id="main-details">
            <h1>${tree.common_name}</h1>
            <p><strong>Scientific Name:</strong> ${tree.scientific_name || 'N/A'}</p>
            ${vernacularHTML}
            <p><strong>Conservation Status:</strong> ${tree.conservation_status || 'N/A'}</p>
            <p><strong>Coordinates:</strong> ${tree.coordinates || 'N/A'}</p>
            ${ancestryHTML}
            <a class="back-link" href="map.html">← Back to Map</a>
          </div>
        </aside>

        <main class="children" id="tree-yap">
          <h2>Description</h2>
          <p>${tree.description || 'No description available.'}</p>

          <h2>Notable Features</h2>
          <p>${tree.notable_features || 'No notable features available.'}</p>

          <h2>Uses</h2>
          <p>${tree.uses || 'No information available.'}</p>

          ${referencesHTML}
        </main>
      `;
    } else {
      container.innerHTML = `
        <p>Tree not found.</p>
        <a class="back-link" href="map.html">← Back to Map</a>
      `;
    }
  })
  .catch(err => {
    console.error('Error loading trees-new.json:', err);
    document.getElementById('tree-detail').innerHTML = '<p>Failed to load tree data.</p>';
  });
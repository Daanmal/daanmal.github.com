document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.querySelector('.grid-container');
    const klaarButton = document.getElementById('klaar-button');

    // Add the header row
    for (let col = 1; col <= 33; col++) {
        const gridHeader = document.createElement('div');
        gridHeader.classList.add('grid-header');
        
        if (col === 2) {
            gridHeader.textContent = 'Deelnemers'; // Second column header
        } else if (col > 2) {
            gridHeader.textContent = col - 2; // Number columns starting from 1
        }

        gridContainer.appendChild(gridHeader);
    }

    // Add the grid items
    for (let row = 1; row <= 30; row++) {
        for (let col = 1; col <= 33; col++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            if (col === 1) {
                gridItem.textContent = row; // First column contains numbers 1-30
            } else if (col === 2) {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Enter name';
                input.id = `input-${row}`;
                input.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        const nextRow = row + 1;
                        if (nextRow <= 30) {
                            const nextInput = document.getElementById(`input-${nextRow}`);
                            if (nextInput) {
                                nextInput.focus();
                            }
                        }
                    }
                });
                gridItem.appendChild(input);
            }

            gridContainer.appendChild(gridItem);
        }
    }

    // Add event listener for the "Klaar" button
    klaarButton.addEventListener('click', function() {
        const rows = [];
        for (let row = 1; row <= 30; row++) {
            const input = document.getElementById(`input-${row}`);
            if (input && !input.value.trim()) {
                rows.push(row);
            }
        }

        rows.reverse().forEach(row => {
            // Remove all grid items in the row
            const startIndex = (row - 1) * 33 + 1; // Calculate start index for the row
            for (let i = 0; i < 33; i++) {
                gridContainer.children[startIndex].remove();
            }
        });
    });
});

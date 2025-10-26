document.addEventListener('DOMContentLoaded', () => {
    // Seleziona tutti i contenitori di riga (ogni genere)
    const rowContainers = document.querySelectorAll('.row-container');

    rowContainers.forEach(container => {
        // Seleziona l'elemento da scorrere (la tabella con le immagini)
        const scrollTable = container.querySelector('.scroll-table'); 
        const leftBtn = container.querySelector('.scroll-btn.left');
        const rightBtn = container.querySelector('.scroll-btn.right');
        
        if (!scrollTable) return; 

        // Quantità di pixel per lo scorrimento con le frecce.
        const scrollAmount = 800; 

        // ===================================
        // 1. GESTIONE CLICK SULLE FRECCE
        // ===================================

        if (leftBtn) {
            leftBtn.addEventListener('click', () => {
                scrollTable.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth' 
                });
            });
        }

        if (rightBtn) {
            rightBtn.addEventListener('click', () => {
                scrollTable.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth' 
                });
            });
        }
        
        // ===================================
        // 2. GESTIONE TRASCINAMENTO (DRAG-TO-SCROLL)
        // ===================================
        let isDown = false; // Flag: mouse premuto
        let startX;         // Posizione X iniziale del mouse (pagina)
        let scrollLeft;     // Posizione di scorrimento iniziale della tabella
        let isDragging = false; // Flag per distinguere il trascinamento dal click

        // Mouse premuto (Inizia il potenziale trascinamento)
        scrollTable.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            // Aggiunge la classe per cambiare il cursore (CSS: grabbing)
            scrollTable.classList.add('active'); 
            
            // Registra la posizione iniziale e lo scorrimento corrente
            startX = e.pageX; 
            scrollLeft = scrollTable.scrollLeft;
            e.preventDefault(); // Impedisce il trascinamento di immagini/testo del browser
        });

        // Mouse rilasciato (Fine trascinamento)
        // Aggiunto a window per catturare il rilascio anche se il cursore esce dalla tabella
        window.addEventListener('mouseup', () => {
            isDown = false;
            scrollTable.classList.remove('active');
            // Ritarda il reset del flag isDragging per l'handler del click
            setTimeout(() => { isDragging = false; }, 0); 
        });

        // Mouse in movimento
        scrollTable.addEventListener('mousemove', (e) => {
            if (!isDown) return; 
            
            // Calcola la distanza percorsa
            const dx = e.pageX - startX;

            // Se il movimento è significativo, considera l'azione come trascinamento
            if (Math.abs(dx) > 5) { 
                isDragging = true;
            }
            
            // Applica lo scorrimento. Il trascinamento è l'inverso del movimento del mouse.
            scrollTable.scrollLeft = scrollLeft - dx; 
        });

        // 3. BLOCCO DEL CLICK SUI LINK DURANTE IL TRASCINAMENTO
        // Impedisce che il click sul link venga attivato se l'utente stava trascinando.
        scrollTable.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }, true); // Usa il capturing phase per intercettare il click prima del link
    });
});
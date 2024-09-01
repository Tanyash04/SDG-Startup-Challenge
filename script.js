document.addEventListener("DOMContentLoaded", () => {
    const stacks = document.querySelectorAll('.stack');
    const toggleButton = document.getElementById('toggle-stack');
    let gridOpen = false;

    stacks.forEach(stack => {
        stack.addEventListener("click", (e) => {
            if (!gridOpen) {
                closeAllStacks();
                stack.classList.add('transition', 'active');
                addCloseButton(stack);
                gridOpen = true;
            } else {
                const clickedCard = e.target.closest('.card');
                if (clickedCard) {
                    toggleFlipCard(clickedCard);
                }
            }
        });
    });

    toggleButton.addEventListener("click", () => {
        closeAllStacks();
        gridOpen = false;
    });

    function closeAllStacks() {
        stacks.forEach(stack => {
            stack.classList.remove('transition', 'active');
            const cards = stack.querySelectorAll('.card');
            cards.forEach(card => {
                resetCardState(card);
            });
            removeCloseButton(stack);
        });
    }

    function toggleFlipCard(card) {
        card.classList.toggle('flippable');
    }

    function resetCardState(card) {
        card.classList.remove('flippable');
    }

    function addCloseButton(stack) {
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.classList.add('close-btn');
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllStacks();
            gridOpen = false;
        });
        stack.appendChild(closeButton);
    }

    function removeCloseButton(stack) {
        const closeButton = stack.querySelector('.close-btn');
        if (closeButton) {
            stack.removeChild(closeButton);
        }
    }
});

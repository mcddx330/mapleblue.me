function toggleClass(element, className, condition) {
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

document.querySelectorAll('.album-trigger').forEach(trigger => {
    trigger.addEventListener('click', function () {
        const chunkId = this.dataset.chunkId;
        const detailsId = this.dataset.details;

        const detailChunkElement = document.getElementById(chunkId);
        const detailsElement = document.getElementById(detailsId);

        // Remove 'active' from all triggers
        document.querySelectorAll('.album').forEach(t => toggleClass(t, 'active', false));
        const parent_album = this.closest('.album');

        // Add 'active' to clicked trigger
        toggleClass(parent_album, 'active', true);

        // Ensure visibility toggle for the same image
        if (!detailsElement.classList.contains('hidden')) {
            toggleClass(detailsElement, 'hidden', true);
            toggleClass(detailChunkElement, 'hidden', true);
            toggleClass(parent_album, 'active', false);
            return;
        }

        // Hide all other chunk details
        document.querySelectorAll('.album-details').forEach(detailChunk => {
            if (!detailChunk.classList.contains('hidden') && detailChunk.id !== chunkId) {
                toggleClass(detailChunk, 'hidden', true);
            }
        });

        // Hide all details in the current chunk
        Array.from(detailChunkElement.getElementsByClassName('album-detail')).forEach((detail) => {
            toggleClass(detail, 'hidden', true);
        });

        // Show the specific details
        toggleClass(detailChunkElement, 'hidden', false);
        toggleClass(detailsElement, 'hidden', false);

        // Scroll into view only if necessary
        const detailRect = detailsElement.getBoundingClientRect();
        const isVisible = (
            detailRect.top >= 0 &&
            detailRect.left >= 0 &&
            detailRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            detailRect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (!isVisible) {
            detailsElement.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    });
});

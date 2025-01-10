document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target_id = this.getAttribute('href').substring(1);
        const element = document.getElementById(target_id);

        const pos_start = window.scrollY;
        const pos_target = element.getBoundingClientRect().top + window.scrollY;
        const distance = pos_target - pos_start;
        const duration = 400; // ms
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const easeInOutCubic = (t) =>
                t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const position = easeInOutCubic(Math.min(progress / duration, 1)) * distance + pos_start;
            window.scrollTo(0, position);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    });
});

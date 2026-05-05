const navLinks = document.querySelectorAll('header nav a.smooth-scroll');

// IntersectionObserverで現在のセクションを検出し、ナビリンクにactiveクラスを付与
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const anchorId = entry.target.id;
            navLinks.forEach(link => {
                const hrefId = link.getAttribute('href').substring(1);
                link.classList.toggle('active', hrefId === anchorId);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('#a-discography, #a-works, #a-about').forEach(el => observer.observe(el));

// .smooth-scroll クラスを持つ要素を全て取得し、forEachでループを回す
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // aタグのhref属性の先頭'#'を除いた文字列を取得
        const target_id = this.getAttribute('href').substring(1);
        // 取得したIDに対応する要素を取得（スクロール先の要素）
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
                t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;

            const position = easeInOutCubic(Math.min(progress / duration, 1)) * distance + pos_start;
            window.scrollTo(0, position);

            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        // アニメーション開始（requestAnimationFrameでstep関数を呼び出す）
        window.requestAnimationFrame(step);
    });
});
function toggleClass(element, className, condition) {
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

document.querySelectorAll('.album-trigger').forEach(trigger => {
    trigger.addEventListener('click', function () {
        const chunk_id = this.dataset.chunkId;
        const details_id = this.dataset.details;

        const details_chunks = document.getElementById(chunk_id);
        const details_elements = document.getElementById(details_id);

        // activeクラス処理
        document.querySelectorAll('.album').forEach(t => toggleClass(t, 'active', false));
        const parent_album = this.closest('.album');
        toggleClass(parent_album, 'active', true);

        // 同一albumにおけるdetails表示切り替え
        if (!details_elements.classList.contains('hidden')) {
            toggleClass(details_elements, 'hidden', true);
            toggleClass(details_chunks, 'hidden', true);
            toggleClass(parent_album, 'active', false);
            return;
        }

        // 存在する他のdetailsが開いていたら全て非表示
        document.querySelectorAll('.album-details').forEach(detail => {
            if (!detail.classList.contains('hidden') && detail.id !== chunk_id) {
                toggleClass(detail, 'hidden', true);
            }
        });

        // 現在のチャンク内detailsを非表示
        Array.from(details_chunks.getElementsByClassName('album-detail')).forEach((detail) => {
            toggleClass(detail, 'hidden', true);
        });

        // details表示
        toggleClass(details_chunks, 'hidden', false);
        toggleClass(details_elements, 'hidden', false);

        // detailsまでスクロール
        const detail_dom = details_elements.getBoundingClientRect();
        const isVisible = (
            detail_dom.top >= 0
            && detail_dom.left >= 0
            && detail_dom.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            && detail_dom.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (!isVisible) {
            details_elements.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    });
});

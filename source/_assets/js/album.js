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

        // display:noneを考慮した現在表示中のコンテナを取得
        const target_container = Array.from(document.querySelectorAll('.view-pc, .view-sp')).find(container => {
            return window.getComputedStyle(container).display !== 'none';
        });
        if (!target_container) {
            console.error("No active container (view-pc or view-sp) found.");
            return;
        }

        // 現在のチャンクIDを持つdetails_chunksを、アクティブなコンテナ内から取得
        const details_chunks = target_container.querySelector(`#${chunk_id}`);
        const details_elements = target_container.querySelector(`#${details_id}`);

        if (!details_chunks || !details_elements) {
            console.error("Target details_chunks or details_elements not found in active container.");
            return;
        }

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
            details_elements.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

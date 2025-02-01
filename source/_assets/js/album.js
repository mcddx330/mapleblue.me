/**
 * toggleClass関数
 * element: 対象のDOM要素
 * className: 付与または削除したいクラス名
 * condition: trueでクラスを付与、falseでクラスを削除する
 *
 * この関数はクラスの付け外しを簡単に行うためのものです。
 * conditionを使って、可読性を高められるようになっています。
 */
function toggleClass(element, className, condition) {
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

/**
 * ここからがメインの処理です。
 * '.album-trigger'というクラスが付いている要素を全て取得し、
 * 一つずつにクリックイベントを付与しています。
 */
document.querySelectorAll('.album-trigger').forEach(trigger => {

    // クリック時の処理を定義
    trigger.addEventListener('click', function () {
        /**
         * data属性で渡されている情報を取得します。
         * chunk_id => 対象となるアルバム内容(複数の詳細が入ったコンテナ)のID
         * details_id => 実際に開きたい特定の詳細のID
         */
        const chunk_id = this.dataset.chunkId;
        const details_id = this.dataset.details;

        /**
         * 現在PC用(view-pc)とSP用(view-sp)のどちらが表示されているのかを判定し、
         * その表示中のコンテナを取得します。
         * 要素が表示されているかどうかは、display:noneではないかどうかで判断します。
         */
        const target_container = Array.from(document.querySelectorAll('.view-pc, .view-sp')).find(container => {
            return window.getComputedStyle(container).display !== 'none';
        });

        // 念のため、アクティブなコンテナが見つからない場合はエラーを出力して終了
        if (!target_container) {
            console.error("No active container (view-pc or view-sp) found.");
            return;
        }

        /**
         * target_container内にある、今回クリックで操作する対象の要素を取得
         * details_chunks => 大きいまとまり(チャンク)としてのコンテナ
         * details_elements => 実際に表示する特定の詳細部分
         *
         * 例: chunk_id='album01-chunk', details_id='album01-detail1'
         */
        const details_chunks = target_container.querySelector(`#${chunk_id}`);
        const details_elements = target_container.querySelector(`#${details_id}`);

        // 万が一、対象の要素が見つからなければエラーを出力して終了
        if (!details_chunks || !details_elements) {
            console.error("Target details_chunks or details_elements not found in active container.");
            return;
        }

        /**
         * activeクラス処理:
         * 全てのアルバムからactiveクラスを外し、クリックしたアルバムだけに付与する
         */
        document.querySelectorAll('.album').forEach(t => toggleClass(t, 'active', false));
        const parent_album = this.closest('.album');
        toggleClass(parent_album, 'active', true);

        /**
         * もし既にdetails_elementsが表示されていたら(=hiddenが外れていたら)、
         * 再度hiddenを付けて閉じる(折りたたむ)動作を行う。
         * ついでにactiveクラスも外して、アルバムを非アクティブに戻す。
         */
        if (!details_elements.classList.contains('hidden')) {
            toggleClass(details_elements, 'hidden', true);
            toggleClass(details_chunks, 'hidden', true);
            toggleClass(parent_album, 'active', false);
            return;
        }

        /**
         * 他のアルバム詳細が開いている場合は全て閉じる処理。
         * 今回開きたいchunk_id以外の詳細アルバムが
         * hiddenを持っていなければ付与して非表示にする。
         */
        document.querySelectorAll('.album-details').forEach(detail => {
            if (!detail.classList.contains('hidden') && detail.id !== chunk_id) {
                toggleClass(detail, 'hidden', true);
            }
        });

        /**
         * 選択したチャンク(複数のアルバム詳細を含む領域)の中にある
         * すべての'detail'要素を一旦非表示にする。
         * （details_chunks内のalbum-detailすべてをhiddenにする）
         */
        Array.from(details_chunks.getElementsByClassName('album-detail')).forEach((detail) => {
            toggleClass(detail, 'hidden', true);
        });

        // 今回クリックした特定のチャンクと詳細を表示に切り替える
        toggleClass(details_chunks, 'hidden', false);
        toggleClass(details_elements, 'hidden', false);

        /**
         * 最後に、詳細部分が画面内にきちんと入るようにスクロールを調整する。
         * getBoundingClientRect()で要素がビューポート内に収まっているかを判定して
         * もし画面外ならscrollIntoViewで中央付近までスクロールする。
         */
        const detail_dom = details_elements.getBoundingClientRect();
        const isVisible = (
            detail_dom.top >= 0 &&
            detail_dom.left >= 0 &&
            detail_dom.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            detail_dom.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (!isVisible) {
            details_elements.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});
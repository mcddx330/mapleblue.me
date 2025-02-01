// .smooth-scroll クラスを持つ要素を全て取得し、forEachでループを回す
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    // 各 .smooth-scroll 要素に対して、クリックイベントを設定
    anchor.addEventListener('click', function (e) {
        // デフォルトのクリック挙動（リンクジャンプなど）を無効化
        e.preventDefault();

        // aタグのhref属性の先頭'#'を除いた文字列を取得
        const target_id = this.getAttribute('href').substring(1);
        // 取得したIDに対応する要素を取得（スクロール先の要素）
        const element = document.getElementById(target_id);

        // 現在のスクロール位置（Y方向）
        const pos_start = window.scrollY;
        // スクロール先要素の画面上部からの相対位置 + 現在のスクロール量 = ページ全体での要素のY座標
        const pos_target = element.getBoundingClientRect().top + window.scrollY;
        // スクロール開始位置と終了位置の差分（移動距離）
        const distance = pos_target - pos_start;
        // スクロールアニメーションの時間（ミリ秒）
        const duration = 400; // ms
        // アニメーション開始時刻を保存するための変数（nullで初期化）
        let start = null;

        // アニメーション用の関数（requestAnimationFrameから呼び出される）
        function step(timestamp) {
            // もしstartが未設定（null）の場合、現在のtimestamp（フレームのタイミング）を初期値として設定
            if (!start) start = timestamp;

            // 現在までの経過時間（ミリ秒）
            const progress = timestamp - start;

            // イージング関数（easeInOutCubic）
            // 0～1の間を使い、前半は加速、後半は減速する滑らかな動き
            const easeInOutCubic = (t) =>
                t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;

            // アニメーション全体のうち、どの程度進捗しているかを0～1に正規化し、
            // イージングをかけた値にスクロール距離を乗算、
            // さらにスクロール開始位置を足すことで、現在のスクロール位置を決定
            const position = easeInOutCubic(Math.min(progress / duration, 1)) * distance + pos_start;

            // 実際にスクロールを行う
            window.scrollTo(0, position);

            // duration（400ms）を超えない間はアニメーションを続ける
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        // アニメーション開始（requestAnimationFrameでstep関数を呼び出す）
        window.requestAnimationFrame(step);
    });
});
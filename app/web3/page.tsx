
export default function Page() {

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <ul className="list-disc space-y-2 pl-4 text-sm text-zinc-300">
          <li>
          この例では、各カテゴリ ページのデータを "取得" するときに人為的な遅延が発生しています。{' '}
            <span className="font-medium text-white">`loading.js`</span> カテゴリページの読み込み中に読み込みスケルトンをすぐに表示するために使用されます。
          </li>
          <li>
          共有レイアウトは、ネストされたレイアウトまたはページが読み込まれている間もインタラクティブなままです。 カウンターをクリックしてみてください。{' '}
            <span className="font-medium text-white">子供</span> ロード.
          </li>
          <li>
            ナビゲーションは中断可能です。 1 つのカテゴリに移動してから、最初のカテゴリが読み込まれる前に 2 番目のカテゴリをクリックしてみてください。
          </li>
        </ul>
      </div>
      <div>
        <a
          className="font-medium text-zinc-300 hover:text-white"
          href="https://beta.nextjs.org/docs/routing/loading-ui"
        >
          もっと詳しく知る
        </a>
      </div>
    </div>
  );
}

// ==UserScript==
// @name         scrapboxAdd#
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  scrapboxでハッシュタグ(#)のリストを上部に表示する
// @author       sawasick
// @match        https://scrapbox.io/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// @require    https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
  'use strict';

  // 3秒後に実行
  setTimeout(ShowTags, 3000);

  function ShowTags() {
    // ページのURLを取得
    const URL = location.href;

    // カテゴリリストのwrapper要素を挿入
    const $wrap = `
      <div class="container">
        <div class="page-list clearfix">
          <ul class="grid" id="tamper-list">
          </ul>
        </div>
      </div>
    `;
    // スタイルを追記
    const $style = `
      <style>
        .tamper-cat-list {
          height: 50px !important;
        }
        .tamper-cat-title {
          color: #5e8af7 !important;
          font-size: 16px !important;
        }
        .tamper-list-item-header {
          border-top: 10px solid #f271f0 !important;
        }
      </style>
    `;
    $('.container').eq(1).after($style).after($wrap);

    // カテゴリが書いてある記事からハッシュタグを取得
    const $hashTags = $('.grid .page-list-item').eq(0).find('.page-link');
    // console.log($hashTags);

    // 順番にURLを生成して表示
    const $tamperList = $('#tamper-list');
    for (let i = 0, len = $hashTags.length; i < len; i++) {
      // $hashTagsの文字列の頭の#を取り除く
      const hashTag = $hashTags.eq(i).text().substr(1);
      const href = URL + hashTag;
      $tamperList.append(`
        <li class="page-list-item grid-style-item pin tamper-cat-list">
          <a href="` + href + `">
            <div class="content">
              <div class="header tamper-list-item-header">
                <div class="title tamper-cat-title">#` + hashTag + `</div>
              </div>
            </div>
          </a>
        </li>
      `);
    }
  }
})();
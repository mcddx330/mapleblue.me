@extends('_layouts.main')

@section('body')
  <header>
    <div class="header-inner">
      <div class="logo"><a href="/">MAPLE BLUE RECORDS</a></div>
      <nav>
        <ul>
          <li><a href="#a-discography" class="smooth-scroll">DISCOGRAPHY</a></li>
          <li><a href="#a-works" class="smooth-scroll">WORKS</a></li>
          <li><a href="#a-about" class="smooth-scroll">ABOUT</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <div id="a-discography"></div>
    <section id="discography" class="height-100vh">
      @php
        $discos = $page->works->discos;
      @endphp
      <h1>DISCOGRAPHY</h1>
      <div class="width-100 view-pc album-grid">
        @include('_layouts.discography', ['is_pc' => true, 'disco_chunks' => $discos->chunk(3)])
      </div>
      <div class="width-100 view-sp album-grid ">
        @include('_layouts.discography', ['is_pc' => false, 'disco_chunks' => $discos->chunk(1)])
      </div>
      <p class="fixed text-right"><a href="https://bc.mapleblue.me">&rarr; Older releases on Bandcamp</a></p>
    </section>

    <div id="a-works" class="padding-header"></div>
    <section id="works" class="height-100vh">
      <div class="width-100">
        <h1>WORKS</h1>
        @php
          $activities = collect($page->works->activities)->groupBy(function ($item) {
              return substr($item['date'], 0, 4);
          });
        @endphp
        @foreach ($activities as $year => $acts)
          <h2>{{ $year }}年</h2>
          @foreach ($acts as $act)
            <div>
              <h5>
                <span class="links"><a href="{{ $act->url }}" target="_blank">{{ $act->title }}</a></span>
                @if(!empty($act['artist']))
                  / {{ $act->artist }}
                @endif
              </h5>
              <p>{{ $act->desc }}</p>
            </div>
          @endforeach
        @endforeach
      </div>
    </section>

    <div id="a-about"></div>
    <section id="about" class="height-100vh">
      <div class="width-100">
        <h1>ABOUT</h1>
        <div class="profile">
          <div class="portrait">
            <img src="/assets/images/me.webp" alt="秋本すばこ">
            <p class="text-center links">
              <i class="fa-solid fa-palette"></i>
              <a href="https://x.com/347th" target="_blank">SAZI NANASHIKI</a>
            </p>
          </div>
          <div class="profile-text">
            <div>
              <h3>秋本すばこ</h3>
              <span class="fixed"><a href="https://subaco.me" target="_blank">→ MORE INFO</a></span>
            </div>
            <p>
              幼い頃からピアノに親しみ、2007年から楽曲制作を始める。<br />
              2010年に個人サークル（旧名：STUDiO MONOBEAT）を立ち上げ、初期はインストゥルメンタルの楽曲を中心に活動を行う。<br />
              現在はVOCALOIDなどの音声合成含むボーカリストを招き、作編曲・作詞からデザインを単独で担当する。<br />
              主な制作環境として、Apple Logic ProとPresonus Studio Oneを使用。
            </p>
            <p class="fixed text-center"><a href="https://subaco.me/contact?t=mbr" target="_blank">お問い合わせはこちらから</a></p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <p>&copy;2010 - MAPLE BLUE RECORDS</p>
  </footer>
@endsection

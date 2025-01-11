@isset($disco_chunks)
  @foreach ($disco_chunks as $chunk_id => $chunk)
    <div class="album-row" style="display: flex; flex-wrap: nowrap;">
      @foreach ($chunk as $i => $disco)
        @php
          $prepath = '/assets/images/works';
          $image_path = isset($disco['disc_number']) ? sprintf('%s/disc/%s.webp', $prepath, $disco['disc_number']) : null;
        @endphp
        <div class="album">
          <a class="album-trigger" data-chunk-id="album-detail-{{ $chunk_id }}" data-details="details-{{ $i }}">
                  <span class="artwork-cover"
                        style="background-image: url('{{ $image_path }}');"
                  ></span>
          </a>
        </div>
      @endforeach
    </div>

    <div id="album-detail-{{ $chunk_id }}" class="album-details hidden">
      @foreach ($chunk as $i => $disco)
        @php
          $prepath = '/assets/images/works';
          $image_path = isset($disco['disc_number'])
              ? sprintf('%s/disc/%s.webp', $prepath, $disco['disc_number'])
              : null;
        @endphp
        <div id="details-{{ $i }}" class="album-detail hidden">
          @if($is_pc)
            <div class="details-image" style="background-image: url('{{ $image_path }}')"></div>
          @endif
          <div class="details-text">
            <div class="title">
              <h2>{{ $disco->title }}</h2>
              <p class="fixed date">{{ date('Y/m/d', strtotime($disco->date)) }}</p>
            </div>
            <ol class="
                    track-list
                    @if (count($disco->tracks) > 7)
                      columns
                    @endif
                  ">
              @foreach($disco->tracks as $title)
                <li>{{ $title }}</li>
              @endforeach
            </ol>
            <p class="credits">
              Artwork: {{ $disco->artwork }}<br/>
              Vocal: {{ $disco->vocalists }}
            </p>
            <div class="links text-center">
              Available on: <br/>
              @if (!empty($disco->links['stores']))
                <span><a href="{{ $disco->links->stores }}" target="_blank">Stream / Stores</a></span> |
              @endif
              @if(!empty($disco->links['bandcamp']))
                <span><a href="{{ $disco->links->bandcamp }}" target="_blank">Bandcamp</a></span>
              @endif
            </div>
          </div>
        </div>
      @endforeach
    </div>
  @endforeach
@endisset

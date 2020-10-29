export const TextverteilungWritingSessionHtml = `
    <div class="tei_div" data-type="writing-session" data-n="1">
        Erste Writing Session
    </div>

    <div class="tei_div" data-type="writing-session" data-n="2">
        Zweite Writing Session
    </div>`

export const TextverteilungAbsatzstrukturenHtml = `
    <p>Erster Absatz</p>
    <p>Zweiter Absatz</p>`

export const TextverteilungWorttrennungenHtml = `
    Ober
    <span class="tei_choice">
        <span class="tei_orig"></span>
        <span class="tei_corr" data-resp="#pers.ed.rummel-ulrich" data-type="emendation">-</span>
    </span>
    Saltz
    <span class="tei_choice">
        <span class="tei_orig">⹀</span>
        <span class="tei_corr" data-resp="#pers.ed.rummel-ulrich" data-type="norm">-</span>
    </span>
    <span class="tei_hi" data-rendition="#g.rend.script.latin">Inspector</span>`

export const TextverteilungOpenerAllgemeinHtml = `
<p class="tei_opener">
    <span class="tei_space" data-dim="horizontal" data-quantity="4" data-unit="word">
    </span>
    <span class="tei_dateline">
        <span class="tei_placeName" data-ref="#place.barmen">Barmen</span>
        <span class="tei_date" data-when="1813-11-12">12<span class="tei_hi" data-rend="sup">
            <span
                    class="tei_choice">
                <span class="tei_abbr"
                      data-rendition="#g.enc.tagsdecl.suspension.type1"
                      data-type="suspension">t</span>
                <span class="tei_expan">t<span
                        class="tei_ex">en</span>
                </span>
            </span>
        </span>
            <span class="tei_choice">
                <span class="tei_abbr"
                      data-rendition="#g.enc.tagsdecl.suspension.type3"
                      data-type="suspension"> Nov<span class="tei_am">.</span>
                </span>
                <span class="tei_expan" data-n="no" data-resp="#pers.ed.wernick-jana"> Nov<span
                        class="tei_ex">ember</span>
                </span>
            </span>1813
        </span>
    </span>
</p>

<p class="tei_opener">
    <span class="tei_space" data-dim="horizontal" data-quantity="10" data-unit="char">

    </span>
    <span class="tei_anchor"
          data-id="teaser.part.001.s">

    </span>
    <span
            class="tei_salute">Lieber <span class="tei_persName"
                                            data-ref="#pers.partic.engels-friedrich-senior">Friedrich</span>!</span>
    <span
            class="tei_anchor" data-id="teaser.part.001.e">

    </span>
</p>

<p class="tei_p">
    <span class="tei_rs" data-type="letter">
        <span class="engels_topic" data-topicId="mark.001" data-type="pol">Deine Briefe</span>
    </span>
    <span class="engels_topic" data-topicId="mark.001" data-type="pol"> haben wir richtig erhalten,</span>
    [...]
</p>`

export const TextverteilungOpenerInlineHtml = `
    <span class="tei_opener_inline" data-rend="inline">
        <span class="tei_salute">
            <span class="tei_anchor" data-id="teaser.part.001.s"></span>
            <span class="tei_rs" data-type="person" data-ref="#pers.partic.engels-johann-caspar-II">Liebstes bestes Männchen</span>!
            <span class="tei_anchor" data-id="teaser.part.001.e"></span>
        </span>
    </span>
    <span class="engels_topic" data-topicId="mark.002" data-type="M">Wie freue ich mich</span>
    <span class="engels_topic" data-topicId="mark.002" data-type="M"> daß Du glücklich, gesund und munter</span>
    [...]`

export const TextverteilungOpenerInlineSignifikantHtml = `
    <p class="tei_opener">
        <span class="tei_space" data-dim="horizontal" data-quantity="6" data-unit="word"></span>
        <span class="tei_dateline">Barmen
            <span class="tei_date" data-when="1816-09-21">
                <span class="tei_choice">
                    <span class="tei_abbr" data-rendition="#g.enc.tagsdecl.suspension.type1" data-type="suspension">d</span>
                    <span class="tei_expan" data-resp="#pers.ed.jedamzik-martin" data-cert="high">d
                        <span class="tei_ex">en</span>
                    </span>
                </span> 21.
                <span class="tei_hi" data-rendition="#g.rend.script.latin">
                    <span class="tei_choice">
                        <span class="tei_abbr">Septemb
                            <span class="tei_am">.</span>
                        </span>
                        <span class="tei_expan" data-n="no" data-resp="#pers.ed.jedamzik-martin" data-cert="high">Septemb
                            <span class="tei_ex">er</span>                                    </span>
                    </span>
                </span> 1816. <br class="tei_lb"/>
                <span class="tei_space" data-dim="horizontal" data-quantity="8" data-unit="word">
                </span>
                Samstag
            </span>
            Abend.
        </span>
    </p>

    <p class="tei_p">
        <span class="tei_opener_inline" data-rend="inline">
            <span class="tei_space" data-dim="horizontal" data-quantity="2" data-unit="chars">
        </span>
            <span class="tei_salute" data-id="teaser.part.001">Liebe
                <span class="tei_persName" data-ref="#pers.partic.engels-elise">Elise</span>.
            </span>
        </span>
        <span class="tei_space" data-dim="horizontal" data-quantity="2" data-unit="chars"></span>
        <span class="engels_topic" data-topicId="mark.001" data-type="l">An diesem ruhigen Abende,</span>
        [...]
    </p>`

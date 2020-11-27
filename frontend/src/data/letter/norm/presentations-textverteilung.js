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

export const TextverteilungOpenerDatumHtml = ``

export const TextverteilungOpenerAnredeHtml = TextverteilungOpenerDatumHtml

export const TextverteilungCloserHtml = `
<p class="tei_closer">
    <span class="tei_salute">
         <span class="tei_choice">
             <span class="tei_abbr">D<span class="tei_am">.</span>
             </span>
             <span class="tei_expan" data-n="no">D<span class="tei_ex">einem</span>
             </span>
         </span>
         <span class="tei_choice">
             <span class="tei_abbr">L<span class="tei_am">.</span>
             </span>
             <span class="tei_expan" data-n="no">L<span class="tei_ex">ieben</span>
             </span>
         </span>
         <span class="tei_choice">
         <span class="tei_orig">Man</span>
         <span class="tei_corr" data-type="ortho">Mann</span>
        </span> und
        <span class="tei_choice">
            <span class="tei_abbr">S<span class="tei_am">.</span>
            </span>
            <span class="tei_expan">S<span class="tei_ex">chwester</span>
            </span>
        </span> Jacobi empfiehl ich mich aufs Herzlichste
        <span class="tei_choice">
            <span class="tei_orig"></span>
            <span class="tei_corr" data-type="emendation">.</span>
        </span>
    </span>
</p>

<p class="tei_closer">
    <span class="tei_salute">
        <span class="engels_lemmaExpl" data-annotId="annot.001" data-type="com" data-subtype="pers">Meine </span>
        <span class="tei_persName" data-ref="#pers.partic.maercker-maria">
            <span class="tei_choice">
                <span class="tei_abbr">
                    <span class="engels_lemmaExpl" data-annotId="annot.001" data-type="com"
                          data-subtype="pers">S</span>
                    <span class="tei_am">
                        <span class="engels_lemmaExpl" data-annotId="annot.001" data-type="com"
                              data-subtype="pers">.</span>
                    </span>
                </span>
                <span class="tei_expan">
                    <span class="engels_lemmaExpl" data-annotId="annot.001" data-type="com"
                          data-subtype="pers">S</span>
                    <span class="tei_ex">
                        <span class="engels_lemmaExpl" data-annotId="annot.001" data-type="com"
                              data-subtype="pers">chwester</span>
                    </span>
                </span>
            </span>
        </span>
        und Nichte
        <span class="tei_hi" data-rendition="#g.rend.script.latin">Märken</span>
        <span class="tei_choice">
            <span class="tei_abbr" data-rendition="#g.enc.tagsdecl.suspension.type1" data-type="suspension">grüß</span>
            <span class="tei_expan">grüß<span class="tei_ex">en</span>
            </span>
        </span> dich
        <span class="tei_choice">
            <span class="tei_orig">ebenfals</span>
            <span class="tei_corr" data-type="ortho">ebenfalls</span>
        </span>
        <span class="tei_choice">
            <span class="tei_orig">

            </span>
            <span class="tei_corr" data-type="emendation">.</span>
        </span>
    </span>
</p>

<p class="tei_closer">
    <span class="tei_salute">
        Lebe recht wohl ewig geliebte <span class="tei_choice">
            <span class="tei_orig">Freündin</span>
            <span class="tei_corr" data-type="ortho">Freundin</span>
        </span>, und behalte <span class="tei_choice">
            <span class="tei_orig">Lieb</span>
            <span class="tei_corr" data-type="ortho">lieb</span>
        </span>
    </span>
    <span class="tei_signed" data-id="signed.s1.ref.0">
        <br class="tei_lb" data-rend="align.left" data-corresp="#signed.s1.ref.0"/>Deine
        <span class="tei_choice">
            <span class="tei_orig">treüe</span>
            <span class="tei_corr" data-type="ortho">treue</span>
        </span> aufrichtige
        <span class="tei_space" data-type="margin.right" data-corresp="#signed.s1.ref.0"
                             data-dim="horizontal" data-quantity="0" data-unit="char"></span>
        <br class="tei_lb" data-rend="align.left" data-corresp="#signed.s1.ref.0"/>
        <span class="tei_persName" data-ref="#pers.partic.engels-luise"
              data-rendition="#g.rend.script.latin">L. N.</span>
    </span>
</p>`

export const TextverteilungCloserInlineHtml = `<span class="tei_closer_inline" data-rend="inline">Jetzt sind wir im Begriffe, hinzugehen, wir essen heute<span class="tei_lb"></span>
    Mittag da, darum schließe ich. <span class="tei_salute">Grüße Alle recht herzlich von mir,<span class="tei_lb"></span>
        auch die Großmutter und die Tante, und lebe recht wohl</span>
    <span class="tei_signed" data-id="signed.s2.ref.0"><span class="tei_lb" data-rend="align.left" data-corresp="#signed.s2.ref.0"></span>Dein treuer Sohn<span class="tei_space" data-type="margin.right" data-corresp="#signed.s2.ref.0" data-dim="horizontal" data-quantity="7" data-unit="char"></span>
        <span class="tei_lb" data-rend="align.left" data-corresp="#signed.s2.ref.0"></span><span class="tei_space" data-corresp="#signed.s2.ref.0" data-dim="horizontal" data-quantity="6" data-unit="char"></span><span class="tei_persName" data-ref="#pers.partic.engels-friedrich-junior">Friedrich</span></span>
</span>`

export const TextverteilungCloserDatumHtml = `<p class="tei_closer">
    <span class="tei_salute">Nun nimm noch diese
        <span data-info="WIP-GENERIC-SPAN" class="tei_damage" data-corresp="#enc.damageinterp.siegelausriss002">
            <span xmlns:v="http://exist-db.org/versioning" class="tei_gap" data-quantity="4" data-unit="char" data-reason="damage" data-corresp="#supplied.text002"></span>
            <span class="tei_supplied" data-id="supplied.text002" data-cert="medium" data-resp="#pers.ed.rummel-ulrich">n zär</span>
        </span>
        tlichen Kuß von
    </span>
    <span class="tei_signed" data-id="signed.s1.ref.0">Deine
        <span class="tei_space" data-type="margin.right" data-corresp="#signed.s1.ref.0" data-dim="horizontal" data-quantity="5" data-unit="char"></span>
    </span>
    <br class="tei_lb" />
    <span class="tei_dateline">
        <span class="tei_placeName" data-ref="#place.ruhrort">Ruhrorth</span> am
        <span class="tei_date" data-when="1792-09-10">10 <span class="tei_hi" data-rend="sup">
            <span class="tei_hi" data-n="2" data-rend="underline">ten</span>
            </span>
            <span class="tei_choice">
                <span class="tei_abbr" data-rendition="#enc.tagsdecl.cc.abbr-colon">Sept
                    <span class="tei_choice">
                        <span class="tei_orig">
                            <span class="tei_am">:</span>
                        </span>
                        <span class="tei_corr" data-type="norm">
                            <span class="tei_am">.</span>
                        </span>
                    </span>
                </span>
                <span class="tei_expan" data-n="no" data-resp="#pers.ed.rummel-ulrich">Sept<span class="tei_ex">ember</span>
                </span>
            </span>
        </span>
    </span>
    <span data-info="WIP-GENERIC-SPAN" class="tei_damage" data-corresp="#enc.damageinterp.siegelausriss002"></span>
    <span class="tei_signed" data-rend="align.left" data-corresp="#signed.s1.ref.0">
        <span class="tei_space" data-corresp="#signed.s1.ref.0" data-dim="horizontal" data-quantity="-15" data-unit="char"></span>
        <span class="tei_choice">
            <span class="tei_orig">treüe</span>
            <span class="tei_corr" data-type="ortho">treue</span>
        </span> Dich herzlichliebende
    </span>
    <span class="tei_signed">
        <br class="tei_lb" data-rend="align.left" data-corresp="#signed.s1.ref.0" />
        <span class="tei_space" data-corresp="#signed.s1.ref.0" data-dim="horizontal" data-quantity="-13" data-unit="char"></span>
        <span class="tei_persName" data-ref="#pers.partic.engels-luise">Luise Engels
            <span class="tei_choice">
                <span class="tei_abbr" data-type="suspension" data-rendition="#g.enc.tagsdecl.suspension.type2" data-resp="#pers.ed.rummel-ulrich">geb<span class="tei_am">.</span></span>
                <span class="tei_expan" data-n="no" data-resp="#pers.ed.rummel-ulrich">geb<span class="tei_ex">orene</span></span>
            </span> Noot
        </span>.
    </span>
</p>`

export const TextverteilungPostskriptumHtml = `
<div class="tei_postscript">
    <p class="tei_p">
        <span class="tei_choice">
            <span class="tei_abbr">N<span class="tei_am">.</span> S<span class="tei_am">.</span></span>
            <span class="tei_expan" data-n="no">N<span class="tei_ex">ach</span>S<span class="tei_ex">chrift</span></span>
        </span>
    </p>
    <p class="tei_p">
        <span class="tei_choice">
            <span class="tei_orig">
                <span class="engels_topic" data-topicId="mark.001" data-type="rel">gerne</span>
            </span>
            <span class="tei_corr" data-type="ortho">
                <span class="engels_topic" data-topicId="mark.001" data-type="rel">Gerne</span>
            </span>
        </span>
        <span class="engels_topic" data-topicId="mark.001" data-type="rel"> hörte ich nächstens ein Bisgen von den Pfingstfeyertagen, wie du</span>
        <span class="engels_topic" data-topicId="mark.001" data-type="rel">
                        solche verlebt, wer da gepredigt, wie die erste Predigt von </span>
        <span class="tei_choice">
            <span class="engels_topic" data-topicId="mark.001" data-type="rel">

            </span>
            <span class="tei_abbr" data-rendition="#g.enc.tagsdecl.suspension.type1" data-type="suspension">
                <span class="engels_topic" data-topicId="mark.001" data-type="rel">Hr</span>
            </span>
            <span class="engels_topic" data-topicId="mark.001" data-type="rel">

            </span>
            <span class="tei_expan" data-n="no" data-cert="high" data-resp="#pers.ed.wernick-jana">
                <span class="engels_topic" data-topicId="mark.001" data-type="rel">H</span>
                <span class="tei_ex">
                    <span class="engels_topic" data-topicId="mark.001" data-type="rel">errn</span>
                </span>
                <span class="engels_topic" data-topicId="mark.001" data-type="rel">

                </span>
            </span>
            <span class="engels_topic" data-topicId="mark.001" data-type="rel">

            </span>
        </span>
        <span class="engels_topic" data-topicId="mark.001" data-type="rel">

        </span>
        <span class="tei_hi" data-rendition="#g.rend.script.latin">
            <span class="engels_lemmaExpl" data-annotId="annot.026" data-type="com" data-subtype="pers">
                <span class="engels_topic" data-topicId="mark.001" data-type="rel">

                </span>
            </span>
            <span class="tei_persName" data-ref="#pers.partic.spies-christoph">
                <span class="engels_lemmaExpl" data-annotId="annot.026" data-type="com" data-subtype="pers">
                    <span class="engels_topic" data-topicId="mark.001" data-type="rel">Spies</span>
                </span>
            </span>
            <span class="engels_lemmaExpl" data-annotId="annot.026" data-type="com" data-subtype="pers">
                <span class="engels_topic" data-topicId="mark.001" data-type="rel">

                </span>
            </span>
        </span>
        <span class="engels_topic" data-topicId="mark.001" data-type="rel">

        </span>
        <span class="engels_topic" data-topicId="mark.001" data-type="rel">

        </span>
        <span class="tei_choice">
            <span class="tei_orig">
                <span class="engels_topic" data-topicId="mark.001" data-type="rel">aufgenomen</span>
            </span>
            <span class="tei_corr" data-type="ortho">
                <span class="engels_topic" data-topicId="mark.001" data-type="rel">aufgenommen</span>
            </span>
        </span>
        <span class="engels_topic" data-topicId="mark.001" data-type="rel"> worden sei, [...]
    </p>
</div>`

export const TextverteilungKustodenHtml = `
der durch Fragen
<span class="tei_space" data-dim="horizontal" data-quantity="63" data-unit="chars"></span>
<span xmlns:v="http://exist-db.org/versioning" class="tei_pb" data-n="2" data-facs="#facs.p2" data-filename="FE_285.2_20041826.pdf"><span class="pb_marker">|</span><span class="pagenum"><a href="https://familie-engels-briefe.uni-wuppertal.de:8443/facs/FE_285.2_20041826.pdf" target="_blank">2</a></span>
</span> jedem Dinge auf den Grund kommen will
`

export const TextverteilungSchreibrichtungHtml = `
<span xmlns:v="http://exist-db.org/versioning" class="tei_p inline" data-rendition="#g.enc.tagsdecl.wd.vertical-right">
    Da alles nun wieder
    <span class="tei_choice">
        <span class="tei_orig">Teüsch</span>
        <span class="tei_corr" data-type="ortho">deutsch</span>
    </span>
    ist so magst du künftig klar schreiben
</span>`

export const TextverteilungLeerraumHtml = `
<span class="tei_space" data-dim="horizontal" data-quantity="5" data-unit="word"></span>
<span class="tei_placeName" data-rendition="#g.rend.script.latin" data-ref="#place.paris">Paris</span> den
<span class="tei_date" data-when="1827-08-16">16. <span class="tei_hi" data-rendition="#g.rend.script.latin">August</span> 1827</span>.
<span class="tei_space" data-dim="vertical" data-quantity="1" data-unit="lines"></span>`

export const TextverteilungEinzuegeHtml = `
<p class="tei_p" data-rendition="#g.enc.tagsdecl.indent-medium" data-resp="#pers.ed.biehl-christian">
    <span class="engels_topic" data-topicId="mark.001" data-type="R">Sie verlangen von mir, </span>
    <span class="tei_choice">
        <span class="tei_orig">
            <span class="engels_topic" data-topicId="mark.001" data-type="R">das</span>
        </span>
        <span class="tei_corr" data-resp="#pers.ed.rummel-ulrich" data-type="ortho">
            <span class="engels_topic" data-topicId="mark.001" data-type="R">daß</span>
        </span>
    </span>
    <span class="engels_topic" data-topicId="mark.001" data-type="R"> ich Ihnen eine </span>
    <span class="tei_choice">
        <span class="tei_orig">
            <span class="engels_topic" data-topicId="mark.001" data-type="R">beschreibung</span>
        </span>
        <span class="tei_corr" data-resp="#pers.ed.rummel-ulrich" data-type="ortho">
            <span class="engels_topic" data-topicId="mark.001" data-type="R">Beschreibung</span>
        </span>
    </span>
    <span class="engels_topic" data-topicId="mark.001" data-type="R">
                    von der
    </span>
    [...] </p>

<p>
    <span class="engels_topic" data-topicId="mark.001" data-type="R">Der </span>
    <span class="tei_choice">
        <span class="tei_orig">
            <span class="engels_topic" data-topicId="mark.001" data-type="R">
                <span class="engels_topic" data-topicId="mark.002" data-type="R">hErr</span>
            </span>
        </span>
        <span class="tei_corr" data-resp="#pers.ed.rummel-ulrich" data-type="ortho">
            <span class="engels_topic" data-topicId="mark.001" data-type="R">
                <span class="engels_topic" data-topicId="mark.002" data-type="R">Herr</span>
            </span>
        </span>
    </span>
    <span class="engels_topic" data-topicId="mark.001" data-type="R">

    </span>
    <span class="tei_choice">
        <span class="tei_orig">
            <span class="engels_topic" data-topicId="mark.001" data-type="R">seegne</span>
        </span>
        <span class="tei_corr" data-resp="#pers.ed.rummel-ulrich" data-type="ortho">
            <span class="engels_topic" data-topicId="mark.001" data-type="R">segne</span>
        </span>
    </span>
    <span class="engels_topic" data-topicId="mark.001" data-type="R"> Ihnen an diesem frohen Feste [...]
</p>`

export const TextverteilungNichtLinearTextLinearHtml = `
Um deine Briefe mache kein Couvert mehr
<span class="tei_note" data-place="bottom" data-type="margin" data-id="txt.add004">
    <span xmlns:v="http://exist-db.org/versioning" class="tei_p inline"> die
        <span class="tei_hi" data-rendition="#g.rend.script.latin">Adresse</span> behalte aber
        <span class="tei_space" data-dim="horizontal" data-quantity="2" data-unit="char"></span>
        bei
    </span>
</span>, die Handschrift und das
<span class="tei_choice">
    <span class="tei_abbr" data-rendition="#g.enc.tagsdecl.suspension.type1" data-type="suspension">Postzeich</span>
    <span class="tei_expan" data-resp="#pers.ed.thun-marie-claire">Postzeich<span class="tei_ex">en</span></span>
</span> unterscheidet unsre Briefe hinlänglich`

export const TextverteilungNichtLinearTextNichtLinearHtml = `<span class="tei_persName" data-ref="#pers.partic.engels-johann-caspar-II" data-rendition="#g.rend.script.latin">
    <span class="tei_choice">
        <span class="tei_abbr">C<span class="tei_am">.</span>
        </span>
        <span class="tei_expan" data-n="no" data-cert="high" data-resp="#pers.ed.wernick-jana">C<span class="tei_ex">aspar</span>
        </span>
    </span>
    Engels
</span>.
<br class="tei_lb" />
<span class="tei_note" data-n="postscript" data-place="left" data-type="margin" data-id="txt.margin001">
    <span xmlns:v="http://exist-db.org/versioning" class="tei_p inline" data-rendition="#g.enc.tagsdecl.wd.vertical-right">Da alles nun wieder
        <span class="tei_choice">
            <span class="tei_orig">Teüsch</span>
            <span class="tei_corr" data-type="ortho">deutsch</span>
        </span> ist so magst du künftig klar schreiben
    </span>
</span>`

export const TextverteilungNichtLinearTextEinweisungHtml = `
und ich die Zeit <span class="tei_add" data-place="above" data-id="txt.add002">auch</span> vollauf zu thun habe, um nur das Sehenswürdigste durchzugehen;`

export const TextverteilungNichtLinearTextReferenzHtml = TextverteilungNichtLinearTextLinearHtml

export const TextverteilungNichtLinearMarginalHtml = TextverteilungNichtLinearTextLinearHtml + ` [...] wo ich eigentlich etwas Heimweh hatte.
<span data-info="WIP-GENERIC-SPAN" class="tei_damage" data-corresp="#enc.damageinterp.siegelausriss">
    <span xmlns:v="http://exist-db.org/versioning" class="tei_gap" data-quantity="5" data-unit="char" data-reason="damage">
        <span class="ed">Textverlust</span>
    </span>
    <span class="tei_supplied" data-reason="damage" data-corresp="#enc.damageinterp.siegelausriss.textsegment">wir n</span>
</span>och 14 Tage hier bleiben so werden
<span class="tei_note" data-type="margin" data-place="left" data-rendition="#g.enc.tagsdecl.wd.vertical-right" data-id="txt.add005">
    <span xmlns:v="http://exist-db.org/versioning" class="tei_p inline">
        wir
        <span class="tei_choice">
            <span class="tei_orig">ohngefähr</span>
            <span class="tei_corr" data-type="ortho">ungefähr</span>
        </span> gegen den
        <span class="tei_date" data-when="1827-09-05">5
            <span class="tei_choice">
                <span class="tei_abbr">Septbr</span>
                <span class="tei_expan" data-resp="#pers.ed.thun-marie-claire" data-cert="high" data-n="no">Sept<span class="tei_ex">em</span>b<span class="tei_ex">e</span>r</span>
            </span>
        </span>  in
        <span class="tei_placeName" data-ref="#place.barmen">
            <span class="tei_hi" data-rendition="#g.rend.script.latin">Barmen</span>
        </span> ankommen. Es thut ja auch nichts wenn die
        <span class="tei_rs" data-ref="#pers.partic.haar-gerhard-bernhard #pers.partic.haar-franziska-christina">Eltern</span>
        schon einige Tage vor meiner Ankunft in
        <span class="tei_placeName" data-ref="#place.barmen">
            <span class="tei_hi" data-rendition="#g.rend.script.latin">Barmen</span>
        </span> sind.
    </span>
</span> [...]`

export const TextverteilungInterlinearHtml = `<strong>Nicht vorhanden</strong>`

export const TextverteilungBeschriftungUmschlaegeHtml = `<strong>Keine Darstellung</strong>`

export const TextverteilungTabellenHtml = `
<span class="engels_topic" data-topicId="mark.001" data-type="W">Beim Verteilen von </span>
<span class="tei_hi" data-rendition="#g.rend.script.latin">
    <span class="engels_lemmaExpl" data-annotId="annot.009" data-type="com" data-subtype="W">
        <span class="engels_topic" data-topicId="mark.001" data-type="W">Colonial</span>
    </span>
</span>
<span class="engels_topic" data-topicId="mark.001" data-type="W">waren</span>
<span class="engels_topic" data-topicId="mark.001" data-type="W">haben wir</span>
<table class="tei_table" data-rows="3" data-cols="9">
    <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
    <tr class="tei_row">
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">100</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">℔</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">Reis</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">à</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">10</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="tei_choice">
                <span class="tei_abbr" data-type="currency">
                    <span xmlns:v="http://exist-db.org/versioning" class="tei_g" data-ref="#enc.chardecl.currency.sr">
                        <span class="engels_lemmaExpl" data-annotId="annot.010" data-type="com" data-subtype="W">
                            <span class="engels_topic" data-topicId="mark.001" data-type="W">Sr</span>
                        </span>
                    </span>
                </span>
                <span class="tei_expan" data-n="com">
                    <span class="engels_lemmaExpl" data-annotId="annot.010" data-type="com" data-subtype="W">
                        <span class="engels_topic" data-topicId="mark.001" data-type="W">Stüber</span>
                    </span>
                </span>
            </span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span xmlns:v="http://exist-db.org/versioning" class="tei_g" data-ref="#enc.chardecl.distinct.horizontaldashtablerow">
                <span class="engels_topic" data-topicId="mark.001" data-type="W">---</span>
            </span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="tei_choice">
                <span class="tei_abbr" data-type="currency">
                    <span class="tei_choice">
                        <span class="tei_abbr" data-rendition="#g.enc.tagsdecl.suspension.type1" data-type="suspension">
                            <span xmlns:v="http://exist-db.org/versioning" class="tei_g" data-ref="#enc.chardecl.currency.rthl">
                                <span class="engels_topic" data-topicId="mark.001" data-type="W">Rt</span>
                            </span>
                        </span>
                        <span class="tei_expan">
                            <span class="engels_topic" data-topicId="mark.001" data-type="W">Rt</span>
                            <span class="tei_ex">
                                <span class="engels_topic" data-topicId="mark.001" data-type="W">hl</span>
                            </span>
                        </span>
                    </span>
                </span>
                <span class="tei_expan" data-n="com">
                    <span class="engels_topic" data-topicId="mark.001" data-type="W">Reichsthaler</span>
                </span>
            </span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">16.40</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
    </tr>
    <span class="engels_topic" data-topicId="mark.001" data-type="W">

    </span>
    <tr class="tei_row">
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">147</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">"</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_lemmaExpl" data-annotId="annot.011" data-type="com" data-subtype="W">
                <span class="engels_topic" data-topicId="mark.001" data-type="W">Melis</span>
            </span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">à</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">27 ¾</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell"></td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell" data-rend="border-bottom">
            <span xmlns:v="http://exist-db.org/versioning" class="tei_g" data-ref="#enc.chardecl.distinct.horizontaldashtablerow">
                <span class="engels_topic" data-topicId="mark.001" data-type="W">---</span>
            </span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell" data-rend="border-bottom">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">"</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell" data-rend="border-bottom">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">67.59</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
    </tr>
    <span class="engels_topic" data-topicId="mark.001" data-type="W">

    </span>
    <tr class="tei_row">
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell" colspan="3" data-cols="3">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">zusammen für</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell"></td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell"></td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell"></td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">=</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="tei_choice">
                <span class="tei_abbr" data-rendition="#g.enc.tagsdecl.suspension.type1" data-type="suspension">
                    <span xmlns:v="http://exist-db.org/versioning" class="tei_g" data-ref="#enc.chardecl.currency.rthl">
                        <span class="engels_topic" data-topicId="mark.001" data-type="W">Rt</span>
                    </span>
                </span>
                <span class="tei_expan">
                    <span class="engels_topic" data-topicId="mark.001" data-type="W">Rt</span>
                    <span class="tei_ex">
                        <span class="engels_topic" data-topicId="mark.001" data-type="W">hl</span>
                    </span>
                </span>
            </span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
        <td class="tei_cell">
            <span class="engels_topic" data-topicId="mark.001" data-type="W">84.39</span>
        </td>
        <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
    </tr>
    <span class="engels_topic" data-topicId="mark.001" data-type="W"></span>
</table>
<span class="engels_topic" data-topicId="mark.001" data-type="W">bekommen. </span>`

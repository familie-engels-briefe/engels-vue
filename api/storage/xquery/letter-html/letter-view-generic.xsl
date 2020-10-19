<xsl:stylesheet xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:engels="http://www.engels.uni-wuppertal.de" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs tei engels" version="2.0">

    <!--
        FE, 2019-11-27


        XSLT zur Darstellung der Briefdokumente (Probesatz)
        - Generisches Stylesheet als Grundlage für die diplomatische und die normalisierte Ansicht
        - Spezialisierungen erfolgen jeweils in
            - letter-view-d.xsl: diplomatische Darstellung
            - letter-view-n.xsl: normalisierte Darstellung


        ToC
        - Layout
        - Brieftext
            - Textverteilung
            - Textkonstitution
            - Textänderungen
            - Textsegmente mit inhaltlichen Referenzen
        - Funktionen und benannte Templates
        - Kommentar
    -->




    <xsl:strip-space elements="*"/>
    <!-- CHECK (FE, 2019-12-03): preserve space in "block-elements" and elements that can span over more than one word -->
    <xsl:preserve-space elements="tei:div tei:p tei:opener tei:closer tei:dateline tei:salute tei:signed tei:note tei:add tei:del tei:hi tei:persName tei:placeName tei:orgName tei:choice tei:abbr tei:expan"/>


    <!-- match /
        * process tei:text
    -->
    <xsl:template match="/">
        <xsl:apply-templates select=".//tei:text"/>
    </xsl:template>



    <!--
        ==================================================================================================
        ========================================      LAYOUT      ========================================
        ==================================================================================================
    -->






    <!--
        ==================================================================================================
        ========================================      BRIEFTEXT      =====================================
        ==================================================================================================
    -->

    <!--
        ========================================      TEXTVERTEILUNG      ================================
    -->

    <!-- ********** Writing Sessions ********** -->

    <!-- match="tei:div[contains(@type, 'writing-session')]"
        * create div
            * apply-templates
    -->
    <xsl:template match="tei:div[contains(@type, 'writing-session')]">
        <div class="tei_div" data-type="writing-session" data-n="{@n}">
            <!--<div class="debug ">WRITING SESSION #<xsl:value-of select="@n"/></div>-->
            <xsl:apply-templates/>
        </div>
    </xsl:template>



    <!-- ********** Textabsätze ********** -->

    <!-- match="tei:p"
        * create div
            * apply-templates
    -->
    <xsl:template match="tei:p">
        <div class="tei_p">
            <!-- check for preceding inline-opener -->
            <xsl:if test="./preceding-sibling::tei:*[1][contains(@rend, 'inline')][not(contains(@rend, 'block'))]/local-name() = 'opener'">
                <xsl:apply-templates select="./preceding-sibling::tei:*[1]" mode="process"/>
            </xsl:if>

            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>

            <!-- check for following inline-closer -->
            <xsl:if test="./following-sibling::tei:*[1][contains(@rend, 'inline')][not(contains(@rend, 'block'))]/local-name() = 'closer'">
                <xsl:apply-templates select="./following-sibling::tei:*[1]" mode="process"/>
            </xsl:if>
        </div>
    </xsl:template>



    <!-- ********** Zeilen- und Seitenumbruch ********** -->

    <!-- match="tei:lb"
        * create break
    -->
    <xsl:template match="tei:lb">
        <br/>
    </xsl:template>

    <!-- match="tei:pb"
        * create break
    -->
    <xsl:template match="tei:pb">
        <br/>
    </xsl:template>

    <!-- strip whitespace after tei:lb[@break='no'] and tei:pb[@break='no'] -->
    <xsl:template match="text()[preceding-sibling::*[1][self::tei:lb[@break='no']]]|text()[preceding-sibling::*[1][self::tei:pb[@break='no']]]" priority="1">
        <xsl:value-of select="normalize-space(.)"/>
        <!-- if there is trailing whitespace, preserve -->
        <xsl:if test="normalize-space(substring(., string-length(.))) = ''">
            <xsl:text> </xsl:text>
        </xsl:if>
    </xsl:template>

    <!-- strip whitespace before tei:lb[@break='no'] and tei:pb[@break='no'] -->
    <xsl:template match="text()[following-sibling::*[1][self::tei:lb[@break='no']]]|text()[following-sibling::*[1][self::tei:pb[@break='no']]]">
        <!-- if there is leading whitespace, preserve -->
        <xsl:if test="normalize-space(substring(., 1, 1)) = ''">
            <xsl:text> </xsl:text>
        </xsl:if>
        <xsl:value-of select="normalize-space(.)"/>
    </xsl:template>



    <!-- ********** Worttrennung ********** -->

    <!-- TODO -->



    <!-- ********** Opener ********** -->

    <!-- match="tei:opener[not(contains(@rend, 'inline'))]
        * process opener
    -->
    <xsl:template match="tei:opener[not(contains(@rend, 'inline'))]">
        <div class="tei_opener">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </div>
    </xsl:template>

    <!-- match="tei:opener[@rend='inline']
    * Inline-Opener: only process from within a paragraph template
    -->
    <xsl:template match="tei:opener[contains(@rend, 'inline')]"/>
    <xsl:template match="tei:opener[contains(@rend, 'inline')]" mode="process">
        <span class="tei_opener_inline">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>

    <!-- match="tei:opener[@rend='inline block']
    * process "Inline-Block-Opener"
    -->
    <xsl:template match="tei:opener[contains(@rend, 'inline')][contains(@rend, 'block')]" priority="1">
        <div class="tei_opener">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </div>
    </xsl:template>



    <!-- match="tei:dateline"
        * interpreted as BLOCK-ELEMENT
        * process dateline
    -->
    <xsl:template match="tei:dateline">
        <div class="tei_dateline">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </div>
    </xsl:template>



    <!-- match="tei:salute"
        * interpreted as INLINE-ELEMENT
        * process salute
    -->
    <xsl:template match="tei:salute">
        <span class="tei_salute">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>



    <!-- ********** Closer ********** -->

    <!-- ***** Closer ***** -->

    <!-- match="tei:closer[not(contains(@rend, 'inline'))]"
        * process closer
    -->
    <xsl:template match="tei:closer[not(contains(@rend, 'inline'))]">
        <div class="tei_closer">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </div>
    </xsl:template>

    <!-- closer[@rend='inline']
    * Inline-Closer: only process from within a paragraph template
    -->
    <xsl:template match="tei:closer[contains(@rend, 'inline')]"/>
    <xsl:template match="tei:closer[contains(@rend, 'inline')]" mode="process">
        <span class="tei_closer_inline">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>



    <!-- match="tei:signed"
        * interpreted as INLINE-ELEMENT
        * process signed
    -->
    <xsl:template match="tei:signed">
        <span class="tei_signed">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>



    <!-- ********** Kustoden ********** -->

    <!-- match="tei:fw"
        * process fw
        * OVERRIDE IN VIEW-SPECIFIC XSLT!
    -->
    <xsl:template match="tei:fw"/>



    <!-- ********** Schreibrichtung ********** -->

    <!-- WIP -->



    <!-- ********** Nicht-lineare Verteilung von Textsegmenten ********** -->

    <!-- match="tei:div[contains(@type, 'writing-session')]/tei:note"
        * do not process note-elements that are direct children of writing-session divs
    -->
    <xsl:template match="tei:div[contains(@type, 'writing-session')]//tei:note"/>



    <!-- ********** Leerraum ********** -->

    <!--  match="tei:space"
        * default: ignore space
    -->
    <xsl:template match="tei:space"/>




    <!--
        ========================================      TEXTKONSTITUTION      ==============================
    -->

    <!-- ********** Verwendete Schrift ********** -->

    <!--
        - Kodiert in: @rendition
    -->



    <!-- ********** Unsicherheiten bzgl. der Entzifferung ********** -->

    <!--
        - DOC:
            - 4.3.4. Unsicherheiten bei Groß- und Kleinschreibung
            - 4.3.9. Unsicher entzifferbare Zeichen
        - TODO:
            - <unclear> & Referenz auf Encoding Description
    -->



    <!-- ********** Nicht entzifferbare Zeichen ********** -->

    <!--
        - DOC:
            - 4.3.8. Nicht entzifferbare Zeichen
        - Kodierung:
            - <gap>
            - <supplied>
    -->

    <!-- match="tei:gap"
        * process gap
    -->
    <xsl:template match="tei:gap">
        <span class="tei_gap">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>

    <!-- match="tei:supplied"
        * process supplied
    -->
    <xsl:template match="tei:supplied">
        <span class="tei_supplied">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>



    <!-- ********** Textverlust / Beschädigungen ********** -->

    <!-- match="tei:damage"
        * process damage
    -->
    <xsl:template match="tei:damage">
        <span class="tei_damage">
            <span class="ed">[damage: </span><!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
            <span class="ed">]</span>
        </span>
    </xsl:template>

    <!-- match="tei:damageSpan"
        * process damageSpan
    -->
    <xsl:template match="tei:damageSpan">
        <span class="tei_damageSpan start ed">[damageSpan (START)]</span>
    </xsl:template>

    <!-- match="tei:anchor[//tei:damageSpan[engels:getIdFromIdref(@spanTo)=current()/@xml:id]]"
        * process anchor (ending a damage span)
    -->
    <xsl:template match="tei:anchor[//tei:damageSpan[engels:getIdFromIdref(@spanTo)=current()/@xml:id]]">
        <span class="tei_damageSpan end ed">[damageSpan (END)]</span>
    </xsl:template>



    <!-- ********** Unterstreichung ********** -->

    <!--  match="tei:hi"
        * process hi
    -->
    <xsl:template match="tei:hi">
        <span class="tei_hi">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>




    <!--
        ========================================      TEXTÄNDERUNGEN      ================================
    -->

    <!-- ********** Tilgungen ********** -->

    <!-- match="tei:del"
        * process del
    -->
    <xsl:template match="tei:del">
        <span class="tei_del">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>



    <!-- ***** Hinzufügung ***** -->

    <!-- match="tei:add"
        * process add
    -->
    <xsl:template match="tei:add">
        <span class="tei_add">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>



    <!-- ***** Ersetzung ***** -->

    <!-- match="tei:subst"
        * process subst
    -->
    <xsl:template match="tei:subst">
        <span class="tei_subst">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>




    <!--
        ========================================      INHALTL. REFERENZEN      ===========================
    -->

    <!-- ***** Personen ***** -->

    <!-- match="tei:persName[contains(@ref, 'pers.partic')]|tei:rs[contains(@ref, 'pers.partic')]"
        * process content
        * link to database entry
    -->
    <xsl:template match="tei:persName[contains(@ref, 'pers.partic')]|tei:rs[contains(@ref, 'pers.partic')]">
        <xsl:variable name="id" select="engels:getIdFromIdref(./@ref)"/>
        <span class="tei_persName">
            <a href="{concat('https://familie-engels-briefe.uni-wuppertal.de:8443/regPers#', $id)}" target="_blank"><!-- process @rendition and @rend or apply templates -->
                <xsl:call-template name="processRenditionRendAndContent">
                    <xsl:with-param name="n" select="."/>
                </xsl:call-template>
            </a>
        </span>
    </xsl:template>



    <!-- ***** Orte ***** -->

    <!-- match="tei:placeName[contains(@ref, 'place.')]|tei:rs[contains(@ref, 'place.')]"
        * process content
        * link to database entry
    -->
    <xsl:template match="tei:placeName[contains(@ref, 'place.')]|tei:rs[contains(@ref, 'place.')]">
        <xsl:variable name="id" select="engels:getIdFromIdref(./@ref)"/>
        <span class="tei_placeName">
            <a href="{concat('https://familie-engels-briefe.uni-wuppertal.de:8443/regPlace#', $id)}" target="_blank"><!-- process @rendition and @rend or apply templates -->
                <xsl:call-template name="processRenditionRendAndContent">
                    <xsl:with-param name="n" select="."/>
                </xsl:call-template>
            </a>
        </span>
    </xsl:template>



    <!-- ***** Organisationen ***** -->

    <!-- match="tei:orgName[contains(@ref, 'org.')]|tei:rs[contains(@ref, 'org.')]"
        * process content
        * link to database entry
    -->
    <xsl:template match="tei:orgName[contains(@ref, 'org.')]|tei:rs[contains(@ref, 'org.')]">
        <xsl:variable name="id" select="engels:getIdFromIdref(./@ref)"/>
        <span class="tei_orgName">
            <a href="{concat('https://familie-engels-briefe.uni-wuppertal.de:8443/regOrg#', $id)}" target="_blank"><!-- process @rendition and @rend or apply templates -->
                <xsl:call-template name="processRenditionRendAndContent">
                    <xsl:with-param name="n" select="."/>
                </xsl:call-template>
            </a>
        </span>
    </xsl:template>



    <!-- ***** Datumsangaben ***** -->

    <!-- match="tei:date"
        * process content
    -->
    <xsl:template match="tei:date">
        <span class="tei_date" title="{./@when}">
            <!-- process @rendition and @rend or apply templates -->
            <xsl:call-template name="processRenditionRendAndContent">
                <xsl:with-param name="n" select="."/>
            </xsl:call-template>
        </span>
    </xsl:template>



    <!-- ***** Briefe ***** -->

    <!-- match="tei:rs[contains(@type, 'letter')]"
        * process content
        * create link to letter
    -->
    <xsl:template match="tei:rs[contains(@type, 'letter')]">
        <span>
            <xsl:choose>
                <xsl:when test="contains(./@ref, '#fe.') and not(contains(./@ref, '#fe.e'))">
                    <xsl:attribute name="class" select="'tei_rs letter ref'"/>
                    <a href="{concat('https://familie-engels-briefe.uni-wuppertal.de:8443/brief?n=', substring(./@ref, 5), '&amp;view=dt')}" target="_blank"><!-- process @rendition and @rend or apply templates -->
                        <xsl:call-template name="processRenditionRendAndContent">
                            <xsl:with-param name="n" select="."/>
                        </xsl:call-template>
                    </a>
                </xsl:when>
                <xsl:when test="contains(./@ref, '#fe.e')">
                    <xsl:attribute name="class" select="'tei_rs letter e'"/>
                    <xsl:attribute name="title" select="./@ref"/>
                    <!-- process @rendition and @rend or apply templates -->
                    <xsl:call-template name="processRenditionRendAndContent">
                        <xsl:with-param name="n" select="."/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="class" select="'tei_rs letter x'"/>
                    <!-- process @rendition and @rend or apply templates -->
                    <xsl:call-template name="processRenditionRendAndContent">
                        <xsl:with-param name="n" select="."/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>
        </span>
    </xsl:template>





    <!--
        ==================================================================================================
        ========================================      FUNKTIONEN      ====================================
        ==================================================================================================
    -->

    <!-- get id from id-ref -->
    <xsl:template name="getIdFromIdref">
        <xsl:param name="idref"/>
        <xsl:value-of select="substring($idref, 2)"/>
    </xsl:template>

    <!-- CHECK: Funktion funktioniert nicht bei damageSpan/@corresp...
    * Lösung ggf.: Unterschied zw. . und current() beim Aufruf
    -->
    <xsl:function name="engels:getIdFromIdref" as="xs:string">
        <xsl:param name="idref"/>
        <!--<xsl:value-of select="substring($idref, 2)"/>-->
        <xsl:value-of select="substring($idref, 2)"/>
    </xsl:function>





    <!--
        ========================================      NAMED TEMPLATES      ===============================
    -->

    <!-- ***** process @rendition and @rend ***** -->

    <!-- name="processRenditionRendAndContent"
        * when there is @rendition, process context node concerning @rendition specific stuff
        * when there is @rend, process context node concerning @rend specific stuff
        * otherwise apply templates
    -->
    <xsl:template name="processRenditionRendAndContent">
        <xsl:param name="n"/>
        <xsl:param name="mode" select="'default'"/>
        <xsl:choose>
            <xsl:when test="$n/@rendition">
                <xsl:call-template name="processRendition">
                    <xsl:with-param name="n" select="$n"/>
                    <xsl:with-param name="mode" select="$mode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="not($n/@rendition) and $n/@rend">
                <xsl:call-template name="processRend">
                    <xsl:with-param name="n" select="$n"/>
                    <xsl:with-param name="mode" select="$mode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>



    <!-- name="processRenditionExperimental"
        * create rendition-specific attributes
        * prepend rendition-specific content, if necessary
        * call template: process @rend
        * append rendition-specific content, if necessary
    -->
    <xsl:template name="processRendition">
        <xsl:param name="n"/>
        <xsl:param name="rendition" select="$n/@rendition"/>
        <xsl:param name="mode" select="'default'"/>

        <!-- ***** create rendition-specific attributes ***** -->
        <!-- rend.script -->
        <xsl:if test="contains($rendition, 'rend.script')">
            <xsl:attribute name="data-script">
                <xsl:choose>
                    <!-- latin script -->
                    <xsl:when test="contains($rendition, 'rend.script.latin')">
                        <xsl:value-of select="'rend.script.latin'"/>
                    </xsl:when>
                    <!-- kurrent script -->
                    <xsl:when test="contains($rendition, 'rend.script.kurrent')">
                        <xsl:value-of select="'rend.script.kurrent'"/>
                    </xsl:when>
                    <!-- custom -->
                    <xsl:otherwise>
                        <xsl:value-of select="'rend.script.custom'"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>
        </xsl:if>
        <!-- rend.hand -->
        <xsl:if test="contains($rendition, 'rend.hand')">
            <xsl:attribute name="data-hand">
                <xsl:choose>
                    <!-- default hand -->
                    <xsl:when test="contains($rendition, 'rend.hand.default')">
                        <xsl:value-of select="'rend.hand.default'"/>
                    </xsl:when>
                    <!-- custom -->
                    <xsl:otherwise>
                        <xsl:value-of select="'rend.hand.custom'"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>
        </xsl:if>
        <!-- rend.type -->
        <!-- ... TODO ... -->
        <!-- indent -->
        <!-- CHECK -->
        <!--<xsl:if test="contains($rendition, '.indent')">
            <xsl:attribute name="data-indent">
                <xsl:variable name="renditionIdIndent">
                    <xsl:for-each select="tokenize(normalize-space($rendition), '\s')">
                        <xsl:if test="contains(., '.indent')">
                            <xsl:value-of select="."/>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:value-of select="engels:dimensions2stringNorm(//tei:*[@xml:id=engels:getIdFromIdref($renditionIdIndent)]//tei:dimensions)"/>
            </xsl:attribute>
        </xsl:if>-->
        <!-- writing direction -->
        <xsl:if test="contains($rendition, 'tagsdecl.wd')">
            <xsl:attribute name="data-wd">
                <xsl:variable name="renditionIdWd">
                    <xsl:for-each select="tokenize(normalize-space($rendition), '\s')">
                        <xsl:if test="contains(., 'tagsdecl.wd')">
                            <xsl:value-of select="."/>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:value-of select="//tei:*[@xml:id=engels:getIdFromIdref($renditionIdWd)]//text()"/>
            </xsl:attribute>
        </xsl:if>

        <!-- ***** prepend rendition-specific content, if necessary ***** -->
        <!-- indent -->
        <!-- CHECK -->
        <!--<xsl:if test="contains($rendition, '.indent')">
            <xsl:variable name="renditionIdIndent">
                <xsl:for-each select="tokenize(normalize-space($rendition), '\s')">
                    <xsl:if test="contains(., '.indent')">
                        <xsl:value-of select="."/>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <span class="markerInfo" data-info="Einzug">
                <xsl:value-of select="concat('[EINZUG: ', engels:dimensions2string(//tei:*[@xml:id=engels:getIdFromIdref($renditionIdIndent)]//tei:dimensions), '] ')"/>
            </span>
            <span class="metadata">
                <xsl:if test="//tei:*[@xml:id=engels:getIdFromIdref($renditionIdIndent)]//tei:desc">
                    <span class="metaentry">
                        <span class="cat">Beschreibung: </span>
                        <span class="val">
                            <xsl:value-of select="//tei:*[@xml:id=engels:getIdFromIdref($renditionIdIndent)]//tei:desc/text()"/>
                        </span>
                    </span>
                </xsl:if>
            </span>
        </xsl:if>-->
        <!-- writing direction -->
        <xsl:if test="contains($rendition, 'tagsdecl.wd')">
            <xsl:variable name="renditionIdWd">
                <xsl:for-each select="tokenize(normalize-space($rendition), '\s')">
                    <xsl:if test="contains(., 'tagsdecl.wd')">
                        <xsl:value-of select="."/>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <span class="wd ed">[Schreibrichtung: <xsl:value-of select="//tei:*[@xml:id=engels:getIdFromIdref($renditionIdWd)]//text()"/>]</span>
        </xsl:if>

        <!-- ***** call template: process @rend ***** -->
        <xsl:choose>
            <xsl:when test="$n/@rend">
                <span class="{concat('tei_', $n/local-name(), ' rend')}">
                    <xsl:call-template name="processRend">
                        <xsl:with-param name="n" select="$n"/>
                        <xsl:with-param name="mode" select="$mode"/>
                    </xsl:call-template>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>

        <!-- ***** append rendition-specific content, if necessary ***** -->
        <!-- ATM there's nothing to append -->
    </xsl:template>


    <!-- name="processRend"
        * process @rend: create attributes
        * apply templates
        * process @rend: append content, if necessary
    -->
    <xsl:template name="processRend">
        <xsl:param name="n"/>
        <xsl:param name="mode" select="'default'"/>
        <xsl:param name="rend" select="$n/@rend"/>

        <!-- ### create rend-specific attributes ### -->
        <xsl:if test="$mode = 'del'">
            <xsl:attribute name="data-rendDel">
                <xsl:value-of select="$n/@rend"/>
            </xsl:attribute>
        </xsl:if>
        <!-- fallback: simply create @data-rend -->
        <xsl:attribute name="data-rend">
            <xsl:value-of select="$n/@rend"/>
        </xsl:attribute>

        <!-- ### create rend-attributes and apply templates ### -->
        <xsl:choose>
            <xsl:when test="$n/@rend">
                <span class="{concat('rend ', $n/@rend)}">
                    <!-- Unterstreichung -->
                    <xsl:if test="contains($n/@rend, 'underline')">
                        <xsl:attribute name="data-underline">
                            <xsl:choose>
                                <xsl:when test="not($n/@n)">
                                    <xsl:value-of select="'undefined'"/>
                                </xsl:when>
                                <xsl:when test="$n/@n = '1'">
                                    <xsl:value-of select="'1'"/>
                                </xsl:when>
                                <xsl:when test="$n/@n = '2'">
                                    <xsl:value-of select="'2'"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="'3plus'"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                    </xsl:if>
                    <!-- Durchstreichung -->
                    <xsl:if test="contains($n/@rend, 'strikethrough')">
                        <xsl:attribute name="data-strikethrough">
                            <xsl:choose>
                                <xsl:when test="not($n/@n)">
                                    <xsl:value-of select="'undefined'"/>
                                </xsl:when>
                                <xsl:when test="$n/@n = '1'">
                                    <xsl:value-of select="'1'"/>
                                </xsl:when>
                                <xsl:when test="$n/@n = '2'">
                                    <xsl:value-of select="'2'"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="'3plus'"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                    </xsl:if>
                    <!-- Überschreibung -->
                    <xsl:if test="contains($n/@rend, 'overwritten')">
                        <xsl:attribute name="data-overwritten" select="'true'"/>
                    </xsl:if>
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>





    <!--
        ==================================================================================================
        ========================================      KOMMENTAR      =====================================
        ==================================================================================================
    -->

    <!-- match="tei:back"
        * WIP: ignore atm
    -->
    <xsl:template match="tei:back"/>







    <!-- ###############   ALT   ############### -->

    <!-- rendition - font style -->
    <!--<xsl:template match="tei:*[@rendition='#g.rend.script.latin']">
        <span style="font-family:sans-serif">
            <xsl:apply-templates/>
        </span>
    </xsl:template>-->

    <!-- rend -->
    <!--<xsl:template match="tei:*[contains(@rend,'sup')]">
        <span style="vertical-align:super; font-size:70%">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:*[contains(@rend,'sub')]">
        <span style="vertical-align:sub; font-size:70%">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:*[contains(@rend,'strikethrough')]">
        <span style="text-decoration:line-through">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:*[contains(@rend,'underline')]">
        <span style="text-decoration:underline">
            <xsl:apply-templates/>
        </span>
    </xsl:template>-->

    <!-- opener -->
    <!--<xsl:template match="tei:opener[not(@rend='inline')]">
        <p class="opener">
            <xsl:apply-templates/>
        </p>
    </xsl:template>-->

    <!-- closer -->
    <!--<xsl:template match="tei:closer[not(@rend='inline')]">
        <p class="closer">
            <xsl:apply-templates/>
        </p>
    </xsl:template>-->

    <!-- p -->
    <!--<xsl:template match="tei:p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>-->

    <!-- gap -->
    <!--<xsl:template match="tei:gap[@reason='illegible']">
        <span class="gap">
            <xsl:choose>
                <xsl:when test="./@quantity='1'">
                    <xsl:value-of select="'x'"/>
                </xsl:when>
                <xsl:when test="./@quantity='2'">
                    <xsl:value-of select="'xx'"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="'xxx'"/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:apply-templates/>
        </span>
    </xsl:template>-->

    <!-- space -->
    <!--<xsl:template match="tei:space[@dim='horizontal']">
        <span class="space">
            <xsl:variable name="quantity">
                <xsl:value-of select="./@quantity"/>
            </xsl:variable>
            <xsl:if test="@unit='chars'">
                <xsl:choose>
                    <xsl:when test="./@quantity='1'">
                        <xsl:value-of select="' '"/>
                    </xsl:when>
                    <xsl:when test="./@quantity='2'">
                        <xsl:value-of select="'  '"/>
                    </xsl:when>
                    <xsl:when test="./@quantity='3'">
                        <xsl:value-of select="'   '"/>
                    </xsl:when>
                    <xsl:when test="./@quantity='4'">
                        <xsl:value-of select="'    '"/>
                    </xsl:when>
                    <xsl:when test="./@quantity='5'">
                        <xsl:value-of select="'     '"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <em>
                            <xsl:value-of select="concat(' [ SPACE: ', $quantity, ' chars ] ')"/>
                        </em>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:if>
        </span>
    </xsl:template>-->

    <!-- abbr -->
    <!--<xsl:template match="tei:choice[./tei:abbr]">
        <xsl:apply-templates select="./tei:abbr"/>
    </xsl:template>
    <xsl:template match="tei:abbr">
        <xsl:if test="./@type='suspension'">
            <span class="abbr">
                <xsl:apply-templates/>
                <em>
                    <xsl:value-of select="'#'"/>
                </em>
            </span>
        </xsl:if>
    </xsl:template>-->

    <!-- subst/del[@type='overwritten'] -->
    <!--<xsl:template match="tei:subst[./tei:del[@rend='overwritten']]">
        <xsl:apply-templates select="./tei:del"/>
        <xsl:apply-templates select="./tei:add" mode="overwritten"/>
    </xsl:template>
    <xsl:template match="tei:del[@rend='overwritten']">
        <span class="del-overwritten" style="color:grey;font-size:70%">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:add" mode="overwritten">
        <span class="add-overwritten" style="font-weight:bold">
            <xsl:apply-templates/>
        </span>
    </xsl:template>-->



    <!-- line breaks -->
    <!--<xsl:template match="tei:lb">
        <!-\- view dependant -\->
    </xsl:template>-->

    <!-- page breaks -->
    <!--<xsl:template match="tei:pb">
        <xsl:value-of select="'|'"/>
        <span style="vertical-align:super; font-size:70%">
            <xsl:value-of select="./@n"/>
        </span>
    </xsl:template>-->

    <!-- metamarks -->
    <!--<xsl:template match="tei:metamark[not(@function='insertion')]" priority="1"/>
    <xsl:template match="tei:metamark[@function='insertion']" priority="1">
        <xsl:variable name="id">
            <xsl:call-template name="getIdFromIdref">
                <xsl:with-param name="idref">
                    <xsl:value-of select="./@target"/>
                </xsl:with-param>
            </xsl:call-template>
        </xsl:variable>
        <xsl:apply-templates select="//tei:seg[@xml:id=$id]" mode="apply"/>
    </xsl:template>-->

    <!-- segments -->
    <!--<xsl:template match="tei:seg[@xml:id]"/>
    <xsl:template match="tei:seg[@xml:id]" mode="apply">
        <xsl:apply-templates/>
    </xsl:template>-->

    <!-- persName -->
    <!-- TODO: concat several forenames -->
    <!--<xsl:template match="tei:persName">
        <span class="persName" style="color:red">
            <xsl:attribute name="title">
                <xsl:variable name="id">
                    <xsl:call-template name="getIdFromIdref">
                        <xsl:with-param name="idref" select="./@ref"/>
                    </xsl:call-template>
                </xsl:variable>
                <xsl:value-of select="concat( //tei:*[@xml:id=$id]//tei:forename[1]//text(), ' ', //tei:*[@xml:id=$id]//tei:surname[1]//text())"/>
            </xsl:attribute>
            <xsl:apply-templates/>
        </span>
    </xsl:template>-->


</xsl:stylesheet>

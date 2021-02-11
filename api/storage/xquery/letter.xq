xquery version "3.1";

import module namespace extract = "http://www.exist-db.org/namespaces/engels/extract" at "extract.xqm";

declare namespace tei = "http://www.tei-c.org/ns/1.0";

declare namespace output="http://www.w3.org/2010/xslt-xquery-serialization";

declare option output:method "json";
declare option output:media-type "application/json";

let $id := request:get-parameter("id", "002")

let $doc := doc(concat("xmldb:exist:///db/apps/engels/data/fe", $id, ".xml"))

let $number := replace($doc/tei:TEI/@xml:id, "[fe.^]*", "")

let $xmlString := fn:serialize($doc/tei:TEI)

return
    <letter
        number="{$number}"
        version="{if ($doc/tei:TEI/@n) then $doc/tei:TEI/@n else ""}"
        date="{extract:getSenderDate($doc)}"
        doctype="{if ($doc/tei:TEI//tei:sourceDesc/@n) then $doc/tei:TEI//tei:sourceDesc/@n else ""}">
        <title>{$doc/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title/text()}</title>
        <facs>
            {
                for $fac in $doc/tei:TEI/tei:facsimile/tei:graphic
                return
                    $fac
            }
        </facs>
        <refs>
            <prev target="{if ($doc/tei:TEI//tei:correspContext/tei:ref[@type="prev"]/@target) then $doc/tei:TEI//tei:correspContext/tei:ref[@type="prev"]/@target else ""}" />
            <next target="{if ($doc/tei:TEI//tei:correspContext/tei:ref[@type="next"]/@target) then $doc/tei:TEI//tei:correspContext/tei:ref[@type="next"]/@target else ""}" />
        </refs>
        <xml content="{$xmlString}"></xml>
        <sent>
            <person ref="{extract:getPersonRef($doc, "sent")}"></person>
            <place ref="{extract:getPlaceRef($doc, "sent")}"></place>
        </sent>
        <received>
            <person ref="{extract:getPersonRef($doc, "received")}"></person>
            <place ref="{extract:getPlaceRef($doc, "received")}"></place>
        </received>
        <mentioned>
            <persons>
                {
                    for $ref in distinct-values($doc/tei:TEI//tei:text//tei:persName/@ref)
                    return
                        <person ref="{$ref}"></person>
                }
            </persons>
            <places>
                {
                    for $ref in distinct-values($doc/tei:TEI//tei:text//tei:placeName/@ref)
                    return
                        <place ref="{$ref}"></place>
                }
            </places>
            <organisations>
                {
                    for $ref in distinct-values($doc/tei:TEI//tei:text//tei:orgName/@ref)
                    return
                        <place ref="{$ref}"></place>
                }
            </organisations>
        </mentioned>
    </letter>


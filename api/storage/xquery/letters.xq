xquery version "3.1";

import module namespace extract = "http://www.exist-db.org/namespaces/engels/extract" at "extract.xqm";

declare namespace tei = "http://www.tei-c.org/ns/1.0";

declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
declare namespace json="http://www.json.org";
declare option output:method "json";

declare variable $data-collection := "xmldb:exist:///db/apps/engels/data/";

let $personSenderReceiverFilter := request:get-parameter("person-sender-receiver", "")

let $personMentionedFilter := request:get-parameter("person-mentioned", "")

let $placeSenderReceiverFilter := request:get-parameter("place-sender-receiver", "")

let $placeMentionedFilter := request:get-parameter("place-mentioned", "")

let $orgMentionedFilter := request:get-parameter("org-mentioned", "")

let $letters :=
    <letters json:array="true" filter-person-sender-receiver="{$personSenderReceiverFilter}" filter-person-mentioned="{$personMentionedFilter}" filter-place-mentioned="{$placeMentionedFilter}" filter-org-mentioned="{$orgMentionedFilter}">
    {
        for $resource-name in xmldb:get-child-resources($data-collection)
            let $uri := concat($data-collection, "/", $resource-name)
            let $doc := doc($uri)
            let $number := replace($doc/tei:TEI/@xml:id, "[fe.^]*", "")
            let $doctype := if ($doc/tei:TEI/@*[name()='engels:doctype']) then $doc/tei:TEI/@*[name()='engels:doctype'] else ""
            (: Filter xml documents in collection :)
            where fn:substring-after($resource-name, ".") = 'xml'
            (: Filter by person send/receive :)
            where (fn:not(fn:exists($doc/tei:TEI//tei:correspDesc/tei:correspAction/tei:persName/@ref)) or matches($doc/tei:TEI//tei:correspDesc/tei:correspAction/tei:persName/@ref, $personSenderReceiverFilter, "iq"))
            (: Filter by person mentioned :)
            where (fn:not(fn:exists($doc/tei:TEI/tei:text//tei:persName/@ref)) or matches($doc/tei:TEI/tei:text//tei:persName/@ref, $personMentionedFilter, "iq"))
            (: Filter by place send/receive :)
            where (fn:not(fn:exists($doc/tei:TEI//tei:correspDesc/tei:correspAction/tei:placeName/@ref)) or matches($doc/tei:TEI//tei:correspDesc/tei:correspAction/tei:placeName/@ref, $placeSenderReceiverFilter, "iq"))
            (: Filter by place mentioned :)
            where (fn:not(fn:exists($doc/tei:TEI/tei:text//tei:placeName/@ref)) or matches($doc/tei:TEI/tei:text//tei:placeName/@ref, $personMentionedFilter, "iq"))
            (: Filter by organisation mentioned :)
            where (fn:not(fn:exists($doc/tei:TEI/tei:text//tei:orgName/@ref)) or matches($doc/tei:TEI/tei:text//tei:orgName/@ref, $orgMentionedFilter, "iq"))
            order by $number
            return
                <letter
                    number="{$number}"
                    version="{if ($doc/tei:TEI/@n) then $doc/tei:TEI/@n else ""}"
                    (: editor="{extract:getEditorName($doc)}" :)
                    name="{util:unescape-uri($resource-name, "UTF-8")}"
                    date="{extract:getSenderDate($doc)}"
                    doctype="{$doctype}">
                    {
                        $doc/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title/text()
                    }
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
    }
    </letters>

return $letters

xquery version "3.1";

module namespace extract = "http://www.exist-db.org/namespaces/engels/extract";

declare namespace tei = "http://www.tei-c.org/ns/1.0";


declare function extract:getEditorName($doc as document-node()) as xs:string
{
    let $person := $doc//tei:person[@xml:id=substring-after($doc//tei:resp[normalize-space(text())='Konvertierung in TEI']/parent::tei:*/tei:persName/@ref, '#')]
    let $editorNameForename := $person//tei:forename[1]
    let $editorNameSurname := $person//tei:surname[1]

    return normalize-space(concat($editorNameForename, ' ', $editorNameSurname))
};

declare function extract:getPersonRef($doc as document-node(), $type as xs:string) as xs:string
{
    let $correspDesc := $doc/tei:TEI//tei:correspDesc
    let $receiverNameIdRef := $correspDesc/tei:correspAction[@type=$type][1]/tei:persName[1]/@ref

    return normalize-space(string($receiverNameIdRef))
};

declare function extract:getPersonName($person as element()) as xs:string
{
    let $forename := string-join($person//tei:persName/tei:forename[1])
    let $surname := string-join($person//tei:persName/tei:surname[1])

    return normalize-space(concat($forename, ' ', $surname))
};

declare function extract:getReceiverPersonName($doc as document-node()) as xs:string
{
    let $correspDesc := $doc/tei:TEI//tei:correspDesc
    let $receiverNameIdRef := $correspDesc/tei:correspAction[@type="received"][1]/tei:persName[1]/@ref
    let $receiverNameForename := $doc//tei:person[@xml:id=substring-after($receiverNameIdRef, '#')]//tei:*[local-name() = 'forename'][1]
    let $receiverNameSurname := $doc//tei:person[@xml:id=substring-after($receiverNameIdRef, '#')]//tei:*[local-name() = 'surname'][1]

    return normalize-space(concat($receiverNameForename, ' ', $receiverNameSurname))
};

declare function extract:getSenderPersonName($doc as document-node()) as xs:string
{
    let $correspDesc := $doc/tei:TEI//tei:correspDesc
    let $senderNameIdRef := $correspDesc/tei:correspAction[@type="sent"][1]/tei:persName[1]/@ref
    let $senderNameForename := $doc//tei:person[@xml:id=substring-after($senderNameIdRef, '#')]//tei:persName[1]/tei:forename[1]
    let $senderNameSurname := $doc//tei:person[@xml:id=substring-after($senderNameIdRef, '#')]//tei:persName[1]/tei:surname[1]

    return normalize-space(concat($senderNameForename, ' ', $senderNameSurname))
};


declare function extract:getPlaceRef($doc as document-node(), $type as xs:string) as xs:string
{
    let $correspDesc := $doc/tei:TEI//tei:correspDesc
    let $senderNameIdRef := $correspDesc/tei:correspAction[@type=$type][1]/tei:placeName[1]/@ref

    return normalize-space(string($senderNameIdRef))
};

declare function extract:getSenderPlaceName($doc as document-node()) as xs:string
{
    let $correspDesc := $doc/tei:TEI//tei:correspDesc
    let $senderNameIdRef := $correspDesc/tei:correspAction[@type="sent"][1]/tei:placeName[1]/@ref
    let $senderPlace := if ($doc//tei:place[@xml:id=substring-after($senderNameIdRef, '#')])
        then $doc//tei:place[@xml:id=substring-after($senderNameIdRef, '#')]/tei:placeName
        else $correspDesc/tei:correspAction[@type="sent"]/tei:placeName

    return normalize-space($senderPlace)
};

declare function extract:getReceiverPlaceName($doc as document-node()) as xs:string
{
    let $correspDesc := $doc/tei:TEI//tei:correspDesc
    let $receiverNameIdRef := $correspDesc/tei:correspAction[@type="received"][1]/tei:placeName[1]/@ref
    let $receiverPlace := if ($doc//tei:place[@xml:id=substring-after($receiverNameIdRef, '#')])
        then $doc//tei:place[@xml:id=substring-after($receiverNameIdRef, '#')]/tei:placeName[1]
        else $correspDesc/tei:correspAction[@type="received"][1]/tei:placeName[1]

    return normalize-space($receiverPlace)
};


declare function extract:getSenderDate($doc as document-node()) as xs:string
{
    let $correspDesc := $doc/tei:TEI//tei:correspDesc
    let $senderDateIso := if ($correspDesc/tei:correspAction[@type="sent"][1]/tei:date/@when)
        then $correspDesc/tei:correspAction[@type="sent"][1]/tei:date[1]/@when
        else ""

    return normalize-space($senderDateIso)
};

xquery version "3.1";

declare namespace tei = "http://www.tei-c.org/ns/1.0";

declare namespace output="http://www.w3.org/2010/xslt-xquery-serialization";

declare variable $xslt-d := 'xmldb:exist:///db/apps/engels-replication/letter-html/letter-view-d.xsl';

let $id := request:get-parameter("id", "002")

let $doc := doc(concat("xmldb:exist:///db/apps/engels/data/fe", $id, ".xml"))

return <letter>
    { transform:transform($doc/tei:TEI, $xslt-d, ())}
</letter>

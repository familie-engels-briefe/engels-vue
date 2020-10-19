xquery version "3.1";

declare namespace tei = "http://www.tei-c.org/ns/1.0";

let $id := request:get-parameter("id", "002")

let $collection := concat("xmldb:exist:///db/apps/engels/data/fe", $id, ".xml")

return doc($collection)/tei:TEI

xquery version "3.1";

declare namespace tei = "http://www.tei-c.org/ns/1.0";

declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
declare namespace json="http://www.json.org";
declare option output:method "json";

declare variable $data-collection := "xmldb:exist:///db/apps/engels/data/register/reg_global_pers.xml";

let $persons :=
    <persons json:array="true">
        {
            doc($data-collection)/tei:TEI/tei:teiHeader/tei:profileDesc/tei:particDesc//tei:person
        }
    </persons>

return $persons

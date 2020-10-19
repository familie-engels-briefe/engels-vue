(:
:  "stored query" as a test for modeling a remote API
:
:   FE, 2019-08-24
:)
xquery version "3.0";

import module namespace request = "http://exist-db.org/xquery/request";
import module namespace response = "http://exist-db.org/xquery/response";
import module namespace util = "http://exist-db.org/xquery/util";
import module namespace xmldb = "http://exist-db.org/xquery/xmldb";

declare namespace tei = "http://www.tei-c.org/ns/1.0";

(: HTTP Response codes :)
declare variable $response:CREATED := 201;
declare variable $response:BAD-REQUEST := 400;
declare variable $response:NOT-FOUND := 404;
declare variable $response:METHOD-NOT-ALLOWED := 406;

(: Configuration of this API :)
declare variable $local:letter-collection := "/db/apps/exist101-engels/data";   (: Collection in the database where the TEI-files of letters are stored :)
declare variable $local:uuidv4-pattern := "[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}";   (: FE: Funktion klaeren :)



(:~
: Create ToC
:
: @param $uri-remainder     TODO: use for interval of letter numbers
:
: @return XML
:
: TODO: editor="{x101extract:getEditorName(doc($uri))}"
:)
declare function local:create-toc($uri-remainder as xs:string)  {
    let $toc_files :=
    <toc-letters>
        {
            for $resource-name in xmldb:get-child-resources($local:letter-collection)
            let $uri := concat($local:letter-collection, "/", $resource-name)
            where fn:tokenize($resource-name, "\.")[last()] = 'xml'
            return
                <letter
                    uri="{$uri}"
                    n="{replace(doc($uri)/tei:TEI/@xml:id, "[fe.^]*", "")}"
                    v="{if (doc($uri)/tei:TEI/@n) then doc($uri)/tei:TEI/@n else "n. a."}"
                    filename="{util:unescape-uri($resource-name, "UTF-8")}">
                    {
                        doc($uri)/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title/text()
                    }
                </letter>
        }
    </toc-letters>
    return $toc_files
};



(:~
: Get all letters
:
: @param $uri-remainder     TODO: use for specific markup constructs?
:
: @return XML
:
:)
declare function local:getAllLetters($uri-remainder as xs:string)  {
    let $allFiles :=
    <teiCorpus xmlns="http://www.tei-c.org/ns/1.0">
      <teiHeader>
        <fileDesc>
            <titleStmt>
                <title>Snapshot des gesamten TEI-Corpus (Arbeitsversionen)</title>
            </titleStmt>
            <publicationStmt>
                <p>{concat("Created: ", fn:current-dateTime())}</p>
            </publicationStmt>
            <sourceDesc>
                <p>https://familie-engels-briefe.uni-wuppertal.de</p>
            </sourceDesc>
        </fileDesc>
    </teiHeader>
        {
            for $resource-name in xmldb:get-child-resources($local:letter-collection)
            let $uri := concat($local:letter-collection, "/", $resource-name)
            where fn:tokenize($resource-name, "\.")[last()] = 'xml'
            order by doc($uri)/tei:TEI/@xml:id
            return doc($uri)/tei:TEI
        }
    </teiCorpus>
    return $allFiles
};



(:~
: Get letters
:
: @param $uri-remainder    ?n=ID,ID,ID, ...
:
: @return XML
:
:)
declare function local:getLetters($paramN as xs:string)  {
    let $allFiles :=
    <teiCorpus xmlns="http://www.tei-c.org/ns/1.0">
      <teiHeader>
        <fileDesc>
            <titleStmt>
                <title>Snapshot (Arbeitsversionen der Briefe {$paramN})</title>
            </titleStmt>
            <publicationStmt>
                <p>{concat("Created: ", fn:current-dateTime())}</p>
            </publicationStmt>
            <sourceDesc>
                <p>https://familie-engels-briefe.uni-wuppertal.de</p>
            </sourceDesc>
        </fileDesc>
    </teiHeader>
        {
            for $i in tokenize($paramN, ',')
            let $uri := concat($local:letter-collection, "/fe", $i, ".xml")
            order by doc($uri)/tei:TEI/@xml:id
            return doc($uri)/tei:TEI
        }
    </teiCorpus>
    return $allFiles
};



(:~
: Get Global Register Data for Persons
:
: @param $uri-remainder
:
: @return XML
:)
declare function local:get-reg-pers-global($uri-remainder as xs:string)  {
    let $reg-entries :=
        <persons>
            {
                for $p in doc(concat($local:letter-collection, "/register/reg_global_pers.xml"))//tei:listPerson/tei:person
                return
                    $p
            }
        </persons>
    return $reg-entries
};




(:
    Main part of the XQuery which
    handles the incoming HTTP request
    calling our functions (above) and
    creating the subsequent HTTP response
:)
if(request:get-method() eq "GET")then
    if(matches(request:get-uri(), ".*/toc-letters"))then
        let $uri-remainder := tokenize(request:get-uri(), "/")[last()],
        $result := local:create-toc($uri-remainder)
        return
            if(not(empty($result)))then
                $result
            else
            (
                response:set-status-code($response:NOT-FOUND),
                <error>[ERROR MESSAGE: NOT-FOUND]</error>
            )
    else if(matches(request:get-uri(), ".*/all-letters"))then
        let $uri-remainder := tokenize(request:get-uri(), "/")[last()],
        $result := local:getAllLetters($uri-remainder)
        return
            if(not(empty($result)))then
                $result
            else
            (
                response:set-status-code($response:NOT-FOUND),
                <error>[ERROR MESSAGE: NOT-FOUND]</error>
            )
     else if(matches(request:get-uri(), ".*/get-letters"))then
        let $paramN := request:get-parameter('n', ''),
            $result := local:getLetters($paramN)
        return
            if(not(empty($result)))then
                $result
            else
            (
                response:set-status-code($response:NOT-FOUND),
                <error>[ERROR MESSAGE: NOT-FOUND]</error>
            )
    else if(matches(request:get-uri(), ".*/letters-museum"))then
        let $paramN := "001,004,021,026,029,068,071,075,130,169,235a,255,265,285,295,307,308,342",
            $result := local:getLetters($paramN)
        return
            if(not(empty($result)))then
                $result
            else
            (
                response:set-status-code($response:NOT-FOUND),
                <error>[ERROR MESSAGE: NOT-FOUND]</error>
            )
    else if(matches(request:get-uri(), ".*/reg-pers-global"))then
        let $uri-remainder := tokenize(request:get-uri(), "/")[last()],
        $result := local:get-reg-pers-global($uri-remainder)
        return
            if(not(empty($result)))then
                $result
            else
            (
                response:set-status-code($response:NOT-FOUND),
                <error>[ERROR MESSAGE: NOT-FOUND]</error>
            )
    else
    (
        response:set-status-code($response:BAD-REQUEST),
        <error>[ERROR MESSAGE: BAD-REQUEST]</error>
    )
else
(
    response:set-status-code($response:METHOD-NOT-ALLOWED),
    response:set-header("Allow", "GET")
)

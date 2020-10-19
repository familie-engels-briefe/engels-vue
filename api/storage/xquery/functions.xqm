xquery version "3.0";

module namespace func = "http://www.exist-db.org/namespaces/engels/functions";

declare function func:strip-ns($n as node()) as node() {
    if($n instance of element()) then (
        element { node-name($n) } {
            $n/@*,
            $n/node()/func:strip-ns(.)
        }
    ) else if($n instance of document-node()) then (
        document { func:strip-ns($n/node()) }
    ) else (
        $n
    )
};

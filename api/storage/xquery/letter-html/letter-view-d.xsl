<xsl:stylesheet xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs tei" version="2.0">
    <xsl:import href="letter-view-generic.xsl"/>
    <xsl:output omit-xml-declaration="yes" encoding="UTF-8" method="html"/>


    <!-- line breaks -->
    <xsl:template match="tei:lb">
        <xsl:choose>
            <xsl:when test="@break='no'">
                <xsl:variable name="rend-idref">
                    <xsl:value-of select="@rendition"/>
                </xsl:variable>
                <xsl:variable name="rend-id">
                    <xsl:call-template name="getIdFromIdref">
                        <xsl:with-param name="idref" select="$rend-idref"/>
                    </xsl:call-template>
                </xsl:variable>
                <xsl:value-of select="//tei:*[@xml:id=$rend-id]"/>
                <br/>
            </xsl:when>
            <xsl:otherwise>
                <br/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>

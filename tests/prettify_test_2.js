/**
 * maps ids of rewritten code to the expected output.
 * For brevity, <span class="foo"> has been changed to `FOO
 * and < /span> has been changed to `END.
 */
var goldens = {
  xquery: (
    '`COM(: \n' +
    '\tTook some of Mike Brevoort\'s xquery code samples because they are nice and show common xquery syntax \n' +
    ':)`END`PLN\n' +
    ' \n' +
    '  `END`COM(:~\n' +
    '   : Given a sequence of version URIs, publish all of these versions of each document\n' +
    '   : If there is a version of the same document already published, unpublish it 1st\n' +
    '   :\n' +
    '   : When "publish" is referred to, we mean that it is put into the PUBLISHED collection\n' +
    '   : unpublish removes content from this collection\n' +
    '   : @param $version_uris - sequence of uris of versions of managed documents to publish\n' +
    '   :)`END`PLN\n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:publish(`END<span class="var pln">$version_uris`END`PLN `END`KWDas`END`PLN `END`KWDitem`END`PLN()*) {\n' +
    '      `END`KWDfor`END`PLN `END<span class="var pln">$uri`END`PLN `END`KWDin`END`PLN `END<span class="var pln">$version_uris`END`PLN\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$doc`END`PLN := `END<span class="fun pln">fn:doc`END`PLN(`END<span class="var pln">$uri`END`PLN)\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$managed_base_uri`END`PLN := `END<span class="var pln">$doc`END`PLN/`END`KWDnode`END`PLN()/property::dls:version/dls:document-uri/`END`KWDtext`END`PLN()\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$existing`END`PLN :=  comoms-dls:publishedDoc(`END<span class="var pln">$managed_base_uri`END`PLN)\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$unpublishExisting`END`PLN := `END`KWDif`END`PLN(`END<span class="var pln">$existing`END`PLN) `END`KWDthen`END`PLN comoms-dls:unpublishVersion((`END<span class="fun pln">xdmp:node-uri`END`PLN(`END<span class="var pln">$existing`END`PLN)))  `END`KWDelse`END`PLN ()\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$addPermissions`END`PLN := `END<span class="fun pln">dls:document-add-permissions`END`PLN(`END<span class="var pln">$uri`END`PLN, (`END<span class="fun pln">xdmp:permission`END`PLN(`END`STR\'mkp-anon\'`END`PLN, `END`STR\'read\'`END`PLN)))\n' +
    '      `END`KWDreturn`END`PLN\n' +
    '          `END<span class="fun pln">dls:document-add-collections`END`PLN(`END<span class="var pln">$uri`END`PLN, (`END`STR"PUBLISHED"`END`PLN))    \n' +
    '  };\n' +
    ' \n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:publishLatest(`END<span class="var pln">$uri`END`PLN) {\n' +
    '      `END`COM(: TODO check if it\'s in the draft collection probably :)`END`PLN\n' +
    ' \n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$latest_version_uri`END`PLN := comoms-dls:latestVersionUri(`END<span class="var pln">$uri`END`PLN)\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$log`END`PLN:= `END<span class="fun pln">xdmp:log`END`PLN(`END<span class="fun pln">fn:concat`END`PLN(`END`STR"latest: "`END`PLN, `END<span class="var pln">$latest_version_uri`END`PLN))    \n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$log`END`PLN:= `END<span class="fun pln">xdmp:log`END`PLN(`END<span class="fun pln">fn:concat`END`PLN(`END`STR"uri: "`END`PLN, `END<span class="var pln">$uri`END`PLN))            \n' +
    '      `END`KWDreturn`END`PLN comoms-dls:publish(`END<span class="var pln">$latest_version_uri`END`PLN)    \n' +
    ' \n' +
    '  };\n' +
    ' \n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:latestVersionUri(`END<span class="var pln">$uri`END`PLN) {\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$latest_version_num`END`PLN :=\n' +
    '          (\n' +
    '          `END`KWDfor`END`PLN `END<span class="var pln">$version`END`PLN `END`KWDin`END`PLN `END<span class="fun pln">dls:document-history`END`PLN(`END<span class="var pln">$uri`END`PLN)/dls:version\n' +
    '          `END`KWDorder`END`PLN `END`KWDby`END`PLN `END<span class="fun pln">fn:number`END`PLN(`END<span class="var pln">$version`END`PLN//dls:version-id/`END`KWDtext`END`PLN()) `END`KWDdescending`END`PLN\n' +
    '          `END`KWDreturn`END`PLN `END<span class="var pln">$version`END`PLN//dls:version-id/`END`KWDtext`END`PLN()\n' +
    '          )[1]\n' +
    ' \n' +
    ' \n' +
    '      `END`KWDreturn`END`PLN `END<span class="fun pln">dls:document-version-uri`END`PLN(`END<span class="var pln">$uri`END`PLN, `END<span class="var pln">$latest_version_num`END`PLN)\n' +
    '  };\n' +
    ' \n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:unpublish(`END<span class="var pln">$uris`END`PLN `END`KWDas`END`PLN `END`KWDitem`END`PLN()*) {\n' +
    '      `END`KWDfor`END`PLN `END<span class="var pln">$uri`END`PLN `END`KWDin`END`PLN `END<span class="var pln">$uris`END`PLN\n' +
    '      `END`KWDreturn`END`PLN\n' +
    '          `END`KWDlet`END`PLN `END<span class="var pln">$published_doc`END`PLN := comoms-dls:publishedDoc(`END<span class="var pln">$uri`END`PLN)\n' +
    '          `END`KWDreturn`END`PLN\n' +
    '              `END`KWDif`END`PLN(`END<span class="var pln">$published_doc`END`PLN) `END`KWDthen`END`PLN\n' +
    '                  `END`KWDlet`END`PLN `END<span class="var pln">$published_version_uri`END`PLN := `END<span class="fun pln">xdmp:node-uri`END`PLN(`END<span class="var pln">$published_doc`END`PLN)\n' +
    '                  `END`KWDreturn`END`PLN comoms-dls:unpublishVersion(`END<span class="var pln">$published_version_uri`END`PLN)        \n' +
    '              `END`KWDelse`END`PLN\n' +
    '                  ()\n' +
    '  };\n' +
    ' \n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:latestPublishedDocAuthor(`END<span class="var pln">$uri`END`PLN) {\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$author_id`END`PLN := `END<span class="fun pln">doc`END`PLN(`END<span class="var pln">$uri`END`PLN)/property::dls:version/dls:author/`END`KWDtext`END`PLN()\n' +
    '      `END`KWDreturn`END`PLN\n' +
    '          `END`KWDif`END`PLN(`END<span class="var pln">$author_id`END`PLN) `END`KWDthen`END`PLN\n' +
    '              comoms-user:getUsername(`END<span class="var pln">$author_id`END`PLN)\n' +
    '          `END`KWDelse`END`PLN\n' +
    '              ()\n' +
    ' \n' +
    '  };\n' +
    ' \n' +
    '  `END`COM(:~\n' +
    '   : Given a sequence of version URIs, unpublish all of these versions of each document\n' +
    '   :)`END`PLN\n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:unpublishVersion(`END<span class="var pln">$version_uris`END`PLN `END`KWDas`END`PLN `END`KWDitem`END`PLN()*) {\n' +
    '      `END`KWDfor`END`PLN `END<span class="var pln">$uri`END`PLN `END`KWDin`END`PLN `END<span class="var pln">$version_uris`END`PLN\n' +
    '      `END`KWDreturn`END`PLN\n' +
    '          `END`KWDlet`END`PLN `END<span class="var pln">$removePermissions`END`PLN := `END<span class="fun pln">dls:document-remove-permissions`END`PLN(`END<span class="var pln">$uri`END`PLN, (`END<span class="fun pln">xdmp:permission`END`PLN(`END`STR\'mkp-anon\'`END`PLN, `END`STR\'read\'`END`PLN)))\n' +
    '          `END`KWDreturn`END`PLN `END<span class="fun pln">dls:document-remove-collections`END`PLN(`END<span class="var pln">$uri`END`PLN, (`END`STR"PUBLISHED"`END`PLN))        \n' +
    '  };\n' +
    ' \n' +
    '  `END`COM(:~\n' +
    '   : Given the base URI of a managed piece of content, return the document of the node\n' +
    '   : of the version that is published\n' +
    '   :)`END`PLN\n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:publishedDoc(`END<span class="var pln">$uri`END`PLN) {\n' +
    '      `END<span class="fun pln">fn:collection`END`PLN(`END`STR"PUBLISHED"`END`PLN)[property::dls:version/dls:document-uri = `END<span class="var pln">$uri`END`PLN]\n' +
    '  };\n' +
    ' \n' +
    ' \n' +
    '  `END`COM(:~\n' +
    '   : Test if any version of the managed document is published\n' +
    '   :)`END`PLN\n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:isPublished(`END<span class="var pln">$uri`END`PLN) {\n' +
    '      `END`KWDif`END`PLN( comoms-dls:publishedDoc(`END<span class="var pln">$uri`END`PLN)) `END`KWDthen`END`PLN\n' +
    '          `END<span class="fun pln">fn:true`END`PLN()\n' +
    '      `END`KWDelse`END`PLN\n' +
    '          `END<span class="fun pln">fn:false`END`PLN()\n' +
    '  };\n' +
    ' \n' +
    ' \n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:publishedState(`END<span class="var pln">$uri`END`PLN) {\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$doc`END`PLN := comoms-dls:publishedDoc(`END<span class="var pln">$uri`END`PLN)\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$published_uri`END`PLN := `END`KWDif`END`PLN(`END<span class="var pln">$doc`END`PLN) `END`KWDthen`END`PLN `END<span class="fun pln">xdmp:node-uri`END`PLN(`END<span class="var pln">$doc`END`PLN) `END`KWDelse`END`PLN ()\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$latest`END`PLN := comoms-dls:latestVersionUri(`END<span class="var pln">$uri`END`PLN)\n' +
    '      `END`KWDreturn`END`PLN\n' +
    '          `END`KWDif`END`PLN(`END<span class="var pln">$doc`END`PLN) `END`KWDthen`END`PLN\n' +
    '              `END`KWDif`END`PLN(`END<span class="var pln">$latest`END`PLN ne `END<span class="var pln">$published_uri`END`PLN) `END`KWDthen`END`PLN\n' +
    '                  `END`STR"stale"`END`PLN\n' +
    '              `END`KWDelse`END`PLN\n' +
    '                  `END`STR"published"`END`PLN\n' +
    '          `END`KWDelse`END`PLN\n' +
    '              `END`STR"unpublished"`END`PLN\n' +
    '  };\n' +
    ' \n' +
    ' \n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:getManagedDocUri(`END<span class="var pln">$uri`END`PLN) {\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$doc`END`PLN := `END<span class="fun pln">fn:doc`END`PLN(`END<span class="var pln">$uri`END`PLN)\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$managed_uri`END`PLN := `END<span class="var pln">$doc`END`PLN/property::dls:version/dls:document-uri/`END`KWDtext`END`PLN()\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$managed_uri`END`PLN := `END`KWDif`END`PLN(`END<span class="var pln">$managed_uri`END`PLN) `END`KWDthen`END`PLN `END<span class="var pln">$managed_uri`END`PLN `END`KWDelse`END`PLN `END<span class="var pln">$uri`END`PLN\n' +
    '      `END`KWDreturn`END`PLN `END<span class="var pln">$managed_uri`END`PLN\n' +
    '  };\n' +
    ' \n' +
    '  `END`COM(:~\n' +
    '   : Given a manage content url (e.g. /content/123456.xml) return the appropriate\n' +
    '   : version of the document based on what stage collection is being viewed and\n' +
    '   : what\'s published\n' +
    '   :\n' +
    '   : @param $uri a manage content url (e.g. /content/123456.xml) - NOT A VERSIONED URI\n' +
    '   :)`END`PLN\n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:doc(`END<span class="var pln">$uri`END`PLN) {\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$doc`END`PLN := `END<span class="fun pln">fn:root`END`PLN(comoms-dls:collection()[property::dls:version/dls:document-uri = `END<span class="var pln">$uri`END`PLN][1])\n' +
    '      `END`KWDreturn`END`PLN\n' +
    '          `END`KWDif`END`PLN(`END<span class="var pln">$doc`END`PLN) `END`KWDthen`END`PLN\n' +
    '              `END<span class="var pln">$doc`END`PLN\n' +
    '          `END`KWDelse`END`PLN\n' +
    '              `END`KWDlet`END`PLN `END<span class="var pln">$managedDocInCollection`END`PLN := comoms-dls:collection-name() = `END<span class="fun pln">xdmp:document-get-collections`END`PLN(`END<span class="var pln">$uri`END`PLN)\n' +
    '              `END`KWDreturn`END`PLN\n' +
    '                  `END`KWDif`END`PLN(`END<span class="var pln">$managedDocInCollection`END`PLN) `END`KWDthen`END`PLN\n' +
    '                      `END<span class="fun pln">fn:doc`END`PLN(`END<span class="var pln">$uri`END`PLN)\n' +
    '                  `END`KWDelse`END`PLN\n' +
    '                      ()\n' +
    '  };\n' +
    ' \n' +
    '  `END`COM(:~\n' +
    '   : Get the collection to be used when querying for content\n' +
    '   : THIS or comoms-dls:collection-name() SHOULD BE USED WHEN BUILDING ANY QUERY FOR MANAGED CONTENT\n' +
    '   :)`END`PLN\n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:collection()  {\n' +
    '      `END<span class="fun pln">fn:collection`END`PLN( comoms-dls:collection-name() )\n' +
    '  };\n' +
    ' \n' +
    '  `END`COM(:~\n' +
    '   : Get the collection nameto be used when querying for content\n' +
    '   : THIS or comoms-dls:collection() SHOULD BE USED WHEN BUILDING ANY QUERY FOR MANAGED CONTENT\n' +
    '   :)`END`PLN\n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:collection-name() `END`KWDas`END`PLN `END`TYPxs:string`END`PLN {\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$default_collection`END`PLN := `END`STR"PUBLISHED"`END`PLN\n' +
    '      `END`KWDreturn`END`PLN\n' +
    '          `END`KWDif`END`PLN(comoms-user:isAdmin()) `END`KWDthen`END`PLN\n' +
    '              `END`KWDlet`END`PLN `END<span class="var pln">$pub_stage_collection_cookie`END`PLN := comoms-util:getCookie(`END`STR"COMOMS_COLLECTION"`END`PLN)\n' +
    '              `END`KWDreturn`END`PLN\n' +
    '                  `END`KWDif`END`PLN(`END<span class="var pln">$pub_stage_collection_cookie`END`PLN) `END`KWDthen`END`PLN\n' +
    '                      `END<span class="var pln">$pub_stage_collection_cookie`END`PLN\n' +
    '                  `END`KWDelse`END`PLN\n' +
    '                      `END<span class="var pln">$default_collection`END`PLN\n' +
    '          `END`KWDelse`END`PLN\n' +
    '              `END<span class="var pln">$default_collection`END`PLN\n' +
    '  };\n' +
    ' \n' +
    '  `END`COM(:~\n' +
    '   : Check if the published collection is being viewed\n' +
    '   :)`END`PLN\n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:isViewingPublished() {\n' +
    '      `END`KWDif`END`PLN(comoms-dls:collection-name() = `END`STR"PUBLISHED"`END`PLN) `END`KWDthen`END`PLN\n' +
    '          `END<span class="fun pln">fn:true`END`PLN()\n' +
    '      `END`KWDelse`END`PLN\n' +
    '          `END<span class="fun pln">fn:false`END`PLN()\n' +
    '  };\n' +
    ' \n' +
    '  `END`COM(:~\n' +
    '   : Get the best URL for the content URI.\n' +
    '   : This is either the default URI based on detail type or should also take\n' +
    '   : into account friendly urls and navigation structures to figure out the\n' +
    '   : best choice\n' +
    '   :)`END`PLN\n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:contentUrl(`END<span class="var pln">$uri`END`PLN) {\n' +
    ' \n' +
    '      `END`COM(: TODO: add friendly URL and nav structure logic 1st :)`END`PLN\n' +
    ' \n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$doc`END`PLN := `END<span class="fun pln">fn:doc`END`PLN(`END<span class="var pln">$uri`END`PLN)\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$managedDocUri`END`PLN := `END<span class="var pln">$doc`END`PLN/property::dls:version/dls:document-uri\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$uri`END`PLN := `END`KWDif`END`PLN(`END<span class="var pln">$managedDocUri`END`PLN) `END`KWDthen`END`PLN `END<span class="var pln">$managedDocUri`END`PLN `END`KWDelse`END`PLN `END<span class="var pln">$uri`END`PLN\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$type`END`PLN := `END<span class="var pln">$doc`END`PLN/`END`KWDnode`END`PLN()/`END<span class="fun pln">fn:name`END`PLN()\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$content_id`END`PLN := `END<span class="fun pln">fn:tokenize`END`PLN( `END<span class="fun pln">fn:tokenize`END`PLN(`END<span class="var pln">$uri`END`PLN, `END`STR"/"`END`PLN)[3], `END`STR"\\."`END`PLN)[1]\n' +
    '      `END`KWDreturn`END`PLN\n' +
    '          `END<span class="fun pln">fn:concat`END`PLN(`END`STR"/"`END`PLN, `END<span class="var pln">$type`END`PLN, `END`STR"/"`END`PLN, `END<span class="var pln">$content_id`END`PLN)\n' +
    '  };\n' +
    ' \n' +
    '  `END`COM(:\n' +
    '   :\n' +
    '   :  gets list of doc versions and uri.\n' +
    '   :\n' +
    '   :)`END`PLN\n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:versionHistory(`END<span class="var pln">$uri`END`PLN) {\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$published_doc`END`PLN := comoms-dls:publishedDoc(`END<span class="var pln">$uri`END`PLN)\n' +
    '      `END`KWDlet`END`PLN `END<span class="var pln">$published_uri`END`PLN := `END`KWDif`END`PLN(`END<span class="var pln">$published_doc`END`PLN) `END`KWDthen`END`PLN `END<span class="fun pln">xdmp:node-uri`END`PLN(`END<span class="var pln">$published_doc`END`PLN) `END`KWDelse`END`PLN ()\n' +
    '      `END`KWDreturn`END`PLN\n' +
    '      `END`TAG&lt;versions&gt;`END`PLN\n' +
    '          {\n' +
    '          `END`KWDfor`END`PLN `END<span class="var pln">$version`END`PLN `END`KWDin`END`PLN `END<span class="fun pln">dls:document-history`END`PLN(`END<span class="var pln">$uri`END`PLN)/dls:version\n' +
    '            `END`KWDlet`END`PLN `END<span class="var pln">$version_num`END`PLN := `END<span class="var pln">$version`END`PLN/dls:version-id/`END`KWDtext`END`PLN()\n' +
    '            `END`KWDlet`END`PLN `END<span class="var pln">$created`END`PLN := `END<span class="var pln">$version`END`PLN/dls:created/`END`KWDtext`END`PLN()\n' +
    '            `END`KWDlet`END`PLN `END<span class="var pln">$author_id`END`PLN := `END<span class="var pln">$version`END`PLN/dls:author/`END`KWDtext`END`PLN()\n' +
    '            `END`KWDlet`END`PLN `END<span class="var pln">$author`END`PLN := comoms-user:getUsername(`END<span class="var pln">$author_id`END`PLN)\n' +
    ' \n' +
    ' \n' +
    '            `END`KWDlet`END`PLN `END<span class="var pln">$note`END`PLN := `END<span class="var pln">$version`END`PLN/dls:annotation/`END`KWDtext`END`PLN()\n' +
    '            `END`KWDlet`END`PLN `END<span class="var pln">$version_uri`END`PLN := `END<span class="fun pln">xdmp:node-uri`END`PLN(`END<span class="fun pln">dls:document-version`END`PLN(`END<span class="var pln">$uri`END`PLN, `END<span class="var pln">$version_num`END`PLN))\n' +
    '            `END`KWDlet`END`PLN `END<span class="var pln">$published`END`PLN := `END<span class="var pln">$published_uri`END`PLN `END`KWDeq`END`PLN `END<span class="var pln">$version_uri`END`PLN\n' +
    '            `END`KWDreturn`END`PLN\n' +
    '              `END`TAG&lt;version&gt;`END`PLN\n' +
    '                  `END`TAG&lt;version-number&gt;`END`PLN{`END<span class="var pln">$version_num`END`PLN}`END`TAG&lt;/version-number&gt;`END`PLN\n' +
    '                  `END`TAG&lt;created&gt;`END`PLN{`END<span class="var pln">$created`END`PLN}`END`TAG&lt;/created&gt;`END`PLN                \n' +
    '                  `END`TAG&lt;author&gt;`END`PLN{`END<span class="var pln">$author`END`PLN}`END`TAG&lt;/author&gt;`END`PLN\n' +
    '                  `END`TAG&lt;published&gt;`END`PLN{`END<span class="var pln">$published`END`PLN}`END`TAG&lt;/published&gt;`END`PLN\n' +
    '                  `END`TAG&lt;version-uri&gt;`END`PLN{`END<span class="var pln">$version_uri`END`PLN}`END`TAG&lt;/version-uri&gt;`END`PLN\n' +
    '              `END`TAG&lt;/version&gt;`END`PLN  \n' +
    '          }        \n' +
    '      `END`TAG&lt;/versions&gt;`END`PLN\n' +
    '  };\n' +
    ' \n' +
    ' \n' +
    ' \n' +
    ' \n' +
    ' \n' +
    ' \n' +
    '  `END`COM(: ########################################################################### :)`END`PLN\n' +
    '  `END`COM(: PRIVATE FUNCTIONS :)`END`PLN\n' +
    '  `END`COM(: ########################################################################### :)`END`PLN\n' +
    ' \n' +
    '  `END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN comoms-dls:_import() {\n' +
    '      `END`STR"xquery version \'1.0-ml\';\n' +
    '       import module namespace dls = \'http://marklogic.com/xdmp/dls\' at \'/MarkLogic/dls.xqy\'; "`END`PLN\n' +
    '  };  \n' +
    ' \n' +
    '`END`COM(: ----\n' +
    '---- :)`END`PLN\n' +
    '`END`KWDxquery`END`PLN `END`KWDversion`END`PLN `END`STR\'1.0-ml\'`END`PLN;\n' +
    '`END`KWDdeclare`END`PLN `END`KWDvariable`END`PLN `END<span class="var pln">$URI`END`PLN `END`KWDas`END`PLN `END`TYPxs:string`END`PLN `END`KWDexternal`END`PLN;\n' +
    ' \n' +
    '`END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN local:document-move-forest(`END<span class="var pln">$uri`END`PLN `END`KWDas`END`PLN `END`TYPxs:string`END`PLN, `END<span class="var pln">$forest-ids`END`PLN `END`KWDas`END`PLN `END`TYPxs:unsignedLong`END`PLN*)\n' +
    '{\n' +
    '  `END<span class="fun pln">xdmp:document-insert`END`PLN(\n' +
    '    `END<span class="var pln">$uri`END`PLN,\n' +
    '    `END<span class="fun pln">fn:doc`END`PLN(`END<span class="var pln">$uri`END`PLN),\n' +
    '    `END<span class="fun pln">xdmp:document-get-permissions`END`PLN(`END<span class="var pln">$uri`END`PLN),\n' +
    '    `END<span class="fun pln">xdmp:document-get-collections`END`PLN(`END<span class="var pln">$uri`END`PLN),\n' +
    '    `END<span class="fun pln">xdmp:document-get-quality`END`PLN(`END<span class="var pln">$uri`END`PLN),\n' +
    '    `END<span class="var pln">$forest-ids`END`PLN\n' +
    '  )\n' +
    '};\n' +
    ' \n' +
    '`END`KWDlet`END`PLN `END<span class="var pln">$xml`END`PLN :=\n' +
    '  `END`TAG&lt;xml`END`PLN att=`END`STR"blah"`END`PLN att2=`END`STR"blah"`END`TAG&gt;`END`PLN\n' +
    '    sdasd`END`TAG&lt;b&gt;`END`PLNasdasd`END`TAG&lt;/b&gt;`END`PLN\n' +
    '  `END`TAG&lt;/xml&gt;`END`PLN\n' +
    '`END`COM(: -------- :)`END`PLN\n' +
    '`END`KWDfor`END`PLN `END<span class="var pln">$d`END`PLN `END`KWDin`END`PLN `END<span class="fun pln">fn:doc`END`PLN(`END`STR"depts.xml"`END`PLN)/depts/deptno\n' +
    '`END`KWDlet`END`PLN `END<span class="var pln">$e`END`PLN := `END<span class="fun pln">fn:doc`END`PLN(`END`STR"emps.xml"`END`PLN)/emps/emp[deptno = `END<span class="var pln">$d`END`PLN]\n' +
    '`END`KWDwhere`END`PLN `END<span class="fun pln">fn:count`END`PLN(`END<span class="var pln">$e`END`PLN) &gt;= 10\n' +
    '`END`KWDorder`END`PLN `END`KWDby`END`PLN `END<span class="fun pln">fn:avg`END`PLN(`END<span class="var pln">$e`END`PLN/salary) `END`KWDdescending`END`PLN\n' +
    '`END`KWDreturn`END`PLN\n' +
    '   `END`TAG&lt;big-dept&gt;`END`PLN\n' +
    '      {\n' +
    '      `END<span class="var pln">$d`END`PLN,\n' +
    '      `END`TAG&lt;headcount&gt;`END`PLN{`END<span class="fun pln">fn:count`END`PLN(`END<span class="var pln">$e`END`PLN)}`END`TAG&lt;/headcount&gt;`END`PLN,\n' +
    '      `END`TAG&lt;avgsal&gt;`END`PLN{`END<span class="fun pln">fn:avg`END`PLN(`END<span class="var pln">$e`END`PLN/salary)}`END`TAG&lt;/avgsal&gt;`END`PLN\n' +
    '      }\n' +
    '   `END`TAG&lt;/big-dept&gt;`END`PLN\n' +
    '`END`COM(: -------- :)`END`PLN\n' +
    '`END`KWDdeclare`END`PLN `END`KWDfunction`END`PLN local:depth(`END<span class="var pln">$e`END`PLN `END`KWDas`END`PLN `END`KWDnode`END`PLN()) `END`KWDas`END`PLN `END`TYPxs:integer`END`PLN\n' +
    '{\n' +
    '   `END`COM(: A node with no children has depth 1 :)`END`PLN\n' +
    '   `END`COM(: Otherwise, add 1 to max depth of children :)`END`PLN\n' +
    '   `END`KWDif`END`PLN (`END<span class="fun pln">fn:empty`END`PLN(`END<span class="var pln">$e`END`PLN/*)) `END`KWDthen`END`PLN 1\n' +
    '   `END`KWDelse`END`PLN `END<span class="fun pln">fn:max`END`PLN(`END`KWDfor`END`PLN `END<span class="var pln">$c`END`PLN `END`KWDin`END`PLN `END<span class="var pln">$e`END`PLN/* `END`KWDreturn`END`PLN local:depth(`END<span class="var pln">$c`END`PLN)) + 1\n' +
    '};\n' +
    ' \n' +
    'local:depth(`END<span class="fun pln">fn:doc`END`PLN(`END`STR"partlist.xml"`END`PLN))\n' +
    ' \n' +
    '`END`COM(: -------- :)`END`PLN\n' +
    '`END`TAG&lt;html&gt;&lt;head`END`PLN/`END`TAG&gt;&lt;body&gt;`END`PLN\n' +
    '{\n' +
    '  `END`KWDfor`END`PLN `END<span class="var pln">$act`END`PLN `END`KWDin`END`PLN `END<span class="fun pln">doc`END`PLN(`END`STR"hamlet.xml"`END`PLN)//ACT\n' +
    '  `END`KWDlet`END`PLN `END<span class="var pln">$speakers`END`PLN := `END<span class="fun pln">distinct-values`END`PLN(`END<span class="var pln">$act`END`PLN//SPEAKER)\n' +
    '  `END`KWDreturn`END`PLN\n' +
    '    `END`TAG&lt;div&gt;`END`PLN{ `END<span class="fun pln">string`END`PLN(`END<span class="var pln">$act`END`PLN/TITLE) }`END`TAG&lt;/h1&gt;`END`PLN\n' +
    '      `END`TAG&lt;ul&gt;`END`PLN\n' +
    '      {\n' +
    '        `END`KWDfor`END`PLN `END<span class="var pln">$speaker`END`PLN `END`KWDin`END`PLN `END<span class="var pln">$speakers`END`PLN\n' +
    '        `END`KWDreturn`END`PLN `END`TAG&lt;li&gt;`END`PLN{ `END<span class="var pln">$speaker`END`PLN }`END`TAG&lt;/li&gt;`END`PLN\n' +
    '      }\n' +
    '      `END`TAG&lt;/ul&gt;`END`PLN\n' +
    '    `END`TAG&lt;/div&gt;`END`PLN\n' +
    '}\n' +
    '`END`TAG&lt;/body&gt;&lt;/html&gt;`END`PLN\n' +
    '`END`COM(: -------- :)`END`PLN\n' +
    '{\n' +
    '\t`END`KWDfor`END`PLN `END<span class="var pln">$book`END`PLN `END`KWDin`END`PLN `END<span class="fun pln">doc`END`PLN(`END`STR"books.xml"`END`PLN)//book\n' +
    '        `END`KWDreturn`END`PLN\n' +
    '\t`END`KWDif`END`PLN (`END<span class="fun pln">contains`END`PLN(`END<span class="var pln">$book`END`PLN/author/`END`KWDtext`END`PLN(),`END`STR"Herbert"`END`PLN) `END`KWDor`END`PLN `END<span class="fun pln">contains`END`PLN(`END<span class="var pln">$book`END`PLN/author/`END`KWDtext`END`PLN(),`END`STR"Asimov"`END`PLN))\n' +
    '\t\t`END`KWDthen`END`PLN `END<span class="var pln">$book`END`PLN\n' +
    '\t`END`KWDelse`END`PLN `END<span class="var pln">$book`END`PLN/`END`KWDtext`END`PLN()\n' +
    '\t\n' +
    '\t`END`KWDlet`END`PLN `END<span class="var pln">$let`END`PLN := `END`TAG&lt;x&gt;`END`STR"test"`END`TAG&lt;/x&gt;`END`PLN\n' +
    '\t`END`KWDreturn`END`PLN `END`KWDelement`END`PLN `END`KWDelement`END`PLN {\n' +
    '\t`END`KWDattribute`END`PLN `END`KWDattribute`END`PLN { 1 },\n' +
    '\t`END`KWDelement`END`PLN test { `END`STR\'a\'`END`PLN },\n' +
    '\t`END`KWDattribute`END`PLN foo { `END`STR"bar"`END`PLN },\n' +
    '\t`END<span class="fun pln">fn:doc`END`PLN()[ foo/`END`LIT@bar`END`PLN `END`KWDeq`END`PLN `END<span class="var pln">$let`END`PLN ],\n' +
    '\t//x }\n' +
    '}\n' +
    '`END`COM(: -------- :)`END`PLN\n' +
    '`END`TAG&lt;bib&gt;`END`PLN\n' +
    ' {\n' +
    '  `END`KWDfor`END`PLN `END<span class="var pln">$b`END`PLN `END`KWDin`END`PLN `END<span class="fun pln">doc`END`PLN(`END`STR"http://bstore1.example.com/bib.xml"`END`PLN)/bib/book\n' +
    '  `END`KWDwhere`END`PLN `END<span class="var pln">$b`END`PLN/publisher = `END`STR"Addison-Wesley"`END`PLN `END`KWDand`END`PLN `END<span class="var pln">$b`END`PLN/`END`LIT@year`END`PLN &gt; 1991\n' +
    '  `END`KWDreturn`END`PLN\n' +
    '    `END`TAG&lt;book`END`PLN year=`END`STR"`END`PLN{ `END<span class="var pln">$b`END`PLN/`END`LIT@year`END`PLN }`END`STR"`END`TAG&gt;`END`PLN\n' +
    '     { `END<span class="var pln">$b`END`PLN/title }\n' +
    '    `END`TAG&lt;/book&gt;`END`PLN\n' +
    ' }\n' +
    '`END`TAG&lt;/bib&gt;`END`PLN\n' +
    '`END`COM(: -------- :)`END'
  ),
  nemerle: (
    '`KWDclass`END`PLN Set `END`PUN[`END`PLN\'a`END`PUN]`END`PLN\n' +
    '`END`PUN{`END`PLN\n' +
    '  `END`KWDmutable`END`PLN storage `END`PUN:`END`PLN `END`TYPlist`END`PLN `END`PUN[`END`PLN\'a`END`PUN]`END`PLN `END`PUN=`END`PLN `END`PUN[];`END`PLN\n' +
    '  `END`KWDpublic`END`PLN Add `END`PUN(`END`PLNe `END`PUN:`END`PLN \'a`END`PUN)`END`PLN `END`PUN:`END`PLN `END`TYPvoid`END`PLN\n' +
    '  `END`PUN{`END`PLN\n' +
    '    `END`KWDwhen`END`PLN `END`PUN(!`END`PLN Contains `END`PUN(`END`PLNe`END`PUN))`END`PLN\n' +
    '      storage `END`PUN::=`END`PLN e`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDpublic`END`PLN Contains `END`PUN(`END`PLNe `END`PUN:`END`PLN \'a`END`PUN)`END`PLN `END`PUN:`END`PLN `END`TYPbool`END`PLN\n' +
    '  `END`PUN{`END`PLN\n' +
    '    storage`END`PUN.`END`PLNContains `END`PUN(`END`PLNe`END`PUN)`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    ' \n' +
    '`END`KWDdef`END`PLN s1 `END`PUN=`END`PLN Set `END`PUN();`END`PLN\n' +
    's1`END`PUN.`END`PLNAdd `END`PUN(`END`LIT3`END`PUN);`END`PLN\n' +
    's1`END`PUN.`END`PLNAdd `END`PUN(`END`LIT42`END`PUN);`END`PLN\n' +
    '`END`KWDassert`END`PLN `END`PUN(`END`PLNs1`END`PUN.`END`PLNContains `END`PUN(`END`LIT3`END`PUN));`END`PLN\n' +
    '`END`COM// s1.Add ("foo"); // error here!`END`PLN\n' +
    '`END`KWDdef`END`PLN s2 `END`PUN=`END`PLN Set `END`PUN();`END`PLN\n' +
    's2`END`PUN.`END`PLNAdd `END`PUN(`END`STR"foo"`END`PUN);`END`PLN\n' +
    '`END`KWDassert`END`PLN `END`PUN(`END`PLNs2`END`PUN.`END`PLNContains `END`PUN(`END`STR"foo"`END`PUN));`END'
  ),
  latex: (
    '`COM% resume.tex`END`PLN\n' +
    '`END`COM% vim:set ft=tex spell:`END`PLN\n' +
    '`END`KWD\\documentclass`END`PUN[`END`LIT10pt`END`PLN,letterpaper`END`PUN]{`END`PLNarticle`END`PUN}`END`PLN\n' +
    '`END`KWD\\usepackage`END`PUN[`END`PLNletterpaper,margin`END`PUN=`END`LIT0.8in`END`PUN]{`END`PLNgeometry`END`PUN}`END`PLN\n' +
    '`END`KWD\\usepackage`END`PUN{`END`PLNmdwlist`END`PUN}`END`PLN\n' +
    '`END`KWD\\usepackage`END`PUN[`END`PLNT1`END`PUN]{`END`PLNfontenc`END`PUN}`END`PLN\n' +
    '`END`KWD\\usepackage`END`PUN{`END`PLNtextcomp`END`PUN}`END`PLN\n' +
    '`END`KWD\\pagestyle`END`PUN{`END`PLNempty`END`PUN}`END`PLN\n' +
    '`END`KWD\\setlength`END`PUN{`END`KWD\\tabcolsep`END`PUN}{`END`LIT0em`END`PUN}`END'
  ),
  issue144: (
    '`COM#! /bin/bash`END`PLN\n' +
    '`END`COM# toascii.sh`END`PLN\n' +
    '`END`KWDfor`END`PLN i `END`KWDin`END`PLN $`END`PUN(`END`PLNecho $`END`PUN*' +
      '`END`PLN `END`PUN|`END`PLN fold `END`PUN-`END`PLNw `END`LIT1`END`PUN);`END' +
      '`KWDdo`END`PLN\n' +
    '  printf `END`STR"%x "`END`PLN \\\'$i`END`PUN;`END`PLN\n' +
    '`END`KWDdone`END`PUN;`END`PLN\n' +
    'echo`END'
  ),
  issue145: (
    '`TAG&lt;script`END`PLN `END`ATNtype`END`PUN=`END`ATV"text/javascript"`END`TAG&gt;`END`PLN\n' +
    '`END`PUN&lt;!--`END`PLN\n' +
    '        `END`KWDvar`END`PLN target `END`PUN=`END`PLN $$`END`PUN.`END`PLNcss`END`PUN(`END`STR\'backgroundImage\'`END`PUN).`END`PLNreplace`END`PUN(`END`STR/^url[\\(\\)\'"]/`END`PLNg`END`PUN,`END`PLN `END`STR\'\'`END`PUN);`END`PLN\n' +
    '\n' +
    '        `END`COM// nice long chain: wrap img element in span`END`PLN\n' +
    '        $$`END`PUN.`END`PLNwrap`END`PUN(`END`STR\'&lt;span style="position: relative;"&gt;&lt;/span&gt;\'`END`PUN)`END`PLN\n' +
    '`END`PUN--&gt;`END`PLN\n' +
    '`END`TAG&lt;/script&gt;`END'
  ),
  clojure: (
    '`COM; Clojure test comment`END`PLN\n' +
    '`END`OPN(`END`KWDns`END`PLN test\n' +
    ' `END`OPN(`END`TYP:gen-class`END`CLO))`END`PLN\n' +
    '\n' +
    '`END`OPN(`END`KWDdef`END`PLN foo `END`STR"bar"`END`CLO)`END`PLN\n' +
    '`END`OPN(`END`KWDdefn`END`PLN bar `END`OPN[`END`PLNarg1 arg2 &amp; args`END`CLO]`END`PLN\n' +
    '  `END`STR"sample function"`END`PLN\n' +
    '  `END`OPN(`END`KWDfor`END`PLN `END`OPN[`END`PLNarg args`END`CLO]`END`PLN\n' +
    '    `END`OPN(`END`KWDprn`END`PLN arg`END`CLO)))`END`PLN\n' +
    '\n' +
    '`END`OPN(`END`PLNbar `END`STR"foo"`END`PLN `END`STR"bar"`END`PLN `END`STR"blah"`END`PLN `END`TYP:baz`END`CLO)`END'
  ),
  html5conv1: '`COM; foo`END',
  html5conv2: '<code class="language-lisp">`COM; foo`END</code>',
  html5conv3: (
    '<code class="language-lisp">`PLN\n' +
    '`END`COM; foo`END`PLN\n' +
    '`END</code>\n'
  ),
  html5conv4: (
    '`PLNbefore CODE\n' +
    '`END<code class="language-lisp">`PUN;`END`PLN foo`END</code>\n'
  ),
  procinstr1: '`COM; foo`END',
  procinstr2: '<ol class="linenums"><li class="L3" value="4">`COM; foo`END</li></ol>',
  procinstr3: '<ol class="linenums"><li class="L0">`COM; foo`END</li></ol>',
  procinstr4: '`COM; foo`END',
  issue185: '`STR"No tag backs."`END',
  issue261: '<ol class="linenums"><li class="L0">`STR"No tag backs."`END</li></ol>',
  issue201: (
    '`KWDstatic`END`PLN `END`TYPPersistent`END' +
    '`PUN&lt;`END`TYPString`END`PUN&gt;`END`PLN listeners_symbol`END`PUN;`END'
  ),
  dart: (
    '`KWDpart of`END`PLN myLib`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`KWDpart`END`PLN `END`STR\'something.dart\'`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`KWDimport`END`PLN `END`STR\'dart:math\'`END`PLN `END' +
      '`KWDas`END`PLN test `END`KWDshow`END`PLN foo`END`PUN,`END`PLN bar`END`PUN;`END' +
      '`PLN\n' +
    '\n' +
    '`END`KWDclass`END`PLN `END`TYPPoint`END`PLN `END`PUN{`END`PLN\n' +
    '  `END`KWDfinal`END`PLN `END`TYPnum`END`PLN x`END`PUN,`END`PLN y`END`PUN;`END`PLN\n' +
    '\n' +
    '  `END`TYPPoint`END`PUN(`END`KWDthis`END`PUN.`END`PLNx`END' +
      '`PUN,`END`PLN `END`KWDthis`END`PUN.`END`PLNy`END`PUN);`END`PLN\n' +
    '  `END`TYPPoint`END`PUN.`END`PLNzero`END`PUN()`END`PLN `END' +
      '`PUN:`END`PLN x `END`PUN=`END`PLN `END`LIT0`END`PUN,`END' +
      '`PLN y `END`PUN=`END`PLN `END`LIT0`END`PUN;`END`PLN  `END' +
      '`COM// Named constructor`END`PLN\n' +
    '                                `END' +
      '`COM// with an initializer list.`END`PLN\n' +
    '\n' +
    '  `END`TYPnum`END`PLN distanceTo`END`PUN(`END`TYPPoint`END`PLN other`END' +
      '`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    `END`KWDvar`END`PLN dx `END`PUN=`END`PLN x `END`PUN-`END' +
      '`PLN other`END`PUN.`END`PLNx`END`PUN;`END`PLN\n' +
    '    `END`KWDvar`END`PLN dy `END`PUN=`END`PLN y `END`PUN-`END' +
      '`PLN other`END`PUN.`END`PLNy`END`PUN;`END`PLN\n' +
    '    `END`KWDreturn`END`PLN sqrt`END`PUN(`END`PLNdx `END`PUN*`END' +
      '`PLN dx `END`PUN+`END`PLN dy `END`PUN*`END`PLN dy`END`PUN);`END' +
      '`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    '`END`COM// This is a single-line comment.`END`PLN\n' +
    '\n' +
    '`END`COM/*\n' +
    'This is a\n' +
    'multiline comment.\n' +
    '*/`END`PLN\n' +
    '\n' +
    'main`END`PUN()`END`PLN `END`PUN{`END`PLN\n' +
    '  `END`TYPPoint`END`PLN p `END`PUN=`END`PLN `END`KWDnew`END' +
      '`PLN `END`TYPPoint`END`PUN(`END`LIT7`END`PUN,`END`PLN `END' +
      '`LIT12`END`PUN);`END`PLN\n' +
    '  `END`TYPString`END`PLN thing `END`PUN=`END`PLN `END' +
      '`STR\'It\\\'s awesome!\'`END`PUN;`END`PLN\n' +
    '  `END`TYPString`END`PLN thing2 `END`PUN=`END`PLN `END' +
      '`STR\'\'\'\n' +
    'This is a test! \\\'\'\'\n' +
    'This is the end of the test\'\'\'`END`PUN;`END`PLN\n' +
    '  `END`TYPString`END`PLN thing3 `END`PUN=`END`PLN `END' +
      '`STRr\"\"\"\n' +
    'This is a raw\n' +
    'multiline string!\"\"\"`END`PUN;`END`PLN\n' +
    '  `END`TYPnum`END`PLN x `END`PUN=`END`PLN `END`LIT0x123ABC`END`PUN;`END`PLN\n' +
    '  `END`TYPnum`END`PLN y `END`PUN=`END`PLN `END`LIT1.8e-12`END`PUN;`END`PLN\n' +
    '  `END`TYPbool`END`PLN flag `END`PUN=`END`PLN `END`KWDfalse`END' +
      '`PUN;`END`PLN\n' +
    '  `END`TYPString`END`PLN raw `END`PUN=`END`PLN `END' +
      '`STRr\"This is a raw string, where \\n doesn\'t matter\"`END' +
      '`PUN;`END`PLN\n' +
    '`END`PUN}`END'
  ),
  tcl_lang: (
    '`COM#!/bin/tclsh`END`PLN\n' +
    '`END`KWDproc`END`PLN fib `END`OPN{`END`PLNn`END`CLO}`END`PLN `END`OPN{`END`PLN\n' +
    '    `END`KWDset`END`PLN a `END`LIT0`END`PLN\n' +
    '    `END`KWDset`END`PLN b `END`LIT1`END`PLN\n' +
    '    `END`KWDwhile`END`PLN `END`OPN{`END`PUN$`END`PLNn `END`PUN&gt;`END`PLN `END`LIT0`END`CLO}`END`PLN `END`OPN{`END`PLN\n' +
    '        `END`KWDset`END`PLN tmp `END`PUN$`END`PLNa\n' +
    '        `END`KWDset`END`PLN a `END`PUN[`END`KWDexpr`END`PLN `END`PUN$`END`PLNa `END`PUN+`END`PLN `END`PUN$`END`PLNb`END`PUN]`END`PLN\n' +
    '        `END`KWDset`END`PLN b `END`PUN$`END`PLNtmp\n' +
    '        `END`KWDincr`END`PLN n `END`LIT-1`END`PLN\n' +
    '    `END`CLO}`END`PLN\n' +
    '    `END`KWDreturn`END`PLN `END`PUN$`END`PLNa\n' +
    '`END`CLO}`END'
  ),
  r_lang: (
    '`COM### Example R script for syntax highlighting`END`PLN\n' +
    '\n' +
    '`END`COM# This is a comment`END`PLN\n' +
    '\n' +
    '`END`COM## Valid names`END`PLN\n' +
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV0123456789._a `END`PUN&lt;-`END`PLN `END`LITNULL`END`PLN\n' +
    '.foo_ `END`PUN&lt;-`END`PLN `END`LITNULL`END`PLN\n' +
    '._foo `END`PUN&lt;-`END`PLN `END`LITNULL`END`PLN\n' +
    '\n' +
    '`END`COM## Invalid names`END`PLN\n' +
    '`END`LIT0`END`PLNabc `END`PUN&lt;-`END`PLN `END`LITNULL`END`PLN\n' +
    '`END`LIT.0`END`PLNabc `END`PUN&lt;-`END`PLN `END`LITNULL`END`PLN\n' +
    'abc`END`PUN+`END`PLNcde `END`PUN&lt;-`END`PLN `END`LITNULL`END`PLN\n' +
    '\n' +
    '`END`COM## Reserved Words`END`PLN\n' +
    '`END`LITNA`END`PLN\n' +
    '`END`LITNA_integer_`END`PLN\n' +
    '`END`LITNA_real_`END`PLN\n' +
    '`END`LITNA_character_`END`PLN\n' +
    '`END`LITNA_complex_`END`PLN\n' +
    '`END`LITNULL`END`PLN\n' +
    '`END`LITNaN`END`PLN\n' +
    '`END`LITInf`END`PLN\n' +
    '`END`COM## Not reserved`END`PLN\n' +
    'NULLa `END`PUN&lt;-`END`PLN `END`LITNULL`END`PLN\n' +
    'NULL1 `END`PUN&lt;-`END`PLN `END`LITNULL`END`PLN\n' +
    'NULL. `END`PUN&lt;-`END`PLN `END`LITNULL`END`PLN\n' +
    'NA_foo_ `END`PUN&lt;-`END`PLN `END`LITNULL`END`PLN\n' +
    '\n' +
    '`END`COM## Numbers`END`PLN\n' +
    '`END`LIT12345678901`END`PLN\n' +
    '`END`LIT123456.78901`END`PLN\n' +
    '`END`LIT123e3`END`PLN\n' +
    '`END`LIT123E3`END`PLN\n' +
    '`END`LIT1.23e-3`END`PLN\n' +
    '`END`LIT1.23e3`END`PLN\n' +
    '`END`LIT1.23e-3`END`PLN\n' +
    '`END`COM## integer constants`END`PLN\n' +
    '`END`LIT123L`END`PLN\n' +
    '`END`LIT1.23L`END`PLN\n' +
    '`END`COM## imaginary numbers`END`PLN\n' +
    '`END`LIT123i`END`PLN\n' +
    '`END`LIT-123i`END`PLN\n' +
    '`END`LIT123e4i`END`PLN\n' +
    '`END`LIT123e-4i`END`PLN\n' +
    '`END`COM## Hex numbers`END`PLN\n' +
    '`END`LIT0xabcdefABCDEF01234`END`PLN\n' +
    '`END`LIT0xabcp123`END`PLN\n' +
    '`END`LIT0xabcP123`END`PLN\n' +
    '`END`COM## Not hex`END`PLN\n' +
    '`END`LIT0`END`PLNxg\n' +
    '\n' +
    '`END`COM## Special operators %xyz%`END`PLN\n' +
    '`END`COM## %xyz%`END`PLN\n' +
    '`END`LIT1`END`PLN `END`PUN%%`END`PLN `END`LIT2`END`PLN\n' +
    'diag`END`PUN(`END`LIT2`END`PUN)`END`PLN `END`PUN%*%`END`PLN diag`END`PUN(`END`LIT2`END`PUN)`END`PLN\n' +
    '`END`LIT1`END`PLN `END`PUN%/%`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT1`END`PLN `END`PUN%in%`END`PLN `END`LIT1`END`PUN:`END`LIT10`END`PLN\n' +
    'diag`END`PUN(`END`LIT2`END`PUN)`END`PLN `END`PUN%o%`END`PLN diag`END`PUN(`END`LIT2`END`PUN)`END`PLN\n' +
    'diag`END`PUN(`END`LIT2`END`PUN)`END`PLN `END`PUN%x%`END`PLN diag`END`PUN(`END`LIT2`END`PUN)`END`PLN\n' +
    '`END`STR`%foo bar%``END`PLN `END`PUN&lt;-`END`PLN `END`KWDfunction`END`PUN(`END`PLNx`END`PUN,`END`PLN y`END`PUN)`END`PLN x `END`PUN+`END`PLN y\n' +
    '`END`LIT1`END`PLN `END`PUN%foo bar%`END`PLN `END`LIT2`END`PLN\n' +
    '\n' +
    '`END`COM## Control Structures (3.2) and Function`END`PLN\n' +
    '`END`COM## if, else`END`PLN\n' +
    '`END`KWDif`END`PLN `END`PUN(`END`LITTRUE`END`PUN)`END`PLN print`END`PUN(`END`STR"foo"`END`PUN)`END`PLN `END`KWDelse`END`PLN print`END`PUN(`END`STR"bar"`END`PUN)`END`PLN\n' +
    '`END`COM## For, in`END`PLN\n' +
    '`END`KWDfor`END`PUN(`END`PLNi `END`KWDin`END`PLN `END`LIT1`END`PUN:`END`LIT5`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    print`END`PUN(`END`PLNi`END`PUN)`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '`END`COM## While, break`END`PLN\n' +
    'i `END`PUN&lt;-`END`PLN `END`LIT1`END`PLN\n' +
    '`END`KWDwhile`END`PLN `END`PUN(`END`LITTRUE`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    i `END`PUN&lt;-`END`PLN i `END`PUN+`END`PLN `END`LIT1`END`PLN\n' +
    '    `END`KWDif`END`PLN `END`PUN(`END`PLNi `END`PUN&gt;`END`PLN `END`LIT3`END`PUN)`END`PLN `END`KWDbreak`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '`END`COM## Repeat`END`PLN\n' +
    '`END`KWDrepeat`END`PLN `END`PUN{`END`LIT1+1`END`PUN}`END`PLN\n' +
    '`END`COM## Switch`END`PLN\n' +
    'x `END`PUN&lt;-`END`PLN `END`LIT3`END`PLN\n' +
    '`END`KWDswitch`END`PUN(`END`PLNx`END`PUN,`END`PLN `END`LIT2+2`END`PUN,`END`PLN mean`END`PUN(`END`LIT1`END`PUN:`END`LIT10`END`PUN),`END`PLN rnorm`END`PUN(`END`LIT5`END`PUN))`END`PLN\n' +
    '`END`COM## Function, dot-dot-dot, return`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`KWDfunction`END`PUN(`END`LIT...`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    `END`KWDreturn`END`PUN(`END`PLNsum`END`PUN(`END`LIT...`END`PUN))`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '`END`COM# Not keywords`END`PLN\n' +
    'functiona `END`PUN&lt;-`END`PLN `END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT2`END`PLN\n' +
    'function. `END`PUN&lt;-`END`PLN `END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT2`END`PLN\n' +
    'function1 `END`PUN&lt;-`END`PLN `END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT2`END`PLN\n' +
    '\n' +
    '\n' +
    '`END`COM## Grouping Tokens 10.3.7`END`PLN\n' +
    '`END`COM## Parentheses`END`PLN\n' +
    '`END`LIT1`END`PLN `END`PUN+`END`PLN `END`PUN(`END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT3`END`PUN)`END`PLN\n' +
    '`END`COM## brackets`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`KWDfunction`END`PUN(`END`PLNa`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    a `END`PUN+`END`PLN `END`LIT1`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    '`END`COM## Indexing 10.3.8`END`PLN\n' +
    '`END`COM## []`END`PLN\n' +
    'bar `END`PUN&lt;-`END`PLN `END`LIT1`END`PUN:`END`LIT10`END`PLN\n' +
    'bar`END`PUN[`END`LIT3`END`PUN]`END`PLN\n' +
    '`END`COM## [[]]`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN list`END`PUN(`END`PLNa`END`PUN=`END`LIT1`END`PUN,`END`PLN b`END`PUN=`END`LIT2`END`PUN,`END`PLN c`END`PUN=`END`LIT3`END`PUN)`END`PLN\n' +
    'foo`END`PUN[[`END`STR"a"`END`PUN]]`END`PLN\n' +
    '`END`COM## $`END`PLN\n' +
    'foo`END`PUN$`END`PLNa\n' +
    'foo`END`PUN$`END`STR"a"`END`PLN\n' +
    '\n' +
    '`END`COM## Operators`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN-`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN~`END`PLN `END`LIT2`END`PLN\n' +
    '`END`PUN!`END`PLN `END`LITTRUE`END`PLN\n' +
    '`END`PUN?`END`STR"help"`END`PLN\n' +
    '`END`LIT1`END`PUN:`END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN*`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN/`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PUN^`END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN&lt;`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN&gt;`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN==`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN&gt;=`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN&lt;=`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN!=`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LITTRUE`END`PLN `END`PUN&amp;`END`PLN `END`LITFALSE`END`PLN\n' +
    '`END`LITTRUE`END`PLN `END`PUN&amp;&amp;`END`PLN `END`LITFALSE`END`PLN\n' +
    '`END`LITTRUE`END`PLN `END`PUN|`END`PLN `END`LITFALSE`END`PLN\n' +
    '`END`LITTRUE`END`PLN `END`PUN||`END`PLN `END`LITFALSE`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT2`END`PLN\n' +
    'foo `END`PUN=`END`PLN `END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT2`END`PLN `END`PUN-&gt;`END`PLN foo\n' +
    'foo `END`PUN&lt;&lt;-`END`PLN `END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT2`END`PLN\n' +
    '`END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT2`END`PLN `END`PUN-&gt;&gt;`END`PLN foo\n' +
    'base`END`PUN:::`END`PLNsum\n' +
    'base`END`PUN::`END`PLNsum\n' +
    '\n' +
    '`END`COM## Strings`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`STR"hello, world!"`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`STR\'hello, world!\'`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`STR"Hello, \'world!"`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`STR\'Hello, "world!\'`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`STR\'Hello, \\\'world!\\\'\'`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`STR"Hello, \\"world!\\""`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`STR"Hello,\n' +
    'world!"`END`PLN\n' +
    'foo `END`PUN&lt;-`END`PLN `END`STR\'Hello,\n' +
    'world!\'`END`PLN\n' +
    '\n' +
    '`END`COM## Backtick strings`END`PLN\n' +
    '`END`STR`foo123 +!"bar\'baz``END`PLN `END`PUN&lt;-`END`PLN `END`LIT2`END`PLN `END`PUN+`END`PLN `END`LIT2`END'
  ),
  mumps: (
    '`PLNHDR `END`COM; -- prt/display header`END`PLN\n' +
    ' `END`KWDN`END`PLN `END`KWDX`END`PUN,`END`KWDI`END`PLN\n' +
    ' `END`KWDI`END`PLN `END`PUN\'`END`DEC$D`END`PUN(`END`PLNVALMHDR`END`PUN)`END`PLN `END`KWDX`END`PUN:`END`DEC$G`END`PUN(`END`PLNVALM`END`PUN(`END`STR"HDR"`END`PUN))]`END`STR""`END`PLN VALM`END`PUN(`END`STR"HDR"`END`PUN)`END`PLN\n' +
    ' `END`COM; -- prt hdr line`END`PLN\n' +
    ' `END`KWDW`END`PUN:\'`END`DEC$D`END`PUN(`END`PLNVALMPG1`END`PUN)`END`PLN `END`PUN@`END`PLNIOF `END`KWDK`END`PLN VALMPG1\n' +
    ' `END`KWDW`END`PUN:`END`PLNVALMCC `END`DEC$C`END`PUN(`END`LIT13`END`PUN)_`END`PLNIOUON`END`PUN_`END`DEC$C`END`PUN(`END`LIT13`END`PUN)_`END`PLNIOINHI`END`PUN_`END`DEC$C`END`PUN(`END`LIT13`END`PUN)`END`PLN       `END`COM; -- turn on undln/hi`END`PLN\n' +
    ' `END`KWDI`END`PLN `END`DEC$E`END`PUN(`END`PLNIOST`END`PUN,`END`LIT1`END`PUN,`END`LIT2`END`PUN)=`END`STR"C-"`END`PLN `END`KWDD`END`PLN IOXY^VALM4`END`PUN(`END`LIT0`END`PUN,`END`LIT0`END`PUN)`END`PLN            `END`COM; -- position cursor`END`PLN\n' +
    ' `END`KWDW`END`PLN `END`DEC$E`END`PUN(`END`PLNVALM`END`PUN(`END`STR"TITLE"`END`PUN),`END`LIT1`END`PUN,`END`LIT30`END`PUN)`END`PLN                         `END`COM; -- prt title`END`PLN\n' +
    ' `END`KWDW`END`PUN:`END`PLNVALMCC IOINORM`END`PUN,`END`PLNIOUON                           `END`COM; -- turn off hi`END`PLN\n' +
    ' `END`KWDW`END`PLN `END`DEC$J`END`PUN(`END`STR""`END`PUN,`END`LIT30`END`PUN-`END`DEC$L`END`PUN(`END`PLNVALM`END`PUN(`END`STR"TITLE"`END`PUN)))`END`PLN                    `END`COM; -- fill in w/blanks`END`PLN\n' +
    ' `END`KWDI`END`PLN `END`DEC$E`END`PUN(`END`PLNIOST`END`PUN,`END`LIT1`END`PUN,`END`LIT2`END`PUN)=`END`STR"C-"`END`PLN `END`KWDW`END`PLN `END`DEC$C`END`PUN(`END`LIT13`END`PUN)`END`PLN `END`KWDD`END`PLN IOXY^VALM4`END`PUN(`END`LIT30`END`PUN,`END`LIT0`END`PUN)`END`PLN  `END`COM; -- position cursor`END`PLN\n' +
    ' `END`KWDW`END`PLN `END`DEC$J`END`PUN(`END`STR""`END`PUN,((`END`PLNVALMWD`END`LIT-80`END`PUN)/`END`LIT2`END`PUN)),`END`PLN$$HTE^XLFDT`END`PUN(`END`DEC$H`END`PUN,`END`LIT1`END`PUN),`END`DEC$J`END`PUN(`END`STR""`END`PUN,`END`LIT10`END`PUN+((`END`PLNVALMWD`END`LIT-80`END`PUN)/`END`LIT2`END`PUN)),`END`STR"Page: "`END`PUN,`END`DEC$J`END`PUN(`END`PLNVALMPGE`END`PUN,`END`LIT4`END`PUN),`END`STR" of "`END`PUN,`END`DEC$J`END`PUN(`END`PLN$$PAGE^VALM4`END`PUN(`END`PLNVALMCNT`END`PUN,`END`PLNVALM`END`PUN(`END`STR"LINES"`END`PUN)),`END`LIT4`END`PUN)_`END`DEC$S`END`PUN(`END`DEC$D`END`PUN(`END`PLNVALMORE`END`PUN):`END`STR"+"`END`PUN,`END`LIT1`END`PUN:`END`STR" "`END`PUN)`END`PLN `END`COM; -- prt rest of hdr`END`PLN\n' +
    ' `END`KWDW`END`PUN:`END`PLNVALMCC IOUOFF `END`KWDI`END`PLN `END`DEC$E`END`PUN(`END`PLNIOST`END`PUN,`END`LIT1`END`PUN,`END`LIT2`END`PUN)=`END`STR"C-"`END`PLN `END`KWDD`END`PLN IOXY^VALM4`END`PUN(`END`LIT0`END`PUN,`END`LIT0`END`PUN)`END`PLN `END`COM; -- turn off undln`END`PLN\n' +
    ' `END`KWDF`END`PLN `END`KWDI`END`PUN=`END`LIT1`END`PUN:`END`LIT1`END`PUN:`END`PLNVALM`END`PUN(`END`STR"TM"`END`PUN)`END`LIT-3`END`PLN `END`KWDW`END`PLN `END`PUN!,`END`DEC$S`END`PUN(\'`END`DEC$D`END`PUN(`END`PLNVALMHDR`END`PUN(`END`KWDI`END`PUN)):`END`STR""`END`PUN,`END`DEC$L`END`PUN(`END`PLNVALMHDR`END`PUN(`END`KWDI`END`PUN))&gt;(`END`PLNVALMWD`END`LIT-1`END`PUN):`END`PLN$`END`DEC$EXTRACT`END`PLN^VALM4`END`PUN(`END`DEC$G`END`PUN(`END`PLNVALMHDR`END`PUN(`END`KWDI`END`PUN))),`END`LIT1`END`PUN:`END`PLNVALMHDR`END`PUN(`END`KWDI`END`PUN))`END`PLN `END`COM; -- prt hdr`END`PLN\n' +
    ' `END`KWDQ`END'
  ),
  basic_lang: (
    '`LIT200`END`PLN `END`COMREM ----- method teardown`END`PLN\n' +
    '`END`LIT210`END`PLN `END`KWDPRINT`END`PLN `END`STR"green"`END`PLN\n' +
    '`END`LIT220`END`PLN `END`KWDRETURN`END`PLN\n' +
    '`END`LIT470`END`PLN `END`KWDIF`END`PLN af`END`PUN=`END`LIT0`END`PLN `END`KWDTHEN`END`PLN `END`KWDGOTO`END`PLN `END`LIT520`END`PLN\n' +
    '`END`LIT480`END`PLN `END`KWDFOR`END`PLN j`END`PUN=`END`LIT1`END`PLN `END`KWDTO`END`PLN af\n' +
    '`END`LIT500`END`PLN ac`END`PUN=`END`PLNpf`END`PUN(`END`PLNj`END`PUN)`END`PLN `END`PUN:`END`PLN me$`END`PUN=`END`PLNSTR$`END`PUN(`END`PLNj`END`PUN)+`END`STR". factor"`END`PLN `END`PUN:`END`PLN `END`KWDGOSUB`END`PLN `END`LIT100`END`PLN\n' +
    '`END`LIT510`END`PLN `END`KWDNEXT`END`PLN\n' +
    '`END`LIT530`END`PLN `END`KWDRETURN`END`PLN\n' +
    '`END`LIT1000`END`PLN `END`KWDDATA`END`PLN `END`STR"one"`END`PUN,`END`PLN `END`LIT1`END`PUN,`END`PLN `END`LIT0`END'
  ),
  pascal_lang: (
    '`COM(* some comment here *)`END`PLN\n' +
    '`END`KWDPROCEDURE`END`PLN TestCase`END`PUN.`END`PLNAssertEquals`END`PUN(`END`PLNmsg`END`PUN:`END`PLNString`END`PUN;`END`PLN expect`END`PUN,`END`PLN act`END`PUN:`END`PLNLongint`END`PUN);`END`PLN\n' +
    '`END`KWDVAR`END`PLN ex`END`PUN,`END`PLN ac`END`PUN:`END`PLNString`END`PUN;`END`PLN\n' +
    '`END`KWDBEGIN`END`PLN\n' +
    '  `END`KWDIF`END`PLN expect `END`PUN&lt;&gt;`END`PLN act `END`KWDTHEN`END`PLN\n' +
    '  `END`KWDBEGIN`END`PLN\n' +
    '    Str`END`PUN(`END`PLNexpect`END`PUN,`END`PLN ex`END`PUN);`END`PLN\n' +
    '    Fail`END`PUN(`END`PLNConcat`END`PUN(`END`PLNmsg`END`PUN,`END`STR\' expected \'`END`PUN,`END`PLNex`END`PUN,`END`STR\' but was \'`END`PUN,`END`PLNac`END`PUN));`END`PLN\n' +
    '  `END`KWDEND`END`PUN;`END`PLN\n' +
    '\n' +
    '  factors `END`PUN:=`END`PLN new`END`PUN(`END`PLNArrayListPtr`END`PUN,`END`PLN Init`END`PUN);`END`PLN\n' +
    '\n' +
    '  `END`KWDFOR`END`PLN candidate `END`PUN:=`END`PLN `END`LIT2`END`PLN `END`KWDTO`END`PLN i `END`KWDDO`END`PLN\n' +
    '  `END`KWDBEGIN`END`PLN\n' +
    '    `END`KWDWHILE`END`PLN i `END`KWDMOD`END`PLN candidate `END`PUN=`END`PLN `END`LIT0`END`PLN `END`KWDDO`END`PLN\n' +
    '    `END`KWDBEGIN`END`PLN\n' +
    '      factors`END`PUN^.`END`PLNAdd`END`PUN(`END`PLNcandidate`END`PUN);`END`PLN\n' +
    '      i `END`PUN:=`END`PLN i `END`KWDDIV`END`PLN candidate`END`PUN;`END`PLN\n' +
    '    `END`KWDEND`END`PUN;`END`PLN\n' +
    '  `END`KWDEND`END`PUN;`END`PLN\n' +
    '`END`KWDEND`END`PUN;`END'
  ),
  kotlin: (
      '`KWDpackage`END`PLN test`END`PUN;`END`PLN\n' +
      '\n' +
      '`END`KWDimport`END`PLN kotlin`END`PUN.`END`TYPInt`END`PLN\n' +
      '\n' +
      '`END`COM// Single line comment`END`PLN\n' +
      '`END`COM/*\n' +
      ' * Multiline\n' +
      ' * comment\n' +
      ' */`END`PLN\n' +
      '\n' +
      '`END`KWDtypealias`END`PLN `END`TYPSomeNumber`END`PLN `END`PUN=`END`PLN `END`TYPInt`END`PLN\n' +
      '\n' +
      '`END`KWDval`END`PLN number`END`PUN:`END`PLN `END`TYPLong`END`PLN `END`PUN=`END`PLN `END`LIT1_000L`END`PLN\n' +
      '`END`KWDvar`END`PLN float`END`PUN:`END`PLN `END`TYPFloat`END`PLN `END`PUN=`END`PLN `END`LIT12.34f`END`PLN\n' +
      '`END`LIT0xFF_FF`END`PLN\n' +
      '`END`LIT3.14`END`PLN\n' +
      '\n' +
      '`END`LIT314e-2`END`PLN\n' +
      '`END`LIT0.314e1`END`PLN\n' +
      '\n' +
      '`END`KWDprotected`END`PLN `END`KWDoverride`END`PLN `END`KWDfun`END`PLN ifBoolean`END`PUN(`END`PLNcondition`END`PUN:`END`PLN `END`TYPBoolean`END`PUN?`END`PLN `END`PUN=`END`PLN `END`LITnull`END`PUN)`END' +
      '`PLN `END`PUN{}`END`PLN\n' +
      '\n' +
      '`END`PUN::`END`PLNifBoolean\n' +
      '\n' +
      '`END`KWDconstructor`END`PUN()`END`PLN `END`PUN:`END`PLN `END`KWDsuper`END`PUN()`END`PLN\n' +
      '\n' +
      '`END`STR"\\\"true\\\""`END`PLN\n' +
      '`END`STR\'a\'`END`PLN\n' +
      '\n' +
      '`END`STR"""\n' +
      'aaaaaaaaaaa\n' +
      '"""`END`PLN\n' +
      '\n' +
      '`END`LITloop@`END`PLN `END`KWDfor`END`PUN()`END`PLN\n' +
      '\n' +
      '`END`KWDbreak`END`PLN `END`LIT@loop`END`PLN\n' +
      '\n' +
      '`END`KWDenum class`END`PLN `END`TYP\`true\``END`PLN\n' +
      '\n' +
      '`END`KWDdata class`END`PLN `END`TYPPerson`END`PUN(`END`KWDval`END`PLN name`END`PUN:`END`PLN `END`TYPString`END`PUN)`END`PLN\n' +
      '\n' +
      '`END`KWDenum class`END`PLN `END`TYPSize`END`PLN `END`PUN{`END`PLN\n' +
      '    BIG`END`PUN,`END`PLN MEDIUM`END`PUN,`END`PLN SMALL\n' +
      '`END`PUN}`END`PLN\n' +
      '\n' +
      '`END`KWDclass`END`PLN `END`TYPBall`END`PUN(`END`KWDval`END`PLN color`END`PUN:`END`PLN `END`TYPString`END`PUN,`END`PLN `END`KWDval`END`PLN size`END`PUN:`END`PLN `END`TYPSize`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
      '    `END`KWDcompanion object`END`PLN `END`PUN{}`END`PLN\n' +
      '\n' +
      '    `END`KWDfun`END`PLN isBig`END`PUN()`END`PLN `END`PUN=`END`PLN size `END`PUN==`END`PLN `END`TYPSize`END`PUN.`END`PLNBIG\n' +
      '\n' +
      '    `END`KWDval`END`PLN isMedium`END`PUN:`END`PLN `END`TYPBoolean`END`PLN\n' +
      '        `END`KWDget`END`PUN()`END`PLN `END`PUN=`END`PLN size `END`PUN==`END`PLN `END`TYPSize`END`PUN.`END`PLNMEDIUM\n' +
      '`END`PUN}`END`PLN\n' +
      '\n' +
      '`END`KWDfun`END`PLN `END`TYPBoolean`END`PUN?.`END`PLNisNull`END`PUN():`END`PLN `END`TYPBoolean`END`PLN `END`PUN=`END`PLN `END`KWDthis`END`PLN `END`PUN==`END`PLN `END`LITnull`END`PLN\n' +
      '\n' +
      '`END`KWDfun`END`PLN `END`TYPBoolean`END`PUN?.`END`PLNgetOrThrow`END`PUN():`END`PLN `END`TYPBoolean`END`PLN `END`PUN=`END`PLN `END`KWDthis`END`PLN `END`PUN?:`END`PLN `END`KWDthrow`END`PLN `END`TYPException`END`PUN()`END'
  ),
  llvm: (
    '`COM; Declare the string constant as a global constant.`END`PLN\n' +
    '@.str `END`PUN=`END`PLN `END`KWDprivate`END`PLN `END`KWDunnamed_addr`END`PLN `END`KWDconstant`END`PLN `END`PUN[`END`LIT13`END`PLN `END`KWDx`END`PLN `END`KWDi8`END`PUN]`END`PLN `END`KWDc`END`STR"hello world\\0A\\00"`END`PLN\n' +
    '\n' +
    '`END`COM; External declaration of the puts function`END`PLN\n' +
    '`END`KWDdeclare`END`PLN `END`KWDi32`END`PLN @puts`END`PUN(`END`KWDi8`END`PUN*`END`PLN `END`KWDnocapture`END`PUN)`END`PLN `END`KWDnounwind`END`PLN\n' +
    '\n' +
    '`END`COM; Definition of main function`END`PLN\n' +
    '`END`KWDdefine`END`PLN `END`KWDi32`END`PLN @main`END`PUN()`END`PLN `END`PUN{`END`PLN   `END`COM; i32()*`END`PLN\n' +
    '  `END`COM; Convert [13 x i8]* to i8  *...`END`PLN\n' +
    '  %cast210 `END`PUN=`END`PLN `END`KWDgetelementptr`END`PLN `END`PUN[`END`LIT13`END`PLN `END`KWDx`END`PLN `END`KWDi8`END`PUN]*`END`PLN @.str`END`PUN,`END`PLN `END`KWDi64`END`PLN `END`LIT0`END`PUN,`END`PLN `END`KWDi64`END`PLN `END`LIT0`END`PLN\n' +
    '\n' +
    '  `END`COM; Call puts function to write out the string to stdout.`END`PLN\n' +
    '  `END`KWDcall`END`PLN `END`KWDi32`END`PLN @puts`END`PUN(`END`KWDi8`END`PUN*`END`PLN %cast210`END`PUN)`END`PLN\n' +
    '  `END`KWDret`END`PLN `END`KWDi32`END`PLN `END`LIT0`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    '`END`COM; Named metadata`END`PLN\n' +
    '!1 `END`PUN=`END`PLN `END`KWDmetadata`END`PLN !`END`PUN{`END`KWDi32`END`PLN `END`LIT42`END`PUN}`END`PLN\n' +
    '!foo `END`PUN=`END`PLN !`END`PUN{`END`PLN!1`END`PUN,`END`PLN `END`KWDnull`END`PUN}`END'
  ),
  issue217: (
    '`KWDif`END`PUN(!`END`STR/^https?:\\/\\//`END`PLNi`END`PUN.`END`PLNtest`END`PUN(`END`PLNval`END`PUN)`END`PLN `END`PUN&amp;&amp;`END`PLN foo `END`PUN==`END`PLN `END`STR\'bar\'`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    val `END`PUN=`END`PLN `END`STR\'http://\'`END`PLN `END`PUN+`END`PLN val`END`PUN;`END`PLN\n' +
    '`END`PUN}`END'
  ),
  matlab: (
    '`COM%%%%%%%%%%%%%%%%%% DATA TYPES %%%%%%%%%%%%%%%%%%`END`PLN\n' +
    '\n' +
    '`END<span class="ident">v`END`PLN `END`PUN=`END`PLN `END`TAG[`END`LIT1`END`PUN,`END`LIT2`END`PUN,`END`LIT3`END`PUN;`END`LIT4`END`PUN,`END`LIT5`END`PUN,`END`LIT6`END`TAG]`END`PUN;`END`PLN\n' +
    '`END<span class="ident">v`END`TAG(`END<span class="ident">v`END`PUN&gt;`END`LIT4`END`TAG)`END`PLN `END`PUN=`END`PLN `END`LIT0`END`PUN;`END`PLN\n' +
    '\n' +
    '`END<span class="ident">s`END`PLN `END`PUN=`END`PLN `END`TYPstruct`END`TAG(`END`STR\'key\'`END`PUN,`END`LIT1`END`PUN,`END`PLN `END`STR\'key2\'`END`PUN,`END`STR\'string\'`END`TAG)`END`PUN;`END`PLN\n' +
    '`END<span class="ident">s.key`END`PLN `END`PUN=`END`PLN `END`LIT2`END`PUN;`END`PLN\n' +
    '\n' +
    '`END<span class="ident">C`END`PLN `END`PUN=`END`PLN `END`TYPcell`END`TAG(`END`LIT1`END`PUN,`END`LIT2`END`TAG)`END`PUN;`END`PLN\n' +
    '`END<span class="ident">C`END`TAG{`END`LIT1`END`PUN,`END`LIT1`END`TAG}`END`PLN `END`PUN=`END`PLN `END`LIT0`END`PUN:`END`LIT9`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`TYPdouble`END`TAG(`END`LIT1`END`TAG)`END`PLN\n' +
    '`END`TYPsingle`END`TAG(`END`LIT1`END`TAG)`END`PLN\n' +
    '`END`TYPuint8`END`TAG(`END`LIT1`END`TAG)`END`PLN\n' +
    '`END`TYPint8`END`TAG(`END`LIT1`END`TAG)`END`PLN\n' +
    '\n' +
    '`END`COM%%%%%%%%%%%%%%%%%% STRINGS &amp; TRANSPOSE %%%%%%%%%%%%%%%%%%`END`PLN\n' +
    '\n' +
    '`END`FUNplot`END`TAG(`END<span class="ident">data`END<span class="transpose">\'`END`TAG)`END`PUN;`END`PLN\n' +
    '`END`FUNlegend`END`TAG(`END<span class="ident">labels`END`TAG)`END`PLN\n' +
    '\n' +
    '`END<span class="ident">str`END`PLN `END`PUN=`END`PLN `END`STR\'asdasd\'`END`PUN;`END`PLN     `END`COM% this is a string`END`PLN\n' +
    '`END<span class="ident">str`END`PLN `END`PUN=`END`PLN `END`STR\'asdas\'`END`PUN;`END`PLN\n' +
    '`END<span class="ident">str`END`PLN `END`PUN=`END`PLN `END`STR\'sdasd\'\'sdasd\'`END`PUN;`END`PLN\n' +
    '\n' +
    '`END<span class="ident">str`END`PLN `END`PUN=`END`PLN `END`TAG[`END`STR\'one\'`END`PLN `END`STR\'two\'`END`PLN `END`STR\'three\'`END`TAG]`END`PUN;`END`PLN\n' +
    '`END<span class="ident">str`END`PLN `END`PUN=`END`PLN `END`FUNstrcat`END`TAG(`END`STR\'one\'`END`PUN,`END`PLN `END`STR\'two\'`END`PUN,`END`PLN `END`STR\'three\'`END`TAG)`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM% matrix transpose`END`PLN\n' +
    '`END<span class="ident">M`END`PLN `END`PUN=`END`PLN `END`FUNrand`END`TAG(`END`LIT3`END`PUN,`END`LIT3`END`TAG)`END<span class="transpose">\'`END`PUN;`END`PLN\n' +
    '`END<span class="ident">x`END`PLN `END`PUN=`END`PLN `END<span class="ident">M`END`PUN.`END<span class="transpose">\'`END`PUN;`END`PLN\n' +
    '`END<span class="ident">x`END`PLN `END`PUN=`END`PLN `END`TAG[`END`LIT10`END`PLN `END`LIT20`END`PUN;`END`PLN `END`LIT30`END`PUN,`END`PLN `END`LIT40`END`TAG]`END<span class="transpose">\'`END`PUN;`END`PLN\n' +
    '`END`FUNdisp`END`TAG(`END<span class="ident">x`END<span class="transpose">\'`END`TAG)`END`PLN\n' +
    '`END`FUNfprintf`END`TAG(`END`STR\'%d\\n\'`END`PUN,`END`PLN `END<span class="ident">x`END`TAG(`END`PUN:`END`TAG)`END<span class="transpose">\'`END`TAG)`END`PLN      `END`COM% with comment`END`PLN\n' +
    '`END`TAG{`END`LIT1`END`PUN,`END`LIT2`END`TAG}`END<span class="transpose">\'`END`PLN                      `END`COM% another comment`END`PLN\n' +
    '\n' +
    '`END`COM%%%%%%%%%%%%%%%%%% LINE CONTINUATION %%%%%%%%%%%%%%%%%%`END`PLN\n' +
    '\n' +
    '`END`TAG[`END`LIT1`END`PLN `END`LIT20`END`PUN;`END`PLN `END<span class="linecont">...\n' +
    '`END`LIT30`END`PLN `END`LIT4`END`TAG]`END`PLN\n' +
    '\n' +
    '`END`TAG[`END`STR\'gdgsd\'`END<span class="linecont">...\n' +
    '`END`STR\'sdfs\'`END`TAG]`END`PLN\n' +
    '\n' +
    '`END`TAG{`END<span class="linecont">...\n' +
    '`END`STR\'sdasd\'`END`PLN `END`PUN;`END`PLN\n' +
    '`END`STR\'asdsad\'`END`TAG}`END`PLN\n' +
    '\n' +
    '`END`COM%%%%%%%%%%%%%%%%%% SYSTEM COMMANDS %%%%%%%%%%%%%%%%%%`END`PLN\n' +
    '\n' +
    '`END<span class="syscmd">!touch file.txt`END`PLN\n' +
    '\n' +
    '`END`COM%%%%%%%%%%%%%%%%%% COMMAND OUTPUT %%%%%%%%%%%%%%%%%%`END`PLN\n' +
    '\n' +
    '`END<span class="codeoutput">&gt;&gt; `END`LIT1+1`END`PLN\n' +
    '`END<span class="const">ans`END`PLN `END`PUN=`END`PLN\n' +
    '     `END`LIT2`END`PLN\n' +
    '\n' +
    '`END<span class="codeoutput">&gt;&gt; `END`LIT1+1`END`PLN\n' +
    '\n' +
    '`END<span class="const">ans`END`PLN `END`PUN=`END`PLN\n' +
    '\n' +
    '     `END`LIT2`END`PLN\n' +
    '\n' +
    '`END`COM%%%%%%%%%%%%%%%%%% KEYWORDS %%%%%%%%%%%%%%%%%%`END`PLN\n' +
    '\n' +
    '`END`KWDfunction`END`PLN `END<span class="ident">ret`END`PLN `END`PUN=`END`PLN `END<span class="ident">fcn`END`TAG(`END<span class="ident">in`END`TAG)`END`PLN\n' +
    '	`END<span class="ident">ret`END`PLN `END`PUN=`END`PLN `END`FUNsum`END`TAG(`END<span class="ident">in`END`PUN.^`END`LIT2`END`TAG)`END`PUN;`END`PLN\n' +
    '`END`KWDend`END`PLN\n' +
    '\n' +
    '`END`KWDclassdef`END`PLN `END<span class="ident">CC`END`PLN `END`PUN&lt;`END`PLN `END`FUNhandle`END`PLN\n' +
    '	`END<span class="ident">properties`END`PLN `END`TAG(`END<span class="ident">SetAccess`END`PLN `END`PUN=`END`PLN `END<span class="ident">public`END`TAG)`END`PLN\n' +
    '		`END<span class="ident">x`END`PLN `END`PUN=`END`PLN `END`LIT0`END`PUN;`END`PLN\n' +
    '	`END`KWDend`END`PLN\n' +
    '	`END`FUNmethods`END`PLN\n' +
    '		`END`KWDfunction`END`PLN `END<span class="ident">this`END`PLN `END`PUN=`END`PLN `END<span class="ident">CC`END`TAG(`END<span class="const">varargin`END`TAG)`END`PLN\n' +
    '			`END<span class="ident">this.x`END`PLN `END`PUN=`END`PLN `END`LIT9`END`PUN;`END`PLN\n' +
    '		`END`KWDend`END`PLN\n' +
    '	`END`KWDend`END`PLN\n' +
    '`END`KWDend`END`PLN\n' +
    '\n' +
    '`END<span class="ident">x`END`PLN `END`PUN=`END`PLN `END`TAG[]`END`PUN;`END`PLN\n' +
    '`END`KWDparfor`END`PLN `END<span class="ident">i`END`PUN=`END`LIT1`END`PUN:`END`LIT10`END`PLN\n' +
    '	`END<span class="ident">x`END`TAG[`END<span class="ident">i`END`TAG]`END`PLN `END`PUN=`END`PLN `END<span class="ident">i`END`PUN;`END`PLN\n' +
    '`END`KWDend`END`PLN\n' +
    '\n' +
    '`END<span class="const">true`END`PLN `END`PUN~=`END`PLN `END<span class="const">false`END`PLN\n' +
    '\n' +
    '`END`KWDif`END`PLN `END<span class="ident">x`END`PUN==`END`LIT1`END`PLN\n' +
    '	`END<span class="const">true`END`PLN\n' +
    '`END`KWDelseif`END`PLN\n' +
    '	`END<span class="const">false`END`PLN\n' +
    '`END`KWDelse`END`PLN\n' +
    '	`END`KWDreturn`END`PLN\n' +
    '`END`KWDend`END`PLN\n' +
    '\n' +
    '`END`KWDwhile`END`PLN `END<span class="const">true`END`PLN\n' +
    '	`END`KWDcontinue`END`PLN\n' +
    '	`END`KWDbreak`END`PLN\n' +
    '`END`KWDend`END`PLN\n' +
    '\n' +
    '`END`KWDtry`END`PLN\n' +
    '	`END`FUNerror`END`TAG(`END`STR\'aa:aa\'`END`PUN,`END`PLN `END`STR\'asdasd\'`END`TAG)`END`PLN\n' +
    '`END`KWDcatch`END`PLN `END<span class="ident">ME`END`PLN\n' +
    '	`END`FUNwarning`END`TAG(`END<span class="ident">ME`END`TAG)`END`PLN\n' +
    '`END`KWDend`END`PLN\n' +
    '\n' +
    '`END`KWDswitch`END`PLN `END<span class="ident">x`END`PLN\n' +
    '	`END`KWDcase`END`PLN `END`LIT1`END`PLN\n' +
    '		`END`FUNdisp`END`TAG(`END`LIT1`END`TAG)`END`PLN\n' +
    '	`END`KWDotherwise`END`PLN\n' +
    '		`END`LIT0`END`PLN\n' +
    '`END`KWDend`END`PLN\n' +
    '\n' +
    '`END`COM%%%%%%%%%%%%%%%%%% NUM LITERALS %%%%%%%%%%%%%%%%%%`END`PLN\n' +
    '\n' +
    '`END`LIT1`END`PLN\n' +
    '`END`LIT1.`END`PLN\n' +
    '`END`LIT.1`END`PLN\n' +
    '`END`LIT1.0`END`PLN\n' +
    '`END`LIT-1`END`PLN\n' +
    '`END`LIT-1.`END`PLN\n' +
    '`END`LIT-.1`END`PLN\n' +
    '`END`LIT-1.0`END`PLN\n' +
    '`END`LIT+10`END`PLN\n' +
    '`END`LIT+01.`END`PLN\n' +
    '`END`LIT+.1`END`PLN\n' +
    '`END`LIT+1.0`END`PLN\n' +
    '`END`LIT1e1`END`PLN\n' +
    '`END`LIT1e-1`END`PLN\n' +
    '`END`LIT1.e1`END`PLN\n' +
    '`END`LIT1.e-1`END`PLN\n' +
    '`END`LIT1.0e1`END`PLN\n' +
    '`END`LIT1.0e-1`END`PLN\n' +
    '`END`LIT.1e1`END`PLN\n' +
    '`END`LIT.1e-1`END`PLN\n' +
    '`END`LIT-.1e+1`END`PLN\n' +
    '`END`LIT+1.e-1`END`PLN\n' +
    '\n' +
    '`END`LIT1i`END`PLN\n' +
    '`END`LIT.10j`END`PLN\n' +
    '`END`LIT-1.001i`END`PLN\n' +
    '`END`LIT+1e-100j`END`PLN\n' +
    '`END`LIT-.10e-01i`END`PLN\n' +
    '\n' +
    '`END`COM% unary vs binary operators`END`PLN\n' +
    '`END`LIT1+1`END`PLN\n' +
    '`END`LIT1`END`PUN+`END`PLN `END`LIT1`END`PLN\n' +
    '`END`LIT1`END`PLN `END`LIT+1`END`PLN\n' +
    '`END`LIT1`END`PLN `END`PUN+`END`PLN `END`LIT1`END`PLN\n' +
    '`END`LIT+1+1`END`PLN\n' +
    '`END`LIT+1`END`PUN+`END`PLN `END`LIT1`END`PLN\n' +
    '`END`LIT+1`END`PLN `END`LIT+1`END`PLN\n' +
    '`END`LIT+1`END`PLN `END`PUN+`END`PLN `END`LIT1`END`PLN\n' +
    '\n' +
    '`END`COM%%%%%%%%%%%%%%%%%% COMMENTS %%%%%%%%%%%%%%%%%%`END`PLN\n' +
    '\n' +
    '`END`COM% % comment % %`END`PLN\n' +
    '   `END`COM% comment`END`PLN\n' +
    '`END`COM% comment`END`PLN\n' +
    '`END`COM%# comment`END`PLN\n' +
    '`END`COM%% comment`END`PLN\n' +
    '`END`COM%#x = sum(x);`END`PLN\n' +
    '\n' +
    '`END`COM%{\n' +
    'block comment\n' +
    '%}`END`PLN\n' +
    '\n' +
    '`END`COM%{\n' +
    '%}`END`PLN\n' +
    '\n' +
    '`END`COM%{\n' +
    '\n' +
    '%}`END`PLN\n' +
    '\n' +
    '`END`COM%{\n' +
    '1\n' +
    '2\n' +
    '%}`END`PLN\n' +
    '\n' +
    '`END`COM%{\n' +
    '% sdf {}\n' +
    'sdf\n' +
    '%asda{}\n' +
    'sfds\n' +
    '%}`END`PLN\n' +
    '\n' +
    '    `END`COM%{\n' +
    'dsf\n' +
    '        %}`END`PLN\n' +
    '\n' +
    '`END`COM%{%}`END`PLN\n' +
    '\n' +
    '`END`COM%{ zzz=10; %}`END`PLN\n' +
    '\n' +
    '`END`COM%{%x=10;%}`END`PLN\n' +
    '\n' +
    '`END`COM%{  x\n' +
    'a=10;\n' +
    '%}`END`PLN\n' +
    '\n' +
    '`END`COM%{\n' +
    '%a=10;\n' +
    '%}`END`PLN   `END<span class="ident">x`END`PLN\n' +
    '\n' +
    '`END`COM% nested block comments fail`END`PLN\n' +
    '`END`COM%{\n' +
    'dfsdf\n' +
    '%{\n' +
    'xxx\n' +
    '%}`END`PLN\n' +
    '`END<span class="ident">dfsdf`END`PLN\n' +
    '`END`COM%}`END`PLN\n' +
    '\n' +
    '`END`COM% fails here!`END`PLN\n' +
    '`END`COM%{\n' +
    'x=10;\n' +
    '%%{\n' +
    '%%}`END`PLN\n' +
    '`END<span class="ident">y`END`PUN=`END`LIT20`END`PUN;`END`PLN\n' +
    '`END`COM%}`END'
  ),
  elixir: ('`KWDdefmodule`END`PLN `END`TYPFoo`END`PUN.`END`TYPBar`END`PLN `END`KWDdo`END`PLN\n' +
'  `END`ATN@moduledoc`END`PLN `END`STR"""\n' +
'  Tests syntax highlighting for Elixir\n' +
'  """`END`PLN\n' +
'\n' +
'  `END`KWDuse`END`PLN `END`TYPBitwise`END`PLN\n' +
'  `END`KWDrequire`END`PLN `END`TYPLogger`END`PLN\n' +
'  `END`KWDalias`END`PLN `END`ATN__MODULE__`END`PUN,`END`PLN `END`LITas:`END`PLN `END`TYPThis`END`PLN\n' +
'\n' +
'  `END`ATN@default_token_length`END`PLN `END`LIT10_000`END`PLN\n' +
'\n' +
'\n' +
'  `END`ATN@spec`END`PLN token`END`PUN(`END`PLNlength `END`PUN::`END`PLN integer`END`PUN)`END`PLN `END`PUN::`END`PLN `END`TYPString`END`PUN.`END`PLNt\n' +
'\n' +
'  `END`KWDdef`END`PLN token`END`PUN(`END`PLNlength `END`PUN\\\\`END`PLN `END`ATN@default_token_length`END`PUN),`END`PLN `END`KWDdo`END`PUN:`END`PLN `END`TYPString`END`PUN.`END`PLNduplicate`END`PUN(`END`STR"x"`END`PUN,`END`PLN length`END`PUN)`END`PLN\n' +
'\n' +
'\n' +
'  `END`KWDdefp`END`PLN `END`COM_not_exported`END`PUN(),`END`PLN `END`KWDdo`END`PUN:`END`PLN `END`LIT0xFF`END`PLN `END`PUN+`END`PLN `END`LIT0xF_F`END`PLN `END`PUN-`END`PLN `END`LIT0xff`END`PLN\n' +
'\n' +
'\n' +
'  `END`KWDdef`END`PLN other`END`PUN(`END`PLNfoo`END`PUN,`END`PLN bar`END`PUN)`END`PLN `END`KWDdo`END`PLN\n' +
'    fun `END`PUN=`END`PLN `END`KWDfn`END`PUN{`END`COM_a`END`PUN,`END`PLN b`END`PUN}`END`PLN `END`PUN-&gt;`END`PLN b `END`PUN+`END`PLN `END`LIT1_3.1_4`END`PLN `END`KWDend`END`PLN\n' +
'    fun`END`PUN.(`END`LIT1.0e+20`END`PUN)`END`PLN\n' +
'    `END`COM_str`END`PLN `END`PUN=`END`PLN `END`STR"string without #{inspect(42)} interpolation"`END`PLN `END`PUN&lt;&gt;`END`PLN `END`STR" some more\n' +
'    with newlines \\\n' +
'    and newlines"`END`PLN\n' +
'    charlist `END`PUN=`END`PLN `END`LIT\'some\\\'chars\n' +
'    with newlines \\\n' +
'    and newlines\'`END`PLN\n' +
'    `END`PUN&lt;&lt;`END`PLNx`END`PUN::`END`PLNutf8`END`PUN,`END`PLN `END`COM_y`END`PUN::`END`PLNsize`END`PUN(`END`LIT8`END`PUN),`END`PLN data`END`PUN::`END`PLNbinary`END`PUN&gt;&gt;`END`PLN `END`PUN=`END`PLN `END`STR"fooo"`END`PLN\n' +
'    ls `END`PUN=`END`PLN `END`PUN[`END`LIT1`END`PLN `END`PUN|`END`PLN `END`PUN[`END`LIT2`END`PUN,`END`PLN `END`LIT3`END`PUN]]`END`PLN\n' +
'    map `END`PUN=`END`PLN `END`PUN%{`END`STR"baz"`END`PLN `END`PUN=&gt;`END`PLN `END`STR"ban"`END`PUN}`END`PLN\n' +
'    map `END`PUN=`END`PLN `END`PUN%{`END`LITfoo:`END`PLN `END`LIT:bar`END`PUN,`END`PLN `END`LIT"yes, this compiles":`END`PLN `END`LIT:"also an atom"`END`PUN}`END`PLN\n' +
'    `END`LIT:erlang`END`PUN.`END`PLNtime`END`PUN()`END`PLN\n' +
'    `END`KWDcase`END`PLN `END`PUN{`END`PLNfoo`END`PUN,`END`PLN bar`END`PUN}`END`PLN `END`KWDdo`END`PLN\n' +
'      `END`PUN{`END`LIT1`END`PUN,`END`PLN `END`LIT2`END`PUN}`END`PLN `END`PUN-&gt;`END`PLN `END`LIT3`END`PLN\n' +
'      `END`COM_something_else`END`PLN `END`PUN-&gt;`END`PLN `END`LIT:error`END`PLN\n' +
'      `END`COM_`END`PLN `END`PUN-&gt;`END`PLN `END`LIT:"this won\'t match"`END`PLN\n' +
'    `END`KWDend`END`PLN\n' +
'    r `END`PUN=`END`PLN `END`LIT2`END`PLN\n' +
'    `END`COM_bitwise_not`END`PLN `END`PUN=`END`PLN `END`PUN~~~`END`PLNr\n' +
'\n' +
'    `END`ATV~r/foo/iu`END`PLN `END`COM# regex sigils are treated as normal ones`END`PLN\n' +
'    `END`ATV~S|we have "quotes" and \'quotes\' and|`END`PLN `END`PUN&lt;&gt;`END`PLN `END`STR" more string"`END`PLN\n' +
'    `END`ATV~c"custom sigil char \\"is\\" fine too"`END`PLN\n' +
'    `END`ATV~r\'hello\'`END`PLN\n' +
'    `END`ATV~w[hell\\] #o]`END`PLN `END`COM#sigil does not expand to the comment`END`PLN\n' +
'    `END`ATV~w{hello}`END`PLN\n' +
'    `END`ATV~C&lt;hello&gt;`END`PLN\n' +
'  `END`KWDend`END`PLN\n' +
'\n' +
'`END`KWDend`END')
};

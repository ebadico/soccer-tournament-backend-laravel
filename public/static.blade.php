<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Globuscup 2016</title>


    <meta property="fb:profile_id"         content="Globus-Cup-499735930135609">
    <meta property="og:rich_attachment"    content="true">
    <meta property="og:type"               content="article" />
    <meta property="fb:app_id"             content="1020464471354564">

    <meta property="og:site_name"          content="GlobusCup">
    <meta property="og:url"                content="http://dev.globuscup.it/news/{{ $news->id }}" />

    <meta property="og:title"              content="{{ $news->title }}" />
    <meta property="og:description"        content="{{ $news->excerpt ? $news->excerpt : 'GlobusCup 2016 Tornei di calcio A5' }}" />
    <meta property="og:image"              content="{{ $news->featured ? $news->featured->path :'http://www.globuscup.it/images/globus_facebook.jpg' }}" />

</head>
<body>


</body>
</html>
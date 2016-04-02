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
    <meta property="og:url"                content="http://api.globuscup.it/socialbot/team/{{ $team->id }}" />
    

    <meta property="og:title"              content="{{ $team->name }} - GlobusCup" />
    <meta property="og:description"        content="Vittorie: {{ $team->wins }} | Pareggi: {{ $team->draws }} | Sconfitte: {{ $team->losts }}" />
    <meta property="og:image"              content="{{ $team->group_photo ? $team->group_photo->path . '?v=1' :'http://www.globuscup.it/images/globus_facebook.jpg' }}" />

</head>
<body>
</body>
</html>


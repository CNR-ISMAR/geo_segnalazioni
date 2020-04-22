<?php

// Include the library
include('simple_html_dom.php');
// Retrieve the DOM from a given URL
$html = file_get_html('https://forms.gle/73YpgPnLa4kJEVmc8');
//load fisrst part of google form

include('header.php');


//load map
include('map.php');

// Find the DIV tag with class ss-form"
foreach($html->find('div.ss-form') as $e)
    echo $e->innertext ;

include('footer.php');


?>

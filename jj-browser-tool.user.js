// ==UserScript==
// @name         jj-browser-tool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Find the content asset ID and set it as the title of the container
// @author       Jack & Jones Ecommerce
// @include      *staging.bing.*.com*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jackjonesfashion/jj-browser-tool/master/jj-browser-tool.user.js
// @downloadURL  https://raw.githubusercontent.com/jackjonesfashion/jj-browser-tool/master/jj-browser-tool.user.js
// ==/UserScript==

// ContentAssetID finder
(function() {
    'use strict';

    console.log('ContentAssetID Finder is loaded');
    var content = document.querySelectorAll('[data-layer-promotion-view]');

    for (var i = 0; i < content.length; i++) {
        var currentContent = content[i];
        var ContentId = JSON.parse(currentContent.getAttribute('data-layer-promotion-view')).id;
        currentContent.setAttribute('title', ContentId);
    }
})();

// Language selector
var url = window.location.href;
if (url.indexOf("demandware") <= 0){
    // Add anguage container
    $(".servicebar__wrapper").append("<div class='language-selector' style='margin: auto;width: 100%;order: 3px solid green;padding: 0px; text-align:center; line-height:normal; position:absolute;'></div>");

    // Is it homepage?
    if (url.indexOf("home") >= 0){
        // Append languages
        $(".language-selector").append("<a style='padding:10px;' href='/dk/da/home'>DK</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/de/de/home'>DE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/nl/nl/home'>NL</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/no/no/home'>NO</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/fr/fr/home'>FR</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/se/sv/home'>SE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/it/it/home'>IT</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/ie/en/home'>IE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/es/es/home'>ES</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/be/nl/home'>BE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/gb/en/home'>GB</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/fi/fi/home'>FI</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/ch/de/home'>CH</a>");
    }

    // Is it PLP?
    if ((url.indexOf("brands") >= 0) || (url.indexOf("merker") >= 0) || (url.indexOf("braendit") >= 0) || (url.indexOf("merken") >= 0) || (url.indexOf("marken") >= 0) || (url.indexOf("marcas") >= 0) || (url.indexOf("varumaerken") >= 0) || (url.indexOf("marques") >= 0) || ($("#wrapper").hasClass("plp") > 0)){
        var cgid = "";
        if($(".breadcrumb-navigation__link").length > 0){
            cgid = $(".breadcrumb-navigation__link").last().attr("data-category-id");
        } else if(url.indexOf("intelligence") >= 0){
            cgid = "jj-brands-jeansintelligence";
        } else if(url.indexOf("core") >= 0){
            cgid = "jj-brands-core";
        } else if(url.indexOf("premium") >= 0){
            cgid = "jj-brands-premium";
        } else if(url.indexOf("originals") >= 0){
            cgid = "jj-brands-originals";
        } else if(url.indexOf("vintage") >= 0){
            cgid = "jj-brands-vintage";
        } else if(url.indexOf("footwear") >= 0){
            cgid = "jj-brands-footwear";
        } else if(url.indexOf("tech") >= 0){
            cgid = "jj-brands-tech";
        }

        $(".language-selector").append("<a style='padding:10px;' href='/dk/da/search?cgid="+cgid+"'>DK</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/de/de/search?cgid="+cgid+"'>DE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/nl/nl/search?cgid="+cgid+"'>NL</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/no/no/search?cgid="+cgid+"'>NO</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/fr/fr/search?cgid="+cgid+"'>FR</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/se/sv/search?cgid="+cgid+"'>SE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/it/it/search?cgid="+cgid+"'>IT</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/ie/en/search?cgid="+cgid+"'>IE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/es/es/search?cgid="+cgid+"'>ES</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/be/nl/search?cgid="+cgid+"'>BE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/gb/en/search?cgid="+cgid+"'>GB</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/fi/fi/search?cgid="+cgid+"'>FI</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/ch/de/search?cgid="+cgid+"'>CH</a>");
    }

    // Is it PDP?
    if ($("#wrapper").hasClass("pdp") > 0){
        var pid = $("#pid").val();
        $(".language-selector").append("<a style='padding:10px;' href='/dk/da/"+pid+".html'>DK</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/de/de/"+pid+".html'>DE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/nl/nl/"+pid+".html'>NL</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/no/no/"+pid+".html'>NO</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/fr/fr/"+pid+".html'>FR</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/se/sv/"+pid+".html'>SE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/it/it/"+pid+".html'>IT</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/ie/en/"+pid+".html'>IE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/es/es/"+pid+".html'>ES</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/be/nl/"+pid+".html'>BE</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/gb/en/"+pid+".html'>GB</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/fi/fi/"+pid+".html'>FI</a>");
        $(".language-selector").append("<a style='padding:10px;' href='/ch/de/"+pid+".html'>CH</a>");
    }
}

// ==UserScript==
// @name         jj-browser-tool
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  BING Language selector
// @author       Jack & Jones Ecommerce
// @include      *.jackjones.com*
// @include      *.selected.com*
// @include      *.vila.com*
// @include      *.nameit.com*
// @require      https://code.jquery.com/jquery-3.0.0-beta1.min.js
// @updateURL    https://raw.githubusercontent.com/jackjonesfashion/jj-browser-tool/master/jj-browser-tool.user.js
// @downloadURL  https://raw.githubusercontent.com/jackjonesfashion/jj-browser-tool/master/jj-browser-tool.user.js
// ==/UserScript==

var url = window.location.href;

if (url.indexOf("demandware") <= 0){
    // Add hover text box
    $(".content-wrapper").append("<div class='hover-textbox' style='background-color:#fff; display:none; border-style: solid; padding:10px; height:120px; width:250px;'></div>");

    // Add helper texts
    $(".servicebar__wrapper").append("<div class='service-helper' style='margin: auto;width: 100%; margin-top:45px;order: 3px solid green;padding: 0px; text-align:center; line-height:normal; position:absolute;'></div>");
     
    // Add language container
    $(".servicebar__wrapper").append("<div class='language-selector' style='margin: auto;width: 100%; margin-top:0px;order: 3px solid green;padding: 0px; text-align:center; line-height:normal; position:absolute;'></div>");

    // Is it homepage?
    if (url.indexOf("home") >= 0 && $("#wrapper").hasClass("homepage") > 0){
        // Append languages
        updateTopNavLangaugeSelector("home", "");
    }

    // Is it PLP?
    if ($("#wrapper").hasClass("plp") > 0 || (url.indexOf("home") === -1 && $("#wrapper").hasClass("homepage") > 0)){
        var cgid = "";
        if($(".breadcrumb-navigation__link").length > 0){
            cgid = $(".breadcrumb-navigation__link").last().attr("data-category-id");
        } else if(url.indexOf("sl/homme") >= 0){
            cgid = "sl-homme";
        } else if(url.indexOf("sl/femme") >= 0){
            cgid = "sl-femme";
        }

        // Append languages
        updateTopNavLangaugeSelector("plp", cgid);
    }

    // Is it PDP?
    if ($("#wrapper").hasClass("pdp") > 0){
        var pid = $("#pid").val();

        // Append languages
        updateTopNavLangaugeSelector("pdp", pid);

        var pid = $("#pid").val();
        var pname = $(".product-name--visible").text();
        var cgid = "";
        if($(".breadcrumb-navigation__link").length > 0){
            cgid = $(".breadcrumb-navigation__link").last().attr("data-category-id");
        }
        var so = dataLayer[0]["ecommerce"]["detail"]["products"][0]["colorPattern"];
        var pean = dataLayer[0]["ecommerce"]["detail"]["products"][0]["id"];
        //var str = JSON.stringify(dataLayer, null, 4);

        $(".service-helper").append("Stylename: " + pname +  ".&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Style ID: " + pid + ".&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Primary Category: " + cgid + ".&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Style Option: <span class='js__update--so'>" + so + "</span>" + ".&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EAN: <span class='js__update--ean'>" + pean + "</span>");
    }
    
    $(".market").hover(function() {
        $(this).find("a:first").css({ 'color': 'red' });
        $( this ).find("div").fadeIn( 100 );
    }, function(){
        $(this).find("a:first").css({ 'color': '#666' });
        $( this ).find("div").fadeOut( 100 );
    });

    var placeholder = "";
    $(".widget-smart").hover(function(event) {
        var row_area_type = "jj-home-page-rows";
        var contextName = "folder";
        var region = "BSE-DK";
        var dataLayerObj = $(this).attr("data-layer-promotion-view");
        dataLayerObj = $.parseJSON(dataLayerObj);
        var row_id = dataLayerObj.row_id;
        var image_path = "https://"+window.location.hostname+dataLayerObj.creative;
        if(row_id.indexOf("category") >= 0){
            var name_parts = dataLayerObj.name.split("||");
            row_area_type = name_parts[0];
            contextName = "category";
            region = "BSE-DK";
        }
        var left = event.pageX - 200;
        var top = event.pageY - 100;
        if(placeholder != dataLayerObj.id){
            placeholder = dataLayerObj.id;
            var slot_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/-/StorefrontEditing-Slot?SlotID="+dataLayerObj.row_id+"&ContextName="+contextName+"&ContextUUID="+row_area_type+"&Site="+region;
            var content_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/default/ViewLibraryContentList_52-Dispatch?FolderUUID=&LibraryUUID=bcD6EiaaiT2loaaadqVwsUVdqy&SearchTerm="+dataLayerObj.id+"&find=&NewContentID=&PageNumberPrefix=PageNumber_&PageableID=586508a93eec31a34fdd8dbb0c&PageableName=ContentAssets&CurrentPageNumber=0";

            var img = new Image();
            img.onload = function(){
                var dimensions = "<b>Image:</b> Width "+this.width+' x height '+ this.height + '<br><b>Name:</b> ' + dataLayerObj.creative.match(/([^\/]*)$/)[0];
                $(".hover-textbox").css({"display":"inline", "position":"absolute", "z-index":10, "left":left, "top":top});
                $(".hover-textbox").html("<b>Type: </b>Smart Widget<br><b>ID: </b><a href='"+content_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.id+"</a><br><b>Row: </b><a href='"+slot_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.row_id+"</a><br>"+dimensions);
            };
            img.src = image_path;
            
        }
    });
    $(".widget__full-width-text").hover(function(event) {
        var row_area_type = "jj-home-page-rows";
        var contextName = "folder";
        var region = "BSE-DK";
        var dataLayerObj = $(this).attr("data-layer-promotion-view");
        dataLayerObj = $.parseJSON(dataLayerObj);
        var row_id = dataLayerObj.row_id;
        if(row_id.indexOf("category") >= 0){
            var name_parts = dataLayerObj.name.split("||");
            row_area_type = name_parts[0];
            contextName = "category";
            region = "BSE-DK";
        }
        var left = event.pageX - 200;
        var top = event.pageY - 100;
        if(placeholder != dataLayerObj.id){
            placeholder = dataLayerObj.id;
            var slot_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/-/StorefrontEditing-Slot?SlotID="+dataLayerObj.row_id+"&ContextName="+contextName+"&ContextUUID="+row_area_type+"&Site="+region;
            var content_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/default/ViewLibraryContentList_52-Dispatch?FolderUUID=&LibraryUUID=bcD6EiaaiT2loaaadqVwsUVdqy&SearchTerm="+dataLayerObj.id+"&find=&NewContentID=&PageNumberPrefix=PageNumber_&PageableID=586508a93eec31a34fdd8dbb0c&PageableName=ContentAssets&CurrentPageNumber=0";

            $(".hover-textbox").css({"display":"inline", "position":"absolute", "z-index":10, "left":left, "top":top});
            $(".hover-textbox").html("<b>Type: </b>Text Widget<br><b>ID: </b><a href='"+content_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.id+"</a><br><b>Row: </b><a href='"+slot_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.row_id+"</a>");

        }
    });
    $(".widget-product").hover(function(event) {
        var row_area_type = "jj-home-page-rows";
        var contextName = "folder";
        var region = "BSE-DK";
        var dataLayerObj = $(this).find("a").attr("data-layer-click");
        dataLayerObj = $.parseJSON(dataLayerObj);
        var row_id = dataLayerObj.ecommerce.promoClick.promotions[0].row_id;
        if(row_id.indexOf("category") >= 0){
            var name_parts = dataLayerObj.ecommerce.promoClick.promotions[0].name.split("||");
            row_area_type = name_parts[0];
            contextName = "category";
            region = "BSE-DK";
        }
        var left = event.pageX - 200;
        var top = event.pageY - 100;
        if(placeholder != dataLayerObj.ecommerce.promoClick.promotions[0].id){
            placeholder = dataLayerObj.ecommerce.promoClick.promotions[0].id;
            var slot_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/-/StorefrontEditing-Slot?SlotID="+dataLayerObj.ecommerce.promoClick.promotions[0].row_id+"&ContextName="+contextName+"&ContextUUID="+row_area_type+"&Site="+region;
            var content_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/default/ViewLibraryContentList_52-Dispatch?FolderUUID=&LibraryUUID=bcD6EiaaiT2loaaadqVwsUVdqy&SearchTerm="+dataLayerObj.ecommerce.promoClick.promotions[0].id+"&find=&NewContentID=&PageNumberPrefix=PageNumber_&PageableID=586508a93eec31a34fdd8dbb0c&PageableName=ContentAssets&CurrentPageNumber=0";

            $(".hover-textbox").css({"display":"inline", "position":"absolute", "z-index":10, "left":left, "top":top});
            $(".hover-textbox").html("<b>Type: </b>Product Widget<br><b>ID: </b><a href='"+content_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.ecommerce.promoClick.promotions[0].id+"</a><br><b>Row: </b><a href='"+slot_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.ecommerce.promoClick.promotions[0].row_id+"</a>");

        }
    });
    $(".usp-area").hover(function(event) {
        var row_area_type = "jj-home-page-rows";
        var contextName = "folder";
        var region = "BSE-DK";
        var dataLayerObj = $(this).find("ul").attr("data-layer-promotion-view");
        dataLayerObj = $.parseJSON(dataLayerObj);
        var row_id = dataLayerObj.row_id;
        if(row_id.indexOf("category") >= 0){
            var name_parts = dataLayerObj.name.split("||");
            row_area_type = name_parts[0];
            contextName = "category";
            region = "BSE-DK";
        }
        var left = event.pageX - 200;
        var top = event.pageY - 100;
        if(placeholder != dataLayerObj.id){
            placeholder = dataLayerObj.id;
            var slot_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/-/StorefrontEditing-Slot?SlotID="+dataLayerObj.row_id+"&ContextName="+contextName+"&ContextUUID="+row_area_type+"&Site="+region;
            var content_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/default/ViewLibraryContentList_52-Dispatch?FolderUUID=&LibraryUUID=bcD6EiaaiT2loaaadqVwsUVdqy&SearchTerm="+dataLayerObj.id+"&find=&NewContentID=&PageNumberPrefix=PageNumber_&PageableID=586508a93eec31a34fdd8dbb0c&PageableName=ContentAssets&CurrentPageNumber=0";

            $(".hover-textbox").css({"display":"inline", "position":"absolute", "z-index":10, "left":left, "top":top});
            $(".hover-textbox").html("<b>Type: </b>Smart Widget<br><b>ID: </b><a href='"+content_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.id+"</a><br><b>Row: </b><a href='"+slot_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.row_id+"</a>");

        }
    });
    $(".instagram-feed").hover(function(event) {
        var row_area_type = "jj-home-page-rows";
        var contextName = "folder";
        var region = "BSE-DK";
        var dataLayerObj = $(this).attr("data-layer-promotion-view");
        dataLayerObj = $.parseJSON(dataLayerObj);
        var row_id = dataLayerObj.row_id;
        if(row_id){
            if(row_id.indexOf("category") >= 0){
                var name_parts = dataLayerObj.name.split("||");
                row_area_type = name_parts[0];
                contextName = "category";
                region = "BSE-DK";
            }
        }
        var left = event.pageX - 100;
        var top = event.pageY - 100;
        if(placeholder != dataLayerObj.id){
            placeholder = dataLayerObj.id;
            var slot_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/-/StorefrontEditing-Slot?SlotID="+dataLayerObj.row_id+"&ContextName="+contextName+"&ContextUUID="+row_area_type+"&Site="+region;
            var content_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/default/ViewLibraryContentList_52-Dispatch?FolderUUID=&LibraryUUID=bcD6EiaaiT2loaaadqVwsUVdqy&SearchTerm="+dataLayerObj.id+"&find=&NewContentID=&PageNumberPrefix=PageNumber_&PageableID=586508a93eec31a34fdd8dbb0c&PageableName=ContentAssets&CurrentPageNumber=0";

            $(".hover-textbox").css({"display":"inline", "position":"absolute", "z-index":10, "left":left, "top":top});
            $(".hover-textbox").html("<b>Type: </b>Instagram Widget<br><b>ID: </b><a href='"+content_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.id+"</a><br><b>Row: </b><a href='"+slot_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.row_id+"</a>");

        }
    });
    $(".product-tile").hover(function(event) {
        var dataLayerObj = $(this).attr("data-layer-impression");
            dataLayerObj = $.parseJSON(dataLayerObj);
            var left = event.pageX - 350;
            var top = event.pageY - 100;
        if(placeholder != dataLayerObj.id){
            placeholder = dataLayerObj.id;


            $(".hover-textbox").css({"display":"inline", "position":"absolute", "z-index":10, "left":left, "top":top});
            $(".hover-textbox").html("<b>Type: </b>Product Tile<br><b>EAN: </b>"+dataLayerObj.id+"<br><b>Style: </b>"+dataLayerObj.articleNumber+"<br><b>Subbrand: </b>"+dataLayerObj.subbrand);
        }
    });
    $(".widget__dynamic-promotion").hover(function(event) {
        var row_area_type = "jj-home-page-rows";
        var contextName = "folder";
        var region = "BSE-DK";
        var dataLayerObj = $(this).attr("data-layer-promotion-view");
        dataLayerObj = $.parseJSON(dataLayerObj);
        var row_id = dataLayerObj.row_id;
        var image_path = "https://"+window.location.hostname+dataLayerObj.creative;
        if(row_id.indexOf("category") >= 0){
            var name_parts = dataLayerObj.name.split("||");
            row_area_type = name_parts[0];
            contextName = "category";
            region = "BSE-DK";
        }
        var left = event.pageX - 350;
        var top = event.pageY - 100;
        if(placeholder != dataLayerObj.id){
            placeholder = dataLayerObj.id;
            var slot_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/-/StorefrontEditing-Slot?SlotID="+dataLayerObj.row_id+"&ContextName="+contextName+"&ContextUUID="+row_area_type+"&Site="+region;
            var content_url = "https://staging.bing.bestseller.com/on/demandware.store/Sites-Site/default/ViewLibraryContentList_52-Dispatch?FolderUUID=&LibraryUUID=bcD6EiaaiT2loaaadqVwsUVdqy&SearchTerm="+dataLayerObj.id+"&find=&NewContentID=&PageNumberPrefix=PageNumber_&PageableID=586508a93eec31a34fdd8dbb0c&PageableName=ContentAssets&CurrentPageNumber=0";

            var img = new Image();
            img.onload = function(){
                var dimensions = "<b>Image:</b> Width "+this.width+' x height '+ this.height + '<br><b>Name:</b> ' + dataLayerObj.creative.match(/([^\/]*)$/)[0];
                $(".hover-textbox").css({"display":"inline", "position":"absolute", "z-index":10, "left":left, "top":top});
                $(".hover-textbox").html("<b>Type: </b>Promotion Tile<br><b>ID: </b><a href='"+content_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.id+"</a><br><b>Row: </b><a href='"+slot_url+"' style='color:blue;font-weight:normal;text-transform:lowercase;' target='_blank'>"+dataLayerObj.row_id+"</a><br>"+dimensions);
            };
            img.src = image_path;

        }
    });
}

function updateTopNavLangaugeSelector(type, id){
    var area = type;
    var urlPath = "home";
    if(type == "plp"){
       urlPath = "search?cgid="+id;
        area = id;
    } else if(type == "pdp"){
      urlPath = id+".html";
        area = "";
    }

    $(".language-selector").append("<div class='lang-dk market' style='width:20px; display:inline;'><a style='padding:10px;' href='/dk/da/"+urlPath+"'>DK</a></div>");
        $(".lang-dk").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: -470px;right: 0; display:none'><a style='padding:10px;' href='/dk/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/dk/da/"+urlPath+"'>DK</a></div>");
        $(".language-selector").append("<div class='lang-de market' style='width:20px; display:inline;'><a style='padding:10px;' href='/de/de/home'>DE</a></div>");
        $(".lang-de").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: -390px;right: 0; display:none;'><a style='padding:10px;' href='/de/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/de/de/"+urlPath+"'>DE</a></div>");
        $(".language-selector").append("<div class='lang-nl market' style='width:20px; display:inline;'><a style='padding:10px;' href='/nl/nl/home'>NL</a></div>");
        $(".lang-nl").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: -320px;right: 0; display:none;'><a style='padding:10px;' href='/nl/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/nl/nl/"+urlPath+"'>NL</a></div>");
        $(".language-selector").append("<div class='lang-no market' style='width:20px; display:inline;'><a style='padding:10px;' href='/no/no/home'>NO</a></div>");
        $(".lang-no").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: -240px;right: 0; display:none;'><a style='padding:10px;' href='/no/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/no/no/"+urlPath+"'>NO</a></div>");
        $(".language-selector").append("<div class='lang-fr market' style='width:20px; display:inline;'><a style='padding:10px;' href='/fr/fr/home'>FR</a></div>");
        $(".lang-fr").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: -170px;right: 0; display:none;'><a style='padding:10px;' href='/fr/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/fr/fr/"+urlPath+"'>FR</a></div>");
        $(".language-selector").append("<div class='lang-se market' style='width:20px; display:inline;'><a style='padding:10px;' href='/se/sv/home'>SE</a></div>");
        $(".lang-se").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: -100px;right: 0; display:none;'><a style='padding:10px;' href='/se/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/se/sv/"+urlPath+"'>SE</a></div>");
        $(".language-selector").append("<div class='lang-it market' style='width:20px; display:inline;'><a style='padding:10px;' href='/it/it/home'>IT</a></div>");
        $(".lang-it").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: -30px;right: 0; display:none;'><a style='padding:10px;' href='/it/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/it/it/"+urlPath+"'>IT</a></div>");
        $(".language-selector").append("<div class='lang-ie market' style='width:20px; display:inline;'><a style='padding:10px;' href='/ie/en/home'>IE</a></div>");
        $(".lang-ie").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: 30px;right: 0; display:none;'><a style='padding:10px;' href='/ie/en/ho"+urlPath+"me'>EN</a></div>");
        $(".language-selector").append("<div class='lang-es market' style='width:20px; display:inline;'><a style='padding:10px;' href='/es/es/home'>ES</a></div>");
        $(".lang-es").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: 100px;right: 0; display:none;'><a style='padding:10px;' href='/es/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/es/es/"+urlPath+"'>ES</a></div>");
        $(".language-selector").append("<div class='lang-be market' style='width:20px; display:inline;'><a style='padding:10px;' href='/be/nl/home'>BE</a></div>");
        $(".lang-be").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: 170px;right: 0; display:none;'><a style='padding:10px;' href='/be/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/be/nl/"+urlPath+"'>BE</a><a style='padding:10px;' href='/be/fr/"+urlPath+"'>FR</a></div>");
        $(".language-selector").append("<div class='lang-gb market' style='width:20px; display:inline;'><a style='padding:10px;' href='/gb/en/home'>GB</a></div>");
        $(".lang-gb").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: 250px;right: 0; display:none;'><a style='padding:10px;' href='/gb/en/"+urlPath+"'>EN</a></div>");
        $(".language-selector").append("<div class='lang-fi market' style='width:20px; display:inline;'><a style='padding:10px;' href='/fi/fi/home'>FI</a></div>");
        $(".lang-fi").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: 320px;right: 0; display:none;'><a style='padding:10px;' href='/fi/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/fi/fi/"+urlPath+"'>FI</a></div>");
        $(".language-selector").append("<div class='lang-ch market' style='width:20px; display:inline;'><a style='padding:10px;' href='/ch/de/home'>CH</a></div>");
        $(".lang-ch").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: 390px;right: 0; display:none;'><a style='padding:10px;' href='/ch/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/ch/de/"+urlPath+"'>CH</a><a style='padding:10px;' href='/ch/fr/"+urlPath+"'>FR</a></div>");
        $(".language-selector").append("<div class='lang-at market' style='width:20px; display:inline;'><a style='padding:10px;' href='/at/de/home'>AT</a></div>");
        $(".lang-at").append("<div class='langs' style='position:absolute; margin-left: auto; margin-right: auto;left: 470px;right: 0; display:none;'><a style='padding:10px;' href='/at/en/"+urlPath+"'>EN</a><a style='padding:10px;' href='/at/de/"+urlPath+"'>AT</a></div>");
    if(area !== ""){
        $(".service-helper").append(area);
    }
}

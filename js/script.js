

    window.silex = window.silex || {}
    window.silex.data = {"site":{"width":960},"pages":[{"id":"page-arcaan","displayName":"arcaan","link":{"linkType":"LinkTypePage","href":"#!page-arcaan"},"canDelete":true,"canProperties":true,"canMove":true,"canRename":true,"opened":false}]}

        /**
         * keep the menu visible when you scroll down
         */
        $(function() {
            var nav = $(".nav");
            var navBg = $(".nav-bg");
            var navOffset = nav.offset().top;
            $(window).scroll(function() {
                if ($(this).scrollTop() <= navOffset) {
                    nav.css('position', '');
                    navBg.css('position', '');
                    nav.css('top', '');
                    navBg.css('top', '');
                    nav.css('z-index', '');
                }
                else {
                    nav.css('position', 'fixed');
                    navBg.css('position', 'fixed');
                    nav.css('top', '0');
                    navBg.css('top', '0');
                    nav.css('z-index', '101');
                }
            });
        });
        
        /*
         * active menu widget for Silex
         * create an element which links to an anchor, e.g. an element with a link to #anchor1
         * add the css class "anchor-link" to this element
         * create an element which is the anchor, e.g. an element with the css class "anchor1"
         * when the user clicks on the link, the scroll slides until the element is visible
         * when the user slides and the element is visible, the link gets a css class "active-menu"
         */
        $(function() {
            // Cache selectors
            var lastId,
                // All list items
                menuItems = $(".nav a"),
                // Anchors corresponding to menu items
                // find the name of the elements which are anchors
                scrollItems = menuItems.map(function(){
                    // the names are in the href attribute of the anchor links
                    var attr = $(this).attr("data-silex-href") || $(this).attr("href");
                    // case of a link in text field or an external link after publish
                    $(this).find("[href]").each(function() {
                        attr = $(this).attr("href");
                    });
                    // case of an "external link" before publish
                    $(this).find("[data-silex-href]").each(function() {
                        attr = $(this).attr("href");
                    });
                    // the links to anchors are expected to start with #
                    if(attr && attr.indexOf("#") === 0) {
                        var name = attr.substring(1);
                        var item = $("." + name);
                        // check if there is a hash in the URL to scroll to the anchor at start
                        if(window.location.hash.indexOf(name) === 1) {
                            var offsetTop = item.offset().top;
                            $('html, body').stop().animate({
                                scrollTop: offsetTop
                            }, 300);
                        }
                        // now find the element itself, which has the name as a css class
                        if (item.length) { return {
                                "link": this,
                                "item": item.get(0)
                            };
                        }
                    }
                });
            // Bind click handler to menu items
            // so we can get a fancy scroll animation
            scrollItems.each(function() {
                var link = this.link;
                var item = this.item;
                $(link).click(function(e){
                  var offsetTop = $(item).offset().top;
                  $('html, body').stop().animate({
                      scrollTop: offsetTop - 50
                  }, 300);
                  e.preventDefault();
                });
            })
        
            // Bind to scroll
            $(window).scroll(function(){
               // Get container scroll position
               var fromTop = $(this).scrollTop() + 50;
               // Get id of current scroll item
               var cur = scrollItems.map(function(){
                 if ($(this.item).offset().top <= fromTop)
                   return this;
               });
               // add the css class on the current menu item
               $(".active-menu").removeClass("active-menu");
               if(cur.length > 0) {
                   cur = cur[cur.length-1];
                   $(cur.link).addClass("active-menu");
               }
            });
        });
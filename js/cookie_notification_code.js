/*JS file of the Responsive JavaScript Cookie Notification Banner by Fabian Lins*/

    cookie_note_animation_speed=100;
    cookie_note_read_more_scroll_speed=200;
    cookie_note_reject_link="https://google.com";
    cookie_note_readmore_link="#legal_disclosure";

    /*Cookie Function*/
    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {   
        document.cookie = name+'=; Max-Age=-99999999;';  
    }

    /*Link Check Function*/
    function isExternal(url) {
        var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
        if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
        if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) return true;
        return false;
    }
    
    /*Shows the "#cookie_note_box" if the cookie is not set.*/
    if(getCookie("cookie_note_unactive")===null){
        document.getElementById("cookie_note_box").classList.remove("cookie_note_hide");
    }

    /*Slides down the "#cookie_note_box" and sets a cookie.*/
    document.getElementById("cookie_note_ok_button_id").onclick=function(){
        document.getElementById("cookie_note_box").style.transition = "margin-top " +cookie_note_animation_speed+"ms linear";
        document.getElementById("cookie_note_box").style.marginTop = document.getElementById("cookie_note_box").offsetHeight+"px";
        setCookie("cookie_note_unactive","istrue");
    };

    /*Redirects to a reject site such as "Google".*/
    document.getElementById("cookie_note_reject_button_id").onclick=function(){
        window.location.href = cookie_note_reject_link;
    };

    /*Scrolls to the read more section or redirects if it is a link.*/
    document.getElementById("cookie_note_read_more_button_id").onclick=function(){
        if((isExternal(cookie_note_readmore_link)==true) || (cookie_note_readmore_link.includes("/")==true) || (cookie_note_readmore_link.includes(".html")==true)){
            window.location.href = cookie_note_readmore_link;
        }
        else{
            window.scrollTo({
                top: document.querySelector(cookie_note_readmore_link).offsetTop,
                behavior: "smooth"
            });
        }
    };

    /*Removes the focus after clicking any button.*/
    for (var i=document.querySelectorAll('.cookie_note_button').length; i--;) {
        document.querySelectorAll('.cookie_note_button')[i].addEventListener('click', cookie_note_blurfocus, false);
    }
    
    function cookie_note_blurfocus() {
        this.blur();
    }
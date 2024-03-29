import '../css/app.scss';

const routes = require('@publicFolder/js/fos_js_routes.json');
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min';

import React from "react";
import { createRoot } from "react-dom/client";
import { Notifications } from "@commonComponents/Elements/Notifications";
import { Theme } from "@commonComponents/Modules/Theme/Theme";
import { StorageAdmin } from "@adminPages/Storage/StorageAdmin";

Routing.setRoutingData(routes);

let notifs = document.getElementById("notifs_list");
if(notifs){
    createRoot(notifs).render(<Notifications />)
}

let theme = document.getElementById("theme_switcher");
if(theme){
    createRoot(theme).render(<Theme {...theme.dataset} />)
}

let storage = document.getElementById("storage_list");
if(storage){
    createRoot(storage).render(<StorageAdmin {...storage.dataset} />)
}

menu();

function menu() {
    let body = document.querySelector("body");
    let btn = document.querySelector('.nav-mobile');
    let btnIcon = document.querySelector('.nav-mobile > span');
    if(btn){
        btn.addEventListener('click', function () {
            let content = document.querySelector('.nav-content');
            if(content.classList.contains('active')){
                content.classList.remove('active');
                btnIcon.classList.add('icon-menu');
                btnIcon.classList.remove('icon-close');
                body.style.overflow = "auto";
            }else{
                content.classList.add('active');
                btnIcon.classList.add('icon-close');
                btnIcon.classList.remove('icon-menu');
                body.style.overflow = "hidden";
            }
        })
    }
}

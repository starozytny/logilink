import '../css/app.scss';

const routes = require('@publicFolder/js/fos_js_routes.json');
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min';

// import React from "react";
// import { createRoot } from "react-dom/client";
import toastr from "toastr";

Routing.setRoutingData(routes);

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

let flashes = document.getElementById("flashes");
if(flashes){
    let data = JSON.parse(flashes.dataset.flashes);
    Object.entries(data).forEach(([key, value]) => {
        switch (key){
            case 'error':
                toastr.error(value, 'Erreur'); break;
            default:
                toastr.info(value); break;
        }
    })
}

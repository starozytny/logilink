import '../css/app.scss';

const routes = require('@publicFolder/js/fos_js_routes.json');
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min';

import React from "react";
import { createRoot } from "react-dom/client";
import { ContactFormulaire } from "@appFolder/pages/components/Contact/ContactForm";
import { Cookies } from "@commonComponents/Modules/Cookies/Cookies";

Routing.setRoutingData(routes);

let el = document.getElementById("contacts_create");
if(el){
    createRoot(el).render(<ContactFormulaire />)
}

let ck = document.getElementById("cookies");
if(ck){
    createRoot(ck).render(<Cookies {...ck.dataset} />)
}

menu();

function menu() {
    let btn = document.querySelector('.nav-mobile');
    if(btn){
        btn.addEventListener('click', function () {
            let content = document.querySelector('.nav-content');
            if(content.classList.contains('active')){
                content.classList.remove('active');
            }else{
                content.classList.add('active');
            }
        })
    }

    let links = document.querySelectorAll('.nav-link-item');
    links.forEach(link => {
        let navExpands = document.querySelectorAll('.nav-expanded-container');
        let navExpand = document.querySelector('#nav-expanded-' + link.dataset.id);
        navExpands.forEach(n => {
            n.addEventListener('mouseleave', () => {
                navExpands.forEach(n => { n.classList.remove('active') })
                links.forEach(l => { l.classList.remove('hover') })
            })
        })
        if(navExpand){
            link.addEventListener('mouseover', () => {
                navExpands.forEach(n => { n.classList.remove('active') })
                links.forEach(l => { l.classList.remove('hover') })
                navExpand.classList.add('active');
                link.classList.add('hover');
            })
        }else{
            link.addEventListener('mouseover', () => {
                navExpands.forEach(n => { n.classList.remove('active') })
                links.forEach(l => { l.classList.remove('hover') })
            })
        }
    })
}

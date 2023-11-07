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
    let btnIcon = document.querySelector('.nav-mobile > span');
    if(btn){
        btn.addEventListener('click', function () {
            let content = document.querySelector('.nav-content');
            if(content.classList.contains('active')){
                content.classList.remove('active');
                btnIcon.classList.add('icon-menu');
                btnIcon.classList.remove('icon-close');
            }else{
                content.classList.add('active');
                btnIcon.classList.add('icon-close');
                btnIcon.classList.remove('icon-menu');
            }
        })
    }

    let links = document.querySelectorAll('.nav-link-item');
    links.forEach(link => {
        let navExpandsBody = document.querySelectorAll('.nav-expanded-body');
        let navExpands = document.querySelectorAll('.nav-expanded-container');
        let navExpandBody = document.querySelector('#nav-expanded-body-' + link.dataset.id);
        let navExpand = document.querySelector('#nav-expanded-' + link.dataset.id);
        navExpands.forEach(n => {
            n.addEventListener('mouseleave', () => {
                navExpandsBody.forEach(n => { n.classList.remove('active') })
                navExpands.forEach(n => { n.classList.remove('active') })
                links.forEach(l => { l.classList.remove('hover') })
            })
        })
        if(navExpand){
            link.addEventListener('mouseover', () => {
                navExpandsBody.forEach(n => { n.classList.remove('active') })
                navExpands.forEach(n => { n.classList.remove('active') })
                links.forEach(l => { l.classList.remove('hover') })
                navExpand.classList.add('active');
                navExpandBody.classList.add('active');
                link.classList.add('hover');
            })
        }else{
            link.addEventListener('mouseover', () => {
                navExpandsBody.forEach(n => { n.classList.remove('active') })
                navExpands.forEach(n => { n.classList.remove('active') })
                links.forEach(l => { l.classList.remove('hover') })
            })
        }
    })
}

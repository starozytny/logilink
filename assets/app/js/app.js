import '../css/app.scss';
import "aos/dist/aos.css";

const routes = require('@publicFolder/js/fos_js_routes.json');
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min';

import React from "react";
import AOS from "aos/dist/aos";
import { createRoot } from "react-dom/client";

import Toastr from "@tailwindFunctions/toastr";

import { ContactFormulaire } from "@appFolder/pages/components/Contact/ContactForm";
import { Cookies, CookiesGlobalResponse } from "@commonComponents/Modules/Cookies/Cookies";

Routing.setRoutingData(routes);

menu();
inputPassword();

AOS.init({
    startEvent: 'load'
});

window.addEventListener('load', () => {
    AOS.refresh();
})

let el = document.getElementById("contacts_create");
if(el){
    createRoot(el).render(<ContactFormulaire />)
}

let ck = document.getElementById("cookies");
if(ck){
    createRoot(ck).render(<Cookies {...ck.dataset} />)
}

let cookiesGlobalResponse = document.getElementById("cookies-global-response");
if (cookiesGlobalResponse) {
    createRoot(cookiesGlobalResponse).render(<CookiesGlobalResponse {...cookiesGlobalResponse.dataset} />)
}

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
                if(!link.classList.contains('active')){
                    link.classList.add('hover');
                }
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

function inputPassword () {
    let inputShow = document.querySelector('.input-show');
    if(inputShow){
        let see = false;
        let input = document.querySelector('#password');
        let icon = document.querySelector('.input-show > span');
        inputShow.addEventListener('click', function (e){
            if(see){
                see = false;
                input.type = "password";
                icon.classList.remove("icon-vision-not");
                icon.classList.add("icon-vision");
            }else{
                see = true;
                input.type = "text";
                icon.classList.add("icon-vision-not");
                icon.classList.remove("icon-vision");
            }
        })
    }
}

let flashes = document.getElementById("flashes");
if(flashes) {
    let data = JSON.parse(flashes.dataset.flashes);
    Object.entries(data).forEach(([key, value]) => {
        switch (key) {
            case 'error':
                Toastr.toast('error', value); break;
            default:
                Toastr.toast('info', value); break;
        }
    })
}

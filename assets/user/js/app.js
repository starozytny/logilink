import '../css/app.scss';

const routes = require('@publicFolder/js/fos_js_routes.json');
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min';

import React from "react";
import { createRoot } from "react-dom/client";

import Menu from "@tailwindFunctions/menu";

import { Extraits } from "@userPages/Extrait/Extraits";

Routing.setRoutingData(routes);

Menu.menuListener();

let el = document.getElementById("extrait_compte_list");
if(el){
	createRoot(el).render(<Extraits {...el.dataset} />)
}

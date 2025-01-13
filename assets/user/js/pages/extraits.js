import "../../css/pages/extraits.scss"

import React from "react";
import { createRoot } from "react-dom/client";
import { Extraits } from "@userPages/Extrait/Extraits";

let el = document.getElementById("extrait_compte_list");
if(el){
	createRoot(el).render(<Extraits {...el.dataset} />)
}

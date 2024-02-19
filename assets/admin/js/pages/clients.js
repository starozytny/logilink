import "../../css/pages/clients.scss"

import React from "react";
import { createRoot } from "react-dom/client";
import { Clients } from "@adminPages/Donnees/Clients/Clients";
import { Extraits } from "@adminPages/Donnees/Extraits/Extraits";

let el = document.getElementById("clients_list");
if(el){
    createRoot(el).render(<Clients {...el.dataset} />)
}

el = document.getElementById("clients_extraits");
if(el){
    createRoot(el).render(<Extraits {...el.dataset} />)
}

import "../../css/pages/society.scss"

import React from "react";
import { createRoot } from "react-dom/client";
import { Recrutement } from "@appFolder/pages/components/Society/Recrutement";

let el = document.getElementById("recrutement");
if(el){
	createRoot(el).render(<Recrutement />)
}

import "../../css/pages/invoices.scss"

import React from "react";
import { createRoot } from "react-dom/client";
import { Invoices } from "@userPages/ExtraitInvoice/Invoices";

let el = document.getElementById("invoices_list");
if(el){
	createRoot(el).render(<Invoices {...el.dataset} />)
}

import "../../css/pages/legales.scss"

import React from "react";
import { createRoot } from "react-dom/client";
import { CookiesGlobalResponse } from "@commonComponents/Modules/Cookies/Cookies";

let cookiesGlobalResponse = document.getElementById("cookies-global-response-page");
if (cookiesGlobalResponse) {
	createRoot(cookiesGlobalResponse).render(<CookiesGlobalResponse {...cookiesGlobalResponse.dataset} />)
}

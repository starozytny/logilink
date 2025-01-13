import "../../css/pages/homepage.scss"

import React from "react";
import { createRoot } from "react-dom/client";
import { StorageAdmin } from "@adminPages/Storage/StorageAdmin";

let storage = document.getElementById("storage_list");
if(storage){
    createRoot(storage).render(<StorageAdmin {...storage.dataset} />)
}

import '../css/app.scss';

const routes = require('@publicFolder/js/fos_js_routes.json');
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min';

import React from 'react';
import { createRoot } from "react-dom/client";
import { StorageAdmin } from "@adminPages/Storage/StorageAdmin";

import Menu from "@tailwindFunctions/menu";

import { Notifications } from "@tailwindComponents/Modules/Notifications/Notifications";

Routing.setRoutingData(routes);

Menu.menuListener();

const notifications = document.getElementById("notifications");
if(notifications){
    createRoot(notifications).render(<Notifications {...notifications.dataset} isImmo={false} />)
}

let storage = document.getElementById("storage_list");
if(storage){
    createRoot(storage).render(<StorageAdmin {...storage.dataset} />)
}

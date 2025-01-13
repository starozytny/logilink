import '../css/app.scss';

const routes = require('@publicFolder/js/fos_js_routes.json');
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min';

import Menu from "@tailwindFunctions/menu";

Routing.setRoutingData(routes);

Menu.menuListener();

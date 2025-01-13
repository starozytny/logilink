import React from "react";
import PropTypes from 'prop-types';

import { Alert } from "@tailwindComponents/Elements/Alert";

import { ClientsItem } from "@adminPages/Donnees/Clients/ClientsItem";

export function ClientsList ({ data, onTakeAccount }) {
    return <div className="list my-4">
        <div className="list-table bg-white rounded-md shadow">
            <div className="items items-clients">
                <div className="item item-header uppercase text-sm text-gray-600">
                    <div className="item-content">
                        <div className="item-infos">
                            <div className="col-1">Client</div>
                            <div className="col-2">Code</div>
                            <div className="col-3">Numéro</div>
                            <div className="col-4 actions" />
                        </div>
                    </div>
                </div>

                {data.length > 0
                    ? data.map((elem) => {
                        return <ClientsItem key={elem.id} elem={elem}
                                            onTakeAccount={onTakeAccount} />;
                    })
                    : <div className="item border-t">
                        <Alert type="gray">Aucun résultat.</Alert>
                    </div>
                }
            </div>
        </div>
    </div>
}

ClientsList.propTypes = {
    data: PropTypes.array.isRequired,
    onTakeAccount: PropTypes.func.isRequired,
}

import React from "react";
import PropTypes from 'prop-types';

import { Alert } from "@commonComponents/Elements/Alert";

import { ClientsItem } from "@adminPages/Donnees/Clients/ClientsItem";

export function ClientsList ({ data, onTakeAccount }) {
    return <div className="list">
        <div className="list-table">
            <div className="items items-clients">
                <div className="item item-header">
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
                    : <Alert>Aucune donnée enregistrée.</Alert>
                }
            </div>
        </div>
    </div>
}

ClientsList.propTypes = {
    data: PropTypes.array.isRequired,
    onTakeAccount: PropTypes.func.isRequired,
}

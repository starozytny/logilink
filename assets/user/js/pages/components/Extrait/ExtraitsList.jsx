import React from "react";

import { Alert } from "@tailwindComponents/Elements/Alert";

import { ExtraitsItem } from "@userPages/Extrait/ExtraitsItem";

export function ExtraitsList ({ data }) {
    return <div className="list my-4">
        <div className="list-table bg-white rounded-md shadow">
            <div className="items items-extrait">
                <div className="item item-header uppercase text-sm text-gray-600">
                    <div className="item-content">
                        <div className="item-infos">
                            <div className="col-1">Date</div>
                            <div className="col-2">Libellé</div>
                            <div className="col-3">Lettre</div>
                            <div className="col-4">Débit (€)</div>
                            <div className="col-5">Crédit (€)</div>
                            <div className="col-6">Solde (€)</div>
                            <div className="col-7 actions" />
                        </div>
                    </div>
                </div>

                {data.length > 0
                    ? data.map((elem) => {
                        return <ExtraitsItem key={elem.id} elem={elem} />;
                    })
                    : <div className="item border-t">
                        <Alert type="gray">Aucun résultat.</Alert>
                    </div>
                }
            </div>
        </div>
    </div>
}

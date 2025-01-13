import React from "react";

import { Alert } from "@tailwindComponents/Elements/Alert";

import { ExtraitsItem } from "@userPages/Extrait/ExtraitsItem";
import { InvoicesItem } from "@userPages/ExtraitInvoice/InvoicesItem";

export function InvoicesList ({ data }) {
    return <div className="list my-4">
        <div className="list-table bg-white rounded-md shadow">
            <div className="items items-invoices">
                <div className="item item-header uppercase text-sm text-gray-600">
                    <div className="item-content">
                        <div className="item-infos">
                            <div className="col-1">Date</div>
                            <div className="col-2">Numéro</div>
                            <div className="col-3">Libellé</div>
                            <div className="col-4">Montant (€)</div>
                            <div className="col-5 actions">Actions</div>
                        </div>
                    </div>
                </div>

                {data.length > 0
                    ? data.map((elem) => {
                        return <InvoicesItem key={elem.id} elem={elem} />;
                    })
                    : <div className="item border-t">
                        <Alert type="gray">Aucun résultat.</Alert>
                    </div>
                }
            </div>
        </div>
    </div>
}

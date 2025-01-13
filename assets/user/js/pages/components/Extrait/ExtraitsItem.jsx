import React from "react";
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min.js';

import Sanitaze from "@commonFunctions/sanitaze";

import { ButtonIconA } from "@tailwindComponents/Elements/Button";

const URL_DOWNLOAD_ELEMENT = "user_download_invoice";

export function ExtraitsItem ({ elem }) {
	return <div className='item border-t hover:bg-slate-50'>
		<div className="item-content">
			<div className="item-infos">
				<div className="col-1">
					{Sanitaze.toDateFormat(elem.writeAt, 'L')}
				</div>
				<div className="col-2">
					{elem.name}
				</div>
				<div className="col-3">
					{elem.letter}
				</div>
				<div className="col-4">
					{Sanitaze.toFormatCurrency(elem.debit, false, 0)}
				</div>
				<div className="col-5">
					{Sanitaze.toFormatCurrency(elem.credit, false, 0)}
				</div>
				<div className="col-6">
					{Sanitaze.toFormatCurrency(elem.solde, false, 0)}
				</div>
				<div className="col-7 actions">
					{elem.file
						? <ButtonIconA type="default" icon="receipt" target="_blank"
									   onClick={Routing.generate(URL_DOWNLOAD_ELEMENT, {id: elem.id})}>
							Facture
						</ButtonIconA>
						: null
					}
				</div>
			</div>
		</div>
	</div>
}

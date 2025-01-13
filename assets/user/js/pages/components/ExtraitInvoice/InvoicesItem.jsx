import React from "react";
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min.js';

import Sanitaze from "@commonFunctions/sanitaze";

import { ButtonA } from "@tailwindComponents/Elements/Button";

const URL_DOWNLOAD_ELEMENT = "user_download_invoice";

export function InvoicesItem ({ elem }) {
	return <div className='item border-t hover:bg-slate-50'>
		<div className="item-content">
			<div className="item-infos">
				<div className="col-1 text-sm 2xl:text-base">
					{Sanitaze.toDateFormat(elem.writeAt, 'L')}
				</div>
				<div className="col-2 text-sm 2xl:text-base">
					{elem.piece}
				</div>
				<div className="col-3 text-sm 2xl:text-base">
					{elem.name}
				</div>
				<div className="col-4 text-sm 2xl:text-base">
					<span className="md:text-sm 2xl:text-base">{Sanitaze.toFormatCurrency(elem.total, false, 0)}</span>
				</div>
				<div className="col-5 actions">
					<ButtonA type="default" iconLeft="vision" target="_blank"
							 onClick={Routing.generate(URL_DOWNLOAD_ELEMENT, { id: elem.id })}>
						Afficher
					</ButtonA>
					<ButtonA type="default" iconLeft="download" target="_blank" download={true}
								 onClick={Routing.generate(URL_DOWNLOAD_ELEMENT, { id: elem.id })}>
						Télécharger
					</ButtonA>
				</div>
			</div>
		</div>
	</div>
}

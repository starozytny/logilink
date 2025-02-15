import React from "react";
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min.js';

import Sanitaze from "@commonFunctions/sanitaze";

import { Badge } from "@tailwindComponents/Elements/Badge";

const URL_DOWNLOAD_ELEMENT = "user_download_invoice_by_extrait";

export function ExtraitsItem ({ elem }) {
	return <div className='item border-t hover:bg-slate-50'>
		<div className="item-content">
			<div className="item-infos">
				<div className="col-1 text-sm 2xl:text-base">
					{Sanitaze.toDateFormat(elem.writeAt, 'L')}
				</div>
				<div className="col-2 text-sm 2xl:text-base">
					{elem.file
						? <a className="cursor-pointer group" target="_blank"
							 href={Routing.generate(URL_DOWNLOAD_ELEMENT, { id: elem.id })}
						>
							<span className="pr-1 2xl:pr-2 group-hover:underline">{elem.piece}</span>
							<span className="icon-link-2 text-blue-500 group-hover:text-blue-700 !text-sm"></span>
						</a>
						: null
					}
				</div>
				<div className="col-3 text-sm 2xl:text-base">
					{elem.name}
				</div>
				<div className="col-4 text-sm 2xl:text-base">
					<Badge type="gray">{elem.letter}</Badge>
				</div>
				<div className="col-5">
					<span className="text-xs text-gray-500">Débit</span>
					<span className="md:text-sm 2xl:text-base">{Sanitaze.toFormatCurrency(elem.debit, false, 0)}</span>
				</div>
				<div className="col-6">
					<span className="text-xs text-gray-500">Crédit</span>
					<span className="md:text-sm 2xl:text-base">{Sanitaze.toFormatCurrency(elem.credit, false, 0)}</span>
				</div>
				<div className="col-7">
					<span className="text-xs text-gray-500">Solde</span>
					<span className="md:text-sm 2xl:text-base">{Sanitaze.toFormatCurrency(elem.solde, false, 0)}</span>
				</div>
			</div>
		</div>
	</div>
}

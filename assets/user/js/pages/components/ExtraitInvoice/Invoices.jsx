import React, { Component } from "react";

import Sort from "@commonFunctions/sort";

import { InvoicesList } from "@userPages/ExtraitInvoice/InvoicesList";

import { Button } from "@tailwindComponents/Elements/Button";
import { LoaderElements } from "@tailwindComponents/Elements/Loader";

export class Invoices extends Component {
	constructor (props) {
		super(props);

		this.state = {
			currentPage: 0,
			sorter: Sort.compareWriteAtInverseThenRangInverse,
			loadingData: true,
			societyActive: '001',
			haveSecondSociety: false
		}
	}

	componentDidMount = () => {
		this.handleGetData(this.state.societyActive);
	}

	handleGetData = (societyActive) => {
		const { donnees } = this.props;
		const { sorter } = this.state;

		let data = [];
		let dataImmuable = [];

		let haveSecondSociety = false;
		JSON.parse(donnees).forEach(item => {
			if(item.codeSociety === societyActive){
				if(item.file){
					data.push(item);
					dataImmuable.push(item);
				}
			}

			if(item.codeSociety === "002" && item.file){
				haveSecondSociety = true;
			}
		})

		if(sorter) data.sort(sorter);
		if(sorter) dataImmuable.sort(sorter);

		this.setState({ data: data, dataImmuable: dataImmuable, haveSecondSociety: haveSecondSociety, loadingData: false })
	}

	handleChangeSocietyActive = (societyActive) => {
		this.setState({ societyActive })
		this.handleGetData(societyActive)
	}

	render () {
		const { data, loadingData, societyActive, haveSecondSociety } = this.state;

		return <>
			{loadingData
				? <LoaderElements />
				: <>
					<div className="mb-2 flex flex-row gap-2">
						<Button type={societyActive === '001' ? 'blue' : 'default'}
								onClick={() => this.handleChangeSocietyActive('001')}>
							Factures LOGILINK
						</Button>
						{haveSecondSociety
							? <Button type={societyActive === '002' ? 'blue' : 'default'}
									  onClick={() => this.handleChangeSocietyActive('002')}>
								Factures 2ILINK
							</Button>
							: null
						}
					</div>

					<InvoicesList data={data} />
				</>
			}
		</>
	}
}

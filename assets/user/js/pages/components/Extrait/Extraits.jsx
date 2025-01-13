import React, { Component } from "react";

import Sort from "@commonFunctions/sort";

import { ExtraitsList } from "@userPages/Extrait/ExtraitsList";

import { Button } from "@tailwindComponents/Elements/Button";
import { LoaderElements } from "@tailwindComponents/Elements/Loader";

export class Extraits extends Component {
	constructor (props) {
		super(props);

		this.state = {
			currentPage: 0,
			sorter: Sort.compareRang,
			loadingData: true,
			societyActive: '001',

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

		let solde = 0;
		JSON.parse(donnees).forEach(item => {
			if(item.codeSociety === societyActive){
				solde = solde - (item.debit ? item.debit : 0) + (item.credit ? item.credit : 0)
				item.solde = solde

				data.push(item);
				dataImmuable.push(item);
			}
		})

		if(sorter) data.sort(sorter);
		if(sorter) dataImmuable.sort(sorter);

		this.setState({ data: data, dataImmuable: dataImmuable, loadingData: false })
	}

	handleChangeSocietyActive = (societyActive) => {
		this.setState({ societyActive })
		this.handleGetData(societyActive)
	}

	render () {
		const { data, loadingData, societyActive } = this.state;

		return <>
			{loadingData
				? <LoaderElements />
				: <>
					<div className="mb-2 flex flex-row gap-2">
						<Button type={societyActive === '001' ? 'blue' : 'default'}
								onClick={() => this.handleChangeSocietyActive('001')}>
							Extrait de compte LOGILINK
						</Button>
						<Button type={societyActive === '002' ? 'blue' : 'default'}
								onClick={() => this.handleChangeSocietyActive('002')}>
							Extrait de compte 2ILINK
						</Button>
					</div>

					<ExtraitsList data={data} />
				</>
			}
		</>
	}
}

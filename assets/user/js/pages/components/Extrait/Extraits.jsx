import React, { Component } from "react";

import Sort from "@commonFunctions/sort";

import { ExtraitsList } from "@userPages/Extrait/ExtraitsList";

import { LoaderElements } from "@tailwindComponents/Elements/Loader";

export class Extraits extends Component {
	constructor (props) {
		super(props);

		this.state = {
			currentPage: 0,
			sorter: Sort.compareRang,
			loadingData: true,
		}
	}

	componentDidMount = () => {
		this.handleGetData();
	}

	handleGetData = () => {
		const { donnees } = this.props;
		const { sorter } = this.state;

		let data = JSON.parse(donnees);
		let dataImmuable = JSON.parse(donnees);

		if(sorter) data.sort(sorter);
		if(sorter) dataImmuable.sort(sorter);

		this.setState({ data: data, dataImmuable: dataImmuable, loadingData: false })
	}

	render () {
		const { data, loadingData } = this.state;

		return <>
			{loadingData
				? <LoaderElements />
				: <>
					<div className="mb-2 flex flex-row">

					</div>

					<ExtraitsList data={data} />
				</>
			}
		</>
	}
}

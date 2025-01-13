import React, { Component } from "react";

import axios from "axios";
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min.js';

import Formulaire from "@commonFunctions/formulaire";
import Sort from "@commonFunctions/sort";
import List from "@commonFunctions/list";

import { Pagination, TopSorterPagination } from "@tailwindComponents/Elements/Pagination";
import { LoaderElements } from "@tailwindComponents/Elements/Loader";
import { Search } from "@tailwindComponents/Elements/Search";

import { ClientsList } from "@adminPages/Donnees/Clients/ClientsList";

const URL_GET_DATA     = "intern_api_data_clients_list";
const URL_TAKE_ACCOUNT = "intern_api_data_clients_take_account";

const SESSION_PERPAGE = "project.perpage.users";

export class Clients extends Component {
    constructor(props) {
        super(props);

        let saveNbPerPage = sessionStorage.getItem(SESSION_PERPAGE);
        let perPage = saveNbPerPage !== null ? parseInt(saveNbPerPage) : 20;

        this.state = {
            perPage: perPage,
            currentPage: 0,
            sorter: Sort.compareName,
            loadingData: true,
        }

        this.pagination = React.createRef();
    }

    componentDidMount = () => { this.handleGetData(); }

    handleGetData = () => {
        const { perPage, sorter } = this.state;

        let url = this.props.urlGetData ? this.props.urlGetData : Routing.generate(URL_GET_DATA);
        List.getData(this, url, perPage, sorter);
    }

    handleUpdateData = (currentData) => { this.setState({ currentData }) }

    handleSearch = (search) => {
        const { perPage, sorter, dataImmuable } = this.state;
        List.search(this, 'client', search, dataImmuable, perPage, sorter)
    }

    handlePaginationClick = (e) => { this.pagination.current.handleClick(e) }

    handleChangeCurrentPage = (currentPage) => { this.setState({ currentPage }); }

    handlePerPage = (perPage) => { List.changePerPage(this, this.state.data, perPage, this.state.sorter, SESSION_PERPAGE); }

    handleTakeAccount = (element) => {
        let self = this;
        axios({ method: "PUT", url: Routing.generate(URL_TAKE_ACCOUNT, {'id': element.id}), data: {} })
            .then(function (response) {
                location.href = response.data.url;
            })
            .catch(function (error) { Formulaire.displayErrors(self, error); })
        ;
    }

    render () {
        const { data, currentData, loadingData, perPage, currentPage } = this.state;

        return <>
            {loadingData
                ? <LoaderElements />
                : <>
                    <div className="toolbar">
                        <div className="col-1">
                            <Search onSearch={this.handleSearch} placeholder="Rechercher pas nom ou code.."/>
                        </div>
                    </div>

                    <TopSorterPagination taille={data.length} currentPage={currentPage} perPage={perPage}
                                         onClick={this.handlePaginationClick}
                                         onPerPage={this.handlePerPage} onSorter={this.handleSorter} />

                    <ClientsList data={currentData}
                                 onTakeAccount={this.handleTakeAccount} />

                    <Pagination ref={this.pagination} items={data} taille={data.length} currentPage={currentPage}
                                perPage={perPage} onUpdate={this.handleUpdateData} onChangeCurrentPage={this.handleChangeCurrentPage}/>
                </>
            }
        </>
    }
}

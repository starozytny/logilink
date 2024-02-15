import React, { Component } from "react";

import axios from "axios";
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min.js';

import Sort from "@commonFunctions/sort";
import Search from "@commonFunctions/search";
import Sanitaze from "@commonFunctions/sanitaze";
import Formulaire from "@commonFunctions/formulaire";

import { LoaderTxt } from "@commonComponents/Elements/Loader";
import { Input } from "@commonComponents/Elements/Fields";
import { Alert } from "@commonComponents/Elements/Alert";
import { ButtonIcon } from "@commonComponents/Elements/Button";

const URL_GET_CLIENTS = "intern_api_data_clients_clients_extraits";
const URL_DOWNLOAD_INVOICE = "user_download_invoice";

export class Extraits extends Component {
    constructor (props) {
        super(props);

        this.state = {
            clients: [],
            extraits: [],
            loadingData: false,
            errors: [],
            clientId: null,
            clientSearch: "",
            clientsSearch: [],
            extraitsClient: [],
        }
    }

    componentDidMount () {
        this.setState({ loadingData: true })

        const self = this;
        axios({ method: "GET", url: Routing.generate(URL_GET_CLIENTS), data: {} })
            .then(function (response) {
                let clients = JSON.parse(response.data.clients);
                let extraits = JSON.parse(response.data.extraits);

                clients.sort(Sort.compareName);

                console.log(extraits);

                self.setState({ clients: clients, clientsSearch: clients, extraits: extraits, loadingData: false })
            })
            .catch(function (error) { Formulaire.displayErrors(self, error); })
        ;
    }

    handleChange = (e) => {
        const { clients } = this.state;

        let name = e.currentTarget.name;
        let value = e.currentTarget.value;

        if(name === "clientSearch"){
            let newData = Search.search('client', clients, value);

            this.setState({ clientsSearch: newData })
        }

        this.setState({ [name]: value })
    }

    handleClickClient = (clientId) => {
        const { extraits } = this.state;

        let id = this.state.clientId !== clientId ? clientId : null;

        let nExtraits = [];
        extraits.forEach(ex => {
            if(ex.client.id === id){
                nExtraits.push(ex);
            }
        })

        this.setState({ clientId: id, extraitsClient: nExtraits })
    }

    render () {
        const { loadingData, clientsSearch, extraitsClient, clientId, clientSearch, errors } = this.state;

        return <div className="page-extrait">
            <div className="col-1">
                <div className="card">
                    <div className="card-header">
                        <div className="card-header-name">
                            Clients
                        </div>
                    </div>
                    <div className="card-body">
                        {loadingData
                            ? <LoaderTxt />
                            : <div className="clients-choices">
                                <Input identifiant="clientSearch" valeur={clientSearch} errors={errors} onChange={this.handleChange}
                                       placeholder="Rechercher par nom ou code.." />
                                <div className="choices">
                                    {clientsSearch.map(cl => {
                                        return <div className={`item${clientId === cl.id ? " active" : ""}`} key={cl.id}
                                                    onClick={() => this.handleClickClient(cl.id)}>
                                            <div className="name">{cl.name}</div>
                                            <div className="code">{cl.code}</div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="col-2">
                <div className="card">
                    <div className="card-header">
                        <div className="card-header-name">
                            Extrait de compte
                        </div>
                    </div>

                    <div className="card-body">
                        {loadingData
                            ? <LoaderTxt />
                            : (clientId
                                ? <div className="list">
                                    <div className="list-table">
                                        <div className="items items-extrait">
                                            <div className="item item-header">
                                                <div className="item-content">
                                                    <div className="item-infos">
                                                        <div className="col-1">Date</div>
                                                        <div className="col-2">Libellé</div>
                                                        <div className="col-3">Lettre</div>
                                                        <div className="col-4">Débit (€)</div>
                                                        <div className="col-5">Crédit (€)</div>
                                                        <div className="col-6">Solde (€)</div>
                                                        <div className="col-7 actions"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            {extraitsClient.length > 0
                                                ? extraitsClient.map(elem => {
                                                    return <ExtraitItem key={elem.id} elem={elem} />
                                                })
                                                : <div className="item">Aucun enregistrement pour le moment.</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                : <Alert type="info">Sélectionnez un client</Alert>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}

function ExtraitItem ({ elem }) {
    return <div className="item">
        <div className="item-content">
            <div className="item-infos">
                <div className="col-1">
                    {Sanitaze.toDateFormat(elem.writeAt, 'L')}
                </div>
                <div className="col-2">{elem.name}</div>
                <div className="col-3">{elem.letter}</div>
                <div className="col-4">
                    <span className="sub">Débit</span>
                    <span>{Sanitaze.toFormatCurrency(elem.debit)}</span>
                </div>
                <div className="col-5">
                    <span className="sub">Crédit</span>
                    <span>{Sanitaze.toFormatCurrency(elem.credit)}</span>
                </div>
                <div className="col-6">
                    <span className="sub">Solde</span>
                    <span>{Sanitaze.toFormatCurrency(elem.credit)}</span>
                </div>
                <div className="col-7 actions">
                    <ButtonIcon icon="receipt" outline={true} element="a" target="_blank"
                                onClick={Routing.generate(URL_DOWNLOAD_INVOICE, { 'id': elem.id })}>
                        Facture
                    </ButtonIcon>
                </div>
            </div>
        </div>
    </div>
}

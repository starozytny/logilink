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
import { Button, ButtonIcon } from "@commonComponents/Elements/Button";

const URL_GET_CLIENTS = "intern_api_data_clients_clients_extraits";
const URL_DOWNLOAD_INVOICE = "user_download_invoice";

export class Extraits extends Component {
    constructor (props) {
        super(props);

        this.state = {
            clients: [],
            extraits1: [],
            loadingData: false,
            errors: [],
            clientId: null,
            clientSearch: "",
            clientsSearch: [],
            extraits1Client: [],
            extraits2Client: [],
            extraitActive: "logilink"
        }
    }

    componentDidMount () {
        this.setState({ loadingData: true })

        const self = this;
        axios({ method: "GET", url: Routing.generate(URL_GET_CLIENTS), data: {} })
            .then(function (response) {
                let clients = JSON.parse(response.data.clients);
                let extraits1 = JSON.parse(response.data.extraits1);
                let extraits2 = JSON.parse(response.data.extraits2);

                clients.sort(Sort.compareName);

                self.setState({ clients: clients, clientsSearch: clients, extraits1: extraits1, extraits2: extraits2, loadingData: false })
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
        const { extraits1, extraits2 } = this.state;

        let id = this.state.clientId !== clientId ? clientId : null;

        let nExtraits1 = [], nExtraits2 = [];
        extraits1.forEach(ex => {
            if(ex.client.id === id){
                nExtraits1.push(ex);
            }
        })
        extraits2.forEach(ex => {
            if(ex.client.id === id){
                nExtraits2.push(ex);
            }
        })

        let extraitActive = nExtraits1.length > 0 ? "logilink" : "2ilink";

        this.setState({ clientId: id, extraits1Client: nExtraits1, extraits2Client: nExtraits2, extraitActive })
    }

    handleClickExtrait = (extraitActive) => { this.setState({ extraitActive }) }

    render () {
        const { loadingData, clientsSearch, extraits1Client, extraits2Client, clientId, clientSearch, errors, extraitActive } = this.state;

        let solde = 0;

        let extraits = extraitActive === "logilink" ? extraits1Client : extraits2Client;

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
                                ? <>
                                    <div className="card-extrait-actions">
                                        <Button type="primary" outline={extraitActive !== "logilink"}
                                                onClick={() => this.handleClickExtrait('logilink')}>
                                            Extrait Logilink
                                        </Button>
                                        <Button type="primary" outline={extraitActive !== "2ilink"}
                                                onClick={() => this.handleClickExtrait('2ilink')}>
                                            Extrait 2ilink
                                        </Button>
                                    </div>
                                    <div className="list">
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
                                                {extraits.length > 0
                                                    ? extraits.map(elem => {
                                                        solde = solde - (elem.debit) + (elem.credit);

                                                        return <ExtraitItem key={elem.id} solde={solde} elem={elem} />
                                                    })
                                                    : <div className="item">Aucun enregistrement pour le moment.</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : <Alert type="info">Sélectionnez un client</Alert>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}

function ExtraitItem ({ elem, solde }) {
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
                    <span>{Sanitaze.toFormatCurrency(solde)}</span>
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

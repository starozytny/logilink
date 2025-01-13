import React, { Component } from "react";

import axios from "axios";
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min.js';

import Sort from "@commonFunctions/sort";
import Search from "@commonFunctions/search";
import Sanitaze from "@commonFunctions/sanitaze";
import Formulaire from "@commonFunctions/formulaire";

import { Alert } from "@tailwindComponents/Elements/Alert";
import { Input } from "@tailwindComponents/Elements/Fields";
import { LoaderElements } from "@tailwindComponents/Elements/Loader";
import { Button, ButtonA, ButtonIcon, ButtonIconA } from "@tailwindComponents/Elements/Button";

const URL_GET_CLIENTS = "intern_api_data_clients_clients_extraits";
const URL_CALL_FTP = "intern_api_data_clients_ftp";
const URL_DOWNLOAD_INVOICE = "user_download_invoice_by_extrait";

export class Extraits extends Component {
    constructor (props) {
        super(props);

        this.state = {
            clients: [],
            extraits1: [],
            extraits2: [],
            loadingData: false,
            errors: [],
            clientId: null,
            clientSearch: "",
            clientsSearch: [],
            extraits1Client: [],
            extraits2Client: [],
            extraitActive: "001"
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

        let extraitActive = nExtraits1.length > 0 ? "001" : "002";

        this.setState({ clientId: id, extraits1Client: nExtraits1, extraits2Client: nExtraits2, extraitActive })
    }

    handleClickExtrait = (extraitActive) => { this.setState({ extraitActive }) }

    render () {
        const { loadingData, clientsSearch, extraits1Client, extraits2Client, clientId, clientSearch, errors, extraitActive } = this.state;

        let solde = 0;

        let extraits = extraitActive === "001" ? extraits1Client : extraits2Client;

        return <div className="flex flex-col gap-4 xl:grid xl:grid-cols-4">
            <div className="flex flex-col-reverse gap-4 xl:flex-col">
                <div className="bg-white p-4 rounded-md border">
                    <div className="text-lg font-semibold pb-2 mb-2 border-b">
                        Sélectionner un client
                    </div>
                    <div>
                        {loadingData
                            ? <LoaderElements />
                            : <div>
                                <Input identifiant="clientSearch" valeur={clientSearch} errors={errors} onChange={this.handleChange}
                                       placeholder="Rechercher par nom ou code.." />
                                <div className="overflow-y-auto max-h-96 border rounded-md border-t-none mt-1">
                                    {clientsSearch.map(cl => {
                                        return <div className={`p-2 cursor-pointer ${clientId === cl.id ? "bg-blue-700 text-slate-50" : "hover:bg-gray-50"}`} key={cl.id}
                                                    onClick={() => this.handleClickClient(cl.id)}>
                                            <div className="font-medium">{cl.name}</div>
                                            <div className="text-sm">{cl.code}</div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <ButtonA type="default" onClick={Routing.generate(URL_CALL_FTP)} width="w-full text-center">Synchro manuellement les données FTP</ButtonA>
                </div>
            </div>
            <div className="xl:col-span-3">
                <div className="bg-white rounded-md border">
                    <div className="text-lg font-semibold px-4 pt-4 pb-2 border-b">
                        Extrait de compte du client sélectionné
                    </div>
                    <div>
                        {loadingData
                            ? <div className="p-4"><LoaderElements /></div>
                            : (clientId
                                ? <>
                                    <div className="flex gap-1 p-4">
                                        <Button type={extraitActive === '001' ? 'blue' : 'default'}
                                                onClick={() => this.handleClickExtrait('001')}>
                                            Extrait de compte LOGILINK
                                        </Button>
                                        <Button type={extraitActive === '002' ? 'blue' : 'default'}
                                                onClick={() => this.handleClickExtrait('002')}>
                                            Extrait de compte 2ILINK
                                        </Button>
                                    </div>
                                    <div className="list">
                                        <div className="list-table bg-white rounded-md shadow">
                                            <div className="items items-extrait">
                                                <div className="item item-header uppercase text-sm border-y bg-gray-100 text-gray-600">
                                                    <div className="item-content">
                                                        <div className="item-infos">
                                                            <div className="col-1">Date</div>
                                                            <div className="col-2">Pièce</div>
                                                            <div className="col-3">Libellé</div>
                                                            <div className="col-4"><span className="xl:hidden">Let.</span><span className="hidden xl:inline">Lettre</span></div>
                                                            <div className="col-5">Débit (€)</div>
                                                            <div className="col-6">Crédit (€)</div>
                                                            <div className="col-7">Solde (€)</div>
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
                                : <div className="p-4">
                                    <Alert type="gray">Sélectionnez un client en cliquant dessus</Alert>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}

function ExtraitItem ({ elem, solde }) {
    return <div className="item border-t hover:bg-slate-50">
        <div className="item-content">
            <div className="item-infos">
                <div className="col-1 text-sm 2xl:text-base">
                    {Sanitaze.toDateFormat(elem.writeAt, 'L')}
                </div>
                <div className="col-2 text-sm 2xl:text-base">
                    {elem.file
                        ? <a className="cursor-pointer group" target="_blank"
                             href={Routing.generate(URL_DOWNLOAD_INVOICE, { id: elem.id })}
                        >
                            <span className="pr-1 group-hover:underline">{elem.piece}</span>
                            <span className="icon-link-2 text-blue-500 group-hover:text-blue-700"></span>
                        </a>
                        : null
                    }
                </div>
                <div className="col-3 text-sm 2xl:text-base">
                    {elem.name}
                </div>
                <div className="col-4 text-sm 2xl:text-base">
                    {elem.letter}
                </div>
                <div className="col-5 flex flex-col">
                    <span className="text-xs text-gray-500">Débit</span>
                    <span className="md:text-sm 2xl:text-base">{Sanitaze.toFormatCurrency(elem.debit, false, 0)}</span>
                </div>
                <div className="col-6 flex flex-col">
                    <span className="text-xs text-gray-500">Crédit</span>
                    <span className="md:text-sm 2xl:text-base">{Sanitaze.toFormatCurrency(elem.credit, false, 0)}</span>
                </div>
                <div className="col-7 flex flex-col">
                    <span className="text-xs text-gray-500">Solde</span>
                    <span className="md:text-sm 2xl:text-base">{Sanitaze.toFormatCurrency(solde, false, 0)}</span>
                </div>
            </div>
        </div>
    </div>
}

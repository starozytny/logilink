import React, { Component, useState } from 'react';
import PropTypes from "prop-types";

import axios from "axios";
import Routing from '@publicFolder/bundles/fosjsrouting/js/router.min.js';

import Formulaire from "@commonFunctions/formulaire";
import Sanitaze from "@commonFunctions/sanitaze";

import { LoaderTxt } from "@commonComponents/Elements/Loader";

const URL_DIRECTORIES = "intern_api_storage_directories";
const URL_DOWNLOAD_FILE = "intern_api_storage_download";

export class StorageAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            directories: [],
            rootFiles: [],
            loadData: false
        }
    }

    componentDidMount = () => {
        const { loadData } = this.state;

        if(!loadData){
            this.setState({ loadData: true })

            let self = this;
            axios({ method: "GET", url: Routing.generate(URL_DIRECTORIES), data: {} })
                .then(function (response) {
                    let data = response.data;
                    self.setState({
                        directories: JSON.parse(data.directories),
                        rootFiles: JSON.parse(data.rootFiles),
                        loadData: false
                    })
                })
                .catch(function (error) { Formulaire.displayErrors(self, error); })
            ;
        }
    }

    render () {
        const { loadData, directories, rootFiles } = this.state;

        return <div className="storage">
            <div className="directories">
                {loadData
                    ? <LoaderTxt />
                    : (directories.map((dir, index) => {
                        return <Directory elem={dir} key={index} />
                    }))
                }
                {loadData
                    ? <LoaderTxt />
                    : rootFiles && rootFiles.length > 0
                        ? <div className="directory">
                            <div className="directory-header">
                                <div className="icon">
                                    <span className="icon-minus" />
                                </div>
                                <div className="name">RACINE</div>
                            </div>
                            <div className="directory-body active">
                                <div className="files">
                                    {rootFiles.map((elem, index) => {
                                        return <File elem={elem} directory="install-windev.logilink.fr" deep={0} key={index} />;
                                    })}
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>
    }
}

function Directory ({ elem }) {
    let [active, setActive] = useState(false)

    return <div className={`directory${active ? " active" : ""}`}>
        <div className="directory-header" onClick={() => setActive(!active)}>
            <div className="icon">
                <span className="icon-folder" />
            </div>
            <div className="name">{elem.name} {!elem.files && !elem.children ? <i className="sub">(vide)</i> : ""}</div>
        </div>
        <div className={`directory-body${active ? " active" : ""}`}>
            <div className="files">
                {elem.files
                    ? elem.files.map((file, index) => {
                        return <File elem={file} directory={elem.path} deep={elem.deep} key={index} />
                    })
                    : (elem.children
                        ? null
                        : <div className="file">
                            <div className="sub">Aucun fichier dans ce dossier.</div>
                        </div>
                    )
                }
            </div>
            {elem.children && elem.children.map((dir, index) => {
                return <Directory elem={dir} key={index} />
            })}
        </div>
    </div>
}

function File ({ elem, directory, deep }) {
    let [loadData, setLoadData] = useState(false)
    let [icon, setIcon] = useState(elem.icon)

    let handleDownload = (e) => {
        e.preventDefault();
        let self = this;

        if (!loadData) {
            setLoadData(true);
            setIcon("chart-3");

            let tab = directory.split("/");
            let dir = tab[tab.length - 1];
            axios({
                method: "GET",
                url: Routing.generate(URL_DOWNLOAD_FILE, {'admin': true, 'deep': deep, 'dir': dir === ".." ? "racine" : dir, 'filename': elem.name}),
                data: {}
            })
                .then(function (response){
                    const link = document.createElement('a');
                    link.href = response.data.url;
                    link.setAttribute('download', elem.name);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    setLoadData(false);
                })
                .catch(function (error) { Formulaire.displayErrors(self, error); })
                .then(function () { setIcon(elem.icon); })
            ;
        }
    }

    return <div className="file">
        <div className="col-1">
            <div className="name" onClick={handleDownload}>
                <span className={"icon-" + icon} />
                <span>{elem.name}</span>
            </div>
        </div>
        <div className="col-2">
            <div className="sub">{Sanitaze.toDateFormat(new Date(elem.dateAt.date), 'L LT', "", false)}</div>
        </div>
        <div className="col-3">
            <div className="sub">{Sanitaze.toFormatBytesToSize(elem.size)}</div>
        </div>
    </div>
}

File.propTypes = {
    elem: PropTypes.object.isRequired,
    directory: PropTypes.string.isRequired
}

import React from "react";
import PropTypes from 'prop-types';

import { ButtonIcon } from "@commonComponents/Elements/Button";

export function ClientsItem ({ elem, onTakeAccount }) {
    return <div className="item">
        <div className="item-content">
            <div className="item-infos">
                <div className="col-1">
                    <div className="infos">
                        <div className="name">
                            <span>{elem.name}</span>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div>{elem.code}</div>
                </div>
                <div className="col-3">
                    <div>{elem.numero}</div>
                </div>
                <div className="col-4 actions">
                    <ButtonIcon outline={true} icon="arrow-swap-horizontal" tooltipWidth={130}
                                onClick={() => onTakeAccount(elem)}>
                        Prendre son espace
                    </ButtonIcon>
                </div>
            </div>
        </div>
    </div>
}

ClientsItem.propTypes = {
    elem: PropTypes.object.isRequired,
    onTakeAccount: PropTypes.func.isRequired,
}

import React, { useRef } from "react";
import { createPortal } from "react-dom";

import { Modal } from "@commonComponents/Elements/Modal";

export function Recrutement () {
	const refModal = useRef(null);

	return <div>
		<div className="address">

		</div>
		<div className="cta">
			<div className="btn btn-color2" onClick={() => { refModal.current.handleClick(); }}>Postes disponibles</div>
		</div>
		{createPortal(<Modal ref={refModal} identifiant='recrutement-modal' maxWidth={1024} margin={5} title="Postes disponibles"
							 content={<div>
								 LOGILINK est à la recherche d’un(e) développeur WinDev H/F à temps plein pour étoffer
								 son équipe de développement logiciel.
								 <br/><br/>

								 <span className="semibold">Vos missions :</span>
								 <ul>
									 <li>Développer de nouvelles fonctionnalités sur les logiciels métiers existants.</li>
									 <li>En assurer la maintenance, le suivi.</li>
									 <li>Proposer des solutions techniques anticipant ou répondant aux attentes de la clientèle.</li>
								 </ul>


								 <span className="semibold">Votre proﬁl :</span>
								 <ul>
									 <li>Formé au langage WinDev, vous avez une première expérience dans le développement de logiciel métier</li>
									 <li>Vous faîtes preuve d’ouverture pour travailler en équipe, et d’autonomie pour remplir vos objectifs de travail.</li>
									 <li>Vous êtes attaché à la notion de service, et attentif aux retours des clients.</li>
								 </ul>

								 <span className="semibold">Modalités :</span>
								 <ul>
									 <li>CDI à temps plein</li>
									 <li>Poste à pourvoir dès que possible</li>
								 </ul>
							 </div>}
							 footer={null}
		/>, document.body)}
	</div>
}

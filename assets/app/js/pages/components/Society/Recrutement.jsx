import React, { useRef } from "react";
import { createPortal } from "react-dom";

import { Modal } from "@commonComponents/Elements/Modal";

export function Recrutement () {
	const refModal = useRef(null);

	return <div>
		<div className="cta">
			<div className="btn btn-color2" onClick={() => { refModal.current.handleClick(); }}>Postes disponibles</div>
		</div>
		{createPortal(<Modal ref={refModal} identifiant='recrutement-modal' maxWidth={1024} margin={5} title="Postes disponibles"
							 content={<div>
								 Nous recherchons un(e) développeur(se) WinDev H/F à temps plein pour poursuivre le
								 développement de notre département IA.
								 <br/><br/>

								 <span className="semibold">Vos missions :</span>
								 <ul>
									 <li>Concevoir et développer de nouvelles fonctionnalités pour nos logiciels métiers.</li>
									 <li>Assurer la maintenance et le suivi des logiciels existants.</li>
									 <li>Proposer des solutions techniques innovantes pour répondre aux besoins de nos clients.</li>
								 </ul>

								 <span className="semibold">Votre proﬁl :</span>
								 <ul>
									 <li>Vous maîtrisez le langage WinDev et avez une première expérience en développement
										 de logiciels métiers. Une expérience dans le domaine de l’IA est souhaitée
										 ainsi que des connaissances en Python.</li>
									 <li>Vous êtes ouvert(e) au travail en équipe et capable de travailler de manière
										 autonome pour atteindre vos objectifs.</li>
									 <li>Vous êtes orienté(e) service client et attentif(ve) aux retours des utilisateurs.</li>
								 </ul>

								 <span className="semibold">Modalités :</span>
								 <ul>
									 <li>CDI à temps plein</li>
									 <li>Poste à pourvoir dès que possible</li>
								 </ul>
								 <br/><br/>
								 Rejoignez une entreprise dynamique et innovante où votre expertise en WinDev sera valorisée.
								 Envoyez-nous votre candidature dès aujourd'hui !
							 </div>}
							 footer={null}
		/>, document.body)}
	</div>
}

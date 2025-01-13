import React, { Component } from "react";

import axios from "axios";
import Routing from "@publicFolder/bundles/fosjsrouting/js/router.min";

import Toastr from "@tailwindFunctions/toastr";
import Validateur from "@commonFunctions/validateur";
import Formulaire from "@commonFunctions/formulaire";

import { Button } from "@commonComponents/Elements/Button";
import { Alert } from "@commonComponents/Elements/Alert";
import { Input, TextArea } from "@commonComponents/Elements/Fields";

const URL_CREATE_ELEMENT = "intern_api_contacts_create";

export class ContactFormulaire extends Component {
	constructor (props) {
		super(props);

		this.state = {
			errors: [],
			success: null,
			critere: "",
			name: "",
			email: "",
			message: ""
		}
	}

	handleChange = (e) => {
		this.setState({ [e.currentTarget.name]: e.currentTarget.value })
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const { critere, name, email, message } = this.state;

		this.setState({ errors: [], success: false })

		if (critere !== "") {
			Toastr.toast('error', "Veuillez rafraichir la page.");
		} else {

			let validate = Validateur.validateur([
				{ type: "text", id: 'name', value: name },
				{ type: "text", id: 'email', value: email },
				{ type: "text", id: 'message', value: message },
			])

			if (!validate.code) {
				this.setState({ errors: validate.errors });
				Toastr.toast('warning', "Veuillez vérifier que tous les champs obligatoires soient renseignés.");
			} else {
				Formulaire.loader(true);
				let self = this;
				axios.post(Routing.generate(URL_CREATE_ELEMENT), self.state)
					.then(function (response) {
						let data = response.data;
						self.setState({
							name: "",
							email: "",
							message: "",
							errors: [],
							success: data.message
						})
					})
					.catch(function (error) {
						Formulaire.displayErrors(self, error);
					})
					.then(() => {
						Formulaire.loader(false);
					})
				;
			}
		}
	}

	render () {
		const { errors, success, critere, name, email, message } = this.state;

		let params0 = { errors: errors, onChange: this.handleChange };

        return <>
			<form onSubmit={this.handleSubmit}>

				{success && <div><Alert type="blue" icon="check1">{success}</Alert></div>}

				<div className="line line-2">
					<Input identifiant="name" valeur={name} {...params0}>Nom/Prénom</Input>
					<Input identifiant="email" valeur={email} type="email" {...params0}>Adresse e-mail</Input>
				</div>
				<div className="line-critere">
					<Input type="hidden" identifiant="critere" valeur={critere} {...params0}>Critère</Input>
				</div>
				<div className="line line-fat-box">
					<TextArea identifiant="message" valeur={message} {...params0}>Message</TextArea>
				</div>

				<div className="mt-4">
					<Alert type="info">
						<div>
							Les données à caractère personnel collectées dans ce formulaire sont enregistrées dans un fichier
							informatisé permettant la gestion des demandes de contacts. <br />
							En validant ce formulaire, vous consentez à nous transmettre vos données pour traiter votre demande
							et vous recontacter si besoin.
							<br />
							Plus d'informations sur le traitement de vos données dans
							notre <a target="_blank" href={Routing.generate('app_politique')}>politique de confidentialité</a>.
						</div>
					</Alert>
				</div>

				<div className="line-buttons">
					<Button type="primary" isSubmit={true}>Envoyer le message</Button>
				</div>
			</form>
		</>
	}
}

import React, { Component } from "react";

import axios from "axios";
import Routing from "@publicFolder/bundles/fosjsrouting/js/router.min";

import Toastr from "@tailwindFunctions/toastr";
import Validateur from "@commonFunctions/validateur";
import Formulaire from "@commonFunctions/formulaire";

import { Alert } from "@commonComponents/Elements/Alert";
import { Button } from "@commonComponents/Elements/Button";
import { Input, Select, TextArea } from "@commonComponents/Elements/Fields";

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
			phone: "",
			subject: "Projet",
			message: "",
		}
	}

	handleChange = (e) => {
		let name = e.currentTarget.name;
		let value = e.currentTarget.value;

		if(name === "phone"){
			if(value !== "" && value.length >= 17){
				value = this.state[name];
			}
		}

		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const { critere, name, email, phone, subject, message } = this.state;

		this.setState({ errors: [], success: false })

		if (critere !== "") {
			Toastr.toast('error', "Veuillez rafraichir la page.");
		} else {

			let validate = Validateur.validateur([
				{ type: "text", id: 'name', value: name },
				{ type: "atLeastOne", id: 'email', value: email, valueCheck: phone, message: "Au moins un email ou téléphone doit être renseigné." },
				{ type: "text", id: 'message', value: message },
				{ type: "text", id: 'subject', value: subject },
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
							phone: "",
							subject: "",
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
		const { errors, success, critere, name, email, phone, subject, message } = this.state;

		let params0 = { errors: errors, onChange: this.handleChange };

		let subjectsItems = [
			{ value: "Projet", label: 'Projet', identifiant: 'projet' },
			{ value: "Candidature", label: 'Candidature', identifiant: 'candidature' },
			{ value: "Informations", label: 'Informations', identifiant: 'informations' },
			{ value: "Autres", label: 'Autres', identifiant: 'autres' },
		]

        return <>
			<form onSubmit={this.handleSubmit}>

				{success && <div style={{marginBottom: '12px'}}><Alert type="info" icon="check1">{success}</Alert></div>}

				<div className="line">
					<Input identifiant="name" valeur={name} {...params0}>Nom/Prénom - Raison sociale</Input>
				</div>
				<div className="line line-2">
					<Input identifiant="email" valeur={email} type="email" {...params0}>Adresse e-mail</Input>
					<Input identifiant="phone" valeur={phone} {...params0}>Téléphone</Input>
				</div>
				<div className="line-critere">
					<Input type="hidden" identifiant="critere" valeur={critere} {...params0}>Critère</Input>
				</div>
				<div className="line">
					<Select items={subjectsItems} identifiant="subject" valeur={subject} {...params0} noEmpty={true}>Objet de votre message</Select>
				</div>
				<div className="line line-fat-box">
					<TextArea identifiant="message" valeur={message} {...params0}>Message</TextArea>
				</div>

				<div className="mt-4">
					<Alert type="info">
						Les données à caractère personnel collectées dans ce formulaire sont enregistrées dans un fichier
						informatisé permettant la gestion des demandes de contacts. <br />
						En validant ce formulaire, vous consentez à nous transmettre vos données pour traiter votre demande
						et vous recontacter si besoin.
						<br />
						Plus d'informations sur le traitement de vos données dans
						notre <a target="_blank" href={Routing.generate('app_politique')}>politique de confidentialité</a>.
					</Alert>
				</div>

				<div className="line-buttons">
					<Button type="primary" isSubmit={true}>Envoyer le message</Button>
				</div>
			</form>
		</>
	}
}

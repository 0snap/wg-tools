import React, { Component } from 'react';

import './StaticPages.scss';

export default class AboutPage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='container-fluid'>
				<div className='container__header'>
					<h1>WG-Tools</h1>
				</div>
				<div className='staticPage__content'>
					<h3 className='staticPage__content__headline'>Kurzüberblick</h3>
					<p className='staticPage__content__text'>
						WG-Tools ist eine App zum Verwalten von Ausgaben in einer WG. Man registriert sich als WG und teilt die Zugangsdaten mit den Mitbewohnern.
						Jeder ist berechtigt jede Funktion zu nutzen &ndash; es gibt keinen 'Admin'.
					</p>
					<h3 className='staticPage__content__headline'>Registrierung und Sicherheit</h3>
					<p className='staticPage__content__text'>
						Man kann sich kostenlos registrieren solange der Name noch nicht vergeben ist. Es werden keine privaten Informationen abgefragt.
						Die Verbindung ist mit SSL gesichert, das Zertifikat stammt von den freundlichen <a target='_blank' href='https://letsencrypt.org/'>letsencrypt</a> Leuten. Das Passwort liegt natürlich in unleserlicher Form in der Datenbank, es ist nicht für niemanden sichtbar. 
						Der Login ist mit <a href='https://jwt.io/' target='_blank'>json Web Tokens</a> umgesetzt.
						Wenn du dich dafür interessierst, wie die App gebaut ist, schau gern auf meinen <a href='https://github.com/0ortmann/wg-tools' target='_blank'>github</a> Account.
					</p>
					<h3 className='staticPage__content__headline'>Benutzung</h3>
					<p className='staticPage__content__text'>
						Nachdem man sich registriert und angemeldet hat, muss man zunächst eine neue Liste anlegen (z.B. eine Liste für den aktuellen Monat oder für eine Reise etc.). Anschließend kann man in dieser
						Liste Ausgaben hinzufügen. Man kann z.B. nach jedem Einkauf für die WG einen Eintrag mit dem Einkaufspreis anlegen.
						WG-Tools zeigt die Ausgaben in einem farbigen Graphen. Pro Liste haben die Namen eine neue zufällige Farbe, damit es nicht langweilig wird.
					</p>
					<p className='staticPage__content__text'>
						Aus all den Ausgaben, die getätigt wurden, errechnet WG-Tools wer wem wie viel Kohle zurückzahlen muss. Wenn man eine Liste beglichen hat, kann man sie sperren. Anschließend sind keine Änderungen mehr möglich.
					</p>
					<h3 className='staticPage__content__headline'>Warum?</h3>
					<p className='staticPage__content__text'>
						Weil ich Bock drauf hab.
					</p>
					<p className='staticPage__content__text'>
						In meiner WG hab ich schon länger darüber nachgedacht, dass ich ein einfaches Web Tools haben will, um auf einen Blick und unkompliziert den Finanzkram zu machen. Es gibt viele tolle Dinge da draussen, aber ich hab mehr Lust auf Basteln als auf Benutzen.
						Geplant sind noch viele weitere Features! Schau mal auf meinen <a href='https://github.com/0ortmann/wg-tools' target='_blank'>github</a> Account, dort liegt der Quellcode und vieles andere. Im Readme findest du auch meine weiteren Pläne für diese App &mdash; sie wächst noch! ;)
					</p>
					<h3 className='staticPage__content__headline'>Über mich</h3>
					<p className='staticPage__content__text'>
						Ich bin Felix / Fixel, 24 Jahre alt und Hamburger Jung. Bescheuerte Homepage: <a href='https://fixel.express' target='_blank'>fixel.express</a>
					</p>
				</div>
			</div>
		);
	}
}
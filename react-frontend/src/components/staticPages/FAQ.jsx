import React, { Component } from 'react';
import AppHeader from '../header/AppHeader.jsx';
import FAQItem from './FAQItem.jsx';
import { Link } from 'react-router';

import './StaticPages.scss';
export default class FAQ extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='staticPage'>
                <AppHeader />
                <div className='container-fluid'>
                    <div className='container__header'>
                        <h1>FAQ</h1>
                    </div>
                    <div className='staticPage__content'>
                        <FAQItem iconClasses='fa fa-usd' question='Ist WG-Tools kostenlos?' answer='Ja!' />
                        <FAQItem iconClasses='fa fa-thumbs-o-up' question='Ist WG-Tools open source?' 
                            answer='Ja, das komplette Projekt findest du bei <a href="https://github.com/0ortmann/wg-tools" target="_blank">github</a>.' />
                        <FAQItem iconClasses='fa fa-github' question='Kann ich dazu beitragen?' 
                            answer='Sehr gern! Das komplette Projekt findest du bei <a href="https://github.com/0ortmann/wg-tools" target="_blank">github</a>.' />
                        <FAQItem iconClasses='fa fa-balance-scale' question='Kann ich WG-Tools selber hosten?' 
                            answer='Ja, du findest fertige Docker Images bei <a href="https://hub.docker.com/r/fixel/wg-tools/" target="_blank">dockerhub</a> und das Projekt findest du bei <a href="https://github.com/0ortmann/wg-tools" target="_blank">github</a>.' />
                        <FAQItem iconClasses='fa fa-calculator' question='Was tut WG-Tools?' 
                            answer='Es übernimmt das Ausrechnen wer wem wie viel Geld geben muss, wenn man gemeinsame Ausgaben hat.' />
                        <FAQItem iconClasses='fa fa-user-secret' question='Wer bist du?' answer='Felix, <a href="https://fixel.express" target="_blank">fixel.express</a>' />
                        <FAQItem iconClasses='fa fa-question-circle-o' question='Warum gibts WG-Tools?' answer='Weil es das so noch nicht gibt.' />

                    </div>
                </div>
            </div>);
    }
}
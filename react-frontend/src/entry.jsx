import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App.jsx';


// TODO: fixme!
let wgName = 'mett'
render(<App wg={wgName}/>, document.getElementById('content'));
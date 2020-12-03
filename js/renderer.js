// Modules
import {html, render} from '../lit-html/lit-html.js' // Import lit-html

// Constants
const $textID = 'text';
const $fileID = 'file';
const $keyGenID = 'keygen';
const $RSA_ID = 'RSA';

// App bar actions
const minimise = {
    handleEvent() {
        window.winCtl.min();
    },
    capture: true
};
const maximise = {
    handleEvent() {
        window.winCtl.max();
    },
    capture: true
};
const close = {
    handleEvent() {
        window.winCtl.close();
    },
    capture: true
};

const keyGenInflate = {
    handleEvent() {
        renderTab(keyGen, $keyGenID, 'Keyfile generation');
    },
    capture: true
}
const textInflate = {
    handleEvent() {
        renderTab(text, $textID, 'Text cryptography');
    },
    capture: true
}
const fileInflate = {
    handleEvent() {
        renderTab(file, $fileID, 'File cryptography');
    },
    capture: true
}
const RSAInflate = {
    handleEvent() {
        renderTab(RSA, $RSA_ID, 'RSA cryptography');
    },
    capture: true
}

// Utility functions
const $ = (id) => document.getElementById(id);
const q = (selector) => document.querySelector(selector);
const store = (key, data) => localStorage.setItem(key, data);
const get   = (key) => localStorage.getItem(key);
const clrActive = () => {
    document.querySelectorAll('.titleBar .titleTabs button').forEach(element => {
        element.classList.remove('active');
    });
}
const renderTab = (tabRenderer, tabID, longName) => {
    q('.titleBar .windowTitle small').textContent = longName;
    render(tabRenderer(), $('main'));
    store('lastTab', tabID);
    clrActive();
    $(tabID).classList.add('active');
}

// Page template
const page = () => html`
    <div class="titleBar">
        <div class="buttonHolder">
            <button aria-label="Close" class="close" @click=${close}></button>
            <button aria-label="Minimise" class="minimise" @click=${minimise}></button>
            <button aria-label="Maximise" class="maximise" @click=${maximise}></button>
        </div>
        <div class="windowTitle">
            <p>CryptoAlgo</p>
            <small>Loading...</small>
        </div>
        <div class="titleTabs">
            <button @click=${keyGenInflate} id="${$keyGenID}">Keys</button>
            <button @click=${textInflate} id="${$textID}">Text</button>
            <button @click=${fileInflate} id="${$fileID}">File</button>
            <button @click=${RSAInflate} id="${$RSA_ID}">RSA</button>
        </div>
        <div class="titleActions">
            
        </div>
    </div>
    <div class="content">
        <main id="main">
        </main>
    </div>
`;

// AES/RSA key generation
const keyGen = () => html`
    <div class="mount">
        <h2>AES/RSA Key Generation</h2>
    </div>
`;
// Text enc/dec stub
const text = () => html`
    <div class="mount">
        <h2>Text Encryption/Decryption</h2>
        <div class="step step-1">
            
        </div>
    </div>
`;
// File stub
const file = () => html`
    <div class="mount">
        <h2>File Encryption/Decryption</h2>
    </div>
`;
// RSA stub
const RSA = () => html`
    <div class="mount">
        <h2>Encrypt/Decrypt AES Keyfiles With RSA</h2>
    </div>
`;


// Render the template to the document
render(page(), document.body); // Initial render

// Then search for the last used tab
const lastTab = get('lastTab');
switch (lastTab) {
    case $textID:
        textInflate.handleEvent();
        break;
    case $fileID:
        fileInflate.handleEvent();
        break;
    case $RSA_ID:
        RSAInflate.handleEvent();
        break;
    case $keyGenID:
        keyGenInflate.handleEvent();
        break;
    default:
        keyGenInflate.handleEvent();
}
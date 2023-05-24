import { DOMMessage, DOMMessageResponse } from '../types';

function fetchTranslate(lang: string, text: string, callback: (ret: boolean, data: any) => void) {
    fetch(`https://dev.nuxui.com/translate/${lang}/${text}`)
        .then(function (response) {
            console.log("bg response: ", response);
            return response.json();
        })
        .then(function (data) {
            console.log("bg data: ", data);
            if (callback != null) { callback(true, data) }
        })
        .catch(function (error) {
            console.log(error);
            if (callback != null) { callback(false, error) }
        });
}

const messagesFromReactAppListener = (
    msg: DOMMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: DOMMessageResponse) => void) => {

    switch (msg.event) {
        case 'translate':
            fetchTranslate(msg.lang, msg.text, (ret, data) => {
                console.log('sendResponse: ', ret, data)
                sendResponse({ success: ret, data: data })
            })
            break;
    }

    return true;
}


chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

chrome.runtime.onInstalled.addListener((details) => {
    console.log("onInstalled react app");
});
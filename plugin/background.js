function fetchTranslate(lang, text, callback){
    fetch(`https://dev.nuxui.com/translate/${lang}/${text}`)
    .then(function (response) {
      console.log("bg response: ", response);
      return response.json();
    })
    .then(function (data) {
      console.log("bg data: ", data);
      if(callback != null){callback(true, data)}
    })
    .catch(function (error) {
      console.log(error);
      if(callback != null){callback(false, error)}
    });
}

chrome.runtime.onInstalled.addListener((details) => {
  console.log("onInstalled");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch(message.event){
    case 'translate':
        fetchTranslate(message.lang, message.text, (ret, data)=>{
            console.log('sendResponse: ',ret,  data)
            sendResponse({success: ret, data: data})
        })
        break;
  }

    return true;
});

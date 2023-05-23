var txt_selected = "";

var btn_translate = document.createElement("button");
btn_translate.addEventListener("click", onTranslate);
btn_translate.textContent = "翻译";
btn_translate.style.position = "absolute";
btn_translate.style.display = "none";
document.body.appendChild(btn_translate);

var txt_translate = document.createElement("span");
txt_translate.addEventListener("click", onTranslate);
txt_translate.textContent = "";
txt_translate.style.position = "absolute";
txt_translate.style.display = "block";
txt_translate.style.background = '#fff'
txt_translate.style.borderRadius = '4px'
txt_translate.style.paddingLeft = '4px'
txt_translate.style.paddingRight = '4px'
txt_translate.style.border = '1px solid #333';
document.body.appendChild(txt_translate);

function onTranslate() {
    hideTranslateBtn();
  
    chrome.runtime.sendMessage(
      {
        event: "translate",
        lang: "中文",
        text: txt_selected,
      },
      function (response) {
        console.log("content Response:", response);
        if(response.success){
            showTranslateText(response.data.text)
        }
      }
    );
  }

function showTranslateBtn(x, y) {
  btn_translate.style.display = "block";
  btn_translate.style.left = x + "px";
  btn_translate.style.top = y + "px";
}

function hideTranslateBtn() {
  btn_translate.style.display = "none";
}

function showTranslateText(text){
    txt_translate.textContent = text;
    txt_translate.style.display = "block";
    txt_translate.style.left = btn_translate.style.left;
    txt_translate.style.top = btn_translate.style.top;
}

function hideTranslateText(){
    txt_translate.style.display = "none";
}

document.addEventListener("mousedown", function (event) {
  var selectedText = window.getSelection().toString();
  if (selectedText && selectedText.length > 0) {
  } else {
    hideTranslateBtn();
    hideTranslateText();
  }
});

document.addEventListener("mouseup", function (event) {
  var selectedText = window.getSelection().toString();
  if (selectedText && selectedText.length > 0) {
    txt_selected = selectedText;
    showTranslateBtn(event.pageX, event.pageY - 40);
  }
});

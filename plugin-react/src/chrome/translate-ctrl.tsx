import { useState, useEffect } from 'react';
import React from 'react';
import './translate-ctrl.css'

const TranslateCtrl: React.FC =()=>{
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [action, setAction] = useState('none');
    let posStyle = {
        // position: 'absolute' as Position,
        left: '0px',
        top: '0px',
    }

    function handleMousedown(event: any) {
        console.log('handleMousedown')
        let selectedText = window.getSelection()?.toString()
        if (selectedText && selectedText.length > 0) {
        } else {
            setAction('none')
        }
    }

    function handleMouseup(event: any) {
        console.log('handleMouseup')
        var selectedText = window.getSelection()?.toString();
        if (selectedText && selectedText.length > 0) {
            setText( selectedText)
            console.log('选中了：', text)
            posStyle.left = (event.pageX) + 'px'
            posStyle.top = (event.pageY - 40) +'px'
            setAction('trans')
        }
    }

    useEffect(() => {
        //  componentDidMount 
        document.addEventListener("mousedown", handleMousedown)
        document.addEventListener("mouseup", handleMouseup)

        return () => {
            //  componentWillUnmount 
        };
    }, []);

    function doTranslate() {
        setAction('result');
        console.log("准备翻译：", text)
        chrome.runtime.sendMessage(
            {
              event: "translate",
              lang: "中文",
              text: text,
            },
            function (response) {
              console.log("content Response:", response);
              if(response.success){
                  setResult(response.data.text)
              }
            }
          );
    }

    if (action == 'trans') {
        return (
            <button className='translateBtn' style={posStyle} onClick={doTranslate}>
                翻译
            </button>
        )
    }

    if (action == 'result') {
        return (
            <span className='translateSpan' style={posStyle}>{result}</span>
        )
    }

    return (<div></div>)
}

export default TranslateCtrl;
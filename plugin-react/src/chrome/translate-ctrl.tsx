import { useState, useEffect } from 'react';
import React from 'react';

const TranslateCtrl: React.FC =()=>{
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [action, setAction] = useState('none');
    const [pos, setPos] = useState({});

    let btnStyle = {
        position: 'absolute' as 'absolute',
        display: 'block',
        zIndex: 1000,
    };

    let spanStyle = {
        position: 'absolute' as 'absolute',
        display: 'block',
        background: '#fff',
        borderRadius: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
        border: '1px solid #333',
        zIndex: 1000,
    }

    function handleMousedown(event: any) {
        let selectedText = window.getSelection()?.toString()
        if (selectedText && selectedText.length > 0) {
        } else {
            setResult('')
            setAction('none')
        }
    }

    function handleMouseup(event: any) {
        var selectedText = window.getSelection()?.toString();
        if (selectedText && selectedText.length > 0) {
            setText( selectedText )
            setPos({
                left: (event.pageX) + 'px',
                top: (event.pageY - 40) +'px',
            })
            setResult('')
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
        let s = Object.assign(btnStyle, pos)
        return (
            <button className='translateBtn' style={s} onClick={doTranslate}>
                翻译
            </button>
        )
    }

    if (action == 'result') {
        let s = Object.assign(spanStyle, pos)
        return (
            <span className='translateSpan' style={s}>{result}</span>
        )
    }

    return (<div></div>)
}

export default TranslateCtrl;
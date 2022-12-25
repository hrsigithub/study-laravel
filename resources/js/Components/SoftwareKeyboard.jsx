import {useEffect, useRef, useState} from 'react';

export default function SoftwareKeyboard(props) {

    // Data
    const keyboardValues = [
        '7', '8', '9',
        '4', '5', '6',
        '1', '2', '3',
        '0', '←', 'C',
    ];
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [value, setValue] = useState(props.value);
    const [selection, setSelection] = useState(0);
    const [initialized, setInitialized] = useState(false);

    // Methods
    const handleInputChange = newValue => {

        const inputKeyboardValues = keyboardValues.filter(keyboardValue => { // 入力可能な値のみを抽出

            const invalidValues = ['←', 'C'];

            return invalidValues.includes(keyboardValue) === false;

        });
        const pattern = new RegExp('^('+ inputKeyboardValues.join('|') +')*$');

        if(pattern.test(newValue)) { // 入力可能文字だけの場合

            setValue(newValue);

            if(typeof props.onChange === 'function') {

                props.onChange(newValue);

            }

        }

    };
    const handlerKeyboardClick = keyboardValue => {

        const input = inputRef.current;
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd;
        let fullValue = value.toString();

        if(selectionStart !== selectionEnd) { // 選択範囲があるときは文字を削除

            fullValue = fullValue.slice(0, selectionStart) + fullValue.slice(selectionEnd);

        }

        let beforeValue  = fullValue.slice(0, selectionStart);
        let middleValue = '';
        let afterValue = fullValue.slice(selectionStart);
        let newSelection = 0;

        if(keyboardValue === '←') { // １文字削除

            beforeValue = beforeValue.slice(0, -1);
            newSelection = beforeValue.length;

        } else if(keyboardValue === 'C') { // クリア

            beforeValue = '';
            afterValue = '';

        } else {

            middleValue = keyboardValue;
            newSelection = selectionStart + 1;

        }

        setSelection(newSelection);

        const newValue = beforeValue + middleValue + afterValue;
        handleInputChange(newValue);

    };

    // Refs
    const inputRef = useRef();

    // Effect
    useEffect(() => {

        if(initialized === true) {

            const input = inputRef.current;
            input.focus();
            input.setSelectionRange(selection, selection);

        }

        setInitialized(true);

    }, [selection]);

    return (
        <>

            {/* 入力ボックス */}
            <input
                type="text"
                value={value}
                ref={inputRef}
                onChange={e => handleInputChange(e.target.value)}
                onFocus={() => setShowKeyboard(true)} />

            {/* ソフトウェアキーボード */}
            {showKeyboard && (
                <div className="px-3 pb-3 mt-3 bg-gray-100 w-48 border border-gray-50">
                    <div className="text-right">
                        <a href="#" className="text-blue-500 text-xs" onClick={() => setShowKeyboard(false)}>
                            &times; <small>閉じる</small>
                        </a>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-1">
                        {keyboardValues.map((keyboardValue, i) => (
                            <button
                                key={i}
                                className="bg-cyan-900 text-white p-1"
                                onClick={() => handlerKeyboardClick(keyboardValue)}>
                                {keyboardValue}
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </>
    );

}
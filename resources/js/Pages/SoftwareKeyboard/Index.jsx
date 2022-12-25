import { useEffect, useState } from 'react'
import SoftwareKeyboard from '@/Components/SoftwareKeyboard'

export default function Index() {
    // Data
    const [number1, setNumber1] = useState('1234567890')
    const [number2, setNumber2] = useState('0987654321')
    const [number3, setNumber3] = useState('')

    // Effect
    useEffect(() => {
        // 入力内容が変更されたら実行される部分

        console.log('number1 →', number1)
        console.log('number2 →', number2)
        console.log('number3 →', number3)
    }, [number1, number2, number3])

    return (
        <div className="p-5">
            <h1 className="mb-4 font-bold">
                数字ソフトウェアキーボードつき入力ボックス
                <small>（Laravel + React + inertia）</small>
            </h1>
            <div className="mb-3">
                <SoftwareKeyboard value={number1} onChange={(value) => setNumber1(value)} />
            </div>
            <div className="mb-3">
                <SoftwareKeyboard value={number2} onChange={(value) => setNumber2(value)} />
            </div>
            <div className="mb-3">
                <SoftwareKeyboard value={number3} onChange={(value) => setNumber3(value)} />
            </div>
        </div>
    )
}

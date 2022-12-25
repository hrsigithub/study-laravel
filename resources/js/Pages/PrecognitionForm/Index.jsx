import { useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'

export default function Index() {
    // データ
    const [params, setParams] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [precognitionKey, setPrecognitionKey] = useState('')

    // フォーム値
    const handleInputChange = (e) => {
        // alert()
        // console.log(e)
        // e.preventDefault()

        const key = e.target.name
        const value = e.target.value

        // 部分バリデーションするキーを保持（useEffect で使う）
        setPrecognitionKey(key)

        // 新しいパラメータをパラメータへ追加
        setParams({
            ...params,
            ...{ [key]: value },
        })
    }
    useEffect(() => {
        if (precognitionKey !== '') {
            handleSubmit(true) // Precognition として送信（部分バリデーション）
        }
    }, [params])

    // 送信
    const handleSubmit = (isPrecognition = false) => {
        const url = route('precognition_form.store')
        let config = getSubmitConfig(isPrecognition)

        axios
            .post(url, params, config)
            .then(onSubmitSuccess) // 成功したとき
            .catch(onSubmitError) // 失敗したとき
    }
    const getSubmitConfig = (isPrecognition) => {
        if (isPrecognition === true) {
            // Precognition の場合はヘッダーをつける

            return {
                headers: {
                    Accept: 'application/json',
                    Precognition: 'true',
                    'Precognition-Validate-Only': precognitionKey,
                },
            }
        }

        return {}
    }
    const onSubmitSuccess = (response) => {
        const isPrecognition = response.headers.precognition === 'true'

        if (isPrecognition === true) {
            // Precognition （部分バリデーション）の場合

            const newResponseErrors = {
                ...errors,
                ...{ [precognitionKey]: '' }, // エラーを削除
            }

            setErrors(newResponseErrors)
        } else {
            // 本送信

            alert('成功！')
        }
    }
    const onSubmitError = (error) => {
        let newResponseErrors = {}
        const isPrecognition = error.response.headers.precognition === 'true'

        if (isPrecognition === true) {
            const errorMessage = _.get(error, `response.data.errors.${precognitionKey}.0`, '')
            newResponseErrors = {
                // 新しいエラーを追加
                ...errors,
                ...{ [precognitionKey]: errorMessage },
            }
        } else {
            const keys = Object.keys(params)
            keys.forEach((key) => {
                newResponseErrors[key] = _.get(error, `response.data.errors.${key}.0`, '')
            })
        }

        setErrors(newResponseErrors)
    }

    // エラー
    let [errors, setErrors] = useState({})
    useEffect(() => {
        let responseErrors = {}
        const errorKeys = Object.keys(params)

        errorKeys.forEach((key) => {
            // エラーデータを初期化（自動でパラメータに合わせる）

            responseErrors[key] = ''
        })
    }, [])

    return (
        <div className="p-5 bg-gray-200">
            <h1 className="mb-4 text-center font-medium text-lg">
                Laravel Precognition でリアルタイム・バリデーション
            </h1>
            <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">名前</label>
                            <input
                                className="border rounded w-full py-2 px-3"
                                type="text"
                                name="name"
                                placeholder="名前"
                                value={params.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs italic">{errors.name}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">メールアドレス</label>
                            <input
                                className="border rounded w-full py-2 px-3"
                                type="email"
                                name="email"
                                placeholder="メールアドレス"
                                value={params.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs italic">{errors.email}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">パスワード</label>
                            <input
                                className="border rounded w-full py-2 px-3"
                                type="password"
                                name="password"
                                placeholder="パスワード"
                                value={params.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs italic">{errors.password}</p>
                            )}
                        </div>
                        <div className="text-right">
                            <button
                                type="button"
                                className="px-4 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"
                                onClick={handleSubmit}
                            >
                                送信する
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

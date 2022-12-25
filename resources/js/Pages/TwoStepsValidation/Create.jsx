import React, { useState, useRef } from 'react'
import { Inertia } from '@inertiajs/inertia'

export default function Create(props) {
    // Data
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const errors = props.errors

    // Refs
    const inputFileRef = useRef()

    // Handlers
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const handlePreSubmit = () => {
        const url = route('two_steps_validation.pre_store')
        const data = {
            // ファイル以外のデータ送信
            title,
            description,
        }

        Inertia.post(url, data, {
            onSuccess() {
                handleSubmit() // 本送信
            },
        })
    }
    const handleSubmit = () => {
        const url = route('two_steps_validation.store')
        const data = {
            // 全データ送信
            title,
            description,
            file,
        }

        Inertia.post(url, data, {
            forceFormData: true, // 必ず FormData で送信
            onSuccess() {
                setTitle('')
                setDescription('')
                setFile(null)
                inputFileRef.current.value = null // ファイル選択をクリア

                alert('完了しました')
            },
        })
    }

    return (
        <div className="w-48 p-5">
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    タイトル
                </label>
                <input
                    type="text"
                    value={title}
                    className="border border-gray-300 text-gray-900 text-sm"
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    内容
                </label>
                <textarea
                    value={description}
                    className="border border-gray-300 text-gray-900 text-sm"
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                    <p className="text-red-500 text-xs italic">{errors.description}</p>
                )}
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    容量が大きいファイル
                </label>
                <input ref={inputFileRef} type="file" onChange={(e) => handleFileChange(e)} />
                {errors.file && <p className="text-red-500 text-xs italic">{errors.file}</p>}
            </div>
            <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                onClick={() => handlePreSubmit()}
            >
                送信する
            </button>
        </div>
    )
}

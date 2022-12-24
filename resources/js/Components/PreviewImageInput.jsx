import React, { useState } from 'react'

export default function PreviewImageInput(props) {
    // Data
    const label = props.label || '画像を選択してください'
    const labelClassName =
        props.labelClassName || 'bg-gray-200 text-gray-700 text-sm font-bold py-2 px-4 rounded'
    const imageClassName = props.imageClassName || 'w-48'
    const accept = props.accept || 'image/jpeg,image/png'
    const [imageData, setImageData] = useState(null)

    // Methods
    const handleFileChange = (e) => {
        // 画像が選択された

        const files = e.target.files

        if (files.length > 0) {
            const file = files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                const imageData = e.target.result
                setImageData(imageData)
                handleImageChange({
                    status: 'added',
                    file: file,
                    imageData: imageData,
                })
            }
            reader.readAsDataURL(file)
        }
    }
    const handleImageDelete = () => {
        // 画像の削除

        if (confirm('画像を削除します。よろしいですか？')) {
            setImageData(null)
            handleImageChange({
                status: 'removed',
                file: null,
                imageData: null,
            })
        }
    }
    const handleImageChange = (e) => {
        // 画像に変化があったとき

        if (typeof props.onImageChange === 'function') {
            // 呼び出し側でイベントがセットされていれば実行

            props.onImageChange(e)
        }
    }

    return (
        <>
            <label className={labelClassName}>
                {label}
                <input
                    type="file"
                    accept={accept}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e)}
                />
            </label>
            {imageData && (
                <div className="mt-5">
                    <img src={imageData} className={imageClassName} />
                    <button
                        type="button"
                        className="bg-red-500 text-gray-100 text-sm font-bold py-1 px-3 rounded mt-3"
                        onClick={(e) => handleImageDelete(e)}
                    >
                        削除
                    </button>
                </div>
            )}
        </>
    )
}

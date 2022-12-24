import React from "react";
import PreviewImageInput from "@/Components/PreviewImageInput";

export default function Index() {
    const handleImageChange = (e) => {
        // 画像に変化があったら実行される

        console.log(e);
    };

    return (
        <div className="p-4">
            <h1 className="font-bold mb-3">
                &#x1F4DD; React を使ったプレビューつき画像入力のサンプル
            </h1>
            <PreviewImageInput onImageChange={(e) => handleImageChange(e)} />
        </div>
    );
}

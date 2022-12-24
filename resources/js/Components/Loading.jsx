import React from 'react';

export default function Loading({ show = false }) {

    return (
        <>
            {show && <span>読み込み中...</span>}
        </>
    );

}
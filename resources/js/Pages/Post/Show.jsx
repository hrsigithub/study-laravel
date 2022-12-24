import React from "react";
import { Link, Head } from '@inertiajs/inertia-react';

export default function Show(props) {

    const { title, body } = props.post;

    return (
        <div className="p-4">
            <h1 className="font-bold mb-3">{title}</h1>
            <div className="mb-3">{body}</div>
            <Link className="text-white bg-blue-700 rounded-lg text-sm px-4 py-2" href={route('post.index')}>戻る</Link>
        </div>
    );
}
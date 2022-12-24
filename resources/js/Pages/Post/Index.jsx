import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from '@inertiajs/inertia-react';
import Pagination from "@/Components/Pagination";

export default function Index(props) {

    // Data
    const { message } = props;

    // Methods
    const onDelete = id => {

        if(confirm('削除します。よろしいですか？')) {

            const url = route('post.destroy', id);
            const params = {
                _method: 'delete',
                page: props.posts.current_page
            };

            // delete() ではパラメータを送信できないため、あえて post() を使っています
            Inertia.post(url, params);

        }

    };

    return (
        <div className="p-5">
            <h1 className="font-bold">{props.title}</h1>
            {message && <div id="message" className="mt-2 text-green-700  bg-green-100 p-3 rounded-lg">{message}</div>}
            <div className="text-right p-3 mb-2">
                <Link className="text-white bg-green-700 rounded-lg text-sm px-4 py-2 mr-2" href={route('post.create')}>+ 追加する</Link>
            </div>
            <table className="w-full bg-gray-100">
                <thead className="bg-blue-100">
                    <tr>
                        <th>ID</th>
                        <th>タイトル</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {props.posts.data.map(post => (
                        <tr key={post.id}>
                            <td className="p-2 border">{post.title}</td>
                            <td className="p-2 border">{post.body}</td>
                            <td className="p-2 border">
                                <Link
                                    className="text-white bg-gray-400 rounded-lg text-sm px-4 py-2 mr-2"
                                    href={route('post.show', { id: post.id })}>
                                    確認
                                </Link>
                                <Link
                                    className="text-white bg-blue-700 rounded-lg text-sm px-4 py-2 mr-2"
                                    href={route('post.edit', { id: post.id })}>
                                    変更
                                </Link>
                                <button
                                    className="text-white bg-red-700 rounded-lg text-sm px-4 py-2 mr-2"
                                    onClick={() => onDelete(post.id)}>
                                    削除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination data={props.posts} />
        </div>
    );
}
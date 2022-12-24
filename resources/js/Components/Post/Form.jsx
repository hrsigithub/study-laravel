import React, { useState } from 'react';
import Label from "@/Components/InputLabel";
import {Link, useForm} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import Loading from "@/Components/Loading";
import _ from 'lodash';

export default function Form(props) {

    // Data
    const type = props.type; // create or edit
    const post = props.post;
    const errors = props.errors;
    const { data, setData } = useForm({
        title: _.get(post, 'title', ''),
        body: _.get(post, 'body', ''),
    });
    const [loading, setLoading] = useState(false);

    // Methods
    const onFinish = () => setLoading(false);
    const onSubmit = () => {

        setLoading(true);

        if(type === 'create') { // 登録 or 変更で切り替える

            console.log('create:', data);
            
            const url = route('post.store');
            Inertia.post(url, data, { onFinish });

        } else if(type === 'edit') {

            const url = route('post.update', props.post.id);
            Inertia.put(url, data, { onFinish });

        }

    };

    return (
        <div className="p-4">
            <div className="mb-3">
                <Label>タイトル</Label>
                <input className="w-80 border border-gray-500 p-2 rounded" value={data.title} onChange={e => setData('title', e.target.value)} />
                {errors.title && <div className="mt-2 text-red-500 bg-red-100 p-2 rounded">{errors.title}</div>}
            </div>
            <div className="mb-3">
                <Label>本文</Label>
                <textarea className="w-80 border border-gray-500 p-2 rounded" value={data.body} onChange={e => setData('body', e.target.value)} />
                {errors.body && <div className="mt-2 text-red-500 bg-red-100 p-2 rounded">{errors.body}</div>}
            </div>
            <button type="button" className="text-white bg-blue-700 rounded-lg text-sm px-4 py-2 mr-5" onClick={onSubmit}>送信する</button>
            <Link href={route('post.index')}>戻る</Link>
            <br />
            <Loading show={loading}></Loading>
        </div>
    );

}
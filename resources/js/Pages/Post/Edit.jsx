import React from 'react'
import PostForm from '@/Components/Post/Form'

export default function Edit(props) {
    const { post, errors } = props

    return <PostForm type="edit" post={post} errors={errors}></PostForm>
}

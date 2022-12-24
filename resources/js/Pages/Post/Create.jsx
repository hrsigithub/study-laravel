import React from 'react'
import PostForm from '@/Components/Post/Form'

export default function Create(props) {
    const { post, errors } = props

    return <PostForm type="create" post={post} errors={errors}></PostForm>
}

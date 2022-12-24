<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Inertia\Inertia;

use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::paginate(5);

        return Inertia::render('Post/Index', [
            'title' => 'Laravel： Vite + Inertia + React で CRUD サンプル',
            'posts' => $posts,
            'message' => session('message'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Post/Create');
    }

    public function store(PostRequest $request)
    {
        Log::info("info ログ!");

        $post = new Post();
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return redirect()->route('post.index')->with([
            'message' => '登録が完了しました',
        ]);
    }

    public function show(Post $post)
    {
        return Inertia::render('Post/Show', [
            'post' => $post,
        ]);
    }

    public function edit(Post $post)
    {
        return Inertia::render('Post/Edit', [
            'post' => $post,
        ]);
    }

    public function update(PostRequest $request, Post $post)
    {
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return redirect()->route('post.index')->with([
            'message' => '変更が完了しました',
        ]);
    }

    public function destroy(Request $request, Post $post)
    {
        $post->delete();

        // ページ番号つきでリダイレクト（削除時にページ移動してしまわないため）
        return redirect()
            ->route('post.index', ['page' => $request->page])
            ->with('message', '削除が完了しました');
    }
}

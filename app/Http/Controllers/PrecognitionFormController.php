<?php

namespace App\Http\Controllers;

use App\Http\Requests\PrecognitionFormRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PrecognitionFormController extends Controller
{
    // public function index()
    // {
    //     Log::info("index ログ!");

    //     return ['result' => true];
    // }

    public function create()
    {
        return Inertia::render('PrecognitionForm/Index');
    }

    public function store(PrecognitionFormRequest $request)
    {
        // ここで何かをする
        Log::info("store ログ!");

        return ['result' => true];
    }
}

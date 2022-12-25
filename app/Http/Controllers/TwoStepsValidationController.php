<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TwoStepsValidationController extends Controller
{
    public function create()
    {
        return Inertia::render('TwoStepsValidation/Create');
    }

    public function preStore(Request $request)
    {
        $request->validate([ // 事前バリデーション
            'title' => 'required',
            'description' => 'required',
        ]);

        return redirect()->route('two_steps_validation.create');
    }

    public function store(Request $request)
    {
        $request->validate([ // 本バリデーション
            'title' => 'required',
            'description' => 'required',
            'file' => ['required', 'file', 'max:2048'],
        ]);

        // ここで保存処理を行う

        return redirect()->route('two_steps_validation.create');
    }
}
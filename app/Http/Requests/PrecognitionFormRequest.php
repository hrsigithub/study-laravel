<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Log;

class PrecognitionFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        Log::info("authorize ログ!");

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|min:5',
            'email' => 'required|email',
            'password' => [ // 例： StrongPassword^0^
                'required',
                Password::min(16)   // 16文字以上
                    ->letters()     // 文字が含まれている
                    ->mixedCase()   // 大文字＆小文字が含まれている
                    ->numbers()     // 数字が含まれている
                    ->symbols()     // 特殊文字が含まれている
            ],
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class FileActionRequest extends ParentIdBaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'id' => Rule::exists('files', 'id'),
            'name' => 'nullable|string',
        ]);
    }
}

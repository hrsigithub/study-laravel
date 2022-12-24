<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = [
            'taro' => '太郎',
            'jiro' => '次郎',
            'saburo' => '三郎',
            'shiro' => '四郎',
            'goro' => '五郎',
            'rokuro' => '六郎',
            'shichiro' => '七郎',
            'hachiro' => '八郎',
            'kuro' => '九郎'
        ];

        foreach ($names as $name_en => $name_jp) {

            User::create([
                'name' => $name_jp,
                'email' => $name_en .'@example.com',
                'password' => bcrypt('xxxxxxxx')
            ]);

        }
    }
}
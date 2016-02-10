<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();

        DB::table('users')->delete();

        $users = array(
                ['username' => 'Ryan Chenkie', 'password' => Hash::make('secret')],
                ['username' => 'Chris Sevilleja', 'password' => Hash::make('secret')],
                ['username' => 'Holly Lloyd', 'password' => Hash::make('secret')],
                ['username' => 'Adnan Kukic', 'password' => Hash::make('secret')],
        );
            
        // Loop through each user above and create the record for them in the database
        foreach ($users as $user)
        {
            User::create($user);
        }

        Model::reguard();
    }
}
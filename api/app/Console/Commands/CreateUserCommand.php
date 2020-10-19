<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

use App\User;

class CreateUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:create 
        {email : Email address of the user} 
        {--admin : If the user is an admin} 
        {--password= : Password for the user (optional)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new user';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $email = $this->argument('email');

        $password = $this->option('password');
        $tries = 0;
        while (empty($password)) {
            $password = $this->secret(__('Password for the user?'));
            $tries++;

            if ($tries > 10) {
                $this->error(__('No valid password provided!'));

                if (file_exists('/.dockerenv')) {
                    $this->info(__('Make sure to include the "-it" arguments in the command.'));
                }

                return 1;
            }
        }

        $admin = (bool) $this->option('admin');

        if (User::where('email', $email)->exists()) {
            $this->error(__('A user with this email address already exists!'));

            return 1;
        }

        $user = User::create([
            'email' => $email,
            'password' => Hash::make($password),
            'admin' => $admin,
        ]);

        $this->info(sprintf(__('User %s created.'), $user->email));

        return true;
    }
}

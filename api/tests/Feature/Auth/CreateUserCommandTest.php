<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Command without email address should fail.
     */
    public function testUserCommandWithoutEmail()
    {
        $this->expectException(\Symfony\Component\Console\Exception\RuntimeException::class);

        $this->artisan('user:create')
            ->assertExitCode(1);
    }

    /**
     * Command without password should fail.
     */
    public function testUserCommandWithoutPassword()
    {
        $this->artisan('user:create test@example.com --password=')
            ->expectsQuestion(__('Password for the user?'), '')
            ->assertExitCode(1);
    }

    /**
     * Cannot create duplicate user.
     */
    public function testUserCommandDuplicateUser()
    {
        DB::table('users')->insert([
            'email' => 'test@example.com',
            'password' => '0'
        ]);

        $this->artisan('user:create test@example.com --password=secret')
            ->assertExitCode(1);
    }

    /**
     * Test that a user can be created via command line.
     */
    public function testUserCreateCommand()
    {
        // Valid command without password
        $this->artisan('user:create test@example.com')
            ->expectsQuestion(__('Password for the user?'), 'secret')
            ->assertExitCode(0);
    }
}

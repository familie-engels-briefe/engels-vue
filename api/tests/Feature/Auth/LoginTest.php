<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use App\User;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if the login page displays without errors
     */
    public function testLoginShow()
    {
        $this->get(route('login'))
            ->assertStatus(200);
    }

    /**
     * Test if the login page displays without errors
     */
    public function testLogin()
    {
        $user = factory(User::class)->create();

        $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'password'
        ])
            ->assertRedirect(route('documentation'));

        $this->assertAuthenticated();
    }
}

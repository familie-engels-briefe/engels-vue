<?php

namespace Tests\Feature\Auth;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;

class RedirectTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the user cannot visit some pages if he is authenticated.
     */
    public function testRedirectIfAuthenticated()
    {
        $user = factory(User::class)->create();

        $this->actingAs($user)
            ->get(route('login'))
            ->assertRedirect(route('documentation'));
    }

    /**
     * Test that the user can visit some pages if he is authenticated.
     */
    public function testNotRedirectIfNotAuthenticated()
    {
        $this->assertGuest()
            ->get(route('login'))
            ->assertStatus(200);
    }

    /**
     * Test that the user cannot visit some pages if he is not authenticated.
     */
    public function testRedirectIfNotAuthenticated()
    {
        $this->assertGuest()
            ->get(route('sync.index'))
            ->assertRedirect(route('login'));
    }

    /**
     * Test that the user can visit some pages if he is authenticated.
     */
    public function testNotRedirectIfAuthenticated()
    {
        $user = factory(User::class)->create();

        $this->actingAs($user)
            ->get(route('sync.index'))
            ->assertStatus(200);
    }
}

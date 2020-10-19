<?php

namespace Tests\Feature;

use Tests\TestCase;

class SiteTest extends TestCase
{
    /**
     * Test that the about page loads.
     */
    public function testNotFoundPage()
    {
        $response = $this->get('/404');

        $response->assertStatus(404);
    }

    /**
     * Test that the about page loads.
     */
    public function testAboutPage()
    {
        $response = $this->get(route('documentation'));
        $response->assertStatus(200);
    }
}

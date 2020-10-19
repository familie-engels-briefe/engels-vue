<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Testing\TestResponse;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * Check if the response was a valid api response.
     *
     * @param TestResponse $response
     */
    protected function assertValidApiResponse(TestResponse $response)
    {
        $response->assertStatus(200);

        $response->assertJsonStructure([
            'success',
            'code',
            'data',
        ]);

        $response->assertJsonFragment([
            'success' => true,
            'code' => 200,
        ]);
    }
}

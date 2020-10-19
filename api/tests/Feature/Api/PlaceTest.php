<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class PlaceTest extends TestCase
{
    /**
     * Test listing of letters.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get(route('api.places.index'));

        $this->assertValidApiResponse($response);
    }
}

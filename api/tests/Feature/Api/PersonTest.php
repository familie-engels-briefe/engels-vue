<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class PersonTest extends TestCase
{
    /**
     * Test listing of letters.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get(route('api.persons.index'));

        $this->assertValidApiResponse($response);
    }
}

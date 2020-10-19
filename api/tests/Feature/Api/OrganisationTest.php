<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class OrganisationTest extends TestCase
{
    /**
     * Test listing of letters.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get(route('api.organisations.index'));

        $this->assertValidApiResponse($response);
    }
}

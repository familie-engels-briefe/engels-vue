<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class LetterTest extends TestCase
{
    /**
     * Test listing of letters.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get(route('api.letters.index'));

        $this->assertValidApiResponse($response);
    }

    /**
     * Test detail view of letters.
     *
     * @return void
     */
    public function testShow()
    {
        $response = $this->get(route('api.letters.show', ['letter' => '002']));

        $this->assertValidApiResponse($response);
    }
}

<?php

namespace App\ExistDb;

use Exception;
use Illuminate\Http\JsonResponse;
use SimpleXMLElement;

use Illuminate\Support\Facades\Log;

use Symfony\Component\HttpFoundation\Response;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class ExistDb
{
    /**
     * @var string
     */
    protected $host;

    /**
     * @var int
     */
    protected $port;

    /**
     * @var string
     */
    protected $prefix;

    /**
     * @var string
     */
    protected $collection;

    /**
     * @var string
     */
    protected $username;

    /**
     * @var string
     */
    protected $password;

    public function __construct(string $name = 'exist', $prefix = '/exist')
    {
        $this->prefix = $prefix;
        $this->host = config('database.connections.' . $name . '.host');
        $this->port = config('database.connections.' . $name . '.port');
        $this->collection = config('database.connections.' . $name . '.collection');
        $this->username = config('database.connections.' . $name . '.username');
        $this->password = config('database.connections.' . $name . '.password');

        if (empty($this->host)) {
            throw new Exception('Config value for "database.connections.' . $name . '.host" is empty!!');
        }
    }

    /**
     * Create the complete request url.
     *
     * @param string $resource
     * @return string
     */
    protected function createUrl(string $resource): string
    {
        return $this->host . ':' . $this->port . $this->prefix .  '/apps/' . $this->collection . '/' . $resource;
    }

    /**
     * Create and execute request to database.
     *
     * @param string $resource
     * @param string $method
     * @param array $query
     * @param bool $parse
     * @param null $body
     * @return array
     */
    public function createRequest(string $resource, string $method, array $query = [], $parse = true, $body = null): array
    {
        $client = new Client(['verify' => false]);

        try {
            // Create authenticated request
            $response = $client->request($method, $this->createUrl($resource), [
                'auth' => [
                    $this->username,
                    $this->password,
                ],
                'query' => $query,
                'body' => $body,
            ]);
        } catch (GuzzleException $e) {
            Log::error($e->getMessage());

            return [
                'success' => false,
                'code' => $e->getCode(),
                'error' => $e->getMessage(),
            ];
        }

        // Check if status code is known
        if ($response->getStatusCode() === 200) {
            if (!$parse) {
                return [
                    'body' => (string) $response->getBody(),
                ];
            }

            // Convert response to object
            $body = json_decode($response->getBody());

            // Could not parse json, maybe xml
            if ($body === null) {
                try {
                    $xml = simplexml_load_string($response->getBody());
                } catch (Exception $e) {
                    return [
                        'success' => false,
                        'code' => 400,
                        'error' => $e->getMessage(),
                    ];
                }

                if (!$xml) {
                    return [
                        'success' => false,
                        'code' => 400,
                        'error' => 'Could not parse xml response!',
                    ];
                }

                return [
                    'xml' => $xml,
                ];
            }

            // Return json array
            return [
                'success' => true,
                'code' => 200,
                'data' => (is_array($body) && isset($body[0])) ? $body[0] : $body,
            ];
        } else if ($response->getStatusCode() === 201) {
            return [
                'success' => true,
                'code' => $response->getStatusCode(),
                'resource' => $resource,
                'data' => $body,
            ];
        } else {
            Log::warning(sprintf('Unexpected status code %d for exist request to %s!', $response->getStatusCode(), $resource));

            return [
                'success' => false,
                'code' => $response->getStatusCode(),
                'error' => 'Unknown status code!',
            ];
        }
    }

    /**
     * Create a json response.
     *
     * @param array $response
     * @return JsonResponse
     */
    protected function createResponse(array $response): JsonResponse
    {
        if (isset($response['code']) && $response['code'] === 0) {
            throw new Exception($response['error'] ?? 'Unkonwn exist exception');
        }

        return response()->json($response, $response['code'] ?? 500);
    }

    /**
     * Execute GET request.
     *
     * @param string $resource
     * @param array $query
     * @param bool $parse
     * @return JsonResponse
     * @throws Exception
     */
    public function get(string $resource, array $query = [], $parse = true): JsonResponse
    {
        $response = $this->createRequest($resource, 'GET', $query, $parse);

        return $this->createResponse($response);
    }

    /**
     * Execute PUT request.
     *
     * @param string $resource
     * @param string $data
     * @return array
     */
    protected function put(string $resource, string $data): array
    {
        return $this->createRequest($resource, 'PUT', [], true, $data);
    }

    /**
     * Execute DELETE request.
     *
     * @param string $resource
     * @return array
     */
    protected function delete(string $resource): array
    {
        return $this->createRequest($resource, 'DELETE');
    }

    /**
     * Execute GET request without response formatting.
     *
     * @param string $resource
     * @param array $query
     * @return SimpleXMLElement
     * @throws Exception
     */
    public function raw(string $resource, array $query = []): SimpleXMLElement
    {
        $response = $this->createRequest($resource, 'GET', $query);

        if (!isset($response['xml'])) {
            throw new Exception(sprintf('Could not read xml property from: %s', serialize($response)));
        }

        return $response['xml'];
    }

    /**
     * Update a document in the database.
     *
     * @param string $filename
     * @param string $body
     * @return array|string[]
     */
    public function updateDocument(string $filename, string $body)
    {
        return $this->put('data/' . $filename, $body);
    }

    /**
     * Delete a document in the database.
     *
     * @param string $filename
     * @return array
     */
    public function deleteDocument(string $filename)
    {
        return $this->delete('data/' . $filename);
    }
}

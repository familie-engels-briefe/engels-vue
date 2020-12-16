@extends('layouts.app')

@section('content')
    <div class="px-4 w-full md:2/3 lg:w-3/4 docs">
        <div class="bg-purple-200 text-purple-900 font-bold p-4 mb-8">
            Das ist die API Dokumentation für die <a href="https://familie-engels-briefe.de" target="_blank" class="underline">Brief-Edition der Familie Engels</a>. Für den Quellcode besuchen Sie bitte die entsprechende Dokumentation auf <a href="https://github.com/familie-engels-briefe/" target="_blank" class="underline"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>.
        </div>

        <h1 class="leading-none">Engels Archive API Documentation</h1>

        <h2><a id="letters"></a>Letters</h2>

        <h3><a id="letters-list"></a><code>[GET] /api/v1/letters</code></h3>
        <p>Get a list of all letters.</p>

        <h4>Example Response</h4>
        <pre><code class="language-json">@include('_examples.letters.index')</code></pre>

        <h4>Filter</h4>
        <p>The following query parameters are available to filter the letters:</p>

        <table>
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="font-bold">person-sender-receiver</td>
                    <td><code>ref</code></td>
                    <td>Filter by person who sent/received the letter</td>
                </tr>
                <tr>
                    <td class="font-bold">person-mentioned</td>
                    <td><code>ref</code></td>
                    <td>Filter by person mentioned in the body text</td>
                </tr>
                <tr>
                    <td class="font-bold">place-sender-receiver</td>
                    <td><code>ref</code></td>
                    <td>Filter by place where the letter was sent/received from</td>
                </tr>
                <tr>
                    <td class="font-bold">place-mentioned</td>
                    <td><code>ref</code></td>
                    <td>Filter by place mentioned in the body text</td>
                </tr>
                <tr>
                    <td class="font-bold">organisation-mentioned</td>
                    <td><code>ref</code></td>
                    <td>Filter by organisation mentioned in the body text</td>
                </tr>
            </tbody>
        </table>

        <h3><a id="letters-single"></a><code>[GET] /api/v1/letters/014</code></h3>
        <p>Get the details of a single letter.</p>

        <h4>Example Response</h4>
        <pre><code class="language-json">@include('_examples.letters.show')</code></pre>

        <h2><a id="persons"></a>Persons</h2>

        <h3><a id="persons-list"></a><code>[GET] /api/v1/persons</code></h3>
        <p>Get a list of all persons.</p>

        <h4>Example Response</h4>
        <pre><code class="language-json">@include('_examples.persons.index')</code></pre>

        <h2><a id="places"></a>Places</h2>

        <h3><a id="places-list"></a><code>[GET] /api/v1/places</code></h3>
        <p>Get a list of all places.</p>

        <h4>Example Response</h4>
        <pre><code class="language-json">@include('_examples.places.index')</code></pre>

        <h2><a id="organisations"></a>Organisations</h2>

        <h3><a id="organisations-list"></a><code>[GET] /api/v1/organisations</code></h3>
        <p>Get a list of all organisations.</p>

        <h4>Example Response</h4>
        <pre><code class="language-json">@include('_examples.organisations.index')</code></pre>

        <h2><a id="facsimiles"></a>Facsimile</h2>

        <p>The list of facsimiles is decoded in <code>TEI/facsimile/graphic/@url</code></p>

        <p>The public URL for each document is <code>{{ config('app.url') }}/facsimile/@url</code>, where <code>@url</code> is the same attribute as in the xml file.</p>

        <h2><a id="errors"></a>Example error response</h2>

        <pre><code class="language-json">@include('_examples.error')</code></pre>
    </div>

    <aside class="px-4 w-full md:1/3 lg:w-1/4">
        <ul class="list-none fixed" id="sub-navigation">
            <li>
                <a href="{{ route('documentation') }}#letters">Letters</a>
                <ul>
                    <li><a href="{{ route('documentation') }}#letters-list">List all</a></li>
                    <li><a href="{{ route('documentation') }}#letters-single">Single</a></li>
                </ul>
            </li>
            <li>
                <a href="{{ route('documentation') }}#persons">Persons</a>
                <ul>
                    <li><a href="{{ route('documentation') }}#persons-list">List all</a></li>
                </ul>
            </li>
            <li>
                <a href="{{ route('documentation') }}#places">Places</a>
                <ul>
                    <li><a href="{{ route('documentation') }}#places-list">List all</a></li>
                </ul>
            </li>
            <li>
                <a href="{{ route('documentation') }}#organisations">Organisations</a>
                <ul>
                    <li><a href="{{ route('documentation') }}#organisations-list">List all</a></li>
                </ul>
            </li>
            <li>
                <a href="{{ route('documentation') }}#facsimiles">Facsimiles</a>
            </li>
            <li>
                <a href="{{ route('documentation') }}#errors">Errors</a>
            </li>
        </ul>
    </aside>
@endsection

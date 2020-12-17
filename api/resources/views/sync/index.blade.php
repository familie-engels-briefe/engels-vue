@extends('layouts.app')

@section('content')
    <div class="w-full px-4">
        <h1 class="mb-4">Sync (
            @if ($lastSync)
                {{ (new Carbon\Carbon($lastSync->started_at))->timezone('Europe/Berlin')->format('d.m.Y H:i') }}
                -
                @if ($lastSync->finished_at)
                    {{ (new Carbon\Carbon($lastSync->finished_at))->timezone('Europe/Berlin')->format('d.m.Y H:i') }} ({{ (new Carbon\Carbon($lastSync->finished_at))->longAbsoluteDiffForHumans(new Carbon\Carbon($lastSync->started_at), ) }})
                @else
                    Not finished yet
                @endif
            @else
                Never
            @endif
            )
        </h1>

        @if ($error !== null)
            <div class="mb-4 bg-red-300 text-red-900 font-bold">
                {{ $error }}
            </div>
        @endif

        <p class="mb-4 text-gray-700">
            The syncronisation takes a few seconds. It compares the letters and all other relevant files from the current exist 4 database <code>{{ config('database.connections.exist_replication.host') }}:{{ config('database.connections.exist_replication.port') }}/{{ config('database.connections.exist_replication.collection') }}</code> and writes them into the exist 5 database <code>{{ config('database.connections.exist.host') }}:{{ config('database.connections.exist.port') }}/{{ config('database.connections.exist.collection') }}</code> which feeds the api.
        </p>

        <form method="post" action="{{ route('sync.sync') }}" class="inline-block">
            @csrf

            <button type="submit" class="button">
                <i class="fas fa-sync" aria-hidden="true"></i> {{ __('Sync') }}
            </button>
        </form>

        <form method="post" action="{{ route('sync.clear-cache') }}" class="inline-block ml-4">
            @csrf

            <button type="submit" class="button button-danger">
                <i class="fas fa-trash" aria-hidden="true"></i> {{ __('Cache') }}
            </button>
        </form>

        <h2>Status</h2>

        <table>
            <tbody>
                <tr>
                    <td class="font-bold">Number of documents</td>
                    <td>{{ $numberOfDocuments }}</td>
                </tr>
                <tr>
                    <td class="font-bold">Number of html files</td>
                    <td>{{ $numberOfHtmlFiles }} (Should be: {{ $numberOfDocuments * 2 }})</td>
                </tr>
                <tr>
                    <td class="font-bold">Cache size</td>
                    <td>{{ $cacheSize }}</td>
                </tr>
            </tbody>
        </table>

        @if (count($lastSyncErrors) > 0)
            <h2>Errors in the last 24 hours</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Payload</th>
                        <th>Exception</th>
                        <th>Failed At</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($lastSyncErrors as $error)
                        <tr>
                            <td class="align-top">{{ $error->id }}</td>
                            <td class="max-w-sm overflow-x-scroll align-top"><pre class="whitespace-pre-wrap break-words"><code class="language-json">{{ json_encode(json_decode($error->payload), JSON_PRETTY_PRINT) }}</code></pre></td>
                            <td class="max-w-sm overflow-x-scroll align-top"><pre class="whitespace-pre-wrap break-words"><code>{{ $error->exception }}</code></pre></td>
                            <td class="align-top">{{ (new Carbon\Carbon($error->failed_at))->timezone('Europe/Berlin')->format('d.m.Y H:i') }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
@endsection

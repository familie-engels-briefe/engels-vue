@extends('layouts.app')

@section('content')
    <div class="w-full px-4">
        <h1 class="mb-4">Sync (
            Last Sync:
            @if ($lastSync)
                {{ (new Carbon\Carbon($lastSync))->timezone('Europe/Berlin')->format('d.m.Y H:i') }}
            @else
                Never
            @endif
            )
        </h1>

        <p class="mb-4 text-gray-700">
            The syncronisation takes a few seconds. It compares the letters and all other relevant files from the current exist 4 database <code>{{ config('database.connections.exist_replication.host') }}:{{ config('database.connections.exist_replication.port') }}/{{ config('database.connections.exist_replication.collection') }}</code> and writes them into the exist 5 database <code>{{ config('database.connections.exist.host') }}:{{ config('database.connections.exist.port') }}/{{ config('database.connections.exist.collection') }}</code> which feeds the api.
        </p>

        <form method="post" action="{{ route('sync.sync') }}">
            @csrf

            <button type="submit" class="button">
                <i class="fas fa-sync" aria-hidden="true"></i> {{ __('Sync') }}
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
    </div>
@endsection

@extends('layouts.main')

@section('main-content')
    <div class="flex content-center h-full">
        <div class="flex flex-wrap md:items-center w-full -mx-8">
            @yield('content')

            <div class="px-8 py-4 w-full md:w-1/2">
                <img src="{{ asset('images/login.svg') }}" alt="Friedrich Engels" class="w-full h-auto">
            </div>
        </div>
    </div>
@endsection

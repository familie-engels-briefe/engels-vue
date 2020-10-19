@extends('layouts.auth')

@section('content')
    <form method="POST" action="{{ route('password.email') }}" class="px-8 py-4 w-full md:w-1/2">
        <h1>{{ __('Passwort zurücksetzen') }}</h1>

        @if (session('status'))
            <div class="alert alert-success" role="alert">
                {{ session('status') }}
            </div>
        @endif

        @csrf

        <div class="mb-6 mt-8">
            <label for="email">{{ __('Email Address') }}</label>

            <input id="email" type="email" class="@error('email') is-invalid @enderror" name="email"
                   value="{{ old('email') }}" required autocomplete="email" autofocus>

            @error('email')
            <span class="mt-2 text-red-500 font-bold" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>

        <div>
            <button type="submit">
                <i class="fas fa-sign-in-alt" aria-hidden="true"></i> {{ __('Send password link') }}
            </button>
        </div>
    </form>
@endsection

@extends('layouts.auth')

@section('content')
    <form method="POST" action="{{ route('login') }}" class="px-8 py-4 w-full md:w-1/2">
        <h1>{{ __('Anmelden') }}</h1>

        @csrf

        <div class="mb-6 mt-8">
            <label for="email">
                {{ __('Email address') }}
            </label>
            <input type="email" name="email" id="email" class="@error('email') is-invalid @enderror"
                   value="{{ old('email') }}" required autocomplete="email" autofocus>

            @error('email')
            <span class="mt-2 text-red-500 font-bold" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>

        <div class="mb-6 mt-8">
            <label for="password">
                {{ __('Password') }}
            </label>
            <input type="password" name="password" id="password" class="@error('password') is-invalid @enderror"
                   value="{{ old('password') }}" required autocomplete="password" autofocus>

            <a class="btn btn-link text-gray-500 text-sm inline-block mt-1" href="{{ route('password.request') }}">
                {{ __('Passwort vergessen?') }}
            </a>

            @error('password')
            <span class="mt-2 text-red-500 font-bold" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>

        <div class="mb-6">
            <label class="md:w-2/3 block text-gray-500 font-bold cursor-pointer">
                <input class="mr-2 leading-tight" type="checkbox" name="remember"
                       id="remember" {{ old('remember') ? 'checked' : '' }}>
                <span class="text-sm align-top">
                    {{ __('Remember login') }}
                </span>
            </label>
        </div>

        <div>
            <button type="submit">
                <i class="fas fa-sign-in-alt" aria-hidden="true"></i> {{ __('Login') }}
            </button>
        </div>
    </form>
@endsection

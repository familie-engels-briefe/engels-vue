@extends('layouts.auth')

@section('content')
    <form method="POST" action="{{ route('password.update') }}" class="px-8 py-4 w-full md:w-1/2">
        <h1>{{ __('Change Password') }}</h1>
        @csrf

        <input type="hidden" name="token" value="{{ $token }}">

        <div class="mb-6 mt-8">
            <label for="email">{{ __('Email address') }}</label>

            <input id="email" type="email" class="@error('email') is-invalid @enderror" name="email"
                   value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>

            @error('email')
            <span class="mt-2 text-red-500 font-bold" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>

        <div class="mb-6 mt-8">
            <label for="password">{{ __('Password') }}</label>

            <input id="password" type="password" class="@error('password') is-invalid @enderror"
                   name="password" required autocomplete="new-password">

            @error('password')
            <span class="mt-2 text-red-500 font-bold" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>

        <div class="mb-6 mt-8">
            <label for="password-confirm">{{ __('Confirm Password') }}</label>

            <div class="col-md-6">
                <input id="password-confirm" type="password" name="password_confirmation" required
                       autocomplete="new-password">
            </div>
        </div>

        <div>
            <button type="submit">
                {{ __('Reset Password') }}
            </button>
        </div>
    </form>
@endsection

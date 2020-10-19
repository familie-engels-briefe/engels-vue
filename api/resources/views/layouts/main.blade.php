<!doctype html>
<html lang="{{ config('app.locale') }}" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>

    <link rel="stylesheet" href="{{ asset(mix('css/main.css')) }}">
    <script src="{{ asset(mix('js/app.js')) }}" async defer></script>
</head>
<body class="h-full">
    <div class="flex flex-col min-h-full items-stretch">
        <div id="navigation" class="bg-teal-500 p-6">
            <nav class="container mx-auto flex-grow lg:flex lg:items-center lg:w-auto px-4" role="navigation">
                <div class="lg:flex-grow">
                    <a href="{{ route('documentation') }}">{{ __('Documentation') }}</a>

                    @auth
                        <a href="{{ route('sync.index') }}">{{ __('Sync') }}</a>
                    @endauth
                </div>
                <div>
                    @auth
                        <form method="post" action="{{ route('logout') }}">
                            @csrf

                            <button type="submit" class="no-button text-sm"><i class="fas fa-sign-out-alt" aria-hidden="true"></i> {{ __('Sign out') }}</button>
                        </form>
                    @endauth

                    @guest
                        <a href="{{ route('login') }}"><i class="fas fa-sign-in-alt" aria-hidden="true"></i> {{ __('Sign in') }}</a>
                    @endguest
                </div>
            </nav>
        </div>

        <div class="container mx-auto px-4 mt-12 mb-16 flex-grow" id="app">
            @yield('main-content')
        </div>

        <footer class="text-gray-500 flex-shrink-0">
            <div class="container mx-auto px-4 py-8 text-center">
                &copy; 2018-{{ date('Y') }} Engels Archiv | Impressum | Datenschutz
            </div>
        </footer>
    </div>
</body>
</html>

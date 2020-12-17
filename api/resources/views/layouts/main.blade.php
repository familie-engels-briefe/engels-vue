<!doctype html>
<html lang="{{ config('app.locale') }}" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>

    <meta name="description" content="{{ config('app.description') }}">

    <link rel="stylesheet" href="{{ asset(mix('css/main.css')) }}">
    <script src="{{ asset(mix('js/app.js')) }}" async defer></script>
</head>
<body class="h-full">
    <div class="flex flex-col min-h-full items-stretch">
        <div id="navigation" class="bg-teal-300 p-6">
            <nav class="container mx-auto flex-grow lg:flex lg:items-center lg:w-auto px-4" role="navigation">
                <div class="lg:flex-grow">
                    <a href="{{ route('documentation') }}"><i class="fas fa-bookmark" aria-hidden="true"></i> {{ __('Documentation') }}</a>

                    @auth
                        <a href="{{ route('sync.index') }}"><i class="fas fa-sync" aria-hidden="true"></i> {{ __('Sync') }}</a>
                    @endauth
                </div>
                <div>
                    @auth
                        <form method="post" action="{{ route('logout') }}">
                            @csrf

                            <span class="text-sm">
                                {{ auth()->user()->email }} -
                            </span>

                            <button type="submit" class="no-button text-sm">
                                {{ __('Sign out') }}

                                <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
                            </button>
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
                &copy; 2018-{{ date('Y') }} Engels Archiv | <a href="https://familie-engels-briefe.de/impressum">Impressum</a> | <a href="https://familie-engels-briefe.de/datenschutzerkl%C3%A4rung">Datenschutz</a>
            </div>
        </footer>
    </div>
</body>
</html>

<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],


// Socialite------------------------------------
    'facebook' => [
        'client_id' => '2556323634448620',
        'client_secret' => 'cddc67b6089a9b2be95782b7e549520f',
        'redirect' => 'https://localhost:8000/login/facebook/callback',
    ],

    'google' => [
        'client_id' => '210490847601-l3o21vgll1lg45priln52kh5r7nfp8uh.apps.googleusercontent.com',
        'client_secret' => 'hGISwRVmZaFGvMEhw8dYEC8P',
        'redirect' => 'http://localhost:8000/login/google/callback',
    ],

];

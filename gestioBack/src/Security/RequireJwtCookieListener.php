<?php

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpFoundation\JsonResponse;

class RequireJwtCookieListener
{
    public function onKernelRequest(RequestEvent $event)
    {
        $request = $event->getRequest();
        if (str_starts_with($request->getPathInfo(), '/api') && !$request->cookies->has('BEARER')) {
            $event->setResponse(new JsonResponse([
                'error' => 'Missing JWT cookie'
            ], 401));
        }
    }
}
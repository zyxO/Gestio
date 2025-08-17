<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;

class JwtCookieExtractor implements TokenExtractorInterface
{
    public function extract(Request $request): ?string
    {
        if (!$request->cookies->has("BEARER")) {
            return null;
        }
        return $request->cookies->get('BEARER');
    }
    }
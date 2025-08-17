<?php

namespace App\Controller;

use App\Entity\User;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[AsController]
class AuthController extends AbstractController
{

    #[Route('api/me', name:'api_me', methods: ['GET'])]
    public function me(#[CurrentUser] ?User $user)
    {
        if(!$user){
        return new JsonResponse(['error' => 'Not a User'], 404);
        }
        return new JsonResponse([
            'id'=> $user->getId(),
            'email'=>$user->getEmail(),
            'username' => $user->getUsername()
        ],
        200);
    }

    
    #[Route('api/logout', name:'logout', methods: ['POST'])]
    public function logOut(#[CurrentUser] ?User $user)
    {
        if(!$user) {
            return new Response('Nice try ! ', Response::HTTP_FORBIDDEN);
        }
        $response = new Response();
        $cookie = new Cookie('BEARER', ' ', time() - 3600);
        $response->headers->setCookie($cookie);
        $response->headers->set('Content-Type', 'Application/json');
        $response->setStatusCode(Response::HTTP_OK);
        return $response;
    }
}
<?php

namespace App\Controller;

use App\Entity\Main\User;
use App\Repository\Main\Donnees\DoExtraitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/espace-membre', name: 'user_')]
class UserController extends AbstractController
{
    #[Route('/', name: 'homepage')]
    public function index(DoExtraitRepository $extraitRepository): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        $extraits = $extraitRepository->findBy(['client' => $user->getClient()], ['writeAt' => 'ASC']);

        foreach($extraits as $extrait){
//            dump($extrait);
        }

        return $this->render('user/pages/index.html.twig', [
            'extraits' => $extraits
        ]);
    }
}

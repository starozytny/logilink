<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    public function index(): Response
    {
        return $this->render('app/pages/index.html.twig', [ 'controller_name' => 'AppController' ]);
    }

    #[Route('/contact', name: 'app_contact')]
    public function contact(): Response
    {
        return $this->render('app/pages/contact/create.html.twig');
    }

    #[Route('/legales/mentions-legales', name: 'app_mentions')]
    public function mentions(): Response
    {
        return $this->render('app/pages/legales/mentions.html.twig');
    }

    #[Route('/legales/politique-confidentialite', name: 'app_politique', options: ['expose' => true])]
    public function politique(): Response
    {
        return $this->render('app/pages/legales/politique.html.twig');
    }

    #[Route('/legales/cookies', name: 'app_cookies', options: ['expose' => true])]
    public function cookies(): Response
    {
        return $this->render('app/pages/legales/cookies.html.twig');
    }

    #[Route('/creation-sites-internet-unique', name: 'app_websites')]
    public function websites(): Response
    {
        return $this->render('app/pages/websites/index.html.twig');
    }

    #[Route('/creation-applications-mobile-tablette', name: 'app_applications')]
    public function applications(): Response
    {
        return $this->render('app/pages/applications/index.html.twig');
    }

    #[Route('/creation-logiciel-metier', name: 'app_software')]
    public function software(): Response
    {
        return $this->render('app/pages/softwares/index.html.twig');
    }

    #[Route('/societe', name: 'app_society')]
    public function society(): Response
    {
        return $this->render('app/pages/society/index.html.twig');
    }
}

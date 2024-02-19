<?php

namespace App\Controller\App\Produits;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/creation-applications-mobile-tablette', name: 'app_applications_')]
class ApplicationsController extends AbstractController
{
    #[Route('/application-etat-des-lieux-fokus', name: 'fokus')]
    public function fokus(): Response
    {
        return $this->render('app/pages/applications/products/fokus.html.twig');
    }

    #[Route('/application-signature-electronique-partage-documents-opendoc', name: 'opendoc')]
    public function opendoc(): Response
    {
        return $this->render('app/pages/applications/products/opendoc.html.twig');
    }

    #[Route('/application-gestionnaires-copropriete-memento', name: 'memento')]
    public function memento(): Response
    {
        return $this->render('app/pages/applications/products/memento.html.twig');
    }
}

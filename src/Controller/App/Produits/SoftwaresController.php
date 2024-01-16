<?php

namespace App\Controller\App\Produits;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/creation-logiciel-metier', name: 'app_softwares_')]
class SoftwaresController extends AbstractController
{
    #[Route('/logiciel-transaction-immobiliere-lotys', name: 'lotys')]
    public function lotys(): Response
    {
        return $this->render('app/pages/softwares/products/lotys.html.twig');
    }

    #[Route('/logiciel-syndic-coproprietes-ultimmo-syndic', name: 'syndic')]
    public function syndic(): Response
    {
        return $this->render('app/pages/softwares/products/syndic.html.twig');
    }

    #[Route('/logiciel-gestion-locative-gerance', name: 'gerance')]
    public function gerance(): Response
    {
        return $this->render('app/pages/softwares/products/gerance.html.twig');
    }
}

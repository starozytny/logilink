<?php

namespace App\Controller\App\Produits;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/creation-sites-internet-unique', name: 'app_websites_')]
class WebsitesController extends AbstractController
{
    #[Route('/signature-electronique-partage-documents-opendoc', name: 'opendoc')]
    public function opendoc(): Response
    {
        return $this->render('app/pages/applications/products/opendoc.html.twig');
    }

    #[Route('/logiciel-en-ligne-transaction-immobiliere-lotys', name: 'lotys')]
    public function lotys(): Response
    {
        return $this->render('app/pages/softwares/products/lotys.html.twig');
    }
}

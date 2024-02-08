<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class RedirectController extends AbstractController
{
    #[Route('/logiciel-immobilier', name: 'old_softwares')]
    public function softwares(): Response
    {
        return $this->redirectToRoute('app_softwares');
    }

    #[Route('/logiciel-immobilier/syndic-de-copropriete', name: 'old_softwares_syndic')]
    public function softwaresSyndic(): Response
    {
        return $this->redirectToRoute('app_softwares_syndic');
    }

    #[Route('/logiciel-immobilier/gestion-immobiliere', name: 'old_softwares_gerance')]
    public function softwaresGerance(): Response
    {
        return $this->redirectToRoute('app_softwares_gerance');
    }

    #[Route('/logiciel-immobilier/transaction-immobiliere', name: 'old_softwares_lotys')]
    public function softwaresLotys(): Response
    {
        return $this->redirectToRoute('app_softwares_lotys');
    }

    #[Route('/creation-site-internet', name: 'old_websites')]
    public function websites(): Response
    {
        return $this->redirectToRoute('app_websites');
    }

    #[Route('/service-informatique', name: 'old_prestations')]
    public function prestations(): Response
    {
        return $this->redirectToRoute('app_prestations');
    }

    #[Route('/historique-societe', name: 'old_history')]
    public function history(): Response
    {
        return $this->redirectToRoute('app_society_history');
    }
}

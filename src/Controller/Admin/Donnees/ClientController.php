<?php

namespace App\Controller\Admin\Donnees;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin/donnees/clients', name: 'admin_data_clients_')]
class ClientController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(): Response
    {
        return $this->render('admin/pages/clients/index.html.twig');
    }
}

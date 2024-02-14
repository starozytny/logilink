<?php

namespace App\Controller;

use App\Entity\Main\Donnees\DoExtrait;
use App\Entity\Main\User;
use App\Repository\Main\Donnees\DoExtraitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
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

        return $this->render('user/pages/index.html.twig', [
            'extraits' => $extraits
        ]);
    }

    #[Route('/telecharger/facture/{id}', name: 'download_invoice')]
    public function downloadInvoice(DoExtrait $extrait): Response
    {
        $file = $this->getParameter('private_directory') . DoExtrait::FOLDER_INVOICE . $extrait->getFile();

        if(!$file){
            $this->addFlash('error', 'Fichier introuvable.');
            return $this->redirectToRoute('user_homepage');
        }

        return $this->file($file, null, ResponseHeaderBag::DISPOSITION_INLINE);
    }
}

<?php

namespace App\Controller\Api\Donnees;

use App\Entity\Main\Donnees\DoExtrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/donnees/extraits', name: 'api_data_extraits_')]
#[IsGranted('ROLE_ADMIN')]
class ExtraitController extends AbstractController
{
    #[Route('/extrait/{id}/invoice', name: 'extrait_invoice', methods: 'GET')]
    public function invoice(DoExtrait $extrait): BinaryFileResponse|JsonResponse
    {
        $file = $this->getParameter('private_directory') . DoExtrait::FOLDER_INVOICE . $extrait->getFile();

        if(!$file || !file_exists($file)){
            return $this->json('Fichier introuvable', 404);
        }

        return $this->file($file, null, ResponseHeaderBag::DISPOSITION_INLINE);
    }
}

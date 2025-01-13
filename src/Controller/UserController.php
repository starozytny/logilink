<?php

namespace App\Controller;

use App\Entity\Main\Donnees\DoExtrait;
use App\Entity\Main\Donnees\DoInvoice;
use App\Entity\Main\User;
use App\Repository\Main\Donnees\DoExtraitRepository;
use App\Repository\Main\Donnees\DoInvoiceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/espace-membre', name: 'user_')]
class UserController extends AbstractController
{
    #[Route('/', name: 'homepage')]
    public function index(DoExtraitRepository $repository, SerializerInterface $serializer): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $client = $user->getClient();

        $extraits = $repository->findBy(['client' => $client]);
        $extraits = $serializer->serialize($extraits, 'json', ['groups' => DoExtrait::LIST]);

        return $this->render('user/pages/index.html.twig', [
            'extraits' => $extraits,
        ]);
    }

    #[Route('/profil', name: 'profil', options: ['expose' => true])]
    public function profil(SerializerInterface $serializer): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        $user = $serializer->serialize($user, 'json', ['groups' => User::FORM]);

        return $this->render('user/pages/profil/index.html.twig', [
            'obj' => $user
        ]);
    }

    #[Route('/factures', name: 'invoices')]
    public function invoices(DoInvoiceRepository $repository, SerializerInterface $serializer): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $client = $user->getClient();

        $extraits = $repository->findBy(['client' => $client]);
        $extraits = $serializer->serialize($extraits, 'json', ['groups' => DoInvoice::LIST]);

        return $this->render('user/pages/invoices/index.html.twig', [
            'extraits' => $extraits,
        ]);
    }

    #[Route('/telecharger/facture/{id}', name: 'download_invoice', options: ['expose' => true])]
    public function downloadInvoice(DoExtrait $extrait): Response
    {
        $file = $this->getParameter('private_directory') . $extrait->getFolder() . $extrait->getFile();

        if(!$file || !file_exists($file)){
            $this->addFlash('error', 'Fichier introuvable.');
            return $this->redirectToRoute('user_homepage');
        }

        return $this->file($file, null, ResponseHeaderBag::DISPOSITION_INLINE);
    }
}

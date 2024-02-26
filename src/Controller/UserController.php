<?php

namespace App\Controller;

use App\Entity\Main\Donnees\DoExtrait;
use App\Entity\Main\User;
use App\Repository\Main\Donnees\DoExtraitRepository;
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
    public function index(Request $request, DoExtraitRepository $extraitRepository): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        $client = $user->getClient();
        $extraits1 = $extraitRepository->findBy(['client' => $client, 'codeSociety' => '001'], ['writeAt' => 'ASC']);
        $extraits2 = $extraitRepository->findBy(['client' => $client, 'codeSociety' => '002'], ['writeAt' => 'ASC']);

        $whichExtrait = $request->query->get('extrait');

        $active = "logilink";
        if($whichExtrait == null){
            $extraits = count($extraits1) > 0 ? $extraits1 : $extraits2;
        }else{
            if($whichExtrait == "2ilink"){
                $extraits = $extraits2;
                $active = "2ilink";
            }else{
                $extraits = $extraits1;
            }
        }

        return $this->render('user/pages/index.html.twig', [
            'extraits' => $extraits,
            'haveTwo' => count($extraits1) > 0 && count($extraits2) > 0,
            'active' => $active
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


    #[Route('/factures', name: 'invoices', options: ['expose' => true])]
    public function invoices(Request $request, DoExtraitRepository $extraitRepository): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        $client = $user->getClient();
        $extraits1 = $extraitRepository->findBy(['client' => $client, 'codeSociety' => '001'], ['writeAt' => 'ASC']);
        $extraits2 = $extraitRepository->findBy(['client' => $client, 'codeSociety' => '002'], ['writeAt' => 'ASC']);

        $whichExtrait = $request->query->get('extrait');

        $active = "logilink";
        if($whichExtrait == null){
            $extraits = count($extraits1) > 0 ? $extraits1 : $extraits2;
        }else{
            if($whichExtrait == "2ilink"){
                $extraits = $extraits2;
                $active = "2ilink";
            }else{
                $extraits = $extraits1;
            }
        }

        return $this->render('user/pages/invoices/index.html.twig', [
            'extraits' => $extraits,
            'haveTwo' => count($extraits1) > 0 && count($extraits2) > 0,
            'active' => $active
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

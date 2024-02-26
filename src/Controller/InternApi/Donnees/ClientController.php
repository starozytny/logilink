<?php

namespace App\Controller\InternApi\Donnees;

use App\Entity\Main\Donnees\DoClient;
use App\Entity\Main\Donnees\DoExtrait;
use App\Entity\Main\User;
use App\Repository\Main\Donnees\DoClientRepository;
use App\Repository\Main\Donnees\DoExtraitRepository;
use App\Repository\Main\UserRepository;
use App\Service\ApiResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/intern/api/donnees/clients', name: 'intern_api_data_clients_')]
#[IsGranted('ROLE_ADMIN')]
class ClientController extends AbstractController
{
    #[Route('/list', name: 'list', options: ['expose' => true], methods: 'GET')]
    public function list(DoClientRepository $repository, ApiResponse $apiResponse): Response
    {
        return $apiResponse->apiJsonResponse($repository->findAll(), DoClient::LIST);
    }

    #[Route('/clients-extraits', name: 'clients_extraits', options: ['expose' => true], methods: 'GET')]
    public function clientsExtraits(DoClientRepository $repository, DoExtraitRepository $extraitRepository,
                                    SerializerInterface $serializer, ApiResponse $apiResponse): Response
    {
        $clients = $serializer->serialize($repository->findAll(), 'json', ['groups' => DoClient::LIST]);
        $extraits1 = $serializer->serialize($extraitRepository->findBy(['codeSociety' => '001'], ['writeAt' => 'ASC']), 'json', ['groups' => DoExtrait::LIST]);
        $extraits2 = $serializer->serialize($extraitRepository->findBy(['codeSociety' => '002'], ['writeAt' => 'ASC']), 'json', ['groups' => DoExtrait::LIST]);

        return $apiResponse->apiJsonResponseCustom([
            'clients' => $clients,
            'extraits1' => $extraits1,
            'extraits2' => $extraits2,
        ]);
    }

    #[Route('/take/account/{id}', name: 'take_account', options: ['expose' => true], methods: 'put')]
    public function takeAccount(DoClient $client, ApiResponse $apiResponse, UserRepository $userRepository): Response
    {
        /** @var User $me */
        $me = $this->getUser();

        $me->setClient($client);

        $userRepository->save($me, true);

        $url = $this->generateUrl('user_homepage');
        return $apiResponse->apiJsonResponseCustom(['url' => $url]);
    }
}

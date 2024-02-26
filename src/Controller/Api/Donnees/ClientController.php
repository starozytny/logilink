<?php

namespace App\Controller\Api\Donnees;

use App\Repository\Main\Donnees\DoClientRepository;
use App\Repository\Main\Donnees\DoExtraitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/donnees/clients', name: 'api_data_clients_')]
#[IsGranted('ROLE_ADMIN')]
class ClientController extends AbstractController
{
    #[Route('/extraits', name: 'extraits', methods: 'GET')]
    public function clientsExtraits(DoClientRepository $repository, DoExtraitRepository $extraitRepository): Response
    {
        $societies = ['001', '002'];
        $clients = $repository->findAll();
        $extraits = $extraitRepository->findBy([], ['writeAt' => 'ASC']);

        $jsonData = [];
        foreach ($societies as $society) {

            $jsonClients = [];
            foreach ($clients as $client) {
                $solde = 0;
                $clientExtrait = [];
                foreach ($extraits as $extrait) {
                    if($extrait->getCodeSociety() == $society) {
                        if ($extrait->getClient()->getId() == $client->getId()) {

                            $solde = round($solde - ($extrait->getDebit()) + ($extrait->getCredit()), 2);
                            $fileUrl = $extrait->getFile()
                                ? $this->generateUrl(
                                    'api_data_extraits_extrait_invoice',
                                    ['id' => $extrait->getId()],
                                    UrlGeneratorInterface::ABSOLUTE_URL
                                )
                                : null;

                            $clientExtrait[] = [
                                'id' => $extrait->getId(),
                                'writeAt' => $extrait->getWriteAt()->format('d/m/Y'),
                                'account' => $extrait->getAccount(),
                                'name' => $extrait->getName(),
                                'letter' => $extrait->getLetter(),
                                'debit' => $extrait->getDebit(),
                                'credit' => $extrait->getCredit(),
                                'solde' => $solde,
                                'file' => $fileUrl
                            ];
                        }
                    }
                }

                if(count($clientExtrait) > 0){
                    $jsonClients[] = [
                        'id' => $client->getId(),
                        'code' => $client->getCode(),
                        'name' => $client->getName(),
                        'numero' => $client->getNumero(),
                        'extrait' => $clientExtrait
                    ];
                }
            }

            $jsonData[] = [
                'codeSociety' => $society,
                'clients' => $jsonClients,
            ];
        }

        return $this->json($jsonData);
    }
}

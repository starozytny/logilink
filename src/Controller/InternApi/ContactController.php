<?php

namespace App\Controller\InternApi;

use App\Entity\Main\Contact;
use App\Entity\Main\User;
use App\Repository\Main\ContactRepository;
use App\Service\ApiResponse;
use App\Service\Data\DataMain;
use App\Service\MailerService;
use App\Service\SettingsService;
use App\Service\ValidatorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/intern/api/contacts', name: 'intern_api_contacts_')]
class ContactController extends AbstractController
{
    #[Route('/list', name: 'list', options: ['expose' => true], methods: 'GET')]
    #[IsGranted('ROLE_ADMIN')]
    public function list(ContactRepository $repository, ApiResponse $apiResponse): Response
    {
        return $apiResponse->apiJsonResponse($repository->findAll(), Contact::LIST);
    }

    #[Route('/create', name: 'create', options: ['expose' => true], methods: 'POST')]
    public function create(Request $request, ApiResponse $apiResponse, ValidatorService $validator,
                           DataMain $dataEntity, ContactRepository $repository,
                           MailerService $mailerService, SettingsService $settingsService): Response
    {
        $data = json_decode($request->getContent());
        if ($data === null) {
            return $apiResponse->apiJsonResponseBadRequest('Les données sont vides.');
        }

        $obj = $dataEntity->setDataContact(new Contact(), $data);

        $noErrors = $validator->validate($obj);
        if ($noErrors !== true) {
            return $apiResponse->apiJsonResponseValidationFailed($noErrors);
        }

        $repository->save($obj, true);

        if(!$mailerService->sendMail(
            [$settingsService->getEmailContact()],
            "Logilink - Demande de contact : " . $obj->getSubject(),
            "Logilink - Demande de contact: " . $obj->getSubject(),
            'app/email/contact/contact.html.twig',
            ['contact' => $obj, 'settings' => $settingsService->getSettings()],
            [], [], $obj->getEmail()
        )) {
            return $apiResponse->apiJsonResponseValidationFailed([[
                'name' => 'to',
                'message' => "Le message n\'a pas pu être délivré. Veuillez contacter le support."
            ]]);
        }

        $dataEntity->createDataNotification("Demande de contact", "chat", null);
        return $apiResponse->apiJsonResponseSuccessful("Demande envoyée.");
    }

    #[Route('/delete/{id}', name: 'delete', options: ['expose' => true], methods: 'DELETE')]
    public function delete(Contact $obj, ContactRepository $repository, ApiResponse $apiResponse): Response
    {
        $repository->remove($obj, true);

        return $apiResponse->apiJsonResponseSuccessful("ok");
    }

    #[Route('/switch/seen/{id}', name: 'switch_seen', options: ['expose' => true], methods: 'PUT')]
    public function switchPublish(Contact $obj, ContactRepository $repository, ApiResponse $apiResponse): Response
    {
        $obj->setSeen(!$obj->isSeen());
        $repository->save($obj, true);
        return $apiResponse->apiJsonResponse($obj, Contact::LIST);
    }
}

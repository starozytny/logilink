<?php

namespace App\Controller;

use App\Service\StorageService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    public function index(): Response
    {
        return $this->render('app/pages/index.html.twig');
    }

    #[Route('/legales/mentions-legales', name: 'app_mentions')]
    public function mentions(): Response
    {
        return $this->render('app/pages/legales/mentions.html.twig');
    }

    #[Route('/legales/politique-confidentialite', name: 'app_politique', options: ['expose' => true])]
    public function politique(): Response
    {
        return $this->render('app/pages/legales/politique.html.twig');
    }

    #[Route('/legales/cookies', name: 'app_cookies', options: ['expose' => true])]
    public function cookies(): Response
    {
        return $this->render('app/pages/legales/cookies.html.twig');
    }

    #[Route('/creation-sites-internet-unique', name: 'app_websites')]
    public function websites(): Response
    {
        return $this->render('app/pages/websites/index.html.twig');
    }

    #[Route('/creation-site-internet/references', name: 'app_websites_references')]
    public function websitesReferences(): Response
    {
        return $this->render('app/pages/websites/references.html.twig');
    }

    #[Route('/creation-applications-mobile-tablette', name: 'app_applications')]
    public function applications(): Response
    {
        return $this->render('app/pages/applications/index.html.twig');
    }

    #[Route('/logiciels-metier', name: 'app_softwares')]
    public function softwares(): Response
    {
        return $this->render('app/pages/softwares/index.html.twig');
    }

    #[Route('/prestations-services', name: 'app_prestations')]
    public function prestations(): Response
    {
        return $this->render('app/pages/prestations/index.html.twig');
    }

    #[Route('/services-en-ligne', name: 'app_webservices')]
    public function webservices(): Response
    {
        return $this->render('app/pages/webservices/index.html.twig');
    }

    #[Route('/editeur-de-logiciels-professionnels', name: 'app_society')]
    public function society(): Response
    {
        return $this->render('app/pages/society/index.html.twig');
    }

    #[Route('/editeur-de-logiciels-professionnels/histoire', name: 'app_society_history')]
    public function history(): Response
    {
        return $this->render('app/pages/society/history.html.twig');
    }

    #[Route('/support-clients', name: 'app_support')]
    public function support(StorageService $storageService): Response
    {
        [$directories, $files] = $storageService->getDirectories('telemaint', $this->getParameter('support_directory'));

        foreach($directories as $directory){
            [$nDirectories, $nFiles] = $storageService->getDirectories($directory['path'], $this->getParameter('support_directory'));

            $tmpFiles = [];
            foreach($nFiles as $file){
                if($directory['path'] == "telemaint/Rustdesk"){
                    $tmpName = $file['name'];

                    $tmpName = substr($tmpName, 0, strpos($tmpName, 'host'));
                    $file['name'] = $tmpName . 'Logilink.exe';

                }

                $file['parent'] = $directory['path'];
                $tmpFiles[] = $file;
            }

            $files = array_merge($files, $tmpFiles);
        }

        return $this->render('app/pages/support/index.html.twig', [
            'directories' => $directories,
            'files' => $files
        ]);
    }

    #[Route('/support-technique/telecharger/{path}', name: 'app_support_download', requirements: ['path' => '.+'], defaults: ['path' => null])]
    public function supportDownload($path): BinaryFileResponse
    {
        $file = $this->getParameter('support_directory') . $path;

        $info = new \SplFileInfo($file);
        return $this->file($file, $info->getFilename());
    }
}

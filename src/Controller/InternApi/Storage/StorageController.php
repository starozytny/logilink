<?php

namespace App\Controller\InternApi\Storage;

use App\Service\ApiResponse;
use App\Service\StorageService;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/intern/api/storage', name: 'intern_api_storage_')]
#[IsGranted('ROLE_ADMIN')]
class StorageController extends AbstractController
{
    /**
     * @throws Exception
     */
    #[Route('/directory', name: 'directory', options: ['expose' => true], methods: 'POST')]
    public function directory(Request $request, ApiResponse $apiResponse, StorageService $storageService): Response
    {
        $data = json_decode($request->getContent());

        [$directories, $files] = $storageService->getDirectories($data->path, $data->isAdmin == "true" ? $this->getParameter('admin_directory') : null);

        $names = array_column($directories, 'nameToSort');
        array_multisort($names, SORT_ASC, $directories);

        return $apiResponse->apiJsonResponseCustom([
            'directories' => json_encode($directories),
            'files' => json_encode($files),
        ]);
    }

    #[Route('/download/{admin}/{deep}/{dir}/{filename}', name: 'download', options: ['expose' => true], methods: 'GET')]
    public function download(Request $request, $admin, $deep, $dir, $filename, ApiResponse $apiResponse): BinaryFileResponse|Response
    {
        $finder = new Finder();

        $deepFolder = "";
        if($deep >= 1){
            for($i = 1; $i <= $deep ; $i++){
                $deepFolder .= "*/";
            }
        }

        $directory = $admin == "true"
//            ? $this->getParameter('admin_directory') . ($deep >= 1 ? 'install-windev.logilink.fr/' : '')
            ? $this->getParameter('admin_directory') . 'install-windev.logilink.fr/'
            : $this->getParameter('private_directory')
        ;

        $finder->files()->in($directory . $deepFolder . ($dir == "racine" ? "" : $dir));
        if(!$finder->hasResults()){
            return $apiResponse->apiJsonResponseBadRequest("Le fichier n'existe pas.");
        }

        $filePath = null;
        foreach ($finder as $item) {
            if($item->getRelativePathname() == $filename){
                $filePath = $item->getLinkTarget();
            }
        }

        if(!file_exists($filePath)){
            return $apiResponse->apiJsonResponseBadRequest("Le fichier n'existe pas.");
        }

        $type = $request->query->get('file');
        if($type){
            return $this->file($filePath);
        }

        return $apiResponse->apiJsonResponseCustom(['url' => $this->generateUrl('intern_api_storage_download', [
            'admin' => $admin, 'deep' => $deep, 'dir' => $dir, 'filename' => $filename, 'file' => 1
        ])]);
    }

    #[Route('/directories', name: 'directories', options: ['expose' => true], methods: 'GET')]
    public function directories(ApiResponse $apiResponse, StorageService $storageService): Response
    {
        $adminDirectory =  $this->getParameter('admin_directory');

        [$directories, $files] = $storageService->getDirectories("install-windev.logilink.fr", $adminDirectory);

        $names = array_column($directories, 'nameToSort');
        array_multisort($names, SORT_ASC, $directories);

        $directories = $this->recuDirectories($storageService, $adminDirectory, $directories, 0);

        return $apiResponse->apiJsonResponseCustom([
            'directories' => json_encode($directories),
            'rootFiles' => json_encode($files),
        ]);
    }

    private function recuDirectories(StorageService $storageService, $adminDirectory, $directories, $deep): array
    {
        $deep = $deep + 1;

        $nDirectories = [];
        foreach($directories as $directory){
            $directory['deep'] = $deep - 1;

            [$directories1, $files1] = $storageService->getDirectories($directory['path'], $adminDirectory);

            $names = array_column($directories1, 'nameToSort');
            array_multisort($names, SORT_ASC, $directories1);

            $files1 = count($files1) > 0 ? $files1 : null;

            if($files1){
                $names = array_column($files1, 'nameToSort');
                array_multisort($names, SORT_ASC, $files1);
            }

            if(count($directories1) > 0){
                $directories1 = $this->recuDirectories($storageService, $adminDirectory, $directories1, $deep);

                $directory['files'] = $files1;
                $directory['children'] = $directories1;
            }else{
                $directory['files'] = $files1;
                $directory['children'] = null;
            }

            $nDirectories[] = $directory;
        }

        return $nDirectories;
    }
}

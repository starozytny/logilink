<?php

namespace App\Command\Donnees;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use ZipArchive;

#[AsCommand(
    name: 'donnees:clients:sync',
    description: 'Synchro data from zip',
)]
class DonneesClientsSyncCommand extends Command
{
    const FOLDER = 'clients/';
    const FOLDER_ARCHIVE = 'clients/archive';
    const FOLDER_EXTRACT = 'clients/extract';

    public function __construct(private readonly string $privateDirectory)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->title("Lecture des archives");

        $directory = $this->privateDirectory . self::FOLDER;
        $directoryArchive = $this->privateDirectory . self::FOLDER_ARCHIVE;
        $directoryExtract = $this->privateDirectory . self::FOLDER_EXTRACT;

        if(!is_dir($directoryArchive)) mkdir($directoryArchive);
        if(!is_dir($directoryExtract)) mkdir($directoryExtract);

        $scanned_directory = array_diff(scandir($directory), array('..', '.', '.gitignore', '.ftpquota'));

        foreach($scanned_directory as $dir){
            $file = $directory . $dir;
            if(!is_dir($file)){
                $zip = new ZipArchive;
                if ($zip->open($file) === TRUE) {
                    $zip->extractTo($directoryExtract);
                    $zip->close();
                    $io->text("Données extraites.");

                    $io->title("Synchronisation des clients");


                } else {
                    $io->error('Fichier : ' . $dir . ' n\'est pas une archive.');
                }
            }
        }

        return Command::SUCCESS;
    }
}

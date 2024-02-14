<?php

namespace App\Command\Donnees;

use App\Entity\Main\Donnees\DoClient;
use App\Entity\Main\Donnees\DoExtrait;
use App\Entity\Main\Society;
use App\Entity\Main\User;
use App\Service\Data\DataMain;
use App\Service\SanitizeData;
use League\Csv\ByteSequence;
use League\Csv\Exception;
use League\Csv\InvalidArgument;
use League\Csv\Reader;
use League\Csv\UnavailableFeature;
use League\Csv\UnavailableStream;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
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

    public function __construct(private readonly string $privateDirectory,
                                private readonly ManagerRegistry $registry,
                                private readonly SanitizeData $sanitizeData,
                                private readonly DataMain $dataMain)
    {
        parent::__construct();
    }

    /**
     * @throws InvalidArgument
     * @throws UnavailableStream
     * @throws UnavailableFeature
     * @throws Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->title("Lecture des archives");

        $directory = $this->privateDirectory . self::FOLDER;
        $directoryArchive = $this->privateDirectory . self::FOLDER_ARCHIVE;
        $directoryExtract = $this->privateDirectory . self::FOLDER_EXTRACT;

        if(!is_dir($directoryArchive)) mkdir($directoryArchive);
        if(!is_dir($directoryExtract)) mkdir($directoryExtract);

        $clients = $this->registry->getRepository(DoClient::class)->findAll();
        $society = $this->registry->getRepository(Society::class)->findOneBy(['code' => 999]);
        $password = password_hash("azerty", PASSWORD_DEFAULT);

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

                    $csv = Reader::createFromPath($directoryExtract . "/clients.csv", 'r');
                    $csv->setOutputBOM(ByteSequence::BOM_UTF8);
                    $csv->addStreamFilter('convert.iconv.ISO-8859-1/UTF-8');
                    $csv->setDelimiter(';');
                    $records = $csv->getRecords();

                    $progressBar = new ProgressBar($output, iterator_count($records));
                    $progressBar->start();

                    foreach($records as $item){
                        $code = $this->sanitizeData->trimData($item[0]);

                        $client = new DoClient();
                        foreach($clients as $cl){
                            if($cl->getCode() == $code){
                                $client = $cl;
                            }
                        }

                        $client = ($client)
                            ->setCode($code)
                            ->setName($this->sanitizeData->trimData($item[1]))
                            ->setNumero($this->sanitizeData->trimData($item[6]))
                            ->setAddress($this->sanitizeData->trimData($item[2]))
                            ->setComplement($this->sanitizeData->trimData($item[3]))
                            ->setZipcode($this->sanitizeData->trimData($item[4]))
                            ->setCity($this->sanitizeData->trimData($item[5]))
                        ;

                        $this->registry->getManager()->persist($client);

                        $user = $this->dataMain->setDataUser($client->getUser() ?: new User(), json_decode(
                            json_encode([
                                'username' => $code,
                                'firstname' => "Client",
                                'lastname' => $client->getName(),
                                'email' => null,
                                'roles' => ['ROLE_USER']
                            ])
                        ));
                        $user = ($user)
                            ->setPassword($password)
                            ->setClient($client)
                            ->setSociety($society)
                            ->setManager($society->getManager())
                            ->setBlocked($this->sanitizeData->trimData($item[7]) == 1)
                        ;

                        $this->registry->getManager()->persist($user);
                        $progressBar->advance();
                    }

                    $progressBar->finish();
                    $this->registry->getManager()->flush();

                    $io->newLine();
                    $io->newLine();
                    $io->title("Synchronisation des extraits de comptes");

                    $clients = $this->registry->getRepository(DoClient::class)->findAll();

                    $csv = Reader::createFromPath($directoryExtract . "/extraitcompte.csv", 'r');
                    $csv->setOutputBOM(ByteSequence::BOM_UTF8);
                    $csv->addStreamFilter('convert.iconv.ISO-8859-1/UTF-8');
                    $csv->setDelimiter(';');
                    $records = $csv->getRecords();

                    $progressBar = new ProgressBar($output, iterator_count($records));
                    $progressBar->start();

                    foreach($records as $item){
                        $numero = $this->sanitizeData->trimData($item[0]);

                        $client = null;
                        foreach($clients as $cl){
                            if($cl->getNumero() == $numero){
                                $client = $cl;
                            }
                        }

                        if(!$client){
                            $io->error('Client introuvable : ' . $item[0] . ' - ' . $item[1]);
                        }else{
                            $extrait = (new DoExtrait())
                                ->setNumero($numero)
                                ->setAccount($this->sanitizeData->trimData($item[1]))
                                ->setWriteAt($this->sanitizeData->createDatePicker($item[2]))
                                ->setCode($this->sanitizeData->trimData($item[3]))
                                ->setPiece($this->sanitizeData->trimData($item[4]))
                                ->setName($this->sanitizeData->trimData($item[5]))
                                ->setLetter($this->sanitizeData->trimData($item[6]))
                                ->setDebit($this->sanitizeData->setToFloat($item[7], 0))
                                ->setCredit($this->sanitizeData->setToFloat($item[8], 0))
                                ->setClient($client)
                                ->setArchive($dir)
                            ;

                            $this->registry->getManager()->persist($extrait);
                            $progressBar->advance();
                        }
                    }

                    $progressBar->finish();
                    $this->registry->getManager()->flush();
                } else {
                    $io->newLine();
                    $io->error('Fichier : ' . $dir . ' n\'est pas une archive.');
                }
            }
        }


        $io->newLine();
        $io->newLine();
        $io->comment('--- [FIN DE LA COMMANDE] ---');
        return Command::SUCCESS;
    }
}

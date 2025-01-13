<?php

namespace App\Command\Fix;

use App\Entity\Main\User;
use App\Service\Data\DataMain;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'fix:tmp:data',
    description: 'fix data tmp',
)]
class FixTmpDataCommand extends Command
{
    private ManagerRegistry $registry;
    private DataMain $dataMain;

    public function __construct(ManagerRegistry $registry, DataMain $dataMain)
    {
        parent::__construct();

        $this->registry = $registry;
        $this->dataMain = $dataMain;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->title('Update des donnees');
        $em = $this->registry->getManager();

        $data = $em->getRepository(User::class)->findBy(['firstname' => 'Client']);

        $progressBar = new ProgressBar($output, count($data));
        $progressBar->start();

        foreach ($data as $item){
            $password = password_hash(
                $this->dataMain->getPasswordGeneric($item->getUsername()),
                PASSWORD_DEFAULT
            );

            $item->setPassword($password);

            $progressBar->advance();
        }
        $progressBar->finish();

        $em->flush();

        $io->newLine();
        $io->newLine();
        $io->comment('--- [FIN DE LA COMMANDE] ---');
        return Command::SUCCESS;
    }
}

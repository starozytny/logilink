<?php

namespace App\Repository\Main\Donnees;

use App\Entity\Main\Donnees\DoSynchro;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<DoSynchro>
 *
 * @method DoSynchro|null find($id, $lockMode = null, $lockVersion = null)
 * @method DoSynchro|null findOneBy(array $criteria, array $orderBy = null)
 * @method DoSynchro[]    findAll()
 * @method DoSynchro[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DoSynchroRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DoSynchro::class);
    }

//    /**
//     * @return Synchro[] Returns an array of Synchro objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Synchro
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

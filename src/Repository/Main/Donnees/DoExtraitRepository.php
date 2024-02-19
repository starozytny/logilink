<?php

namespace App\Repository\Main\Donnees;

use App\Entity\Main\Donnees\DoExtrait;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<DoExtrait>
 *
 * @method DoExtrait|null find($id, $lockMode = null, $lockVersion = null)
 * @method DoExtrait|null findOneBy(array $criteria, array $orderBy = null)
 * @method DoExtrait[]    findAll()
 * @method DoExtrait[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DoExtraitRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DoExtrait::class);
    }

//    /**
//     * @return DoExtrait[] Returns an array of DoExtrait objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('d.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?DoExtrait
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

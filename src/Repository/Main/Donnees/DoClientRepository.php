<?php

namespace App\Repository\Main\Donnees;

use App\Entity\Main\Donnees\DoClient;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<DoClient>
 *
 * @method DoClient|null find($id, $lockMode = null, $lockVersion = null)
 * @method DoClient|null findOneBy(array $criteria, array $orderBy = null)
 * @method DoClient[]    findAll()
 * @method DoClient[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DoClientRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DoClient::class);
    }

//    /**
//     * @return Client[] Returns an array of Client objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Client
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

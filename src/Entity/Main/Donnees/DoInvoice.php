<?php

namespace App\Entity\Main\Donnees;

use App\Repository\Main\Donnees\DoInvoiceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DoInvoiceRepository::class)]
class DoInvoice
{
    const FOLDER_INVOICE_001 = "clients/files/invoices-001/";
    const FOLDER_INVOICE_002 = "clients/files/invoices-002/";

    const LIST = ['invoices_list'];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['invoices_list'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['invoices_list'])]
    private ?\DateTimeInterface $writeAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invoices_list'])]
    private ?string $piece = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invoices_list'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['invoices_list'])]
    private ?float $total = null;

    #[ORM\Column(length: 255)]
    private ?string $archive = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invoices_list'])]
    private ?string $file = null;

    #[ORM\Column(length: 10)]
    #[Groups(['invoices_list'])]
    private ?string $codeSociety = null;

    #[ORM\Column]
    #[Groups(['invoices_list'])]
    private ?int $rang = null;

    #[ORM\Column]
    private ?int $logicielId = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    private ?DoClient $client = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWriteAt(): ?\DateTimeInterface
    {
        return $this->writeAt;
    }

    public function setWriteAt(\DateTimeInterface $writeAt): static
    {
        $this->writeAt = $writeAt;

        return $this;
    }

    public function getPiece(): ?string
    {
        return $this->piece;
    }

    public function setPiece(string $piece): static
    {
        $this->piece = $piece;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getTotal(): ?float
    {
        return $this->total;
    }

    public function setTotal(float $total): static
    {
        $this->total = $total;

        return $this;
    }

    public function getArchive(): ?string
    {
        return $this->archive;
    }

    public function setArchive(string $archive): static
    {
        $this->archive = $archive;

        return $this;
    }

    public function getFile(): ?string
    {
        return $this->file;
    }

    public function setFile(string $file): static
    {
        $this->file = $file;

        return $this;
    }

    public function getCodeSociety(): ?string
    {
        return $this->codeSociety;
    }

    public function setCodeSociety(string $codeSociety): static
    {
        $this->codeSociety = $codeSociety;

        return $this;
    }

    public function getRang(): ?int
    {
        return $this->rang;
    }

    public function setRang(int $rang): static
    {
        $this->rang = $rang;

        return $this;
    }

    public function getLogicielId(): ?int
    {
        return $this->logicielId;
    }

    public function setLogicielId(int $logicielId): static
    {
        $this->logicielId = $logicielId;

        return $this;
    }

    public function getClient(): ?DoClient
    {
        return $this->client;
    }

    public function setClient(?DoClient $client): static
    {
        $this->client = $client;

        return $this;
    }

    public function getFolder(): string
    {
        return $this->getCodeSociety() == "001" ? DoInvoice::FOLDER_INVOICE_001 : DoInvoice::FOLDER_INVOICE_002;
    }
}

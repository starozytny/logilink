<?php

namespace App\Entity\Main\Donnees;

use App\Repository\Main\Donnees\DoExtraitRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DoExtraitRepository::class)]
class DoExtrait
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $numero = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $account = null;

    #[ORM\Column]
    private ?\DateTime $writeAt = null;

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $code = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $piece = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $letter = null;

    #[ORM\Column(nullable: true)]
    private ?float $debit = null;

    #[ORM\Column(nullable: true)]
    private ?float $credit = null;

    #[ORM\ManyToOne(inversedBy: 'extraits')]
    #[ORM\JoinColumn(nullable: false)]
    private ?DoClient $client = null;

    #[ORM\Column(length: 255)]
    private ?string $archive = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumero(): ?string
    {
        return $this->numero;
    }

    public function setNumero(string $numero): static
    {
        $this->numero = $numero;

        return $this;
    }

    public function getAccount(): ?string
    {
        return $this->account;
    }

    public function setAccount(?string $account): static
    {
        $this->account = $account;

        return $this;
    }

    public function getWriteAt(): ?\DateTime
    {
        return $this->writeAt;
    }

    public function setWriteAt(\DateTime $writeAt): static
    {
        $this->writeAt = $writeAt;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(?string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getPiece(): ?string
    {
        return $this->piece;
    }

    public function setPiece(?string $piece): static
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

    public function getLetter(): ?string
    {
        return $this->letter;
    }

    public function setLetter(?string $letter): static
    {
        $this->letter = $letter;

        return $this;
    }

    public function getDebit(): ?float
    {
        return $this->debit;
    }

    public function setDebit(?float $debit): static
    {
        $this->debit = $debit;

        return $this;
    }

    public function getCredit(): ?float
    {
        return $this->credit;
    }

    public function setCredit(?float $credit): static
    {
        $this->credit = $credit;

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

    public function getArchive(): ?string
    {
        return $this->archive;
    }

    public function setArchive(string $archive): static
    {
        $this->archive = $archive;

        return $this;
    }
}

<?php

namespace App\Entity\Main\Donnees;

use App\Entity\Main\User;
use App\Repository\Main\Donnees\DoClientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DoClientRepository::class)]
class DoClient
{
    const LIST = ['client_list'];
    const SELECT = ['client_select'];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['client_list', 'extraits_list'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['client_list'])]
    private ?string $code = null;

    #[ORM\Column(length: 255)]
    #[Groups(['client_list'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['client_list'])]
    private ?string $numero = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $address = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $complement = null;

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $zipcode = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $city = null;

    #[ORM\OneToMany(mappedBy: 'client', targetEntity: DoExtrait::class)]
    private Collection $extraits;

    #[ORM\OneToMany(mappedBy: 'client', targetEntity: User::class)]
    private Collection $users;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column]
    #[Groups(['client_list'])]
    private ?bool $blocked = null;

    /**
     * @var Collection<int, DoInvoice>
     */
    #[ORM\OneToMany(mappedBy: 'client', targetEntity: DoInvoice::class)]
    private Collection $invoices;

    public function __construct()
    {
        $this->extraits = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->invoices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

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

    public function getNumero(): ?string
    {
        return $this->numero;
    }

    public function setNumero(?string $numero): static
    {
        $this->numero = $numero;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getComplement(): ?string
    {
        return $this->complement;
    }

    public function setComplement(?string $complement): static
    {
        $this->complement = $complement;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(?string $zipcode): static
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): static
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return Collection<int, DoExtrait>
     */
    public function getExtraits(): Collection
    {
        return $this->extraits;
    }

    public function addExtrait(DoExtrait $extrait): static
    {
        if (!$this->extraits->contains($extrait)) {
            $this->extraits->add($extrait);
            $extrait->setClient($this);
        }

        return $this;
    }

    public function removeExtrait(DoExtrait $extrait): static
    {
        if ($this->extraits->removeElement($extrait)) {
            // set the owning side to null (unless already changed)
            if ($extrait->getClient() === $this) {
                $extrait->setClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setClient($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getClient() === $this) {
                $user->setClient(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function isBlocked(): ?bool
    {
        return $this->blocked;
    }

    public function setBlocked(bool $blocked): static
    {
        $this->blocked = $blocked;

        return $this;
    }

    /**
     * @return Collection<int, DoInvoice>
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(DoInvoice $invoice): static
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices->add($invoice);
            $invoice->setClient($this);
        }

        return $this;
    }

    public function removeInvoice(DoInvoice $invoice): static
    {
        if ($this->invoices->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getClient() === $this) {
                $invoice->setClient(null);
            }
        }

        return $this;
    }

    #[Groups(['client_select'])]
    public function getValue(): ?int
    {
        return $this->id;
    }

    #[Groups(['client_select'])]
    public function getLabel(): ?string
    {
        return $this->code . ' - ' . $this->name;
    }
}

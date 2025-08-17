<?php

namespace App\Entity;

use App\Entity\Task;
use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CommentRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: CommentRepository::class)]
#[ApiResource(
    mercure:true,
    normalizationContext: ['groups' => ['comment:read']],
    denormalizationContext: ['groups' => ['comment:write']],
)]
class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['comment:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'text')]
    #[Groups(['comment:read', 'comment:write'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[Groups(['task:read', 'task:write', 'comment:read', 'comment:write'])]
    #[MaxDepth(1)]
    #[SerializedName('taskId')]
    private ?Task $task_id = null;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['task:read', 'comment:read', 'comment:write'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[Groups(['comment:read', 'comment:write'])]
    #[MaxDepth(1)]
    #[SerializedName('userId')]
    private ?User $userId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;
        return $this;
    }

    #[Groups(['comment:read'])]
    public function getTaskId(): ?Task
    {
        return $this->task_id;
    }

    #[Groups(['comment:write'])]
    public function setTaskId(?Task $task_id): static
    {
        $this->task_id = $task_id;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;
        return $this;
    }

    #[Groups(['comment:read'])]
    public function getUserId(): ?User
    {
        return $this->userId;
    }

    #[Groups(['comment:write'])]
    public function setUserId(?User $userId): static
    {
        $this->userId = $userId;
        return $this;
    }
}
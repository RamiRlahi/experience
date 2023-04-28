<?php
class PromoModel{
    //Attributs
private ?int $ref = null;
private ?int $ref_abonnement = null;
private ?int $pourcentage = null;
private ?DateTime $date_debut = null;
private ?DateTime $date_fin = null;


public function __construct(?int $ref, ?int $ref_abonnement, ?int $pourcentage, ?string $date_debut, ?string $date_fin) {
    $this->ref = $ref;
    $this->ref_abonnement = $ref_abonnement;
    $this->pourcentage = $pourcentage;
    
    // Create DateTime objects from input strings
    $this->date_debut = DateTime::createFromFormat('d/m/Y', $date_debut);
    if (!$this->date_debut) {
        throw new InvalidArgumentException('Invalid date_debut format');
    }
    
    $this->date_fin = DateTime::createFromFormat('d/m/Y', $date_fin);
    if (!$this->date_fin) {
        throw new InvalidArgumentException('Invalid date_fin format');
    }
}



    
    public function getref()
    {
        return $this->ref;
    }
    public function getref_abonnement()
    {
        return $this->ref_abonnement;
    }

    
    public function getpourcentage()
    {
        return $this->pourcentage;
    }

    public function getdate_debut()
    {
        return $this->date_debut;
    }

    public function getdate_fin()
    {
        return $this->date_fin;
    }

    
    public function setref_abonnement($ref_abonnement)
    {
        $this->ref_abonnement = $ref_abonnement;

        return $this;
    }
    public function setpourcentage($pourcentage)
    {
        $this->pourcentage = $pourcentage;

        return $this;
    }

    public function setdate_debut($date_debut)
    {
        $this->date_debut = $date_debut;

        return $this;
    }

    public function setdate_fin($date_fin)
    {
        $this->date_fin = $date_fin;

        return $this;
    }
}
?> 
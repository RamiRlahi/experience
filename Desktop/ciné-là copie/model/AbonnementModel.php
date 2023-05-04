<?php
class AbonnementModel{
    //Attributs
private ?int $ref = null;
private ?string $titre = null;
private ?string $description = null;
private ?int $prix = null;
private ?string $image = null;

public function __construct( $ref=null, $titre, $description, $prix, $image)
{
    $this->ref = $ref;
    $this->titre = $titre;
    $this->description = $description;
    $this->prix = $prix;
    $this->image = $image;
}

    
    public function getref()
    {
        return $this->ref;
    }

    
    public function gettitre()
    {
        return $this->titre;
    }

    public function getdescription()
    {
        return $this->description;
    }

    public function getprix()
    {
        return $this->prix;
    }

    public function getimage()
    {
        return $this->image;
    }

    
    public function settitre($titre)
    {
        $this->titre = $titre;

        return $this;
    }

    public function setdescription($description)
    {
        $this->description = $description;

        return $this;
    }

    public function setprix($prix)
    {
        $this->prix = $prix;

        return $this;
    }

    public function setimage($image)
    {
        $this->image = $image;

        return $this;
    }
}
?> 

    
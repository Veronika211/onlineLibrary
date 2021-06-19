//ovom klasom definisemo kako ce izgledati 
class Knjiga{
    constructor(id, zanroviId, naslov, autor, slika,cena,opis){
        this.id = id;
        this.zanroviId = zanroviId;
        this.naslov = naslov;
        this.autor = autor;
        this.slika = slika;
        this.cena = cena;
        this.opis = opis;
    }
}

export default Knjiga;


class Usuarios {

    constructor(){
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){

        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;

    }

    getPersona(id){

        //filter regresa un nuevo arreglo
        let persona = this.personas.filter( per => per.id === id )[0];

        return persona; //si no hay persona, retornara undefined o null
    }

    getPersonas() { 
        return this.personas; 
    } 

    getPeronasPorSala( sala ){
        let personasSala = this.personas.filter( persona =>{
            return persona.sala === sala;
        });
        return personasSala;
    }

    borrarPersona(id){

        let personaBorrada = this.getPersona(id); //aqui tendremos una referencia de la persona borrada

        this.personas = this.personas.filter( per => per.id != id );
    
        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}
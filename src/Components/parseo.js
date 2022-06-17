const Parseo= (Codigo) => {

    
    //originalWord = Code; 
    const newCodigo = Codigo.split("#").join(''); 
    
    return(newCodigo);
}

export default Parseo;
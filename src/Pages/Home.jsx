import React, { useRef, useState } from 'react'
import {Button, Spinner, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';
import * as FaIcons from 'react-icons/fa';
import TablePruebasPCB from '../Components/TablePruebasPCB';
import axios from 'axios';
import ParentChild from '../Components/ParentChild';
import Footer from '../Components/Footer';
import * as XLSX from 'xlsx/xlsx.mjs';
import swal from 'sweetalert';
import Parseo from '../Components/parseo';
import Sidebar from '../Components/Sidebar';
import DetalleCodigo from '../Components/DetalleCodigo';
import IconLimpiar from '../icons/IconLimpiar';
const Home = () => {
    //VARIBALES PARA exportar a excel
    const [pruebasPCB, setPruebasPCB] = useState([]);
    const [pruebasFA, setPruebasFA] = useState([]);
    const [pruebasCodigoNoIdentif, setPruebasCodigoNoIdentif] = useState([]);
    const [parentChild, setParentChild] = useState([]); //variable donde recibimos la relacion de parent y child
    const [detalle70Barcode, setdetalle70Barcode] = useState([]);
    const valorBuscar = useRef(); //variable para tomar lo escrito en el input de la serie
    const [loadingPCBData, setLoadingPCBData] = useState(false);
    const [loadingFAData, setLoadingFAData] = useState(false);
    const server = 'TJTEST';
    const ejecucion = () =>{ // metodo llamado que des encadena la ejecucion
        const valorBusqueda = valorBuscar.current.value;
        if(valorBusqueda !== ''){ 

            //Variables para el loader y datos para mostrar en la tabla
            limpiarPantalla();
            setLoadingPCBData(true);
            setLoadingFAData(true);
            buscarParetChild(valorBusqueda);// se llama la busqueda del parent - child

        }else{// cuando se recibe un valor vacio.
            swal({
                title:'ERROR',
                text:'El codigo buscado no puede ser vacio',
                icon:'error',
                button: 'Aceptar'
            });
        }
        
    }
    
    const buscarParetChild = (valorBusqueda)=>{ //se recibe el valor de busqueda y buscamos la relacion parent - child.
        try{

           axios.get(`http://${server}:3001/relacionparentchilt/${valorBusqueda}`) //Hacemos la llamada al API.
            .then(response =>{
                setParentChild(response.data); // agregamos la respuesta a una variable.
                if(response.data !== 'Error, No se encontro relacion Parent - Child'){ ///si se encuentran parent y child
                   
                    if(response.data.child){ // Si se encuentra registro de un child buscamos los registros de prueba del PCB 
                        buscarPruebasPCB(response.data.child)// llamamos al metodo para buscar las pruebas del PCB
                    }
                    if(response.data.parent.length === 15 || response.data.parent.length === 23){ // si el parent tiene la longitud permitida se hace las busquedas de las pruebas
                        buscarPruebasFA(response.data.parent);// llamamos al metodo para buscar las pruebas del Parent
                    }else{//Cuando no hay relacion parent child se parsea el codigo ingresado
                        convertirALLto23(Parseo(response.data.parent)); //llamamos el metodo de parseo y conversion a 23
                    }
                }else if(response.data === 'Error, No se encontro relacion Parent - Child'){ // si no se encuentra la relacion parent child avisamos al usuario

                   
                    swal({ // alerta al usuario
                        title:'ATENCION',
                        text:'No se encontro una relacion entre Parent y Child',
                        icon:'info',
                        button: 'Aceptar'
                    });

                    if(valorBusqueda.length === 15 || valorBusqueda.length === 23){ //validamos la longitud del dato recibido
                        buscarPruebasCodigosNoIdentificados(Parseo(valorBusqueda)) //hacemos la busqueda del historial del pruebas, pasando primero por el parseo.
                    }else{//si no cumple con la longitud necesaria, se pasa el dato por el metodo de parseo.
                        setLoadingPCBData(false);
                        convertirALLto23(Parseo(valorBusqueda));
                    }
                }
            });
        }catch(error){
            console.log(error);    
        }
   }
   const limpiarPantalla =()=>{
        setPruebasPCB([]);
        setPruebasFA([]);
        setPruebasCodigoNoIdentif([])
        setParentChild([]);
        setdetalle70Barcode([]);
        setLoadingPCBData(false);
        setLoadingFAData(false);
        valorBuscar.current.value = "";
        valorBuscar.current.focus();
   }
   const convertirALLto23 = (codigo80)=>{

        try{ 
                axios.get(`http://${server}:3001/convertirAllto23/${codigo80}`)
            .then(response => {
                if(codigo80.length === 70){
                    setdetalle70Barcode(response.data);
                }
                //console.log(response.data)
                buscarPruebasFA(response.data.code23);

            });
        }catch(error){
            console.log(error);
        }
    }
    const buscarPruebasPCB = async(PBCbuscado)=>{
        if(PBCbuscado.length === 15 || PBCbuscado.length === 23){ //validamos longitud
            try{ 
                if(parentChild === 'Error, No se encontraron datos'){ 

                    await axios.get(`http://${server}:3001/PCB/${PBCbuscado}`)
                    .then(response => {
                        console.log('Respuesta recibida'+response.data);
                        
                        if(response.data === 'PCB NO ENCONTRADO'){

                            swal({
                                title:'ATENCION',
                                text:'No se encontraron datos de prueba para este PCB.',
                                icon:'warning',
                                button: 'Aceptar'
                            });
                           
                            
                        }else{  
                            setPruebasPCB(response.data);
                        }

                    });
                    setLoadingPCBData(false);
                }else{

                    await axios.get(`http://${server}:3001/PCB/${PBCbuscado}`)
                    .then(response => {

                        if(response.data === 'PCB NO ENCONTRADO'){
                            setLoadingPCBData(false);

                           swal({
                                title:'ATENCION',
                                text:'No se encontraron datos de prueba para el PCB buscado.',
                                icon:'warning',
                                button: 'Aceptar'
                            });
                            
                        }else{  

                            setPruebasPCB(response.data);
                            setLoadingPCBData(false);
                        }
                    });
                    setLoadingPCBData(false);
                }

            }catch(error){
                console.log(error);
            }
           
        }else{

            swal({
                title:'Error',
                text:'El codigo ingresado no corresponde a un PCB.',
                icon:'error',
                button: 'Aceptar',
            });
            setLoadingPCBData(false);
        }
    }   
    const buscarPruebasFA = async(codigo23)=>{

            try{ 

                await axios.get(`http://${server}:3001/PCB/${codigo23}`)
                .then(response => {
                    if(response.data === 'PCB NO ENCONTRADO'){

                        swal({
                            title:'Error',
                            text:'ERROR, No se encontro el Producto buscado.',
                            icon:'error',
                            button: 'Aceptar'
                        });

                       setLoadingFAData(false);
                    }else{  
                        setPruebasFA(response.data);

                    }
                });
                setLoadingFAData(false);
            }catch(error){
                console.log(error);
            }
           
        
    }
    const buscarPruebasCodigosNoIdentificados = async(codigo)=>{

            try{ 
                await axios.get(`http://${server}:3001/PCB/${codigo}`)
                .then(response => {
                    if(response.data === 'PCB NO ENCONTRADO'){
                        
                        if(codigo.length === 15){
                            //---------------------------------------------------------------------------alert('se identifico el codigo con longitud 15')
                            //Variables para el loader y datos para mostrar en la tabla
                            /*setLoadingPCBData(true);
                            setLoadingFAData(true);*/
                            console.log(loadingFAData+'<- Datos ->'+loadingPCBData);
                            try{ 
                                axios.get(`http://${server}:3001/GMBarcodes/${codigo}`)
                                .then(response => {

                                    if(response.data.length > 0 && response.data !== 'NO SE ENCONTRARON CODIGOS'){

                                        buscarParetChild(response.data[0]["GMBigBarcode"]);
                                    }else{
                                        swal({
                                            title:'Error',
                                            text:`ERROR, No se encontro resgistro de pruebas para el codigo ${codigo}.`,
                                            icon:'error',
                                            button: 'Aceptar',
                                        });
                                    }
                    
                                });
                            }catch(error){
                                console.log(error);
                            }
                        }else{

                            swal({
                                title:'Error',
                                text:`ERROR, No se encontro resgistro de pruebas para el codigo ${codigo}.`,
                                icon:'error',
                                button: 'Aceptar',
                            });

                           setLoadingPCBData(false);
                           setLoadingFAData(false);

                        }
                    }else{  
                        setPruebasCodigoNoIdentif(response.data);

                       setLoadingPCBData(false);
                       setLoadingFAData(false);
                    }
                });
                //setLoadingPCBData(false);
                //setLoadingFAData(false);
            }catch(error){
                console.log(error);
            }
           
        
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          ejecucion();
        }
    }
    //Metodo que sirve para exportar los datos a Excel.
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(pruebasFA);
        const ws2 = XLSX.utils.json_to_sheet(pruebasPCB);
        const ws3 = XLSX.utils.json_to_sheet(pruebasCodigoNoIdentif);
        const wb = XLSX.utils.book_new();
         
        //validamos si existen datos de prueba guardados en las varibles para generar las hojas de excel.
        if(pruebasPCB.length > 0){
            XLSX.utils.book_append_sheet(wb, ws2, "Pruebas PCB");
        }else{

        } 
        if(pruebasFA.length > 0){
            XLSX.utils.book_append_sheet(wb, ws, "Pruebas FA");
        }else{

        } 
        if(pruebasCodigoNoIdentif.length > 0){
            XLSX.utils.book_append_sheet(wb, ws3, "Pruebas sin relacion en Genie");
        }else{}

        if(pruebasPCB.length > 0){
            XLSX.writeFile(wb, `Historial de Pruebas ${pruebasPCB[0].BarcodeSerialNumber}.xlsx`); //Agregar el modelo al nombre del documento. 
        }else if(pruebasFA.length > 0){
            XLSX.writeFile(wb, `Historial de Pruebas ${pruebasFA[0].BarcodeSerialNumber}.xlsx`); //Agregar el modelo al nombre del documento. 
        }else if(pruebasCodigoNoIdentif.length > 0){
            XLSX.writeFile(wb, `Historial de Pruebas ${pruebasCodigoNoIdentif[0].BarcodeSerialNumber}.xlsx`); //Agregar el modelo al nombre del documento. 
        }
      //  XLSX.writeFile(wb, `Historial de Pruebas.xlsx`); //Agregar el modelo al nombre del documento. 
    } 
  return (
    <div>
        <Sidebar/>
        <div className="containerTitulo">
            <h1>Historial de Pruebas</h1>
        </div>
        <div className="container">
            <div className="container">
                
                <Form.Control
                 className='txtbusqueda' 
                 size="text" type="text" 
                 placeholder="Ingrese codigo a buscar" 
                 ref={valorBuscar} autoFocus
                 onKeyDown={handleKeyDown}
                 />
                <Button variant="primary" className='btnbuscar' title='Buscar' id='input' onClick={ejecucion} ><FaIcons.FaSearch/></Button>
            </div>
            <Button variant="primary" className='btnlimpiar bg-warning text-dark' title='Limpiar Pantalla' onClick={limpiarPantalla}><IconLimpiar width={30} height={30}/></Button>
        </div>
        {parentChild.length === 0 ?
            <h6> </h6>
        :
            <ParentChild
                datos = {parentChild}
            />
        }
        {detalle70Barcode.length ===0 ?
            <h6></h6>
        :
        <DetalleCodigo
            datos = {detalle70Barcode}
        />
        }

        {pruebasPCB.length === 0 ? 
            <h6> </h6>
        :
            <h2 className='espaciadoVertical'>Pruebas PCB</h2>
        }

        {loadingPCBData  && pruebasPCB.length === 0 ? 
            <Spinner animation = "border" className='espaciadoVertical'/>
        :
            <h6> </h6>
        }

        { pruebasPCB.length === 0 ? 
            <h6> </h6>
            :
            <TablePruebasPCB
              infoPCBTable = {pruebasPCB}
            />
        }

        {pruebasFA.length === 0 ? 
            <h6> </h6>
        :

            <h2 className='espaciadoVertical'>Pruebas Ensamble Final</h2>
        }

        {loadingFAData  && pruebasPCB.length === 0 ? 
            <Spinner animation = "border" className='espaciadoVertical' />
        :
            <h6> </h6>
        }

        { pruebasFA.length === 0 ? 
            <h6> </h6>
        :
            <TablePruebasPCB
            infoPCBTable = {pruebasFA}
            />
        }

        {pruebasCodigoNoIdentif.length === 0 ? 
            <h6> </h6>
        :
            <h2 className='espaciadoVertical'>Historial de pruebas:</h2>
        }

        { pruebasCodigoNoIdentif.length === 0 ? 
            <h6> </h6>
            :
            <TablePruebasPCB
              infoPCBTable = {pruebasCodigoNoIdentif}
            />
        }
        
        {pruebasFA.length > 0 || pruebasPCB.length > 0 || pruebasCodigoNoIdentif.length > 0 ?
        <div className="">
        <Button className='' variant="primary"  title='Exportar Datos' id='input' onClick={exportToExcel}>Descargar Datos <FaIcons.FaDownload/></Button>
        </div>
        :
        <h6> </h6>
        }
    <Footer/>
    </div>
  )
}

export default Home

import {React} from "react";
import 'bootstrap/dist/css/bootstrap.css';

import '../styles/Home.css'
const DetalleCodigo = (props)=> {
    return(
        <div className="divpropiedades">
            
            
            <p className="lbspropiedades propiedadesT">70 Barcode: </p><p className='lbspropiedadesnum'>{props.datos.code70}</p>
           
            <p className="lbspropiedades propiedadesT">23 Barcode:</p><p className='lbspropiedadesnum'>{props.datos.code23}</p>
           
            <p className="lbspropiedades propiedadesT">15 Barcode: </p> <p className='lbspropiedadesnum'>{props.datos.code15}</p>
     
      
        </div>
    );
};
export default DetalleCodigo;
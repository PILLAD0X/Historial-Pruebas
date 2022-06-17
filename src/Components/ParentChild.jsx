import {React} from "react";
import 'bootstrap/dist/css/bootstrap.css';

import '../styles/Home.css'
import * as FaIcons from 'react-icons/fa';
const ParentChild = (props)=> {
    //console.log(props);
    return(
        <div className='divpropiedades'>

        { props.datos === 'Error, No se encontro relacion Parent - Child' ?
         <h3><FaIcons.FaExclamationTriangle/> No se encontro relacion Parent - Child en Genie</h3>       
        :

        <p className='lbspropiedades propiedadesT'><FaIcons.FaDatabase/> Genie</p>
        }
        { props.datos === 'Error, No se encontro relacion Parent - Child'  ?
            <h6> </h6>
        :
            <p className='lbspropiedades propiedadesT'>Parent:</p>
        }
        { props.datos === 'Error, No se encontro relacion Parent - Child'  ?
            <h6> </h6>
        :
        <p className='lbspropiedadesnum'>{props.datos.parent}</p>
        }
        { props.datos === 'Error, No se encontro relacion Parent - Child'  ?
            <h6> </h6>
        :
            <p className='lbspropiedades propiedadesT'>Child: </p>
        }
         { props.datos === 'Error, No se encontro relacion Parent - Child'  ?
            <h6> </h6>
        :
            <p className='lbspropiedadesnum'>{props.datos.child}</p>
        }  
        </div>
    );
};
export default ParentChild;
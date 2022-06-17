import {React} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TablePruebasPCB.css';
//import { Table } from "react-bootstrap";
const TablePruebasPCB = (props)=> {
    return(
        <div className="table-responsive centrar">
            <table className='table table-hover table-sm table-striped '>
                <thead className="table-dark">
                    <tr>
                        <th>Line</th>
                        <th>Serial Number</th>
                        <th>Test Result</th>
                        <th>Test Date Time</th>                 
                        <th>Part ID</th>
                        <th>Test Number</th>
                        <th>Tester</th>
                        <th>Employee Number</th>
                        <th>Record Number</th>
                        <th>Box</th>
                        <th>Pallet</th>
                    </tr>
                </thead>
                <tbody>
                {props.infoPCBTable.map((PCB) => {
                    const teststatus = PCB.TestResult;
                    if(teststatus === 'F'){
                        return (
                            <tr className="table-danger" id={PCB.TestDateTime}>
                                <td>{PCB.ProductionLine}</td>
                                <td>{PCB.BarcodeSerialNumber}</td>
                                <td>{PCB.TestResult}</td>
                                <td>{PCB.TestDateTime}</td>
                                <td>{PCB.PartID}</td>
                                <td>{PCB.CertifiedTestNumber}</td>
                                <td>{PCB.TesterID}</td>
                                <td>{PCB.EmployeeNumber}</td>
                                <td>{PCB.RecordNumber}</td>
                                <td>{PCB.Box}</td>
                                <td>{PCB.Pallet}</td>
                            </tr>
                        );

                    }else{
                        return (
                            <tr id={PCB.TestDateTime}>
                                <td>{PCB.ProductionLine}</td>
                                <td>{PCB.BarcodeSerialNumber}</td>
                                <td>{PCB.TestResult}</td>
                                <td>{PCB.TestDateTime}</td>
                                <td>{PCB.PartID}</td>
                                <td>{PCB.CertifiedTestNumber}</td>
                                <td>{PCB.TesterID}</td>
                                <td>{PCB.EmployeeNumber}</td>
                                <td>{PCB.RecordNumber}</td>
                                <td>{PCB.Box}</td>
                                <td>{PCB.Pallet}</td>
                            </tr>
                        );
                    }
                    
                })}
                </tbody>
            </table>
            
        </div>
    );
};
export default TablePruebasPCB;
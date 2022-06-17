import React from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import LogoBose from '../icons/LogoBose';
import '../styles/Home.css'
const Nav = styled.div`
  background: #15171c;
  height: 80px;
  font-family: sans-serif;
  position:fixed;
  top:0;
  width:100%;
  box-shadow: rgba(100,100,111,1) 0px 7px 29px 0px;
  
  display: flex;
`;

const NavIcon = styled.div`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  align-items: center;
  color: #fff;
  width:100%;
`;


const Sidebar = () => {


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
        
          <NavIcon >
            <h1 className='margen'>Historial de Pruebas </h1>
            <FaIcons.FaCheck />
          </NavIcon>
          <NavIcon className="logobose">
            <LogoBose  fill='#fff' width={200} height={200}/>
          </NavIcon>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;

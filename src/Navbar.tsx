import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const A = styled(NavLink)`
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: #ddd;
  }
`;

const Navbarr = styled.div`
  overflow: hidden;
  background-color: #333;
`;

const Dropdown = styled.div`
  float: right;
  overflow: hidden;
  margin-right: 0%;
`;

const Dropbtn = styled.div`
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;

  &:hover {
    background-color: red;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;



const HoverDropdownContent = styled(DropdownContent)`
  ${Dropdown}:hover & {
    display: block;
  }
`;

function Navbar() {
  return (
    <Navbarr>
      <Dropdown>
        <Dropbtn>LINEAR ALGEBRAIC EQUATIONS</Dropbtn>
        <HoverDropdownContent>
          <A to="/Cramer-Rule">Cramer</A>
        </HoverDropdownContent>
      </Dropdown>
      <Dropdown>
        <Dropbtn>ROOTS OF EQUATIONS</Dropbtn>
        <HoverDropdownContent>
          <A to="/Bisection">Bisection</A>
          <A to="/False-Position">False-Position</A>
          <A to="/One-Point">One-Point</A>
          <A to="/Newton-Raphson">Newton-Raphson</A>
          <A to="/Secant">Secant</A>
        </HoverDropdownContent>

      </Dropdown>


    </Navbarr>
  );
}

export default Navbar;



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
  margin-right: 3%;
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
        // <div>
        //     <style dangerouslySetInnerHTML={{ __html: "\nul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  background-color: #333;\n}\n\nli {\n  float: left;\n}\n\nli a {\n  display: block;\n  color: white;\n  text-align: center;\n  padding: 14px 16px;\n  text-decoration: none;\n}\n\nli a:hover {\n  background-color: #111;\n}\n" }} />
        //     <ul>
        //         <li><A to="/Bisection">Bisection</A></li>
        //         <li><A to="/False-Position">False-Position</A></li>
        //         <li><A to="/One-Point">One-Point</A></li>
        //         <li><A to="/Newton-Raphson">Newton-Raphson</A></li>
        //     </ul>
        // </div>
        <Navbarr>
        <Dropdown>
            <Dropbtn>ROOTS OF EQUATIONS</Dropbtn>
            <HoverDropdownContent>
              <A to="/Bisection">Bisection</A>
              <A to="/False-Position">False-Position</A>
              <A to="/One-Point">One-Point</A>
              <A to="/Newton-Raphson">Newton-Raphson</A>
            </HoverDropdownContent>
        </Dropdown>
    </Navbarr>
    );
}

export default Navbar;



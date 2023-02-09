import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const A = styled(NavLink)`
    display: block;
    color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-family: 'Kanit', sans-serif;
`;

function Navbar() {
    return (
        <div>
            <style dangerouslySetInnerHTML={{ __html: "\nul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  background-color: #333;\n}\n\nli {\n  float: left;\n}\n\nli a {\n  display: block;\n  color: white;\n  text-align: center;\n  padding: 14px 16px;\n  text-decoration: none;\n}\n\nli a:hover {\n  background-color: #111;\n}\n" }} />
            <ul>
                <li><A to="/Bisection">Bisection</A></li>
                <li><a href="#news">2</a></li>
                <li><a href="#contact">3</a></li>
                <li><a href="#about">4</a></li>
            </ul>
        </div>
    );
}

export default Navbar;
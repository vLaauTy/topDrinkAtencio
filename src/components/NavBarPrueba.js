import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget/CartWidget';


function NavBarPrueba() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to='/' className='nav-link'><Navbar.Brand >TopDrinks</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>

            <Link to="/category/vodka" className="nav-link">Vodka</Link>
            <Link to="/category/whisky" className="nav-link">Whisky</Link>
            <Link to="/category/cerveza" className="nav-link">Cerveza</Link>
          </Nav>
          <Nav>
          <ul className="navbar-nav ms-auto List-ul mb-2 mb-lg-0">
            <CartWidget />
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarPrueba;
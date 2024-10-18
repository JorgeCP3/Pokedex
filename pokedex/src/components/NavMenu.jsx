import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/pokedex">Pokédex</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                            <>
                                <NavDropdown title="Pokemones" id="personas-dropdown">
                                    <Link className="dropdown-item" to={"/admin/pokemones"}>Lista de Pokemones</Link>
                                    <Link className="dropdown-item" to="/admin/pokemones/nuevo">
                                        Crear Pokémon
                                    </Link>
                                </NavDropdown>
                                <NavDropdown title="Habilidades" id="usuarios-dropdown">
                                    <Link className="dropdown-item" to={"/admin/habilidades"}>Lista de Habilidades</Link>
                                    <Link className="dropdown-item" to="/admin/habilidades/nuevo">
                                        Crear Habilidad
                                    </Link>
                                </NavDropdown>
                                <NavDropdown title="Tipos" id="usuarios-dropdown">
                                    <Link className="dropdown-item" to={"/admin/tipos"}>Lista de Tipos</Link>
                                    <Link className="dropdown-item" to="/admin/tipos/nuevo">
                                        Crear Tipo
                                    </Link>
                                </NavDropdown>
                            </>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;
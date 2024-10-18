import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Form } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
import '../../../public/style.css';

const ListaPokemons = () => {
    const [ListaPokemons, setListaPokemons] = useState([]);
    const [listaHabilidades, setListaHabilidades] = useState([]);
    const [listaTipos, setListaTipos] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        getListaPokemons();
        getListaHabilidades();
        getListaTipos();
        document.title = "Lista de Pokémon";
    }, []);

    const getListaPokemons = async () => {
        axios.get("http://localhost:3000/pokemon")
        .then(res => {
            setListaPokemons(res.data);
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }

    const getListaHabilidades = async () => {
        try {
            const res = await axios.get("http://localhost:3000/habilidad");
            setListaHabilidades(res.data);
        } catch (err) {
            console.error("Error al cargar habilidades", err);
        }
    };

    const getListaTipos = async () => {
        try {
            const res = await axios.get("http://localhost:3000/tipo");
            setListaTipos(res.data);
        } catch (err) {
            console.error("Error al cargar tipos", err);
        }
    };

    const eliminar = (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este pokemon?");
        if (!confirmar) {
            return;
        }
        axios.delete(`http://localhost:3000/pokemon/${id}`)
        .then(res => {
            console.log(res);
            getListaPokemons();
        }).catch(err => {
            console.error(err);
        });
    }

    const obtenerNombreHabilidad = (idHabilidad) => {
        const habilidad = listaHabilidades.find(hab => hab.id === idHabilidad);
        return habilidad ? habilidad.nombre : "-";
    };

    const obtenerNombreTipo = (idTipo) => {
        const tipo = listaTipos.find(tp => tp.id === idTipo);
        return tipo ? tipo.nombre : "-";
    };

    const obtenerNombrePokemon = (idPokemon) => {
        const pokemon = ListaPokemons.find(poke => poke.id === idPokemon);
        return pokemon ? pokemon.nombre : "No existe";
    };

    const filteredPokemons = ListaPokemons.filter(pokemon => 
        pokemon.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        pokemon.nroPokedex.toString().includes(searchTerm)
    );

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body className="text-center">
                                <Card.Title>
                                    <h2>Lista de Pokemones</h2>
                                </Card.Title>
                                <Form.Group controlId="searchTerm">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Buscador por nombre o nro de Pokédex" 
                                        value={searchTerm} 
                                        onChange={(e) => setSearchTerm(e.target.value)} 
                                    />
                                </Form.Group>
                                <br />
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>nro de Pokedex</th>
                                            <th>Habilidad 1</th>
                                            <th>Habilidad 2</th>
                                            <th>Habilidad 3</th>
                                            <th>Tipo</th>
                                            <th>Tipo 2</th>
                                            <th>Descripcion</th>
                                            <th>PS</th>
                                            <th>Ataque</th>
                                            <th>Defensa</th>
                                            <th>Velocidad</th>
                                            <th>Ataque Especial</th>
                                            <th>Defensa Especial</th>
                                            <th>Nivel de Evolución</th>
                                            <th>Evolución Previa</th>
                                            <th>Evolución Siguiente</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPokemons.map(pokemon => (
                                            <tr key={pokemon.id}>
                                                <td>
                                                    <img 
                                                        src={`http://localhost:3000/images/pokemones/${pokemon.id}.png`} 
                                                        alt={`Imagen del tipo ${pokemon.nombre}`} 
                                                        width="100"
                                                        height="100"
                                                    />
                                                </td>
                                                <td>{pokemon.id}</td>
                                                <td>{pokemon.nombre}</td>
                                                <td>{pokemon.nroPokedex}</td>
                                                <td>{obtenerNombreHabilidad(pokemon.idHabilidad1)}</td>
                                                <td>{obtenerNombreHabilidad(pokemon.idHabilidad2)}</td>
                                                <td>{obtenerNombreHabilidad(pokemon.idHabilidad3)}</td>
                                                <td>{obtenerNombreTipo(pokemon.idTipo1)}</td>
                                                <td>{obtenerNombreTipo(pokemon.idTipo2)}</td>
                                                <td className="descripcion">{pokemon.descripcion}</td>
                                                <td>{pokemon.ps}</td>
                                                <td>{pokemon.ataque}</td>
                                                <td>{pokemon.defensa}</td>
                                                <td>{pokemon.velocidad}</td>
                                                <td>{pokemon.ataqueEspecial}</td>
                                                <td>{pokemon.defensaEspecial}</td>
                                                <td>{pokemon.nivelEvolucion}</td>
                                                <td>{obtenerNombrePokemon(pokemon.idEvPrevia)}</td> 
                                                <td>{obtenerNombrePokemon(pokemon.idEvSiguiente)}</td> 
                                                <td>
                                                    <Link className="btn btn-warning me-2" to={`/admin/pokemones/${pokemon.id}/evolutiva`}>
                                                        Línea Evolutiva
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link className="btn btn-success" to={`/admin/pokemones/${pokemon.id}/foto`}>Cambiar Foto</Link>
                                                </td>
                                                <td>
                                                    <Link className="btn btn-primary me-2" to={`/admin/pokemones/${pokemon.id}`}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => eliminar(pokemon.id)}>
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListaPokemons;

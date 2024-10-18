import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import '../../../public/style.css';

const FormLineaEvolutiva = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [errorText, setErrorText] = useState('');
    const [validated, setValidated] = useState(false);
    const [idEvPrevia, setIdEvPrevia] = useState(null);
    const [idEvSiguiente, setIdEvSiguiente] = useState(null);
    const [pokemonActual, setPokemonActual] = useState(null); 

    const [listaPokemons, setListaPokemons] = useState([]);
    const [searchTextEvPrevia, setSearchTextEvPrevia] = useState('');
    const [searchTextEvSiguiente, setSearchTextEvSiguiente] = useState('');
    const [filteredPokemonsEvPrevia, setFilteredPokemonsEvPrevia] = useState([]);
    const [filteredPokemonsEvSiguiente, setFilteredPokemonsEvSiguiente] = useState([]);

    useEffect(() => {
        getListaPokemons(); 
        if (id) {
            getPokemonById();
        }
    }, [id]);

    const getListaPokemons = async () => {
        try {
            const res = await axios.get("http://localhost:3000/pokemon");
            setListaPokemons(res.data);
        } catch (err) {
            console.error("Error al cargar la lista de Pokémon", err);
        }
    };

    const getPokemonById = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/pokemon/${id}`);
            const pokemon = res.data;
            setPokemonActual(pokemon); 
            setIdEvPrevia(pokemon.idEvPrevia);
            setIdEvSiguiente(pokemon.idEvSiguiente);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearchEvPrevia = (e) => {
        const value = e.target.value;
        setSearchTextEvPrevia(value);
        setFilteredPokemonsEvPrevia(listaPokemons.filter(pokemon => pokemon.nombre.toLowerCase().includes(value.toLowerCase())));
    };

    const handleSearchEvSiguiente = (e) => {
        const value = e.target.value;
        setSearchTextEvSiguiente(value);
        setFilteredPokemonsEvSiguiente(listaPokemons.filter(pokemon => pokemon.nombre.toLowerCase().includes(value.toLowerCase())));
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
    
        if (form.checkValidity() === false) {
            return;
        }
    
        setErrorText('');
    
        const pokemon = {
            idEvPrevia: idEvPrevia || null,
            idEvSiguiente: idEvSiguiente || null
        };
    
        if (id) {
            axios.put(`http://localhost:3000/pokemon/${id}`, pokemon)
                .then(() => {
                    navigate('/admin/pokemones');
                })
                .catch(error => {
                    console.error("Error al editar el Pokémon", error);
                    setErrorText('Hubo un problema al editar el Pokémon. Intenta nuevamente.');
                });
        } else {
            axios.post('http://localhost:3000/pokemon', pokemon)
                .then(() => {
                    navigate('/admin/pokemones');
                })
                .catch(error => {
                    console.error("Error al guardar el Pokémon", error);
                    setErrorText('Hubo un problema al guardar el Pokémon. Intenta nuevamente.');
                });
        }
    };

    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body >
                                <Card.Title>
                                    {pokemonActual && (
                                        <>
                                        <h2>Agregar línea Evolutiva para {pokemonActual.nombre}</h2>
                                            <div className="pokedex-item-image">
                                                <img 
                                                    src={`http://localhost:3000/images/pokemones/${pokemonActual.id}.png`} 
                                                    alt={`Imagen de ${pokemonActual.nombre}`} 
                                                    width="100"
                                                    height="100"
                                                />
                                            </div>
                                        </>
                                    )}
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    {errorText && <Alert variant="danger">{errorText}</Alert>}
                                    
                                    <Form.Group>
                                        <Form.Label>Evolución Previa (opcional):</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={searchTextEvPrevia} 
                                            onChange={handleSearchEvPrevia} 
                                            placeholder="Buscar Pokémon..." 
                                            className="search-input"
                                            
                                        />
                                        
                                        {searchTextEvPrevia && (
                                            <ul className="search-results text-center">
                                                {filteredPokemonsEvPrevia.map(pokemon => (
                                                    <li key={pokemon.id} onClick={() => {
                                                        setIdEvPrevia(pokemon.id); 
                                                        setSearchTextEvPrevia(pokemon.nombre); 
                                                        setFilteredPokemonsEvPrevia([]); 
                                                    }}>
                                                        {pokemon.nombre}
                                                        <div className="pokedex-item-image">
                                                            <img 
                                                                src={`http://localhost:3000/images/pokemones/${pokemon.id}.png`} 
                                                                alt={`Imagen de ${pokemon.nombre}`} 
                                                                width="100"
                                                                height="100"
                                                            />
                                                        </div>
                                                    </li>
                                                    
                                                ))}
                                            </ul>
                                        )}
                                        
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Evolución Siguiente (opcional):</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={searchTextEvSiguiente} 
                                            onChange={handleSearchEvSiguiente} 
                                            placeholder="Buscar Pokémon..." 
                                            className="search-input"
                                        />
                                        {searchTextEvSiguiente && (
                                            <ul className="search-results text-center">
                                                {filteredPokemonsEvSiguiente.map(pokemon => (
                                                    <li key={pokemon.id} onClick={() => {
                                                        setIdEvSiguiente(pokemon.id); 
                                                        setSearchTextEvSiguiente(pokemon.nombre); 
                                                        setFilteredPokemonsEvSiguiente([]); 
                                                    }}>
                                                        {pokemon.nombre}
                                                        <div className="pokedex-item-image">
                                                            <img 
                                                                src={`http://localhost:3000/images/pokemones/${pokemon.id}.png`} 
                                                                alt={`Imagen de ${pokemon.nombre}`} 
                                                                width="100"
                                                                height="100"
                                                            />
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </Form.Group>
                                    <br />
                                    <Button variant="primary" type="submit">
                                        Actualizar Linea Evolutiva
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormLineaEvolutiva;

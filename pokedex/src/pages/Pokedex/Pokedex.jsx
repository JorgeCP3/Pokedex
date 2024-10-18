import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavMenu from "../../components/NavMenu";

const Pokedex = () => {
    const [ListaPokemons, setListaPokemons] = useState([]);
    const [ListaTipos, setListaTipos] = useState([]);
    const [sortOption, setSortOption] = useState('nroPokedex');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTipo, setSelectedTipo] = useState(''); // Nuevo estado para el filtro por tipo
    const navigate = useNavigate();

    useEffect(() => {
        getListaPokemons();
        getListaTipos();
        document.title = "Lista de Pokémon";
    }, []);

    const getListaPokemons = async () => {
        try {
            const res = await axios.get("http://localhost:3000/pokemon");
            setListaPokemons(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getListaTipos = async () => {
        try {
            const res = await axios.get("http://localhost:3000/tipo");
            setListaTipos(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePokemonClick = (id) => {
        navigate(`/pokedex/${id}`); 
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleTipoChange = (e) => {
        setSelectedTipo(e.target.value);
    };

    const sortedAndFilteredPokemons = () => {
        const filteredPokemons = ListaPokemons.filter(pokemon => {
            // Filtrar por nombre o número de Pokédex
            const matchesNameOrNumber = pokemon.nombre.toLowerCase().includes(searchTerm) || 
                                        pokemon.nroPokedex.toString().includes(searchTerm);
            
            // Filtrar por tipo desde el input de texto
            const tipo1 = ListaTipos.find(tipo => tipo.id === pokemon.idTipo1);
            const tipo2 = ListaTipos.find(tipo => tipo.id === pokemon.idTipo2);
            const matchesTipoText = (tipo1 && tipo1.nombre.toLowerCase().includes(searchTerm)) || 
                                    (tipo2 && tipo2.nombre.toLowerCase().includes(searchTerm));

            // Filtrar por tipo desde el select
            const matchesTipoSelect = selectedTipo === '' || 
                (tipo1 && tipo1.nombre === selectedTipo) || 
                (tipo2 && tipo2.nombre === selectedTipo);

            return (matchesNameOrNumber || matchesTipoText) && matchesTipoSelect;
        });

        return filteredPokemons.sort((a, b) => {
            if (sortOption === 'nombre') {
                return a.nombre.localeCompare(b.nombre);
            } else if (sortOption === 'nroPokedex') {
                return a.nroPokedex - b.nroPokedex;
            }
            return 0;
        });
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card className="card2">
                            <Card.Body>
                                <Card.Title>
                                    <h2 className="text-center cont">Pokédex</h2>
                                </Card.Title>
                                <div className="filtros">
                                    <Form.Group controlId="sortSelect">
                                        <Form.Label>Ordenar por:</Form.Label>
                                        <Form.Select value={sortOption} onChange={handleSortChange}>
                                            <option value="nroPokedex">Número de Pokédex</option>
                                            <option value="nombre">Nombre</option>
                                        </Form.Select>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="tipoSelect" className="mt-3">
                                        <Form.Label>Filtrar por tipo:</Form.Label>
                                        <Form.Select value={selectedTipo} onChange={handleTipoChange}>
                                            <option value="">Todos los tipos</option>
                                            {ListaTipos.map(tipo => (
                                                <option key={tipo.id} value={tipo.nombre}>
                                                    {tipo.nombre}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <br />
                                    
                                    <Form.Group controlId="searchInput" className="mt-3 buscador">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Buscador por nombre, número de pokedex o tipo" 
                                            value={searchTerm} 
                                            onChange={handleSearchChange} 
                                        />
                                    </Form.Group>
                                </div>
                                <br />
                                <div className="pokedex-list">
                                    {sortedAndFilteredPokemons().map(pokemon => (
                                        <div 
                                            key={pokemon.id} 
                                            className="pokedex-item" 
                                            onClick={() => handlePokemonClick(pokemon.id)} 
                                        >
                                            <div className="pokedex-item-image">
                                                <img 
                                                    src={`http://localhost:3000/images/pokemones/${pokemon.id}.png`} 
                                                    alt={`Imagen de ${pokemon.nombre}`} 
                                                    width="100"
                                                    height="100"
                                                />
                                            </div>
                                            <div className="pokedex-item-info">
                                                <h5>{pokemon.nombre}</h5>
                                                <div className="tipo-icons">
                                                    {pokemon.idTipo1 && (
                                                        <img 
                                                            src={`http://localhost:3000/images/tipos/${pokemon.idTipo1}.png`} 
                                                            alt={`Tipo ${pokemon.idTipo1}`} 
                                                            width="30"
                                                            height="30"
                                                        />
                                                    )}
                                                    {pokemon.idTipo2 && (
                                                        <img 
                                                            src={`http://localhost:3000/images/tipos/${pokemon.idTipo2}.png`} 
                                                            alt={`Tipo ${pokemon.idTipo2}`} 
                                                            width="30"
                                                            height="30"
                                                        />
                                                    )}
                                                </div>
                                                <p>Nro: {pokemon.nroPokedex}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Pokedex;

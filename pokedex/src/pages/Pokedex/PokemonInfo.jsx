import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { calcularHPMinimo, calcularHPMaximo, calcularStatMinimo, calcularStatMaximo } from "../../utils/statsCalculations";
import '../../../public/style.css';

const PokemonInfo = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [evolutions, setEvolutions] = useState([]);
    const [tipos, setTipos] = useState({});
    const [habilidades, setHabilidades] = useState([]);

    useEffect(() => {
        const getPokemonInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/pokemon/${id}`);
                setPokemon(response.data);
                fetchEvolutions(); 
                fetchTipos(response.data.idTipo1, response.data.idTipo2);
                fetchHabilidades(response.data.idHabilidad1, response.data.idHabilidad2, response.data.idHabilidad3); 
            } catch (error) {
                console.error(error);
            }
        };
        getPokemonInfo();
    }, [id]);

    const fetchEvolutions = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pokemon/${id}/evolutiva`);
            setEvolutions(response.data); 
        } catch (error) {
            console.error("Error al obtener la línea evolutiva:", error);
        }
    };

    const fetchTipos = async (tipo1, tipo2) => {
        try {
            const tipo1Promise = axios.get(`http://localhost:3000/tipo/${tipo1}`);
            const tipo2Promise = tipo2 ? axios.get(`http://localhost:3000/tipo/${tipo2}`) : null;

            const [tipo1Response, tipo2Response] = await Promise.all([tipo1Promise, tipo2Promise]);
            setTipos({
                tipo1: tipo1Response.data,
                tipo2: tipo2Response ? tipo2Response.data : null,
            });
        } catch (error) {
            console.error("Error al obtener los tipos:", error);
        }
    };

    const fetchHabilidades = async (idHabilidad1, idHabilidad2, idHabilidad3) => {
        try {
            const habilidad1Promise = axios.get(`http://localhost:3000/habilidad/${idHabilidad1}`);
            const habilidad2Promise = axios.get(`http://localhost:3000/habilidad/${idHabilidad2}`);
            const habilidad3Promise = idHabilidad3 ? axios.get(`http://localhost:3000/habilidad/${idHabilidad3}`) : null;

            const [habilidad1Response, habilidad2Response, habilidad3Response] = await Promise.all([
                habilidad1Promise,
                habilidad2Promise,
                habilidad3Promise,
            ]);

            setHabilidades([
                habilidad1Response.data,
                habilidad2Response.data,
                habilidad3Response ? habilidad3Response.data : null,
            ]);
        } catch (error) {
            console.error("Error al obtener habilidades:", error);
        }
    };

    if (!pokemon || !tipos.tipo1) return <div>Cargando...</div>; 

    return (
        <>
            <NavMenu />
            <Container className="mt-3 text-center"> 
                <Card className="mb-4">
                    <Card.Body>
                        <Row>
                            <Col className="text-center">
                                <h2>{pokemon.nombre}</h2>
                                <p><strong>Número de Pokédex</strong></p>
                                <p>#{pokemon.nroPokedex}</p>
                                <img 
                                    src={`http://localhost:3000/images/pokemones/${pokemon.id}.png`} 
                                    alt={`Imagen de ${pokemon.nombre}`} 
                                    width="150" 
                                    height="150" 
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <h3 className="txtColor">Descripción</h3>
                <Card className="mb-4">
                    <Card.Body>
                        <p>{pokemon.descripcion}</p>
                    </Card.Body>
                </Card>

                <h3 className="txtColor">Tipos</h3>
                <Card className="mb-4">
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col className="text-center">
                                <img 
                                    src={`http://localhost:3000/images/tipos/${tipos.tipo1.id}.png`} 
                                    alt={`Imagen de ${tipos.tipo1.nombre}`} 
                                    width="70" 
                                    height="70" 
                                />
                                <div>{tipos.tipo1.nombre}</div>
                            </Col>
                            {tipos.tipo2 && (
                                <Col className="text-center">
                                    <img 
                                        src={`http://localhost:3000/images/tipos/${tipos.tipo2.id}.png`} 
                                        alt={`Imagen de ${tipos.tipo2.nombre}`} 
                                        width="70" 
                                        height="70" 
                                    />
                                    <div>{tipos.tipo2.nombre}</div>
                                </Col>
                            )}
                        </Row>
                    </Card.Body>
                </Card>

                <h3 className="txtColor">Habilidades</h3>
                <Card className="mb-4">
                    <Card.Body>
                        <Row>
                            {habilidades.map((habilidad, index) => (
                                habilidad ? ( 
                                    <Col key={index} className="text-center mb-2">
                                        <h5>{habilidad.nombre}</h5>
                                        <p>{habilidad.descripcion}</p>
                                    </Col>
                                ) : null
                            ))}
                        </Row>
                    </Card.Body>
                </Card>

                <h3 className="txtColor">Stats</h3>
                <Card className="mb-4">
                    <Card.Body>
                        <Row className="border-bottom pb-2">
                            <Col><strong>Base</strong></Col>
                            <Col><strong>Mínimo a nivel 100</strong></Col>
                            <Col><strong>Máximo a nivel 100</strong></Col>
                        </Row>
                        <Row className="border-bottom py-2">
                            <Col><strong>PS:</strong> {pokemon.ps}</Col>
                            <Col>{calcularHPMinimo(pokemon.ps)}</Col>
                            <Col>{calcularHPMaximo(pokemon.ps)}</Col>
                        </Row>
                        <Row className="border-bottom py-2">
                            <Col><strong>Ataque:</strong> {pokemon.ataque}</Col>
                            <Col>{calcularStatMinimo(pokemon.ataque)}</Col>
                            <Col>{calcularStatMaximo(pokemon.ataque)}</Col>
                        </Row>
                        <Row className="border-bottom py-2">
                            <Col><strong>Defensa:</strong> {pokemon.defensa}</Col>
                            <Col>{calcularStatMinimo(pokemon.defensa)}</Col>
                            <Col>{calcularStatMaximo(pokemon.defensa)}</Col>
                        </Row>
                        <Row className="border-bottom py-2">
                            <Col><strong>Ataque Especial:</strong> {pokemon.ataqueEspecial}</Col>
                            <Col>{calcularStatMinimo(pokemon.ataqueEspecial)}</Col>
                            <Col>{calcularStatMaximo(pokemon.ataqueEspecial)}</Col>
                        </Row>
                        <Row className="border-bottom py-2">
                            <Col><strong>Defensa Especial:</strong> {pokemon.defensaEspecial}</Col>
                            <Col>{calcularStatMinimo(pokemon.defensaEspecial)}</Col>
                            <Col>{calcularStatMaximo(pokemon.defensaEspecial)}</Col>
                        </Row>
                        <Row className="border-bottom py-2">
                            <Col><strong>Velocidad:</strong> {pokemon.velocidad}</Col>
                            <Col>{calcularStatMinimo(pokemon.velocidad)}</Col>
                            <Col>{calcularStatMaximo(pokemon.velocidad)}</Col>
                        </Row>
                    </Card.Body>
                </Card>

                <h3 className="txtColor">Línea Evolutiva</h3>
<Card className="mb-4">
    <Card.Body>
        <Row className="justify-content-center">
            {evolutions.map((evolution) => (
                <Col key={evolution.id} className="text-center">
                    <Link to={`/pokedex/${evolution.id}`}>
                        <img 
                            src={`http://localhost:3000/images/pokemones/${evolution.id}.png`} 
                            alt={`Imagen de ${evolution.nombre}`} 
                            width="70" 
                            height="70" 
                        />
                    </Link>
                    <div>{evolution.nombre}</div>
                    <div><strong>Nivel de Evolución:</strong> {evolution.nivelEvolucion}</div>
                </Col>
            ))}
        </Row>
    </Card.Body>
</Card>
            </Container>
        </>
    );
};

export default PokemonInfo;

import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [errorText, setErrorText] = useState('');
    const [validated, setValidated] = useState(false);

    const [nombre, setNombre] = useState('');
    const [nroPokedex, setNroPokedex] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ps, setPs] = useState('');
    const [ataque, setAtaque] = useState('');
    const [defensa, setDefensa] = useState('');
    const [velocidad, setVelocidad] = useState('');
    const [ataqueEspecial, setAtaqueEspecial] = useState('');
    const [defensaEspecial, setDefensaEspecial] = useState('');
    const [nivelEvolucion, setNivelEvolucion] = useState('');
    const [idEvPrevia, setIdEvPrevia] = useState(null);
    const [idEvSiguiente, setIdEvSiguiente] = useState(null);

    const [listaHabilidades, setListaHabilidades] = useState([]);
    const [habilidad1, setHabilidad1] = useState('');
    const [habilidad2, setHabilidad2] = useState('');
    const [habilidad3, setHabilidad3] = useState('');

    const [listaTipos, setListaTipos] = useState([]);
    const [tipo1, setTipo1] = useState('');
    const [tipo2, setTipo2] = useState('');

    useEffect(() => {
        getListaHabilidades();
        getListaTipos();
        if (id) {
            getPokemonById();
        }
    }, [id]);


    const getPokemonById = async () => {
        axios.get(`http://localhost:3000/pokemon/${id}`)
        .then(res => {
            const pokemon = res.data;
            setNombre(pokemon.nombre);
            setNroPokedex(pokemon.nroPokedex);
            setDescripcion(pokemon.descripcion);
            setPs(pokemon.ps);
            setAtaque(pokemon.ataque);
            setDefensa(pokemon.defensa);
            setVelocidad(pokemon.velocidad);
            setAtaqueEspecial(pokemon.ataqueEspecial);
            setDefensaEspecial(pokemon.defensaEspecial);
            setNivelEvolucion(pokemon.nivelEvolucion);
            setIdEvPrevia(pokemon.idEvPrevia);
            setIdEvSiguiente(pokemon.idEvSiguiente);
            setHabilidad1(pokemon.idHabilidad1);
            setHabilidad2(pokemon.idHabilidad2);
            setHabilidad3(pokemon.idHabilidad3);
            setTipo1(pokemon.idTipo1);
            setTipo2(pokemon.idTipo2);
        }).catch(err => {
            console.error(err);
        });
    };

    const getListaHabilidades = () => {
        axios.get('http://localhost:3000/habilidad')
            .then(res => {
                setListaHabilidades(res.data);
            }).catch(error => {
                console.error("Error al cargar habilidades", error);
            });
    };

    const getListaTipos = () => {
        axios.get('http://localhost:3000/tipo')
            .then(res => {
                setListaTipos(res.data);
            }).catch(error => {
                console.error("Error al cargar tipos", error);
            });
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
            nombre,
            nroPokedex,
            descripcion,
            ps,
            ataque,
            defensa,
            velocidad,
            ataqueEspecial,
            defensaEspecial,
            nivelEvolucion: nivelEvolucion || 1,
            idEvPrevia: idEvPrevia || null,
            idEvSiguiente: idEvSiguiente || null,
            idHabilidad1: habilidad1,
            idHabilidad2: habilidad2,
            idHabilidad3: habilidad3 || null,
            idTipo1: tipo1,
            idTipo2: tipo2 || null,
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
                            <Card.Body>
                                <Card.Title>
                                    <h2>{id ? 'Editar Pokémon' : 'Agregar Nuevo Pokémon'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    {errorText && <Alert variant="danger">{errorText}</Alert>}
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un nombre.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Nro de Pokedex:</Form.Label>
                                        <Form.Control required value={nroPokedex} type="text" onChange={(e) => setNroPokedex(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un nro de Pokedex.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Habilidad 1:</Form.Label>
                                        <Form.Control as="select" required value={habilidad1} onChange={(e) => setHabilidad1(e.target.value)}>
                                            <option value="">Seleccione una habilidad</option>
                                            {listaHabilidades.map(habilidad => (
                                                <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Habilidad 2:</Form.Label>
                                        <Form.Control as="select" required value={habilidad2} onChange={(e) => setHabilidad2(e.target.value)}>
                                            <option value="">Seleccione una habilidad</option>
                                            {listaHabilidades.map(habilidad => (
                                                <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Habilidad 3 (opcional):</Form.Label>
                                        <Form.Control as="select" value={habilidad3} onChange={(e) => setHabilidad3(e.target.value)}>
                                            <option value="">Seleccione una habilidad</option>
                                            {listaHabilidades.map(habilidad => (
                                                <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Tipo 1:</Form.Label>
                                        <Form.Control as="select" required value={tipo1} onChange={(e) => setTipo1(e.target.value)}>
                                            <option value="">Seleccione un tipo</option>
                                            {listaTipos.map(tipo => (
                                                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Tipo 2 (opcional):</Form.Label>
                                        <Form.Control as="select" value={tipo2} onChange={(e) => setTipo2(e.target.value)}>
                                            <option value="">Seleccione un tipo</option>
                                            {listaTipos.map(tipo => (
                                                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Descripción:</Form.Label>
                                        <Form.Control required value={descripcion} as="textarea" rows={8} onChange={(e) => setDescripcion(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese una descripción.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>PS:</Form.Label>
                                        <Form.Control required value={ps} type="number" onChange={(e) => setPs(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un valor de PS.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Ataque:</Form.Label>
                                        <Form.Control required value={ataque} type="number" onChange={(e) => setAtaque(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un valor de ataque.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Defensa:</Form.Label>
                                        <Form.Control required value={defensa} type="number" onChange={(e) => setDefensa(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un valor de defensa.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Velocidad:</Form.Label>
                                        <Form.Control required value={velocidad} type="number" onChange={(e) => setVelocidad(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un valor de velocidad.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Ataque Especial:</Form.Label>
                                        <Form.Control required value={ataqueEspecial} type="number" onChange={(e) => setAtaqueEspecial(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un valor de ataque especial.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Defensa Especial:</Form.Label>
                                        <Form.Control required value={defensaEspecial} type="number" onChange={(e) => setDefensaEspecial(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un valor de defensa especial.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Nivel Evolución:</Form.Label>
                                        <Form.Control type="number" value={nivelEvolucion} onChange={(e) => setNivelEvolucion(e.target.value)} />
                                    </Form.Group>

                                    
                                    <br />
                                    <Button variant="primary" type="submit">
                                        {id ? 'Actualizar Pokémon' : 'Agregar Pokémon'}
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

export default FormPokemon;

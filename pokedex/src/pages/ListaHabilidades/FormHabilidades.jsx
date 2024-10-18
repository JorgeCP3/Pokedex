import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormHabilidades = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getHabilidadById();
    }, [id]);

    const getHabilidadById = async () => {
        axios.get(`http://localhost:3000/habilidad/${id}`)
        .then(res => {
            const habilidades = res.data;
            setNombre(habilidades.nombre);
            setDescripcion(habilidades.descripcion);
        }).catch(err => {
            console.error(err);
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
        
    
        const habilidades = {
            nombre,
            descripcion
        };
    
        if (id) {
            editHabilidad(habilidades);
        } else {
            insertHabilidad(habilidades);
        }
    };
    

    const insertHabilidad = async (habilidades) => {
            console.log(habilidades);
        axios.post("http://localhost:3000/habilidad", habilidades)
        .then(() => {
            navigate("/admin/habilidades");
        }).catch(err => {
            console.error(err);
        });
    };

    const editHabilidad = async (habilidades) => {
        axios.put(`http://localhost:3000/habilidad/${id}`, habilidades)
        .then(() => {
            navigate("/admin/habilidades");
        }).catch(err => {
            console.error(err);
        }
        );
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
                                    <h2>{id ? 'Editar Habilidad' : 'Agregar Nueva Habilidad'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un nombre.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Descripción:</Form.Label>
                                        <Form.Control required value={descripcion} as="textarea" rows={3} onChange={(e) => setDescripcion(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese una descripción.</Form.Control.Feedback>
                                    </Form.Group>
                                
                                    <Form.Group className="mt-3">
                                    <Button type="submit">{id ? "Actualizar" : "Guardar"} Habilidades</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormHabilidades;
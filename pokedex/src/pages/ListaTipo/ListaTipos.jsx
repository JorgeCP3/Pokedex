import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaTipos = () => {
    const [ListaTipos, setListaTipos] = useState([]);
    useEffect(() => {
        getListaTipos();
        document.title = "Lista de Tipo";
    }, []);	

    const getListaTipos = async () => {
        axios.get("http://localhost:3000/tipo")
        .then(res => {
            setListaTipos(res.data);
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }

    const eliminar = (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este tipo?");
        if (!confirmar) {
            return;
        }
        axios.delete(`http://localhost:3000/tipo/${id}`)
        .then(res => {
            console.log(res);
            getListaTipos();
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Tipos</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaTipos.map(tipo => (
                                            <tr key={tipo.id}>
                                                <td>
                                                <img 
                                                        src={`http://localhost:3000/images/tipos/${tipo.id}.png`} 
                                                        alt={`Imagen del tipo ${tipo.nombre}`} 
                                                        width="100"
                                                        height="100"
                                                    />
                                                </td>
                                                <td>{tipo.id}</td>
                                                <td>{tipo.nombre}</td>
                                                <td>
                                                    <Link className="btn btn-success" to={`/admin/tipos/${tipo.id}/foto`}>Cambiar Imagen</Link>
                                                </td>
                                                <td>
                                                <Link className="btn btn-primary me-2" to={`/admin/tipos/${tipo.id}`}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                <Button variant="danger" onClick={() => eliminar(tipo.id)}>
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

export default ListaTipos;
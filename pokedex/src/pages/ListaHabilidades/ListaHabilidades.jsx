import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaHabilidades = () => {
    const [ListaHabilidades, setListaHabilidades] = useState([]);
    useEffect(() => {
        getListaHabilidades();
        document.title = "Lista de Habilidades";
    }, []);	

    const getListaHabilidades = async () => {
        axios.get("http://localhost:3000/habilidad")
        .then(res => {
            setListaHabilidades(res.data);
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }

    const eliminar = (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta habilidad?");
        if (!confirmar) {
            return;
        }
        axios.delete(`http://localhost:3000/habilidad/${id}`)
        .then(res => {
            console.log(res);
            getListaHabilidades();
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
                                    <h2>Lista de Habilidades</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaHabilidades.map(habilidades => (
                                            <tr key={habilidades.id}>
                                                <td>{habilidades.id}</td>
                                                <td>{habilidades.nombre}</td>
                                                <td>{habilidades.descripcion}</td>
                                                <td>
                                                <Link className="btn btn-primary me-2" to={`/admin/habilidades/${habilidades.id}`}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                <Button variant="danger" onClick={() => eliminar(habilidades.id)}>
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

export default ListaHabilidades;
import axios from "axios";
import { useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UploadImgPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();  
    const [imageFile, setImageFile] = useState(null);  
    const [imagePreview, setImagePreview] = useState(null); 
    const [validated, setValidated] = useState(false);  

    const onChangeImage = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const onSaveClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);  

        console.log(formData.image);
        axios.post(`http://localhost:3000/pokemon/${id}/img`, formData)
            .then(res => {
                console.log(res.data);
                navigate(`/admin/pokemones`); 
            })
            .catch(error => {
                console.log(error);
            });
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
                                    <h2>Subir Imagen del Pokemon</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onSaveClick}>
                                    <Form.Group>
                                        <Form.Label>Seleccione una imagen:</Form.Label>
                                        <Form.Control 
                                            required 
                                            type="file" 
                                            onChange={onChangeImage} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un archivo.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {imagePreview && ( 
                                        <Form.Group className="mt-3">
                                            <img 
                                                src={imagePreview} 
                                                alt="Vista previa" 
                                                style={{ width: '100%', height: 'auto', borderRadius: '5px' }} 
                                            />
                                        </Form.Group>
                                    )}
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Imagen</Button>
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

export default UploadImgPokemon;

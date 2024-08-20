import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import darthstore from "../assets/sho.png";
import "../styles/pages/landing.css";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={6}>
            <div className="left-section landingImgDiv">
              <div className="package">
                <span className="package2">
                  <img
                    src={darthstore}
                    alt="Descripción de la imagen"
                    className="imgBanner img-fluid"
                  />
                </span>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="right-section myWrapper ">
              <div className="landingtextDiv">
                <h2 className="tittleLanding">
                  BIENVENIDO A NUESTRA TIENDA OSCURA
                </h2>
                <p>
                  Estamos encantados de tenerte aquí en nuestra galaxia. En
                  nuestra tienda, encontrarás una increíble selección de
                  productos de Star Wars, desde figuras de acción y ropa hasta
                  accesorios y artículos de colección. Ya seas un Jedi, un Sith
                  o un contrabandista, tenemos algo especial para cada fanático.
                </p>

                <p>
                  Explora nuestro catálogo y descubre productos inspirados en
                  todas tus películas, series y personajes favoritos del
                  universo Star Wars. Ya sea que estés buscando el sable de luz
                  perfecto, una camiseta con tu personaje favorito o una réplica
                  detallada del Halcón Milenario, aquí encontrarás lo que
                  necesitas para sentir la Fuerza. ¡Que la Fuerza te acompañe en
                  tu viaje de compras!
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;

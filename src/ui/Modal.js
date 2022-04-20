
import { Button, Modal } from 'react-bootstrap';

export const CompModal = ({show , handleClose, titulo, desc, btnAceptar, btnText, style}) => {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ titulo }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ desc }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Cancelar
          </Button>
          <Button variant={ style } onClick={ btnAceptar }>
            { btnText }
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

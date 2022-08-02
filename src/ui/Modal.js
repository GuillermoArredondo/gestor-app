
import { Button, Modal } from 'react-bootstrap';

export const CompModal = ({show , handleClose, titulo, desc, btnAceptar, btnText, style, alert}) => {

  return (
    <>
      {
        alert 
      
        ? 

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{ titulo }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div >
                <div className={'alert alert-success'} role="alert" hidden= {false} >
                  { desc }
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={ handleClose }>
                Cancelar
              </Button>
              <Button variant={ style } onClick={ btnAceptar }>
                { btnText }
              </Button>
            </Modal.Footer>
          </Modal>

        :

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
      }

    </>
  )
}

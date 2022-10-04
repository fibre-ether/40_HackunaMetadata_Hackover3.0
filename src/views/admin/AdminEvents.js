import Card from "react-bootstrap/Card";
import FormModal from "../components/FormModal";
import Modal from "../components/Modal";
import RazorPay from "../components/razorPay";

export default function AdminEvents() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <Card className="text-white">
            <Card.Img src="assets/images/card_bg_4.png" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card.ImgOverlay>
          </Card>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <Card className="text-white">
            <Card.Img src="assets/images/card_bg_5.png" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card.ImgOverlay>
          </Card>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <Card className="text-white">
            <Card.Img src="assets/images/card_bg_6.png" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card.ImgOverlay>
          </Card>
        </div>
      </div>
      {/* <RazorPay /> */}
      {/* <Modal /> */}
      <FormModal />
    </div>
  );
}

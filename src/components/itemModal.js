import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Input, Form } from "reactstrap";
import uuid from "uuid";
import axios from "axios";
const AddItem = props => {
  const { className } = props;

  const [modal, setModal] = useState(false);
  const [name, setName] = useState();

  const toggle = () => setModal(!modal);

  const onSubmit = e => {
    e.preventDefault();
    toggle();
    setName(null);
    if (name) {
      axios
        .post("https://api-shoppinglist.herokuapp.com/api/items", {
          name: name
        })
        .then(() => {
          props.setItems([...props.items, { id: uuid(), name: name }]);
        });
    }
  };

  const onChange = async e => {
    setName(e.target.value);
  };

  return (
    <div>
      <Form inline onSubmit={e => e.preventDefault()}>
        <Button color="dark" className="add-btn" onClick={toggle}>
          Add Item
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        unmountOnClose={true}
      >
        <ModalHeader toggle={toggle}>Add your item...</ModalHeader>
        <ModalBody>
          <Form>
            <Input
              type="text"
              name="name"
              placeholder="Enter your item i.e. milk, beyblades, pillows etc..."
              rows={1}
              className="mb-3"
              onChange={onChange}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button color="primary" onClick={onSubmit}>
                Add
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddItem;

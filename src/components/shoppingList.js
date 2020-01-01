import React, { useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AddItem from "./itemModal";

const axios = require("axios");

const ShoppingList = props => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        await axios
          .get("https://api-shoppinglist.herokuapp.com/api/items")
          .then(items => {
            const arr = items.data.map(listitem => ({
              id: listitem._id,
              name: listitem.name
            }));
            setItems(arr);
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetcher();
  }, []);

  const kill = id => {
    axios
      .delete(`https://api-shoppinglist.herokuapp.com/api/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      });
  };

  return (
    <Container>
      <AddItem items={items} setItems={setItems} />
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  onClick={kill.bind(null, id)}
                  color="danger"
                  size="sm"
                  key={"Sa"}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};
export default ShoppingList;

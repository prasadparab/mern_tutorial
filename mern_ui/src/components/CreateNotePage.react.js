import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNoteAction } from "../actions/notesActions";
import Loader from "./loader";
import MainScreen from "./mainScreen/mainScreen";
const CreateNotePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("title");
  const [content, setContent] = useState("content");
  const [category, setCategory] = useState("category");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loader, error, note } = noteCreate;
  console.log(note);
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNoteAction(title, content, category));
    resetHandler();
    navigate("/mynotes");
  };
  return (
    <MainScreen title="Create Note">
      <Card>
        <Card.Header>Creating a note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                value={content}
                placeholder="Enter note"
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                placeholder="Enter note category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loader && <Loader></Loader>}
            <Button type="submit" variant="primary">
              Create
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>{new Date().toLocaleDateString()}</Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNotePage;

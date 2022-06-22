import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNoteAction, updateNoteAction } from "../actions/notesActions";
import Loader from "./loader";
import MainScreen from "./mainScreen/mainScreen";
const UpdateNotePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loader, error, note } = noteUpdate;
  console.log(note);

  useEffect(() => {
    if (note._id) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    }
  }, []);
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(updateNoteAction(note._id, title, content, category));
    resetHandler();
    navigate("/mynotes");
  };
  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Editing a note</Card.Header>
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
              Update
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

export default UpdateNotePage;

import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../mainScreen/mainScreen";
import notess from "../../data/notes";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, ListNotesAction } from "../../actions/notesActions";
import Loader from "../loader";
import { NOTES_UPDATE_SET_NOTE } from "../../constants/appConstants";
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: "inherit" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
const MyNotes = ({ searchNote }) => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notesList = useSelector((state) => state.notesList);
  const userLogin = useSelector((state) => state.userLogin);
  const noteDelete = useSelector((state) => state.noteDelete);
  const { loader, getNotes, error } = notesList;
  const { success = false } = noteDelete;
  //console.log(notesList);
  useEffect(() => {
    console.log("refreshed");
    dispatch(ListNotesAction());
  }, [success]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      //console.log(`deleted successfully ${id}`);
      dispatch(deleteNoteAction(id));
    }
  };
  const fetchNotes = async () => {
    return await fetch("/api/notes")
      .then((resposne) => resposne.json())
      .then((data) => (typeof data === "Array" ? data : []));
    //console.log(data);
  };
  useEffect(() => {
    //fetchNotes().then((data) => setNotes(data));
    //console.log(userLogin.userInfo.token);
    if (!userLogin.userInfo.token) {
      navigate("/");
      return;
    }
    dispatch(ListNotesAction());
  }, [dispatch]);
  const editNote = (note) => {
    console.log(note);
    dispatch({ type: NOTES_UPDATE_SET_NOTE, note: note });
    navigate(`/note/${note._id}`);
  };
  return (
    <MainScreen title={`Welcome ${userLogin.userInfo.name}`}>
      <Link to="/createnote">
        <Button>Create New</Button>
      </Link>
      {loader && <Loader />}
      {getNotes
        ?.filter((note) =>
          searchNote
            ? note.title.toLowerCase().includes(searchNote.toLowerCase())
            : true
        )
        .map((note) => (
          <Accordion key={note._id}>
            <Card>
              <Card.Header>
                <CustomToggle eventKey="0"> {note.title}</CustomToggle>
                <Button
                  onClick={() => editNote(note)}
                  //href={`note/${note._id}`}
                  className="mx-4 pull-right"
                  variant=""
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteHandler(note._id);
                  }}
                >
                  Delete
                </Button>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <h4>
                      Category -<Badge variant="success">{note.content}</Badge>
                    </h4>

                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {note.createdAt
                          ? note.createdAt.substring(0, 10)
                          : "Date"}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;

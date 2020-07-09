import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { IBlog, ITag, IComment } from '../utils/interfaces';
import { Button, Card, Col, Form } from 'react-bootstrap';
import CommentSection from '../components/CommentSection';

const DetailsCard: React.FC<IDetailsCardsProps> = props => {  

  const { id } = useParams();
  
  const [comment, setComment] = React.useState<string>('');
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: comment, blog_id: id, author_id: 2 })
      });
      if (res.ok) {
        setComment('');
        props.getComments();
      }
  };
  
  return (
    <>
      <section className="row">
        <Col md={4} className="text-center">
          <img src={props.blog?.image_url} className="shadow-sm rounded image" /> 
        </Col>
        <Col md={8}>
          <Card className="border-0">
            <Card.Body className="p-0">
              <Card.Title>{props.blog?.title}</Card.Title>
              <Card.Subtitle className="text-muted">By: {props.blog?.name}</Card.Subtitle>
              <a href="#" className="badge badge-primary my-2">{props.tag?.tag_name}</a>
              <ReactMarkdown source={props.blog?.content}></ReactMarkdown>
            </Card.Body>
          </Card>
        </Col>
      </section>
      <section className="row">
        <Col md={{ span: 8, offset: 4 }}>
          <Form className="border-top my-3 pt-2">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Leave A Comment</Form.Label>
              <Form.Control 
                value={comment}
                onChange={handleCommentChange}
                type="email" 
                placeholder="Join the conversation..." />
            </Form.Group>
            <Button variant="primary" type="submit" size="sm" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
          {props.comments.map(comment => (
            <CommentSection comments={comment} getComments={props.getComments} />
        ))}
        </Col>
      </section>
    </>
	);
};

export interface IDetailsCardsProps {
  blog: IBlog,
  tag?: ITag;
  comments?: IComment[];
  getComments: () => void;
}

export default DetailsCard;
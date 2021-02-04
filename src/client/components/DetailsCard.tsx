import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { api, Token } from '../utils/api-services';
import { IBlog, ITag, IComment, IProfile } from '../utils/interfaces';
import { Button, Card, Col, Form } from 'react-bootstrap';
import CommentSection from '../components/CommentSection';

const DetailsCard = (props: DetailsCardsProps) => {  

  const { id } = useParams<{ id: string}>();
  
  const [comment, setComment] = React.useState<string>('');
  const [user, setUser] = React.useState<number>(null);
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // if (Token) {
      e.preventDefault();
      const res = await api('/api/comments', 'POST', { content: comment, blog_id: id });
      props.getComments();
    // } else {
    //   alert('You must be logged in to leave a comment!');
    // }
  };

  React.useEffect(() => {
		(async () => {
		  const user = await api('/api/authors/profile');
		  setUser(user?.profile.id);
		})();
	  }, []);

  return (
    <>
      <section className="row">
        <Col md={4} className="text-center">
          <img src={props.blog?.image_url} className="shadow-sm rounded image" /> 
        </Col>
        <Col md={8}>
          <Card className="border-0">
            <Card.Body className="p-0">
              <Card.Title className="title">{props.blog?.title}</Card.Title>
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
                placeholder="Join the conversation..." />
            </Form.Group>
            <Button variant="primary" type="submit" size="sm" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
          {props.comments.map(comment => (
            <CommentSection comments={comment} getComments={props.getComments} user={user} />
        ))}
        </Col>
      </section>
    </>
	);
};

export interface DetailsCardsProps {
  blog: IBlog;
  tag?: ITag;
  comments?: IComment[];
  user?: number;
  getComments: () => void;
  childen?: React.ReactNode;
}

export default DetailsCard;
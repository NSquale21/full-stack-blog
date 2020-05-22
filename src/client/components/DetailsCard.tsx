import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { IBlog, ITag } from '../utils/interfaces';
// import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';

const DetailsCard: React.FC<IDetailsCardsProps> = props => {  
  return (
    <section className="row">
      <Col md={4}>
        <img src={props.blog?.image_url} className="shadow-sm rounded image" /> 
      </Col>
      <Col md={8}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>{props.blog?.title}</Card.Title>
            <Card.Subtitle className="text-muted">By: {props.blog?.name}</Card.Subtitle>
            <a href="#" className="badge badge-primary">{props.tag?.tag_name}</a>
            <ReactMarkdown source={props.blog?.content}></ReactMarkdown>
          </Card.Body>
        </Card>
      </Col>
    </section> 
	);
};

export interface IDetailsCardsProps {
  blog: IBlog,
  tag?: ITag;
}

export default DetailsCard;
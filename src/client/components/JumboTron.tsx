import * as React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

const JumboTron: React.FC<IJumboTronProps> = () => {
  return (
		<Jumbotron fluid>
  		<Container className="d-flex justify-content-center">
			<img src="/images/logo.png" alt="Squale Chronicle" style={{ width: '19.94em', height: '12.63em' }} />
  		</Container>
		</Jumbotron>
	);
}

export interface IJumboTronProps {}

export default JumboTron;


// style={{ width: '319px', height: '202px' }}

// style={{ width: '19.94em', height: '12.63em' }}
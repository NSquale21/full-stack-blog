import * as React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

const Footer: React.FC<IFooterProps> = () => {
	return (
		<Jumbotron className="mb-0" fluid>
			<Container>
				<h1>Fluid jumbotron</h1>
				<p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
			</Container>
		</Jumbotron>
	);
};

export interface IFooterProps {}

export default Footer;

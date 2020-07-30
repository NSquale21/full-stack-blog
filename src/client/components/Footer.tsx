import * as React from 'react';
import { FaRegCopyright } from 'react-icons/fa';
import { Container, Jumbotron } from 'react-bootstrap';

const Footer: React.FC<IFooterProps> = () => {
	return (
		<Jumbotron className="mb-0 mt-5 footer" fluid>
			<div className="row justify-content-center">
				<h6>Copyright<FaRegCopyright /> 2020 Squale Chronicles</h6>
			</div>
		</Jumbotron>
	);
};

FaRegCopyright

export interface IFooterProps {}

export default Footer;

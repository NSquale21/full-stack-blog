import * as React from 'react';
import { FaRegCopyright } from 'react-icons/fa';
import { Jumbotron, Nav } from 'react-bootstrap';

const Footer: React.FC<IFooterProps> = () => {
	return (
		<Jumbotron className="mb-0 mt-5 footer" fluid>
			<div className="row flex-column justify-content-center align-items-center">
				<h6>Copyright<FaRegCopyright /> 2020 Squale Chronicles</h6>
			
			<Nav activeKey="/home" onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
				<Nav.Item>
					<Nav.Link href="/home">Active</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link-1">Link</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link-2">Link</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="disabled" disabled>
						Disabled
					</Nav.Link>
				</Nav.Item>
			</Nav>
			</div>
		</Jumbotron>
	);
};

export interface IFooterProps {}

export default Footer;
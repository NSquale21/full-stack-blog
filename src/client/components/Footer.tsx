import * as React from 'react';
import { FaRegCopyright } from 'react-icons/fa';
import { Jumbotron, Nav } from 'react-bootstrap';
import Github from './svgs/Github';
import LinkedIn from './svgs/LinkedIn';


const Footer = () => {
	return (
		<Jumbotron className="mb-0 mt-5 footer" fluid>
			<div className="row flex-column justify-content-center align-items-center">
				<Nav activeKey="/home" onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
					<Nav.Item>
						<Nav.Link href="https://github.com/NSquale21" target="_blank">
							<Github />
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="https://www.linkedin.com/in/nicole-pasquale/" target="_blank">
							<LinkedIn />
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<h6 className="dark-gray"><FaRegCopyright />Copyright 2021 Squale Chronicles</h6>
			</div>
		</Jumbotron>
	);
};

export default Footer;
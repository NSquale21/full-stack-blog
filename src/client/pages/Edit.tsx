import * as React from 'react';
import EditForm from '../components/EditForm';

const Edit: React.FC<IEditFormProps> = () => {
  return (
		<main>
			<section>
				<EditForm />
			</section>
		</main>
	);
}

export interface IEditFormProps {}

export default Edit;
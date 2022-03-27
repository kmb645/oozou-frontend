import { InputGroup } from 'react-bootstrap'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup'

function AddItem(props) {
    const validationSchemaStep = Yup.object().shape({
        title: Yup.string().required("This field is required")
      });

    return <Formik initialValues={props.initialValue} onSubmit={props.onSubmit} validationSchema={validationSchemaStep}>
    <Form>
        <ErrorMessage name="title" component="span"/><br/>
        <InputGroup className="mb-3">
            <Field name="title" className="form-control text-left" placeholder="What are the step?"  />
            <button className="btn btn-success" type="submit" >New Step</button>
        </InputGroup>
    </Form>
    </Formik>
}
export default AddItem;
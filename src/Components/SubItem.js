function SubItem(props) {
    if (props.value.status === 'completed') {
        return (
            <><input type="checkbox" onChange={e => props.subtasksStatusChange(props.value.id,props.value.status)} defaultChecked id="check-api-checkbox" className="form-check-input is-valid" /> &nbsp; {props.value.title} </>
        )
    } else {
        return (
            <><input type="checkbox" onChange={e => props.subtasksStatusChange(props.value.id,props.value.status)} id="check-api-checkbox" className="form-check-input is-valid" /> &nbsp; {props.value.title}</>
        )
    }
}
export default SubItem;
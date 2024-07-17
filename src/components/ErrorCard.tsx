import { Card } from "react-bootstrap";

interface IProps {
  errorStatus: Number,
  errorData: string
}

const ErrorCard = (props: IProps) => {
  return (
      <Card>
        <Card.Body>
          <h1 className={"text-danger"}>
            {props.errorStatus.toString()} Error
          </h1>
          <p>Please contact your system administrator with the error code below. </p>
          <small>
            {props.errorStatus.toString()}: {props.errorData}
          </small>
        </Card.Body>
      </Card>
  )
}

export default ErrorCard;

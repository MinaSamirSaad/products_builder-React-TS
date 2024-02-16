interface IProps {
    message: string;
}
const ErrorMessage = ({message}:IProps) => {
  return (
    message && <p className="block text-red-700 text-fw-semibold text-sm">{message}</p>
  )
}
export default ErrorMessage;
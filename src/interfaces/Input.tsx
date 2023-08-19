export default interface InputProps {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  name: string;

  type?: string;
  required?: boolean;
}

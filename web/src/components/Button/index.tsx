import './styles.css'

export interface ButtonProps {
  label: string;
  isSubmitted?: boolean;
  type?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ label, isSubmitted = false, type = 'primary', onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${type}`} type={isSubmitted ? 'submit' : 'button'}>
      { label }
    </button>
  )
}


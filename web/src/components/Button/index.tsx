import './styles.css'

export interface ButtonProps {
  label: string;
  type?: 'primary' | 'secondary';
  onClick: () => void;
}

export function Button({ label, type = 'primary', onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${type}`}>
      { label }
    </button>
  )
}


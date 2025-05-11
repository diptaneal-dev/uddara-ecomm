import ReactDOM from 'react-dom';
import { LoginModal } from 'react-vector';

// Move modal into portal
const LoginModalPortal = ({ show, onClose, ...rest }) => {
    if (!show) return null;

    return ReactDOM.createPortal(
        <LoginModal
            show={show}
            onClose={onClose}
            zIndex={10000}
            adapter="oauth"
            height="600px"
            logo={
                <img
                    src="/images/Uddara_logo.png"
                    alt="Uddara"
                    style={{ maxWidth: 70 }}
                />
            }
            providers={['google', 'microsoft']}
            {...rest}
        />,
        document.body
    );
};

export default LoginModalPortal;

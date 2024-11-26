import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ title, subtitle }) => {
    return (
        <header>
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,  // The 'title' prop is required
    subtitle: PropTypes.string,          // The 'subtitle' prop is optional
};

export default Header;

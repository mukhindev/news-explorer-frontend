import { Link, useLocation } from 'react-router-dom';
import logoImageThemeLight from '../../images/logo-theme-light.svg';
import logoImageThemeDark from '../../images/logo-theme-dark.svg';
import './Logo.css';

function Logo({ theme }) {
  const { pathname } = useLocation();
  let logoImage = logoImageThemeLight;

  if (theme === 'dark') logoImage = logoImageThemeDark;

  const Component = pathname !== '/'
    ? Link
    : ({ children, className }) => (<div className={className}>{children}</div>);

  return (
    <Component
      className="logo"
      title="На главную"
      to="/"
    >
      <img
        className="logo__image"
        src={logoImage}
        lang="en"
        alt="NewsExplorer"
      />
    </Component>
  );
}

export default Logo;

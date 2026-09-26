function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <a className="navigation__link" href="/">
            Inicio
          </a>
        </li>
        <li className="navigation__item">
          <a className="navigation__link" href="/rutina">
            Mi rutina
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

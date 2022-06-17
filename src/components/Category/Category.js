import * as React from "react";

import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="d-inline-flex p-2 bd-highlight">
      <Link to="/category/vodka" className="nav-link">
        Vodka
      </Link>
      <Link to="/category/whisky" className="nav-link">
        Whisky
      </Link>
      <Link to="/category/cerveza" className="nav-link">
        Cerveza
      </Link>
    </div>
  );
};

export default Category;

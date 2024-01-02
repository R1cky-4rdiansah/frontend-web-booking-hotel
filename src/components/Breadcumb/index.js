import Button from "components/Button";
import React from "react";
import { Fragment } from "react";

const Breadcrumb = ({ data }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol>
        {data.map((val, i) => (
          <Fragment key={i}>
            {i === data.length - 1 ? (
              <li aria-current="page">
                <div className={`content ${i !== 0 ? "divider" : ""}`}>
                  <span className="breadcumb-text active">{val.name}</span>
                </div>
              </li>
            ) : (
              <li>
                <div className={`content ${i !== 0 ? "divider" : ""}`}>
                  <Button
                    type="link"
                    className="breadcumb-text"
                    href={val.href}
                  >
                    {val.name}
                  </Button>
                </div>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

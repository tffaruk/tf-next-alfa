/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
export const ContactForm = () => {
  var form;
  useEffect(() => {
    form = document.getElementById("form");
  }, []);

  const [formData, setFormData] = useState();

  const formHandler = (e) => {
    e.preventDefault();
    let data = new FormData(form);

    fetch(
      "https://formsubmit.co/ajax/themefisher@themefisher.thrivedesk.email",
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFormData(data.success);
        form.reset();
      })
      .catch((error) => {
        setFormData(error);
      });
  };
  return (
    <form
      className="row gy-4 align-items-center"
      id="form"
      method="POST"
      onSubmit={formHandler}
    >
      <div className="col-sm-6">
        <label htmlFor="first_name" className="form-label">
          First Name{" "}
          <span className="lh-1" style={{ color: "red" }}>
            *
          </span>
        </label>
        <input
          type="text"
          className="form-control"
          id="first_name"
          name="first_name"
          placeholder="John"
          required
        />
      </div>
      <div className="col-sm-6">
        <label htmlFor="last_name" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-control"
          id="last_name"
          name="last_name"
          placeholder="Doe"
        />
      </div>
      <div className="col-12">
        <label htmlFor="email" className="form-label">
          Email{" "}
          <span className="lh-1" style={{ color: "red" }}>
            *
          </span>
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="johndoe@email.com"
          required
        />
      </div>
      <div className="col-12">
        <label htmlFor="department" className="form-label">
          Select Option{" "}
          <span className="lh-1" style={{ color: "red" }}>
            *
          </span>
        </label>
        <select
          name="department"
          id="department"
          className="form-select"
          required
        >
          <option defaultValue="Select Department" value="">
            Select Department
          </option>
          <option value="Technical Question">Technical Question</option>
          <option value="Pre Sales Questions">Pre Sales Questions</option>
          <option value="Payment Problem">Payment Problem</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="col-12">
        <label htmlFor="subject" className="form-label">
          Subject{" "}
          <span className="lh-1" style={{ color: "red" }}>
            *
          </span>
        </label>
        <input
          type="text"
          className="form-control"
          id="subject"
          name="_subject"
          placeholder="Type your subject here"
          required
        />
      </div>

      <div className="col-12">
        <label htmlFor="subject" className="form-label">
          Message{" "}
          <span className="lh-1" style={{ color: "red" }}>
            *
          </span>
        </label>
        <textarea
          name="message"
          id="message"
          className="form-control"
          rows="5"
          required
        ></textarea>
      </div>
      <div className="col-md-3">
        <button className="btn btn-outline-primary " type="submit">
          submit
        </button>
      </div>
      <div className={`col-md-9 ${formData ? "d-block" : "d-none"}`}>
        <p
          className="mb-0"
          style={{ color: "#43A453", display: formData ? "block" : "none" }}
        >
          <svg
            width="20"
            height="20"
            className="me-2"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 10C0 4.48 4.48 0 10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10ZM3 10L8 15L17 6L15.59 4.58L8 12.17L4.41 8.59L3 10Z"
              fill="#43A453"
            />
          </svg>
          <span className="align-middle lh-0" style={{ fontWeight: 500 }}>
            Your message Successfully sent. We'll be in touch!
          </span>
        </p>
        <p
          className="form-alert form-alert-warning mb-0"
          style={{
            color: "#CA3326",
            display: formData == false ? "block" : "none",
          }}
        >
          <svg
            width="14"
            height="14"
            className="me-2"
            enableBackground="new 0 0 512 512"
            version="1.1"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="512 59.076 452.92 0 256 196.92 59.076 0 0 59.076 196.92 256 0 452.92 59.076 512 256 315.08 452.92 512 512 452.92 315.08 256"
              fill="#CA3326"
            />
          </svg>
          <span className="align-middle lh-0" style={{ fontWeight: 500 }}>
            Some fields have errors. Please double check.
          </span>
        </p>
      </div>
    </form>
  );
};

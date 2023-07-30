import { Fragment, useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import MainTable from "./MainTable";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
const MainForm = () => {
  let [count, setcount] = useState(1);
  const [regex, setregex] = useState(/^[A-Za-z]+$/);
  let [obj, setobj] = useState({
    username: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    gender: "",
    phoneno: "",
    date: "",
    information: "",
    language: [],
  });
  let [editobj, seteditobj] = useState({
    language: [],
  });
  let [array, setarray] = useState([]);
  let [iserror, setiserror] = useState({});
  let [formHeight, setformHeight] = useState(false);
  let [filterObj, setFilterObj] = useState({
    filterFname: "",
    filterLName: "",
    filterEmail: "",
  });
  let [filterArray, setfilterArray] = useState([]);

  /* to capitalize first letter of each word */
  const capitalize = (str) =>
    str
      .toLowerCase()
      .replace(/\w{1,}/g, (match) =>
        match.replace(/\w/, (m) => m.toUpperCase())
      );

  const mainData = (e) => {
    if (e.target.name === "language") {
      if (e.target.checked) {
        obj.language.push(e.target.value);
      } else {
        obj.language = obj.language?.filter((x, i) => x !== e.target.value);
      }
    } else if (e.target.name === "information") {
      obj[e.target.name] = capitalize(e.target.value);
    } else {
      obj[e.target.name] = e.target.value;
    }

    setobj({ ...obj });
    validate(e.target.name);
  };

  const dateFunction = (year, month, day) => {
    return new Date(year + 18, month, day) <= new Date();
  };
  const validate = (name) => {
    /* =============== For User Name================ */
    if (name == "username") {
      if (!obj.username || obj.username === "") {
        iserror.username = "FirstName Should Not be empty";
      } else if (obj.username && !regex.test(obj.username)) {
        iserror.username = "FirstName should contains only alphabet";
      } else {
        delete iserror.username;
      }
    }
    /* =============== For User Name================ */
    if (name == "lastname") {
      if (!obj.lastname || obj.lastname === "") {
        iserror.lastname = "LastName Should Not be empty";
      } else if (obj.lastname && !regex.test(obj.lastname)) {
        iserror.lastname = "lastName should contains only alphabet";
      } else {
        delete iserror.lastname;
      }
    }
    /* =============== For Email================ */
    if (name == "email") {
      if (!obj.email || obj.email === "") {
        iserror.email = "Email Should Not be empty";
      } else if (
        obj.email &&
        !obj.email.includes("@gmail.com") &&
        !obj.email.includes("@outlook.com") &&
        !obj.email.includes("@mailinator.com")
      ) {
        iserror.email = "Email Should include @gmail or @outlook.com";
      } else {
        delete iserror.email;
      }
    }
    /* =============== For Date ================ */
    if (name == "date") {
      let date = new Date(obj.date);
      if (!obj.date || obj.date === "") {
        iserror.date = "date Should Not be empty";
      } else if (
        !dateFunction(date.getFullYear(), date.getMonth(), date.getDate())
      ) {
        iserror.date = "Age Should be 18+";
      } else {
        delete iserror.date;
      }
    }

    // else if (
    //   obj.date &&
    //   (new Date().getTime() - new Date(obj.date).getTime()) /
    //     (1000 * 3600 * 24 * 365) <=
    //     18
    // ) {
    //   iserror.date = "Age Should be 18+";
    // }

    /* =============== For Password ================ */
    /*=============== For Confirm Password ================  */
    if (name == "password" || name == "confirmpassword") {
      if (!obj.password || obj.password === "") {
        iserror.password = "Password Should Not Be Empty";
      } else if (
        obj.password &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          obj.password
        )
      ) {
        iserror.password =
          "Minimum eight,at least one uppercase,lowercase letter,one number and one special character:";
      } else {
        delete iserror.password;
      }
      if (!obj.confirmpassword || obj.confirmpassword === "") {
        iserror.confirmpassword = "Confirm Password Should Not Be Empty";
      } else if (!(obj.confirmpassword === obj.password)) {
        iserror.confirmpassword =
          "Password and Confirm Password Should Be Same";
      } else {
        delete iserror.confirmpassword;
      }
    }

    /*=============== For Mobile Number ================  */
    if (name == "phoneno") {
      if (!obj.phoneno || obj.phoneno === "") {
        iserror.phoneno = "Mobile number should not be empty";
      } else if (
        obj.phoneno &&
        (obj.phoneno <= 0 || obj.phoneno.length != 10)
      ) {
        iserror.phoneno = "Please Enter valid Mobile No";
      } else {
        delete iserror.phoneno;
      }
    }
    /*=============== For Gender ================  */
    if (name == "gender") {
      if (!obj.gender) {
        iserror.gender = "Gender is Required";
      } else {
        delete iserror.gender;
      }
    }

    /*=============== For Language ================  */
    if (name == "language") {
      if (!obj.language || obj.language.length < 3) {
        iserror.language = "Please Select atleast Three";
      } else {
        delete iserror.language;
      }
    }
    /*=============== For Information ================  */
    if (name == "information") {
      if (!obj.information || obj.information === "") {
        iserror.information = "Information is required";
      } else {
        delete iserror.information;
      }
    }
    setiserror({ ...iserror });
  };

  const submitFunction = (e) => {
    e.preventDefault();
    /* to send all key for validation when form is blank and we click submit */
    for (let key in obj) {
      validate(key);
    }
    /* if we fill all field true in form all object key is delete and iserror object become blank. to check blank we convert array key in to array as below. we can not compare blank object with blank object*/
    if (Object.keys(iserror).length == 0) {
      if (obj.id === undefined) {
        count++;
        obj["id"] = count;
        array = [...array, obj];

        setcount(count);
      } else {
        array.splice(
          array.findIndex((x) => x.id === obj.id),
          1,
          obj
        );
      }
    }
    localStorage.setItem("array", JSON.stringify(array));
    localStorage.setItem("count", count);
    obj = {
      username: "",
      lastname: "",
      email: "",
      phoneno: "",
      pincode: "",
      gender: "",
      language: [],
    };
    setobj({ ...obj });
    setarray([...array]);
    filterArray = array;
    setfilterArray([...filterArray]);
    filterFunction(1);
  };

  function editfun(id) {
    editobj = array.find((x) => x.id === id);
    setobj({ ...editobj });
  }
  function deletefun(id) {
    array.splice(
      array.findIndex((x) => x.id === id),
      1
    );
    filterArray = array;
    setarray([...array]);
    setfilterArray([...filterArray]);

    localStorage.setItem("array", JSON.stringify(array));
    filterFunction(1);
  }

  useEffect(() => {
    setarray(JSON.parse(localStorage.getItem("array")) || []);
    setfilterArray(JSON.parse(localStorage.getItem("array")) || []);
    setcount(JSON.parse(localStorage.getItem("count")) || 0);
  }, []);
  const formOpen = () => {
    formHeight = true;
    setformHeight(formHeight);
  };
  /* when we want to form close we set height in which only form heading show and style oveflow hidden */
  const formClose = () => {
    formHeight = false;
    setformHeight(formHeight);
  };

  const filterFunction = (e) => {
    /* jyare delete edit ke submit kariye tyare pan filter thatu rakhva mate filterfunction call karyu che submit na function par pan tyare aapri pase koi key hoti nathi ane aapne key ni jarur nathi pan key nai male to e.target.name ma error aape atle aapre tya one pass karyo che so jo e ma one aave to upar ni 2 line nu work stop thai jase */
    if (e != 1) {
      filterObj[e.target.name] = e.target.value;
      setFilterObj({ ...filterObj });
    }
    filterArray = array.filter(
      (x) =>
        /* if x.lastname or any other data is not available and we give && condition between them then it is not check that undefined data condition or skip it therefore if any one field of filter we fill then only that condition check other is skip and filter only according to one condition. when filter by two data then two condition and another one skip nad so on */
        x.username
          .toLowerCase()
          .includes(filterObj.filterFname.toLowerCase()) &&
        x.lastname
          .toLowerCase()
          .includes(filterObj.filterLName.toLowerCase()) &&
        x.email.toLowerCase().includes(filterObj.filterEmail.toLowerCase())
    );

    // filterArray = array.filter((x) => {
    //   if (filterObj.filterFname?.length != 0 || filterObj.filterLName?.length != 0 || filterObj.filterEmail?.length != 0) {
    //     if (filterObj.filterFname?.length != 0 && filterObj.filterLName?.length != 0 && filterObj.filterEmail?.length != 0) {
    //       if (x.username.includes(filterObj.filterFname) && x.lastname.includes(filterObj.filterLName) && x.email.includes(filterObj.filterEmail)) {
    //         return x;
    //       }
    //     }
    //     else if (filterObj.filterLName?.length != 0 && filterObj.filterEmail?.length != 0) {
    //       if (x.lastname.includes(filterObj.filterLName) && x.email.includes(filterObj.filterEmail)) {
    //         return x;
    //       }
    //     }
    //     else if (filterObj.filterFname?.length != 0 && filterObj.filterEmail?.length != 0) {
    //       if (x.username.includes(filterObj.filterFname) && x.email.includes(filterObj.filterEmail)) {
    //         return x;
    //       }
    //     }
    //     else if (filterObj.filterFname?.length != 0 && filterObj.filterLName?.length != 0) {
    //       if (x.username.includes(filterObj.filterFname) && x.lastname.includes(filterObj.filterLName)) {
    //         return x;
    //       }
    //     }
    //     else if (filterObj.filterLName?.length != 0) {
    //       if (x.lastname.includes(filterObj.filterLName)) {
    //         return x;
    //       }
    //     }
    //     else if (filterObj.filterEmail?.length != 0) {
    //       if (x.email.includes(filterObj.filterEmail)) {
    //         return x;
    //       }
    //     }
    //     else if (filterObj.filterFname?.length != 0) {
    //       if (x.username.includes(filterObj.filterFname)) {
    //         return x;
    //       }
    //     }
    //   }
    //   else {
    //     return x
    //   }
    // })
    setfilterArray(filterArray);
  };
  return (
    <Fragment>
      <div className="container mt-2 mb-5 border border-1 border-black rounded p-2">
        <h1 className="text-center"> Form Filter </h1>
        <div className="row">
          <div className="col-4">
            <FormGroup>
              <Label for="filterFname" className="fw-600 fs-5">
                User Name
              </Label>
              <Input
                id="filterFname"
                name="filterFname"
                placeholder="User name"
                type="text"
                onChange={filterFunction}
              />
              <span className="text-danger">{iserror.email}</span>
            </FormGroup>
          </div>
          <div className="col-4">
            <FormGroup>
              <Label for="lastName" className="fw-600 fs-5">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="filterLName"
                placeholder="Last Name"
                type="text"
                className="main"
                onChange={filterFunction}
              />
              <span className="text-danger">{iserror.email}</span>
            </FormGroup>
          </div>
          <div className="col-4">
            <FormGroup>
              <Label for="filterEmail" className="fw-600 fs-5">
                Email
              </Label>
              <Input
                id="filterEmail"
                name="filterEmail"
                placeholder="Filter email"
                type="email"
                onChange={filterFunction}
              />
              <span className="text-danger">{iserror.email}</span>
            </FormGroup>
          </div>
        </div>
      </div>
      <Row>
        <Col xs={6} className="offset-3">
          <Container className="mt-1 py-1 px-4 border border-1 border-black rounded-2 shadow-lg">
            <h1 className="text-center py-3">
              Employee Form{" "}
              {formHeight ? (
                <AiOutlineArrowUp onClick={formClose} />
              ) : (
                <AiOutlineArrowDown onClick={formOpen} />
              )}
            </h1>
            <Form
              onSubmit={(e) => {
                submitFunction(e);
              }}
              style={{
                height: formHeight ? "auto" : "0px",
                overflow: "hidden",
              }}
            >
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="username" className="fw-600 fs-5">
                      User Name
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder=""
                      type="text"
                      className="main"
                      value={obj.username || ""}
                      onChange={mainData}
                    />
                    <span className="text-danger">{iserror.username}</span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lastname" className="fw-600 fs-5">
                      Last Name
                    </Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      placeholder=""
                      type="text"
                      className="main"
                      value={obj.lastname || ""}
                      onChange={mainData}
                    />
                    <span className="text-danger">{iserror.username}</span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email" className="fw-600 fs-5">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder=""
                      type="email"
                      value={obj.email || ""}
                      className="main"
                      onChange={mainData}
                    />
                    <span className="text-danger">{iserror.email}</span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="date" className="fw-600 fs-5">
                      Birth Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      placeholder=""
                      type="date"
                      value={obj.date || ""}
                      className="main"
                      onChange={mainData}
                    />
                    <span className="text-danger">{iserror.date}</span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="password" className="fw-600 fs-5">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder=""
                      type="password"
                      value={obj.password || ""}
                      className="main"
                      onChange={mainData}
                    />
                    <span className="text-danger">{iserror.password}</span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="confirmpassword" className="fw-600 fs-5">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmpassword"
                      name="confirmpassword"
                      placeholder=""
                      type="password"
                      value={obj.confirmpassword || ""}
                      className="main"
                      onChange={mainData}
                    />
                    <span className="text-danger">
                      {iserror.confirmpassword}
                    </span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phoneno" className="fw-600 fs-5">
                      Mobile no
                    </Label>
                    <Input
                      id="phoneno"
                      name="phoneno"
                      placeholder=""
                      value={obj.phoneno || ""}
                      type="number"
                      className="main"
                      onChange={mainData}
                    />
                    <span className="text-danger">{iserror.phoneno}</span>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="">
                  <Label
                    check
                    for="example"
                    className="fw-600 fs-5
                                my-2"
                  >
                    Language
                  </Label>
                  <div className="d-flex justify-content-start">
                    <div>
                      <Input
                        id="exampleCheck"
                        name="language"
                        type="checkbox"
                        className="language me-2"
                        value="html"
                        onChange={mainData}
                        checked={obj.language.includes("html")}
                      />
                      <Label check for="exampleCheck" className="px-2">
                        HTML
                      </Label>
                    </div>
                    <div>
                      <Input
                        id="exampleCheck1"
                        name="language"
                        type="checkbox"
                        className="language me-2"
                        value="css"
                        onChange={mainData}
                        checked={obj.language.includes("css")}
                      />
                      <Label check for="exampleCheck1" className="px-2">
                        CSS
                      </Label>
                    </div>
                    <div>
                      <Input
                        id="exampleCheck2"
                        name="language"
                        type="checkbox"
                        className="language me-2"
                        value="javascript"
                        onChange={mainData}
                        checked={obj.language.includes("javascript")}
                      />
                      <Label check for="exampleCheck2" className="px-2">
                        JAVASCRIPT
                      </Label>
                    </div>
                    <div>
                      <Input
                        id="exampleCheck4"
                        name="language"
                        type="checkbox"
                        className="language me-2"
                        value="react"
                        onChange={mainData}
                        checked={obj.language.includes("react")}
                      />
                      <Label check for="exampleCheck4" className="px-2">
                        REACT
                      </Label>
                    </div>
                  </div>
                  <span className="text-danger">{iserror.language}</span>
                </Col>
                <Col md={6}>
                  <Label for="example" className="fw-600 fs-5">
                    Gender
                  </Label>
                  <div className="d-flex">
                    <div>
                      <Input
                        id="exampleCheck5"
                        name="gender"
                        type="radio"
                        className="gender me-2"
                        value="male"
                        onChange={mainData}
                        checked={obj.gender === "male"}
                      />
                      <Label check for="exampleCheck5" className="px-2">
                        Male
                      </Label>
                    </div>
                    <div>
                      <Input
                        id="exampleCheck3"
                        name="gender"
                        type="radio"
                        className="gender me-2"
                        value="female"
                        onChange={mainData}
                        checked={obj.gender === "female"}
                      />
                      <Label check for="radio" className="px-2">
                        Female
                      </Label>
                    </div>
                  </div>
                  <span className="text-danger">{iserror.gender}</span>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="information" className="fw-600 fs-5">
                      Information
                    </Label>
                    <Input
                      id="information"
                      name="information"
                      placeholder=""
                      value={obj.information || ""}
                      type="textarea"
                      className="main"
                      onChange={mainData}
                    />
                    <span className="text-danger">{iserror.information}</span>
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <button className="my-2 btn btn-secondary submit fs-4">
                  Submit
                </button>
              </div>
            </Form>
          </Container>
        </Col>
      </Row>
      <Container>
        <MainTable
          mainArray={array}
          filterArray={filterArray}
          editfun={editfun}
          deletefun={deletefun}
        />
      </Container>
    </Fragment>
  );
};
export default MainForm;

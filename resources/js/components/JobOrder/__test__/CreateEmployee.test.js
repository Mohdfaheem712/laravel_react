
import React from "react";
import ReactDOM from "react-dom";
import CreateEmployee from "../CreateEmployee";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";


Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    shallow(<CreateEmployee />);
});

// it("renders correctly enzyme", () => {
//   const wrapper = shallow(<CreateEmployee />);
//     const div = document.createElement("div");
//     ReactDOM.render(<CreateEmployee />);
//     //expect(toJson(wrapper)).toMatchSnapshot();
// });

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<CreateEmployee />);
// });
